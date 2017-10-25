var connection = require('.././model/db');
var nodemailer = require('nodemailer');


 var smtpTransport = nodemailer.createTransport({ service: "Gmail", auth: {
 user: "sapems17@gmail.com", pass: "hellosapient" } });

exports.feedbackemail = function(name,email,comment, callback) {
	var toemail = 'msarfraj@sapient.com';
	var frommail = 'Sape Admin';
	var subject = "Feedback for Victoria App";
	var messagebody = "<p>"+comment+"</p><br>from :"+email+".<br>Thanks,<br>"+name;

	var mailOptions = {
		from : frommail,
		to : toemail,
		subject : subject,
		html : messagebody 
	}
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if (error) {
			callback({
				'response' : "Error occured." + error.message,
				'res' : false});
		} else {

			callback({
				'response' : "Thanks for Your Valuable feedback.",
				'res' : true
			});

		}
	});

	
}