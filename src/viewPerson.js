var crypto = require('crypto');
var rand = require('csprng');
var connection=require('.././model/db');
 
exports.getPerson = function(name,callback) {
var getdata='SELECT * FROM credit_debit where person="'+name+'"';
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
