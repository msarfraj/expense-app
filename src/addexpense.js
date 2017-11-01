var connection=require('.././model/db');
var dateFormat = require('dateformat');
exports.addexpense = function(trandate, amount, title,reason,type,callback) {
	console.log("before",trandate);		
	if(trandate.length==0){
				trandate=dateFormat(new Date(), "yyyy-mm-dd");
			}else{
				trandate=dateFormat(trandate, "yyyy-mm-dd");
			}
			console.log(trandate);
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
		trandate=dateFormat(new Date(), "yyyy-mm-dd");
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
