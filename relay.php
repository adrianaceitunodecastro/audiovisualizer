<?php
/* Tiny LAN relay for the live control panel.
     channel=cmd   POST {action,value}      -> appended to a command log (seq'd)
                   GET  ?since=N[&wait=S]   -> { seq, items:[ cmds with seq>N ] }
                                               wait>0 holds the request open until a new
                                               command lands (long-poll, capped at 20s)
     channel=state POST <json>              -> stores the display's current state
                   GET                      -> returns that state (legacy plain read)
                   GET  ?sig=H[&wait=S]     -> { sig, state } — held until the stored
                                               state's md5 differs from sig
   Long-polling is disabled under `php -S`: it is single-threaded, so a held GET
   would deadlock the very POST that ends the wait. There, wait is ignored and
   clients degrade to fast polling.
   Storage: ./remote/{cmds,state}.json (flock-guarded). No auth — LAN tool only. */
header('Content-Type: application/json');
header('Cache-Control: no-store');
set_time_limit(0);

$dir = __DIR__ . '/remote';
if (!is_dir($dir)) @mkdir($dir, 0777, true);
$channel = preg_replace('/[^a-z]/', '', $_GET['channel'] ?? 'cmd');
$isPost = ($_SERVER['REQUEST_METHOD'] === 'POST');
$wait = (php_sapi_name() === 'cli-server') ? 0 : min(20, max(0, (int)($_GET['wait'] ?? 0)));

// shared-lock read so waiters never block a writer
function readRaw($file) {
  $fp = @fopen($file, 'r');
  if (!$fp) return '';
  flock($fp, LOCK_SH);
  $raw = stream_get_contents($fp);
  flock($fp, LOCK_UN); fclose($fp);
  return $raw ?: '';
}

if ($channel === 'state') {
  $file = "$dir/state.json";
  if ($isPost) {
    $body = file_get_contents('php://input');
    if (strlen($body) < 200000) @file_put_contents($file, $body, LOCK_EX);
    echo '{"ok":true}';
    exit;
  }
  if (!isset($_GET['sig'])) { echo readRaw($file) ?: '{}'; exit; }   // legacy plain read
  $sig = $_GET['sig'];
  $deadline = microtime(true) + $wait;
  while (true) {
    $raw = readRaw($file);
    $cur = $raw ? md5($raw) : '';
    if ($cur !== $sig || microtime(true) >= $deadline) {
      echo '{"sig":"' . $cur . '","state":' . ($raw ?: 'null') . '}';
      exit;
    }
    usleep(50000);
  }
}

// ---- command channel ----
$file = "$dir/cmds.json";

if ($isPost) {
  $fp = fopen($file, 'c+');
  if (!$fp) { echo '{"seq":0,"items":[]}'; exit; }
  flock($fp, LOCK_EX);
  $raw = stream_get_contents($fp);
  $data = $raw ? json_decode($raw, true) : null;
  if (!is_array($data) || !isset($data['seq'])) $data = ['seq' => 0, 'items' => []];
  $cmd = json_decode(file_get_contents('php://input'), true);
  if (is_array($cmd) && isset($cmd['action'])) {
    $data['seq']++;
    $cmd['seq'] = $data['seq'];
    $data['items'][] = $cmd;
    if (count($data['items']) > 120) $data['items'] = array_slice($data['items'], -120);
    ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data));
  }
  flock($fp, LOCK_UN); fclose($fp);
  echo json_encode(['ok' => true, 'seq' => $data['seq']]);
  exit;
}

$since = (int)($_GET['since'] ?? 0);
$deadline = microtime(true) + $wait;
while (true) {
  $raw = readRaw($file);
  $data = $raw ? json_decode($raw, true) : null;
  if (!is_array($data) || !isset($data['seq'])) $data = ['seq' => 0, 'items' => []];
  if ($data['seq'] > $since || microtime(true) >= $deadline) {
    $items = array_values(array_filter($data['items'], fn($c) => $c['seq'] > $since));
    echo json_encode(['seq' => $data['seq'], 'items' => $items]);
    exit;
  }
  usleep(30000);
}
