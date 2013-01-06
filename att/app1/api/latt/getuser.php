<?php

include "../config.inc.php";

header('Content-type: application/json');

echo getuser($_GET["phone"]);

?>
