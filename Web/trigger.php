<?php
  $task = '?task=' . $_GET['task'] . '&action=' . $_GET['action'];
  $runtask = '' . $task;
  $contents = file_get_contents($runtask);
  echo $url . "\n"  . $contents;

  sleep(90);
  //run db update
  $update = '';
  file_get_contents($update);
?>
