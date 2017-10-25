function validateRegister(register) {
	var phoneno =/^[0-9]+$/;
    if (register.name.value == "") {
        alert("Name Must be filled out");
        register.name.focus();
        return false;
    }
    if (register.email.value == "") {
        alert("You Must fill the Email");
        register.email.focus();
        return false;
    }else{
    	var x=register.email.value;
    	 var atpos = x.indexOf("@");
    	    var dotpos = x.lastIndexOf(".");
    	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    	        alert("Not a valid e-mail address");
    	        register.email.focus();
    	        return false;
    	    }
    }
    if (register.password.value == "") {
        alert("Password Must be filled out");
        register.password.focus();
        return false;
    }
    if (register.cellno.value == "") {
        alert("Mobile Number Can't be Empty");
        register.cellno.focus();
        return false;
    }
    if(!register.cellno.value.match(phoneno)){
    	alert("In correct Mobile Numbar!");
    	register.cellno.focus();
        return false;
}
}
function validateAmount(trans){
	if (trans.amount.value == "") {
        alert("You Must fill the Amount");
        trans.amount.focus();
        return false;
    }
	if (trans.email.value == "") {
        alert("You Must fill the Email");
        trans.email.focus();
        return false;
    }else{
    	var x=trans.email.value;
    	 var atpos = x.indexOf("@");
    	    var dotpos = x.lastIndexOf(".");
    	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    	        alert("Not a valid e-mail address");
    	        trans.email.focus();
    	        return false;
    	    }
    }
	if (trans.addedon.value == "") {
        alert("You Must fill the Date");
        trans.amount.focus();
        return false;
    }
}
function validateTrans(trans){
	if (trans.amount.value == "") {
        alert("You Must fill the Amount");
        trans.amount.focus();
        return false;
    }
	if (trans.email.value == "") {
        alert("You Must fill the Email");
        trans.emailid.focus();
        return false;
    }else{
    	var x=trans.email.value;
    	 var atpos = x.indexOf("@");
    	    var dotpos = x.lastIndexOf(".");
    	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    	        alert("Not a valid e-mail address");
    	        trans.email.focus();
    	        return false;
    	    }
    }
	if (trans.spenton.value == "") {
        alert("You Must fill the Date");
        trans.amount.focus();
        return false;
    }
}

function validateLogin(formData){
	if (formData.emailid.value == "") {
        alert("You Must fill the Email");
        formData.emailid.focus();
        return false;
    }else{
    	var x=formData.emailid.value;
    	 var atpos = x.indexOf("@");
    	    var dotpos = x.lastIndexOf(".");
    	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    	        alert("Not a valid e-mail address");
    	        formData.emailid.focus();
    	        return false;
    	    }
    }
	if (formData.password.value == "") {
        alert("You Must fill the Password");
        formData.amount.focus();
        return false;
    }
	
}
function validateFeedback(fromData){
	if (formData.email.value == "") {
        alert("You Must fill the Email");
        formData.email.focus();
        return false;
    }else{
    	var x=formData.email.value;
    	 var atpos = x.indexOf("@");
    	    var dotpos = x.lastIndexOf(".");
    	    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
    	        alert("Not a valid e-mail address");
    	        formData.email.focus();
    	        return false;
    	    }
    }
	if (formData.name.value == "") {
        alert("You Must Enter Your Name");
        formData.name.focus();
        return false;
    }
	if (formData.comment.value == "") {
        alert("Your Feedback missing");
        formData.comment.focus();
        return false;
    }
	
}
