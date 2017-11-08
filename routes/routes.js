var chgpass = require('../src/chpass');
var addspent = require('../src/addexpense');
var adddebt = require('../src/adddebt');
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
var routes = function(app) {
	var viewdir='views/html/ejs';
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
	app.get('/dologin', function(req, res) {
		if(req.session.user){
			res.render(path.resolve(viewdir+'/loginSucess'));
		}else{
			res.render(path.resolve(viewdir+'/login'));
		}
	});
	app.get('/doadddebt', function(req, res) {
		res.render(path.resolve(viewdir+'/adddebt'));
	});
	app.get('/dochangepass', function(req, res) {
		res.render(path.resolve(viewdir+'/passchange'));
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
				notify.sendemail(name,type,amount,function(data){
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
	app.get('/ehome', function(req, res) {
		var d=new Date();
		d.setDate(1);
		var day=dateFormat(d, "yyyy-mm-dd");
		var monthArr=["January","February","March","April","May","June","July","August","September","October","November","December"];
		var month=monthArr[d.getMonth()];
		 summary.allexpenses(day ,function(data) {
			 if(data.res){
				 if(data.resp){
							 res.render(path.resolve(viewdir+'/expsummary'),{month:month,data:data});
				 }else{
					res.render(path.resolve(viewdir+'/info'),{response:data.message});
				 }
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
