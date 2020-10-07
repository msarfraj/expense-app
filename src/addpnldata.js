var dataInfo=require('../util/./constants');
var connection=require('.././model/db');
var dateFormat = require('dateformat');
exports.pnldata = function(stock, entry,exit,date,bookedamount,pltype,comment,callback) {
	if(date.length==0){
		date=dateFormat(new Date(), dataInfo.date_format);
	}else{
		date=dateFormat(date, dataInfo.date_format);
	}
	if(pltype=='loss'){
		bookedamount=0-bookedamount;
	}
			var insert_data_Query='insert into stockpnl(Stock, EntryPrice,ExitPrice,Date,BookedAmmount,PNLType,Comment) values("'+stock+'","'+entry+'","'+exit+'","'+date+'","'+bookedamount+'","'+pltype+'","'+comment+'")';
			connection.query(insert_data_Query,function(err,result){
				if(err){
					callback({'response':"error Occured "+err,'res':false});
				}else{
					callback({'response':"Sucessfully Added ",'res':true});
				}
			});
}
