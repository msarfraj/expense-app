var crypto = require('crypto');
var rand = require('csprng');
var connection=require('.././model/db');
 
exports.adddebt = function(name,amount,date,mode,info,callback) {
	var get_data_Query='SELECT emailid FROM employee_data WHERE emailid ='+'"'+email+'"';
connection.query(get_data_Query,function(err,result){
	if(err){
		callback({'response':"Eror Occured "+err,'res':false});
	}else{
		if(result.length >0&&result[0].email==email){
			callback({'response':"Already Exist",'res':true});
		}else{
			var number='+91'+mobile;
			var insert_data_Query='insert into employee_data(empname,emailid,mobile,fineowner,password,ntid) values("'+name+'","'+email+'","'+number+'","No","victoria","'+ntid+'")' ;
			connection.query(insert_data_Query,function(err,result){
				if(err){
					callback({'response':"error Occured "+err,'res':false});
				}else{
					callback({'response':"Sucessfully Registered ",'res':true});
				}
			});
		}
	}
});
}