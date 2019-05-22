var express = require('express');
var app = express();
var db = require('./db');
var router = express.Router();



router.get('/', function ServerGetRootRequest(request, response) {
	db.connect(function ConnectToDatabase(err){
		if (err){
			console.log("Unable to Connect to MySQL");
			process.exit(1); //Possibly need to send error page to client
		}
		db.get().query("SELECT * FROM employees LIMIT 10", function QueryHandler(err, result, fields){
			if (err)
				throw err;
			//response.send(JSON.stringify(result));
			response.write(
				"<!DOCTYPE HTML>" +
				"<html><head><title>10 employees</title></head>" +
				"<body>" +
				"<table><thead>" +
				"<tr>" +
				"	<th>Emp No.</th>" +
				"	<th>Birth Day </th>" +
				"	<th>First Name </th>" +
				"	<th>Last Name </th>" +
				"	<th>Gender </th>" +
				"	<th>Hire Date </th>" +
				"</tr></thead><tbody>" 
			);
			for (record of result){
				response.write(
					"<tr>" +
					"	<td>" + record["emp_no"] + "</td>" +
					"	<td>" + record["birth_date"] + "</td>" +
					"	<td>" + record["first_name"] + "</td>" +
					"	<td>" + record["last_name"] + "</td>" +
					"	<td>" + record["gender"] + "</td>" +
					"	<td>" + record["hire_date"] + "</td>" +
					"</tr>"
				);
			}
			response.write("</tbody></table></body></html>");
			response.end();
		});
	});
});

app.use('/', router);

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
});
