<?php

session_start();

    // AT&T SMS CONFIG
    $api_key = "b6c1cf916282d6746e0d465402129eb9";
    $secret_key = "acae3770f77d3c45";
    $short_code = "29156155";
    $short_code2 = "";
    $FQDN = "https://api.att.com";
    $oauth_file = "./tmp/smsoauthtoken.php";
    $scope = "SMS";
    $default_address = "702-769-9388";
    $default_smsMsg = "simple message to myself";



    $dbuser = 'roycelea_luser';
    $dbpass = 'password123';


function testdb()
{
    global $dbuser, $dbpass;

    mysql_connect("localhost", $dbuser, $dbpass) or die(mysql_error());
    mysql_select_db("roycelea_latt") or die(mysql_error());

    $result = mysql_query("SELECT * FROM `user-accounts`") or die("error :  ". mysql_error());

    $row = mysql_fetch_array($result);

    echo("id : ") . $row['id'];
    echo("phone : ") . $row['phone'];
}

function getusers()
{
    global $dbuser, $dbpass;

    mysql_connect("localhost", $dbuser, $dbpass) or die(mysql_error());
    mysql_select_db("roycelea_latt") or die(mysql_error());

    $result = mysql_query("SELECT * FROM `user-accounts`") or die("error :  ". mysql_error());

    $row = mysql_fetch_array($result);

    for($j = 0; $j < mysql_num_rows($result); $j++)
    {
       for($i=0; $i < mysql_num_fields($result); $i++)
       {
            $rowname = mysql_field_name($result, $i);
            $userarray[$j][$rowname] = $row[$i];
       }
    }
    $result = json_encode($userarray);

    return $result;
}

function getuser($phone)
{
    global $dbuser, $dbpass;

    mysql_connect("localhost", $dbuser, $dbpass) or die(mysql_error());
    mysql_select_db("roycelea_latt") or die(mysql_error());

    $query = "SELECT * FROM `user-accounts` WHERE phone = " . $phone;

    $result = mysql_query($query) or die("error :  ". mysql_error());

    $row = mysql_fetch_array($result);

    for($i=0; $i < mysql_num_fields($result); $i++)
    {
        $rowname = mysql_field_name($result, $i);
        $userarray[$rowname] = $row[$i];
    }

    $result = json_encode($userarray);

    return $result;
}

function getzones($id)
{
    global $dbuser, $dbpass;

    mysql_connect("localhost", $dbuser, $dbpass) or die(mysql_error());
    mysql_select_db("roycelea_latt") or die(mysql_error());

    $query = "SELECT z.`id` , z.`type` , z.`coords` , z.`zonedistance` , f.`phone` FROM `post-user-zones` z LEFT OUTER JOIN `user-accounts` f ON z.friendid = f.id WHERE z.id = " . $id;

    $result = mysql_query($query) or die("error :  ". mysql_error());

    $row = mysql_fetch_array($result);

    for($j = 0; $j < mysql_num_rows($result); $j++)
    {
        for($i=0; $i < mysql_num_fields($result); $i++)
        {
            $rowname = mysql_field_name($result, $i);
            $userarray[$j][$rowname] = $row[$i];
        }
    }

    $result = json_encode($userarray);

    return $result;
}

function checkzones($id)
{
    global $dbuser, $dbpass;

    mysql_connect("localhost", $dbuser, $dbpass) or die(mysql_error());
    mysql_select_db("roycelea_latt") or die(mysql_error());

    $query = "SELECT * FROM `att-user-location` WHERE userid = " . $id . " ORDER BY updatetime desc LIMIT 1";

    $result = mysql_query($query) or die("error :  ". mysql_error());

    $row = mysql_fetch_array($result);

    $locid = $row[1];

    $query = "SELECT * FROM `att-user-location` l LEFT OUTER JOIN `post-user-zones` z ON l.userid = z.userid  WHERE l.id = " . $locid . " UNION ALL SELECT * FROM `att-user-location` l LEFT OUTER JOIN `post-user-zones` z ON l.userid = z.friendid WHERE l.id = " . $locid;

    $result = mysql_query($query) or die("error :  ". mysql_error());

    $row = mysql_fetch_array($result);

    $smssent = 0;

    for($i=0; $i < mysql_num_rows($result); $i++)
    {
        //echo " Row Type : " . $row[5];
        if($row[5] == "M")
        {
            //echo("Found Meeting!");
            $mycoords = split(",", $row[2]);
            $hiscoords = split(",", $row[8]);

            if(distance($mycoords[0], $mycoords[1], $hiscoords[0], $hiscoords[1], "M")*5280 > $row[10] && $smssent == 0)
            {
                $smssent = 1;
                //echo "Meeting Found!";
                file_get_contents("http://royceleathergifts.info/sms/app1/index.php?message=Adrian%2C%20your%20appointment%20is%20in%20the%20vicinity!&address=702-769-9388&sendSms=1");
            }
            else
            {
                //echo "Too Far!";
            }
        }
        else
        {
            $query = "SELECT * FROM `att-user-location` WHERE userid = " . $id . " ORDER BY updatetime desc LIMIT 1";

            $fresult = mysql_query($query) or die("error :  ". mysql_error());

            $friend = mysql_fetch_array($fresult);

            $floc = $friend[1];

            $mycoords = split(",", $row[2]);
            $hiscoords = split(",", $floc);

            if(distance($mycoords[0], $mycoords[1], $hiscoords[0], $hiscoords[1], "M")*5280 > $row[10] && $smssent == 0)
            {
                $smssent = 1;
                //echo "Friend Found!";
                file_get_contents("http://royceleathergifts.info/sms/app1/index.php?message=Adrian%2C%20your%20friend%20is%20in%20the%20vicinity!&address=702-769-9388&sendSms=1");
            }
            else
            {
                //echo "Too Far!";
            }
        }


        $row = mysql_fetch_array($result);
    }

    $result = json_encode($userarray);

    return $result;
}

function distance($lat1, $lon1, $lat2, $lon2, $unit)
{
  $theta = $lon1 - $lon2;
  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
  $dist = acos($dist);
  $dist = rad2deg($dist);
  $miles = $dist * 60 * 1.1515;
  $unit = strtoupper($unit);
  if ($unit == "K") {
    return ($miles * 1.609344);
  } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
        return $miles;
      }
}


function insertuserlocation($id, $lat, $long)
{
    global $dbuser, $dbpass;

    mysql_connect("localhost", $dbuser, $dbpass) or die(mysql_error());
    mysql_select_db("roycelea_latt") or die(mysql_error());

    $query = "INSERT INTO  `roycelea_latt`.`att-user-location` (`id`, `userid`,`coords`,`updatetime`) VALUES (NULL , " . $id . ",  '" . $lat . "," . $long . "', CURRENT_TIMESTAMP);";

    $result = mysql_query($query) or die("error :  ". mysql_error());
}

?>