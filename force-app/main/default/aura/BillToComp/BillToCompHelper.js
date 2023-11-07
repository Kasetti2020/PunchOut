({
	validateEmail : function(elementValue)
    {    
       //alert('Inside Helpers validateEmail>>>>'+elementValue);
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
       // var controllerValueKey = eval(elementValue );
        //alert(emailPattern.test(elementValue));
        return emailPattern.test(controllerValueKey); 
    }, 
})