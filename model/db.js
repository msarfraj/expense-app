var mysql      = require('mysql');
var dataInfo=require('../util/./constants');
var connection = mysql.createConnection({
  host     : dataInfo.host,
  user     : dataInfo.user,
  password : dataInfo.password,
  database : dataInfo.database,
  connectTimeout:6000,
  reconnect : true
});
connection.on('close', function(err) {
	  if (err) {
	    connection = mysql.createConnection(connection.config);
	  } else {
	    console.log('Connection closed normally.');
	  }
	});
connection.connect(function(error){
	if(error){
		console.err("unable to connect database");
	}else{
		console.log("database is connected..");
	}
});

module.exports = connection;