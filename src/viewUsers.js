var crypto = require('crypto');
var rand = require('csprng');
var connection=require('.././model/db');
 
exports.viewUsers = function(callback) {
var getdata='SELECT * FROM employee_data';
connection.query(getdata,function(err,result){
		if(err){
			throw err;
		}else{
			if(result.length==0){
				callback({'response':"Data base empty:",'res':false});
			}else{
				
				callback({'response':result,'res':true});	
			}
		}
	});
}

exports.getFineowner = function(callback) {
	var getdata='SELECT * FROM employee_data where fineowner="Yes"';
	connection.query(getdata,function(err,result){
			if(err){
				callback({'response':"DB:Error while getting data for:employee_data ",'res':false});
			}else{
				if(result.length==0){
					callback({'response':"Data base empty:",'res':false});
				}else{
					
					callback({'response':result[0],'res':true});	
				}
			}
		});
	}

exports.changeowner = function(name,callback) {
	var fullname=name.split(' ');
	var revert_owner_query='UPDATE employee_data SET fineowner="No" where fineowner="Yes"';
	connection.query(revert_owner_query,function(err,revert){
		if(err){
			callback({'response':"DB:Error while reverting Owner ",'res':false});
		}else{
					var change_owner_query='UPDATE employee_data SET fineowner="Yes"'+' WHERE empname ="'+name+'"';
				connection.query(change_owner_query,function(err,result){
					if(err){
						callback({'response':"DB:Error while updating Owner to "+name,'res':false});
					}else{
						callback({'response':"Owner Sucessfully Changed to "+name,'res':true});
					}
				});
		}
	});
			
}

exports.getUser = function(ntid,callback) {
	var getdata='SELECT * FROM employee_data where ntid="'+ntid+'"';
	connection.query(getdata,function(err,result){
			if(err){
				throw err;
			}else{
				if(result.length==0){
					callback({'response':"Data base empty:",'res':false});
				}else{
					
					callback({'response':result,'res':true});	
				}
			}
		});
	}
