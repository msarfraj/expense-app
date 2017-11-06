var dataInfo=require('../util/./constants');
var connection=require('.././model/db');
var dateFormat = require('dateformat');
exports.adddebt = function(name,amount,date,mode,info,type,person,callback) {
	if(date.length==0){
		date=dateFormat(new Date(), dataInfo.date_format);
	}else{
		date=dateFormat(date, dataInfo.date_format);
	}
	if(type=='taken'){
		amount=0-amount;
	}
			var insert_data_Query='insert into credit_debit(title,amount,lending_date,payment_mode,comment,type,person) values("'+name+'","'+amount+'","'+date+'","'+mode+'","'+info+'","'+type+'","'+person+'")';
			connection.query(insert_data_Query,function(err,result){
				if(err){
					callback({'response':"error Occured "+err,'res':false});
				}else{
					callback({'response':"Sucessfully Added ",'res':true});
				}
			});
}
