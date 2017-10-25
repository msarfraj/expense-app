var connection=require('.././model/db');

exports.changepass = function(name,oldpass,newpass,callback) {
	var get_user_Query='SELECT * FROM employee_data WHERE empname ='+'"'+name+'"';
	connection.query(get_user_Query,function(err,result){
		if(err){
			callback({'response':"DB:Error while Querying for:user_date *",'res':false});
		}else{
			if(result.length>0){
				console.log(result[0].password+'-'+oldpass);
				if(result[0].password==oldpass){
					var update_password_query='UPDATE employee_data SET password='+'"'+newpass+'" WHERE empname='+'"'+name+'"';
				connection.query(update_password_query,function(err,result){
					if(err){
						callback({'response':"DB:Error while updating pass for:employee_data *"+name,'res':false});
					}else{
						callback({'response':"Password Sucessfully Changed",'res':true});
					}
				});
			}else{
				callback({'response':"Existing password incorrect !",'res':false});
			}
			}else{
				callback({'response':"Unable to find user !",'res':false});
			}
		}
	});
}
