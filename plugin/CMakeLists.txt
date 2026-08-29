cmake_minimum_required(VERSION 3.22)

project(SonarViz VERSION 0.1.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# JUCE 8.0.14, shallow-cloned into ./JUCE (see README)
add_subdirectory(JUCE)

# The web app lives one level up (index.php / app.js / style.css / vjloops ...).
# The plugin serves those files straight off disk, so editing app.js is a plugin
# *reload* away — no rebuild needed for front-end changes.
get_filename_component(SONAR_WEBROOT "${CMAKE_CURRENT_SOURCE_DIR}/.." ABSOLUTE)

# PHP renders index.php (it injects the VJ-loop list). Found at configure time;
# falls back to "php" on PATH if not located.
find_program(SONAR_PHP_EXE php)
if(NOT SONAR_PHP_EXE)
    set(SONAR_PHP_EXE "php")
endif()
message(STATUS "SONAR webroot : ${SONAR_WEBROOT}")
message(STATUS "SONAR php     : ${SONAR_PHP_EXE}")

juce_add_plugin(SonarViz
    PRODUCT_NAME "SONAR Visualizer"
    COMPANY_NAME "tunox"
    PLUGIN_MANUFACTURER_CODE Tnox
    PLUGIN_CODE Snr1
    FORMATS VST3
    VST3_CATEGORIES Fx Analyzer
    IS_SYNTH FALSE
    NEEDS_MIDI_INPUT FALSE
    NEEDS_MIDI_OUTPUT FALSE
    IS_MIDI_EFFECT FALSE
    NEEDS_WEBVIEW2 TRUE            # link the WebView2 backend on Windows
    COPY_PLUGIN_AFTER_BUILD TRUE)  # drop the .vst3 into the system VST3 folder

target_sources(SonarViz PRIVATE
    src/PluginProcessor.cpp
    src/PluginEditor.cpp)

target_compile_definitions(SonarViz PRIVATE
    JUCE_WEB_BROWSER=1
    JUCE_USE_WIN_WEBVIEW2=1
    JUCE_VST3_CAN_REPLACE_VST2=0
    JUCE_REPORT_APP_USAGE=0
    SONAR_WEBROOT="${SONAR_WEBROOT}"
    SONAR_PHP="${SONAR_PHP_EXE}")

target_link_libraries(SonarViz PRIVATE
    juce::juce_audio_utils
    juce::juce_gui_extra
    juce::juce_recommended_config_flags
    juce::juce_recommended_warning_flags)
