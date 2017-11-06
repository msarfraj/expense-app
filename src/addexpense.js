var connection=require('.././model/db');
var dateFormat = require('dateformat');
var dataInfo=require('../util/./constants');
exports.addexpense = function(trandate, amount, title,reason,type,callback) {
	if(trandate.length==0){
				trandate=dateFormat(new Date(), dataInfo.date_format);
			}else{
				trandate=dateFormat(trandate, dataInfo.date_format);
			}
			var insert_data_Query='insert into expenses(expense_date,expense_amount,expense_title,comments,payment_mode) values("'+trandate+'","'+amount+'","'+title+'","'+reason+'","'+type+'")' ;
			connection.query(insert_data_Query,function(err,result){
				if(err){
					callback({'response':"DB Error:While insert into -expenses "+err,'res':false});
				}else if(result.affectedRows!=0){
					callback({'response':"Sucessfully Added for "+title,'res':true});
				}else{
					callback({'response':"Unable to Update for "+title,'res':true});
				}
			});
		}

exports.updateamount = function(trandate, amount,name,owner,callback) {
	if(trandate.length==0){
		trandate=dateFormat(new Date(), dataInfo.date_format);
	}
	var insert_data_Query='insert into transactions(paidon,amount,fineowner,paidby) values("'+trandate+'","'+amount+'","'+owner+'","'+name+'")' ;
	connection.query(insert_data_Query,function(err,result){
		if(err){
			callback({'response':"DB Error:While insert into transactions "+err,'res':false});
		}else{
			
			callback({'response':"Sucessfully Paid. Thanks "+name,'res':true});
		}
	});
}
