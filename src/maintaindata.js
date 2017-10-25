var connection = require('.././model/db');
var nodemailer = require('nodemailer');
var dataInfo=require('../util/./emailtemplate');

exports.sendnotification = function(user, callback) {
	console.log(user.lateTime+user.emailopt);
	var smtpTransport = nodemailer.createTransport({
		host : 'webmail.sapient.com',
		port : 587,
		auth : {
			domain : 'sapient',
			user : 'msarfr',
			pass : 'Myname90'
		},
		authentication: 'plain',
		 tls: {
		        rejectUnauthorized: false
		    }
	});
	//var toemail = 'TUIDigitalHubTeamEverest@sapient.com';
	//var toemail='TUI-DigitalHubTeamVictoria@sapient.com';
	var toemail='msarfraj@sapient.com,lverma@sapient.com';
	var frommail = 'Mohd Sarfraj <msarfraj@sapient.com>';
	var opt=user.emailopt;
	var subject =user.name+" is "+ dataInfo.subject[opt];
	var hi="<p>Hi,<br>"+user.name;
	var messagebody ;
	if(opt=='late'){
		messagebody= hi+dataInfo.body[opt]+user.lateTime+".";
	}else{
		messagebody=hi+ dataInfo.body[opt];
	}
			var mailOptions = {
				from : frommail,
				to : toemail,
				subject : subject,
				html : messagebody+user.comment+"</p><br>Thanks,<br>Mohd Sarfraj"
			}
			smtpTransport.sendMail(mailOptions, function(error, response) {
				if (error) {
					callback({'response' : "Sending Email." + error.message,'res' : false
					});

				} else {
					callback({'response' : "Sent email.",'res' : true});

				}
			});
}

exports.totalfine = function(date, callback) {
	var getdata_fine = 'SELECT sum(amount) as totalfine FROM fine_amount where type="fine"';
	var getdata_payment='SELECT sum(amount) as totalfine FROM fine_amount where type="payment"';
	var fineamount=0;
	var payments=0;
	var dues=0;
	connection.query(getdata_fine,function(err, result_f) {
						if (err) {
							callback({
								'response' : "DB error while getting data from table:fine_amount",
								'res' : false
							});
						} else {
							if (result_f[0].totalfine == null) {
								callback({'message' : "No Fine Dues",
									'res' : true,
									'resp':false});
							} else {
								fineamount=result_f[0].totalfine;
							
								connection.query(getdata_payment,function(err, result_p) {
									if (err) {
										callback({
											'response' : "DB error while getting data from table:fine_amount",
											'res' : false
										});
									}else{
								payments=result_p[0].totalfine;
								dues=fineamount-payments;
								callback({'data' : dues,
									'res' : true,
									'resp':true});
									}
							});
						}
						}
					});
}

exports.finesummary = function(callback) {
	var getdata_fine = 'SELECT person,sum(amount) as amount FROM fine_amount where type="fine" group by person ';
	var getdata_payment = 'SELECT person,sum(amount) as amount FROM fine_amount where type="payment" group by person ';
	connection.query(getdata_fine,function(err, resultfine) {
						if (err) {
							callback({'response' : "DB error while getting data from table:fine_amount",
								'res' : false});
						} else {
							if (resultfine.length == 0) {
								callback({'response' : "No data",
									'res' : true});
							} else {
								connection.query(getdata_payment,function(err, resultpayment) {
									if (err) {
										callback({'response' : "DB error while getting data from table:fine_amount",
											'res' : false});
									} else {
										if (resultpayment.length == 0) {
											callback({'response' : "No data",
												'res' : true});
										} else {
											for(i=0;i<resultfine.length;i++){
												for(j=0;j<resultpayment.length;j++){
													if(resultfine[i].person==resultpayment[j].person){
														resultfine[i].amount=resultfine[i].amount-resultpayment[j].amount;
													}
													}
												}
										}
									}
								});
								callback({'data' : resultfine,
									'res' : true,
									'resp':true});
							}
						}
					});
}

