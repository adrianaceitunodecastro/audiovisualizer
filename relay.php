<?php
/* Tiny LAN relay for the live control panel.
   Works under `php -S` (single-threaded) because every request is short:
     channel=cmd   POST {action,value}      -> appended to a command log (seq'd)
                   GET  ?since=N            -> { seq, items:[ cmds with seq>N ] }
     channel=state POST <json>             -> stores the display's current state
                   GET                     -> returns that state
   Storage: ./remote/{cmds,state}.json (flock-guarded). No auth — LAN tool only. */
header('Content-Type: application/json');
header('Cache-Control: no-store');

$dir = __DIR__ . '/remote';
if (!is_dir($dir)) @mkdir($dir, 0777, true);
$channel = preg_replace('/[^a-z]/', '', $_GET['channel'] ?? 'cmd');
$isPost = ($_SERVER['REQUEST_METHOD'] === 'POST');

if ($channel === 'state') {
  $file = "$dir/state.json";
  if ($isPost) {
    $body = file_get_contents('php://input');
    if (strlen($body) < 200000) @file_put_contents($file, $body, LOCK_EX);
    echo '{"ok":true}';
  } else {
    echo is_file($file) ? file_get_contents($file) : '{}';
  }
  exit;
}

// command channel
$file = "$dir/cmds.json";
$fp = fopen($file, 'c+');
if (!$fp) { echo '{"seq":0,"items":[]}'; exit; }
flock($fp, LOCK_EX);
$raw = stream_get_contents($fp);
$data = $raw ? json_decode($raw, true) : null;
if (!is_array($data) || !isset($data['seq'])) $data = ['seq' => 0, 'items' => []];

if ($isPost) {
  $cmd = json_decode(file_get_contents('php://input'), true);
  if (is_array($cmd) && isset($cmd['action'])) {
    $data['seq']++;
    $cmd['seq'] = $data['seq'];
    $data['items'][] = $cmd;
    if (count($data['items']) > 120) $data['items'] = array_slice($data['items'], -120);
    ftruncate($fp, 0); rewind($fp); fwrite($fp, json_encode($data));
  }
  echo json_encode(['ok' => true, 'seq' => $data['seq']]);
} else {
  $since = (int)($_GET['since'] ?? 0);
  $items = array_values(array_filter($data['items'], fn($c) => $c['seq'] > $since));
  echo json_encode(['seq' => $data['seq'], 'items' => $items]);
}
flock($fp, LOCK_UN);
fclose($fp);
