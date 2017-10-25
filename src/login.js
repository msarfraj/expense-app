var crypto = require('crypto');
var rand = require('csprng');
var gravatar = require('gravatar');
var connection=require('.././model/db');
 
exports.login = function(email,password,callback) {
var getdata='SELECT * FROM employee_data WHERE emailid ='+'"'+email+'"';
connection.query(getdata,function(err,result){
		if(err){
			callback({'response':"Error from db:employee_data for *"+email,'res':false});	
		}else{
			if(result.length==0){
				callback({'response':"User not exist with given email Id:"+email,'res':false});
			}else if(result[0].emailid==email){
				if(result[0].password==password){
				callback({'response':result[0],'res':true});
				}else{
					callback({'response':"Invalid Password for given id:"+email,'res':false});
				}
			}else{
				
				callback({'response':"User not exist with given id:"+email,'res':false});	
			}
		}
	});
}