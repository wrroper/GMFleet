var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:mj7i58or45.database.windows.net,1433;Database=gmfleet;Uid=gmfleet@mj7i58or45;Pwd=Fleet1234;Encrypt=yes;Connection Timeout=30;";

var express = require('express');
var staticdir = express.static(__dirname + '/att')  ;
var app = express();
//app.use(express.static('/att', __dirname + '/att'));
app.use(express.bodyParser());
app.use(app.router);

app.get('/att/:file', function(req, res, next) {
    staticdir(req, res, next);
});

app.get('/trips', function(req, res) {
	sql.query(conn_str, "SELECT * FROM Trips", function (err, results) {
		if(err) {
			res.writeHead(500, { 'Content-Type' : 'text/plain' } );
			res.write("Got Error " + err);
			res.end("");
			return;
		}
		var response = "[";
        var resArray = [];

		for (var i = 0; i < results.length; i++) {
            var myObject = new Object();


			myObject.trip_id = results[i].ID;
            myObject.car_id = results[i].CarId;
            myObject.trip_date = results[i].TripDate;
            myObject.odometer = results[i].Odometer;
            myObject.engine_oil_life = results[i].OilLife;
            myObject.tire_left_front_pressure = results[i].LFTirePressure;
            myObject.tire_right_front_pressure  = results[i].RFTirePressure;
            myObject.tire_left_rear_pressure = results[i].LRTirePressure;
            myObject.tire_right_rear_pressure = results[i].RRTirePressure;
            myObject.fuel_level = results[i].Fuel;
            myObject.gps_lat = results[i].Latitude;
            myObject.gps_long = results[i].Longitude;
            myObject.tire_condition = results[i].TireCondition;
            myObject.tire_comment = results[i].TireComment;
            myObject.glass_condition = results[i].GlassCondition;
            myObject.glass_condition = results[i].GlassComment;
            myObject.body_condition = results[i].BodyCondition;
            myObject.body_comment = results[i].BodyComment;
            myObject.trip_comment = results[i].TripComment;
            myObject.user_id = results[i].UserId;

            resArray.push(myObject);
		}
		response += "]";
		res.send(JSON.stringify(resArray));
		res.end("");
	});
});

app.post('/posttrip', function(req, res) {
    var item = req.body;

    if(item) {
        var insert = "INSERT INTO Trips (CarId, TripDate, Odometer, OilLife, LFTirePressure, RFTirePressure, LRTirePressure, RRTirePressure, Fuel, Latitude, Longitude, TireCondition, TireComment, GlassCondition, GlassComment, BodyCondition, BodyComment, TripComment, UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?)";
        var qry;
        var carid = 0;

        qry = "INSERT INTO JSON (JSON) VALUES (?)";

        //sql.query(conn_str, qry, [JSON.stringify(item)], function(err, results) {
        //    res.send("Got Error 1 " + err);
        //    res.end("");
        //    return;
        //}) ;

        qry = "SELECT * FROM Cars WHERE VIN = ?"

        sql.query(conn_str, qry, [item.vin_2_9], function (err, results) {
            if(err) {

                res.send("Got Error 2 " + err);
                res.end("");
                return;
            }

            if(results.rowcount > 0)
            {
                carid = results[0].ID;
            }
            else
            {
                carid = 1;
            }

        });

        if(carid == 0)
        {
            carid = 1;
        }

        qry = "INSERT INTO JSON (JSON) VALUES (?)";
        var params = [carid, item.trip_date, item.odometer, item.engine_oil_life, item.tire_left_front_pressure, item.tire_right_front_pressure, item.tire_left_rear_pressure, item.tire_right_rear_pressure, item.fuel_level, item.gps_lat, item.gps_long, item.tire_condition, item.tire_comment, item.glass_condition, item.glass_comment, item.body_condition, item.body_comment, item.trip_comment, item.user_id];

        //sql.query(conn_str, qry, [JSON.stringify(params)], function(err, results) {
        //    res.send("Got Error 3a " + err);
        //    res.end("");
        //    return;
        //}) ;

        sql.query(conn_str, insert, params, function(err) {
            if(err) {
                res.send("Got Error 3 " + err);
                res.end("");
                return;
            }

        });
    }
    else
    {
        var qry = "INSERT INTO JSON (JSON) VALUES ('NO JSON " + JSON.stringify(req.body) + "')";

        sql.query(conn_str, qry, function(err, results) {

        }) ;
    }
});

app.get('/user/:pin', function(req, res) {
    var qry = "SELECT * FROM Users WHERE Pin = ?";

    sql.query(conn_str, qry, [req.params.pin], function (err, results) {
        if(err) {

            res.send("Got Error " + err);
            res.end("");
            return;
        }
        var response = "";
        var myObject = new Object();

        for (var i = 0; i < results.length; i++) {
            myObject.user_id = results[i].Id;
            myObject.pin = results[i].Pin;
            myObject.last_name = results[i].LastName;
            myObject.first_name = results[i].FirstName;

            response += "{ &quotuser_id&quot : &quot" + results[i].Id + "&quot, &quotpin&quot : &quot" + results[i].Pin + "&quot, &quotlast_name&quot : &quot" + results[i].LastName + "&quot, &quotfirst_name&quot : &quot" + results[i].FirstName + "&quot}";
        }
        response += "";
        res.send(JSON.stringify(myObject));
        res.end("");
    });
});

app.get('/cars', function(req, res) {
    var qry = "SELECT * FROM Cars";

    sql.query(conn_str, qry, function (err, results) {
        if(err) {

            res.send("Got Error " + err);
            res.end("");
            return;
        }
        var response = "[";
        for (var i = 0; i < results.length; i++) {
            response += "{ car_id : '" + results[i].Id + "', vin : '" + results[i].VIN + "', make : '" + results[i].Make + "', Model : '" + results[i].Model + "'}";
        }
        response += "]";
        res.send(response);
        res.end("");
    });
});

app.listen(process.env.PORT || 3000);
