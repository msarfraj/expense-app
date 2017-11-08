var connection = require('.././model/db');
var nodemailer = require('nodemailer');
var mailinfo=require('../util/./emailtemplate');

 var smtpTransport = nodemailer.createTransport(
		 {
			 service: "gmail",
			 auth: {
				 	user: "sapems17@gmail.com",
				 	pass: "hellosapient"
				 	} });

exports.sendemail = function(name,type,amount, callback) {
	console.log(name+"email:"+mailinfo.email[name]);
	var toemail = mailinfo.email[name];
	var frommail = '"Sape Admin" <sapems17@gmail.com>';
	var subject = "Sarfraj added balance for You";
	var typeMessage="You owe Sarfraj:"+amount+"Rs.";
	if(type=='taken'){
		typeMessage="Sarfraj owe you:"+amount+"Rs.";
	}
	var messagebody = "<p>"+typeMessage+"</p><br>Thanks,<br>"+name;

	var mailOptions = {
		from : frommail,
		to : toemail,
		subject : subject,
		html : messagebody 
	}
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			callback({
				'mailresp' : "Error occured." + error.message,
				'res' : false});
		} else {

			callback({
				'mailresp' : "User Notified",
				'res' : true
			});

		}
	});

	
}