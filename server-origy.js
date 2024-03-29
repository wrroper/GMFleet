var sql = require('msnodesql');
var conn_str = "Driver={SQL Server Native Client 10.0};Server=tcp:mj7i58or45.database.windows.net,1433;Database=gmfleet;Uid=gmfleet@mj7i58or45;Pwd=Fleet1234;Encrypt=yes;Connection Timeout=30;";

var http = require('http');
var port = process.env.port||3000;

http.createServer(function(req, res) {
	sql.query(conn_str, "SELECT * FROM Trips", function (err, results) {
		if(err) {
			res.writeHead(500, { 'Content-Type' : 'text/plain' } );
			res.write("Got Error " + err);
			res.end("");
			return;
		}
		res.writeHead(200, { 'Content-Type' : 'text/plain' });
		for (var i = 0; i < results.length; i++) {
			res.write("{ 'ID' : '" + results[i].ID + "', 'TripDate' : '" + results[i].TripDate) + "'";
		}
		res.end(";");
	});
}).listen(port);
