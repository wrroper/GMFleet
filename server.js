var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:mj7i58or45.database.windows.net,1433;Database=gmfleet;Uid=gmfleet@mj7i58or45;Pwd=Fleet1234;Encrypt=yes;Connection Timeout=30;";

var express = require('express');
var app = express();
app.use(express.bodyParser());

app.get('/trips', function(req, res) {
	sql.query(conn_str, "SELECT * FROM Trips", function (err, results) {
		if(err) {
			res.writeHead(500, { 'Content-Type' : 'text/plain' } );
			res.write("Got Error " + err);
			res.end("");
			return;
		}
		var response = "[";
		for (var i = 0; i < results.length; i++) {
			response += "{ Id : '" + results[i].ID + "', CarId : '" + results[i].CarId + "', TripDate : '" + results[i].TripDate + "', Odometer : '" + results[i].Odometer +
                        "', OilLife : '" + results[i].OilLife + "', LFTirePressure : '" + results[i].LFTirePressure + "', RFTirePressure : '" + results[i].RFTirePressure +
                        "', LRTirePressure : '" + results[i].LRTirePressure + "', RRTirePressure : '" + results[i].RRTirePressure + "', Fuel : '" + results[i].Fuel +
                        "', Latitude : '" + results[i].Latitude + "', Longitude : '" + results[i].Longitude + "', TireCondition : '" + results[i].TireCondition +
                        "', TireComment : '" + results[i].TireComment + "', GlassCondition : '" + results[i].GlassCondition + "', GlassComment : '" + results[i].GlassComment +
                        "', BodyCondition : '" + results[i].BodyCondition + "', BodyComment : '" + results[i].BodyComment + "', TripComment : '" + results[i].TripComment +
                        "', UserId : '" + results[i].UserId + "'}";
		}
		response += "]";
		res.send(response);
		res.end("");
	});
});

app.post('/posttrip', function(req, res) {
    var item = req.body.item;

    if(item) {
        var insert = "INSERT INTO Trips (CarId, TripDate, Odometer, OilLife, LFTirePressure, RFTirePressure, LRTirePressure, RRTirePressure, Fuel, Latitude, Longitude, TireCondition, TireComment, GlassCondition, GlassComment, BodyCondition, BodyComment, TripComment, UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?, ?)";

        sql.query(conn_str, insert, [item.carid, item.tripdate, item.odometer, item.engine_oil_life, item.tire_left_front_pressure, item.tire_right_front_pressure,
                                     item.tire_left_rear_pressure, item.tire_right_rear_pressure, item.fuel_level, item.gps_lat, item.gps_long, item.tire_condition,
                                     item.tire_comment, item.glass_condition, item.glass_comment, item.body_condition, item.body_comment, item.trip_comment, item.user_id], function(err) {
            if(err) {
                throw err;
            }

        });
    }
});

app.get('/user/:pin', function(req, res) {
    var select = "SELECT * FROM Users WHERE Pin = ?";

    sql.query(conn_str, select, req.params.pin, function (err, results) {
        if(err) {
            res.writeHead(200, { 'Content-Type' : 'text/plain' } );
            res.write("Got Error " + err);
            res.end("");
            return;
        }
        var response = "[";
        for (var i = 0; i < results.length; i++) {
            response += "{ user_id : '" + results[i].Id + "', pin : '" + results[i].Pin + "', last_name : '" + results[i].LastName + "', first_name : '" + results[i].FirstName + "'}";
        }
        response += "]";
        res.send(response);
        res.end("");
    });
});

app.listen(process.env.PORT || 3000);
