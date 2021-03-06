var chgpass = require('../src/chpass');
var addspent = require('../src/addexpense');
var addprofit = require('../src/addpnldata');
var login = require('../src/login');
var url=require('url');
var fs = require('fs');
var path    = require('path');
var ejs = require('ejs');
var trans=require('../src/trans');
var usermodel=require('../src/viewPerson');
var history = require('../src/userhistory');
var summary = require('../src/summary');
var feedback = require('../src/feedback');
var notify = require('../src/notify');
var cron = require('node-schedule');
var os = require("os");
var dateFormat = require('dateformat');
var monthArr=["January","February","March","April","May","June","July","August","September","October","November","December"];
var routes = function(app) {
	var viewdir='views/html/ejs';
	app.get('/dologin', function(req, res) {
		if(req.session.user){
			res.render(path.resolve(viewdir+'/loginSucess'));
		}else{
			res.render(path.resolve(viewdir+'/login'));
		}
	});

	app.get('/', function(req, res) {
		res.render(path.resolve(viewdir+'/home'));
	});
	app.get('/about', function(req, res) {
		res.render(path.resolve(viewdir+'/about'));
	});
	app.get('/feedback', function(req, res) {
		res.render(path.resolve(viewdir+'/feedback'));
	});
	app.post('/postfeedback', function(req, res) {
		var email = req.body.email;
		var name = req.body.name;
		var comment=req.body.comment;
		feedback.feedbackemail(name,email,comment,function(data){
			res.render(path.resolve(viewdir+'/error'),{val:data});
		});

	});
	app.post('/login', function(req, res) {
		var email = req.body.emailid;
		var password = req.body.password;
		login.login(email, password, function(found) {
			if(found.res){
				if(found.response.fineowner==='Yes'){
					req.session.fineowner=found.response;
				}
				req.session.user=found.response;
				res.render(path.resolve(viewdir+'/home'),{val:found.response});
			}else{
				res.render(path.resolve(viewdir+'/userActionResult'),{val:found});
			}
		});
	});
	app.get('/doregister', function(req, res) {
		res.render(path.resolve(viewdir+'/register'));
	});

	app.get('/doadddebt', function(req, res) {
		res.render(path.resolve(viewdir+'/adddebt'));
	});
	app.get('/dochangepass', function(req, res) {
		res.render(path.resolve(viewdir+'/passchange'));
	});

	app.post('/adddebt', function(req, res) {
		var amount = req.body.amount;
		var name = req.body.name;
		var date=req.body.paydate;
		var info=req.body.purpose;
		var mode=req.body.paymentMode;
		var type=req.body.paymentType;
		var person=req.body.person;
		adddebt.adddebt(name,amount,date,mode,info,type,person, function(found) {
			if(found.res){
				console.log("sending email");
				notify.sendemail(person,type,amount,function(data){
					if(data.res){
						console.log("sent email data"+data.mailresp);
						res.render(path.resolve(viewdir+'/regSucess'),{val:found});
					}else{
						console.log("unable to sent email data"+data.mailresp);
						res.render(path.resolve(viewdir+'/regSucess'),{val:found});	
					}
				});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:found});
			}
		});
	});
	app.get('/dochangeowner', function(req, res) {
		res.render(path.resolve(viewdir+'/changeowner'));
	});
	app.post('/changeowner', function(req, res) {
		var name = req.body.name;
		usermodel.changeowner(name, function(found) {
				res.render(path.resolve(viewdir+'/resetPassMessage'),{val:found});
		});
	});

	app.get('/viewsummary', function(req, res) {
		console.log(req.url);
		if(req.session.user){
		trans.summary(function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/summary'),{val:data});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});
		}else{
			res.render(path.resolve(viewdir+'/goLogin'));
		}
	});
	app.get('/addtransaction', function(req, res) {
				res.render(path.resolve(viewdir+'/addexpense'));
	});
	app.post('/addexpense', function(req, res) {
		var trandate = req.body.expenseDate;
		var amount = req.body.amount;
		var expenseTitle = req.body.expenseTitle;
		var reason=req.body.comment;
		var type=req.body.paymentMode;
		addspent.addexpense(trandate, amount,expenseTitle,reason,type, function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/transuccess'),{val:data});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});
	});
	app.get('/viewbalance', function(req, res) {
		summary.balanceSummary(function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/balanceSummary'),{val:data});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});
	});
	app.get('/removemember', function(req, res) {
		res.render(path.resolve(viewdir+'/removeMember'),{val:req.session.user,session: req.session});
	});
	app.get('/getDetails?', function(req, res) {
		var name=req.url.split('?')[1];
		usermodel.getPerson(decodeURIComponent(name),function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/userHistory'),{val:data});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});
	});
	app.get('/logout', function(req, res) {
		req.session.user=false;
		res.render(path.resolve(viewdir+'/logout'));
	});
	app.get('/getMothData', function(req, res) {
		var month1 = req.body.month;
		var url=req.url+"?"+req.body.month;
		res.redirect(url)
		res.body={month:req.body.month};
	});
	app.post('/getMothData', function(req, res) {
		var month = req.body.month;
		summary.allexpenses(month ,function(data) {
			if(data.res){
				if(data.resp){
					res.redirect
					res.render(path.resolve(viewdir+'/expsummary'),{month:month,data:data,monthArr:monthArr});
				}else{
					res.render(path.resolve(viewdir+'/info'),{response:data.message});
				}
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});

	});
	app.get('/ehome', function(req, res) {
		var month1 = req.body.month;
		var month="";
		if(month1){
			month=month1;
		}else{
			var d=new Date();
			d.setDate(1);
			var month=monthArr[d.getMonth()];
		}
		console.log("sending email"+month);
		 summary.allexpenses(month ,function(data) {
			 if(data.res){
				 if(data.resp){
					 res.redirect
							 res.render(path.resolve(viewdir+'/expsummary'),{month:month,data:data,monthArr:monthArr});
				 }else{
					res.render(path.resolve(viewdir+'/info'),{response:data.message});
				 }
				}else{
					res.render(path.resolve(viewdir+'/error'),{val:data});
				}
		});

	});
	app.get('/shome', function(req, res) {
		res.render(path.resolve(viewdir+'/stocksummary'));
	});
	app.get('/addpnldata', function(req, res) {
		res.render(path.resolve(viewdir+'/addpnldata'));
	});
	app.post('/addpnl', function(req, res) {
		var stock = req.body.stock;
		var entry = req.body.entry;
		var exit = req.body.exit;
		var date=req.body.date;
		var bookedamount=req.body.bookedamount;
		var pltype=req.body.pltype;
		var comment=req.body.comment;
		addprofit.pnldata(stock, entry,exit,date,bookedamount,pltype,comment, function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/transuccess'),{val:data});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});
	});
	app.get('*', function(req, res){
		res.render(path.resolve(viewdir+'/error'),{val:{response:"Not Found"}});
		});



};



module.exports = routes;
