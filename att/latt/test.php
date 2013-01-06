<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Ryan Roper
 * Date: 11/17/12
 * Time: 2:02 PM
 * To change this template use File | Settings | File Templates.
 */
include "api/config.inc.php";

testdb();

$test = getusers();

echo $test;

?>