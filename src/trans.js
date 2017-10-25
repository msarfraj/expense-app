var connection=require('.././model/db');
 
exports.summary = function(callback) {
var gettotal_query='SELECT SUM(amount) as total FROM user_accounts';
var getspent_query='SELECT SUM(amount) as spent FROM transactions';
var users_query='select email, amount, max(paidon) as lastpaid	from user_accounts group by email;';
var usersummary={};
connection.query(users_query,function(err,resultTotal){
	if(err){
		callback({'response':"Error getting spent from:user_accounts"+err,'res':false});
	}else{
		usersummary=resultTotal;
}
});
connection.query(gettotal_query,function(err,resultTotal){
		if(err){
			callback({'response':"Error getting total from:user_accounts"+err,'res':false});
		}else{
			if(resultTotal.length==0){
				callback({'response':"Data base empty:",'res':false});
			}else{
				connection.query(getspent_query,function(err,resultSpent){
					if(err){
						callback({'response':"Error getting spent from:transactions"+err,'res':false});
					}else{
						if(resultSpent.length==0){
							callback({'response':"Total Remaining:"+Number(resultTotal[0].total),'res':true,'userdata':usersummary});
						}else{
						
							callback({'response':"Total Remaining:"+String(Number(resultTotal[0].total)-Number(resultSpent[0].spent)),'res':true,'userdata':usersummary});
						}
				}
			});
		}
		}
	});
}