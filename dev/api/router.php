<?php
    include_once(DOCROOT . '/actions/' . $_GET['action'] . '.php');

    if ($_GET['action'] == 'get' || $_GET['action'] == 'put') {
        include_once(DOCROOT . '/views/' . $_GET['action'] . '.php');
        header('Content-Type: text/html');
        echo $output;
    }
?>
