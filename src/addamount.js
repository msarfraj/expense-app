var connection=require('.././model/db');
var dateFormat = require('dateformat');
exports.addfinetrans = function(trandate, amount, name,reason,type,callback) {
			if(trandate.length==0){
				trandate=dateFormat(new Date(), "yyyy-mm-dd");
			}
			var insert_data_Query='insert into fine_amount(finedate,amount,person,reasonText,type) values("'+trandate+'","'+amount+'","'+name+'","'+reason+'","'+type+'")' ;
			connection.query(insert_data_Query,function(err,result){
				if(err){
					callback({'response':"DB Error:While insert into -fine_amount "+err,'res':false});
				}else if(result.affectedRows!=0){
					callback({'response':"Sucessfully Added for "+name,'res':true});
				}else{
					callback({'response':"Unable to Update for "+name,'res':true});
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
