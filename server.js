var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:mj7i58or45.database.windows.net,1433;Database=gmfleet;Uid=gmfleet@mj7i58or45;Pwd=Fleet1234;Encrypt=yes;Connection Timeout=30;";

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


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
			response += "{ ID : '" + results[i].ID + "', TripDate : '" + results[i].TripDate) + "'}";
		}
		res.send(response + "]");
	});
});

app.listen(port);
