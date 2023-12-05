({
	

     ConfirmOrder : function(component,event,helper)
    {
       var myParamValue='a2jHz0000006jahIAA';
         var  vfPageUrl = '/apex/PunchOutPage';
              var param1=myParamValue;
              const urlWithParams = `${vfPageUrl}?param1=${param1}`;
              window.location.href = urlWithParams;
    }
})