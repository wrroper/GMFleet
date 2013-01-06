<?php

include "../config.inc.php";

    insertuserlocation($_GET["id"], $_GET["lat"], $_GET["long"]);

    checkzones($id);
?>
