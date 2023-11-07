({
    DeleteIndividualBuyerToAddress : function(component, event, helper) 
    {
          //alert('Inside DeleteIndividualBuyerToAddress before event fire>>');
            var cmpEvent = component.getEvent("appEvent");
        	//alert('cmpEvent>>>'+cmpEvent);
            cmpEvent.setParams({
                "rowIndex" : component.get('v.rowIndex') ,
                "flag" : "DeleteBuyerToAdress"
            });
           
            cmpEvent.fire();
        	
    },
    
	selectDefailtBuyerToAddress : function(component, event, helper) 
    {
		 if(component.get('v.BuyerToAddress.Is_Default__c'))
        {
            //alert('Inside child before event fire>>');
            var cmpEvent = component.getEvent("appEvent");
            cmpEvent.setParams({
                "rowIndex" : component.get('v.rowIndex') ,
                "flag" : "CheckDeafultBuyerToAdress"
            });
            
            cmpEvent.fire();
            
        } 
      
	},
    validatingfeilds: function (component,event,helper) 
    {
        //alert('inside callingchild');
        var allValid1 = component.find('field');
        //alert('inside on click'+allValid1);
        
        var allValid = component.find('field').reduce(
            function (validSoFar, inputCmp) 
            {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && inputCmp.get('v.validity').valid;
            }, 
            true);        
        if (!allValid) 
        { 
            //alert('allValid');
             component.set('v.buyertovalidationflag',true);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Please_fill_all_the_required_fields")
            });
            toastEvent.fire();
            return; //something is invalid so user will see the meaningful error message on the respected field.
        }
        else
        {
            component.set('v.buyertovalidationflag',false); 
        }
        //@todo call server action to save data.
    }
    
   
})