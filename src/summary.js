var connection = require('.././model/db');

exports.allexpenses = function(month, callback) {
	var getdata_expense_sum = 'SELECT sum(expense_amount) as totalexpenses FROM expenses where monthname(expense_date)='+'"'+month+'"';
	var getdata_expense_all = 'SELECT * FROM expenses where monthname(expense_date)='+'"'+month+'" order by expense_date ASC';
	var alreadySpent=0;
	connection.query(getdata_expense_sum,function(err, result_expense) {
						if (err) {
							callback({
								'response' : "DB error while getting sum from table:expenses",
								'res' : false
							});
						} else {
							if (result_expense[0].totalexpenses == null) {
								callback({'message' : "No expenses for this month ",
									'res' : true,
									'resp':false});
							} else {
								alreadySpent=result_expense[0].totalexpenses;
									connection.query(getdata_expense_all,function(error, result_p) {
									if (error) {
										callback({
											'response' : "DB error while getting data from table:expenses",
											'res' : false
										});
									}else{
								callback({'data' : result_p,
									'res' : true,
									'resp':true,
									'total':alreadySpent});
									}
							});
						}
						}
					});
}

exports.balanceSummary = function(callback) {
	var getdata_balance = 'SELECT person,sum(amount) as amount FROM credit_debit group by person';
	connection.query(getdata_balance,function(err, resultBalance) {
						if (err) {
							callback({'response' : "DB error while getting data from table:credit_debit",
								'res' : false});
						} else {
							if (resultBalance.length == 0) {
								callback({'response' : "No data",
									'res' : true});
							} else {
								callback({'data' : resultBalance,
									'res' : true,
									'resp':true});
							}
						}
					});
}
