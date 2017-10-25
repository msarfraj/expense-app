var connection=require('.././model/db');
 
exports.history = function(name,callback) {
	var fullname=name.split(' ');
	var get_user_history='Select * FROM fine_amount WHERE person like '+'"%'+fullname[0]+'%" or person like '+'"%'+fullname[1]+'%"';
	connection.query(get_user_history,function(err,result){
		if(err){
			callback({'response':"error from db:fine_amount",err,'res':false});
		}else if(result.length>0){
						callback({'response':result,'res':true});
			}else{
				callback({'response':"Unable to find user ! With Name:"+name,'res':true});
			}
	});
}

exports.removeme = function(email,callback) {
	var delete_user_Query='Delete FROM user_data WHERE email ='+'"'+email+'"';
	connection.query(delete_user_Query,function(err,result){
		if(err){
			callback({'response':"error from db:user_data",err,'res':false});
		}else if(result.affectedRows!=0){
			var delete_transaction_Query='Delete FROM user_accounts WHERE email ='+'"'+email+'"';
			connection.query(delete_transaction_Query,function(err,result){
				if(err){
					callback({'response':"error from db:transactions",err,'res':false});
				}else{
						callback({'response':"Removed From Database",'res':true});
			}});
			}else{
				callback({'response':"Unable to find user ! With Email:"+email,'res':true});
			}
	});
}