var chgpass = require('../src/chpass');
var addspent = require('../src/addamount');
var register = require('../src/register');
var login = require('../src/login');
var url=require('url');
var fs = require('fs');
var path    = require('path');
var ejs = require('ejs');
var trans=require('../src/trans');
var usermodel=require('../src/viewUsers');
var history = require('../src/userhistory');
var maintaindata = require('../src/maintaindata');
var feedback = require('../src/feedback');
var cron = require('node-schedule');
var os = require("os");
var dateFormat = require('dateformat');
var routes = function(app) {
	var viewdir='views/html/ejs';
	app.get('/notifyall', function(req, res) {
		res.render(path.resolve(viewdir+'/notifyteam'));
	});
	
	app.post('/sendemail', function(req, res) {
		var name = req.body.name;
		var emailopt = req.body.emailopt;
		var lateTime=req.body.latetime;
		var comment=req.body.comment;
		var name,email;
		//var userPass=ntid.split('/');
		var response;
		/*usermodel.getUser(userPass[0],function(data) {
			if(data.res){
				name=data.response[0].empname;
				email=data.response[0].emailid;*/
				var user= {emailopt:emailopt,lateTime:lateTime,comment:comment,name:name,email:email};
				maintaindata.sendnotification(user,function(notificationdata){
							console.log("sent email data");
							res.render(path.resolve(viewdir+'/info'),{response:notificationdata.response});
						});
			/*}else{
				res.render(path.resolve(viewdir+'/error'),{val:'Unable to found Person with Id:'+userPass[0]});	
			}
		});*/
		
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
	app.get('/dologin', function(req, res) {
		if(req.session.user){
			res.render(path.resolve(viewdir+'/loginSucess'));
		}else{
			res.render(path.resolve(viewdir+'/login'));
		}
	});
	app.get('/addmember', function(req, res) {
		res.render(path.resolve(viewdir+'/register'));
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
	app.post('/register', function(req, res) {
		var email = req.body.email;
		var name = req.body.name;
		var number=req.body.cellno;
		var ntid=req.body.ntid;
		register.register(name,email,number,ntid, function(found) {
			if(found.res){
				res.render(path.resolve(viewdir+'/regSucess'),{val:found});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:found});
			}
		});
	});
	app.post('/changepass', function(req, res) {
		var name = req.body.name;
		var oldPass = req.body.oldpass;
		var newPass = req.body.newpass;
		chgpass.changepass(name, oldPass, newPass, function(found) {
			if(found.res){
				res.render(path.resolve(viewdir+'/passChangeSucess'));
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
		usermodel.getFineowner(function(data) {
			if(data.res){
				req.session.cashier=data.response;
				res.render(path.resolve(viewdir+'/addexpense'));
			}
		});
		
	});
	app.get('/addfine', function(req, res) {
		req.session.emp=decodeURIComponent(req.url.split('?')[1]);
		res.render(path.resolve(viewdir+'/addfine'));
	});
	app.post('/addfinedb', function(req, res) {
		var trandate = req.body.finedate;
		var amount = req.body.amount;
		var name = req.session.emp;
		var reason = req.body.reason;
		var type='fine';
		addspent.addfinetrans(trandate, amount, name,reason,type, function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/transuccess'),{val:data});
			}else{
				console.log(data.response);
				res.render(path.resolve(viewdir+'/error'),{val:data,session: req.session});
			}
		});
	});
	app.post('/addexpense', function(req, res) {
		var trandate = req.body.expenseDate;
		var amount = req.body.amount;
		var expenseTitle = req.body.expenseTitle;
		var reason=req.body.comment;
		var type=req.body.paymentMode;
		addspent.addfinetrans(trandate, amount,expenseTitle,reason,type, function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/transuccess'),{val:data});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});
	});
	app.get('/viewmembers', function(req, res) {
			usermodel.viewUsers(function(data) {
			if(data.res){
				res.render(path.resolve(viewdir+'/userlisting'),{val:data});
			}else{
				res.render(path.resolve(viewdir+'/error'),{val:data});
			}
		});
	});
	app.get('/removemember', function(req, res) {
		res.render(path.resolve(viewdir+'/removeMember'),{val:req.session.user,session: req.session});
	});
	app.get('/removeme', function(req, res) {
		var email=req.url.split('?')[1];
		if(req.session.user&&req.session.user.email==email){
			res.render(path.resolve(viewdir+'/userActionResult'),{val:{'response':'Logged in User cannot be removed.'}});
		}else{
			history.removeme(email, function(found) {
			res.render(path.resolve(viewdir+'/userActionResult'),{val:found});
		});
	}
	});
	app.get('/getUser?', function(req, res) {
		var name=req.url.split('?')[1];
			history.history(decodeURIComponent(name) ,function(data) {
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
	app.get('/fhome', function(req, res) {
		var d=new Date();
		var day=dateFormat(d, "yyyy-mm-dd");
		 maintaindata.totalfine(day ,function(data) {
			 if(data.res){
				 if(data.resp){
					 maintaindata.finesummary(function(summarydata){
						 if(summarydata.res){
							 res.render(path.resolve(viewdir+'/finesummary'),{total:data.data,datalist:summarydata.data}); 
						 }else{
							 res.render(path.resolve(viewdir+'/error'),{val:summarydata});
						 }
					 }) ;
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