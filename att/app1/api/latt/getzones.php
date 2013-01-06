<?php
include "../config.inc.php";

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

echo getzones($_GET["id"]);

?>
