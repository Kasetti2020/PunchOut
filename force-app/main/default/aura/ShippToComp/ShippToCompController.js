({
    DeleteIndividualShipAddress : function(component, event, helper) 
    {
          //alert('Inside DeleteIndividualShipAddress before event fire>>');
            var cmpEvent = component.getEvent("appEvent");
            cmpEvent.setParams({
                "rowIndex" : component.get('v.rowIndex') ,
                "flag" : "DeleteShipAdress"
            });
            
            cmpEvent.fire();
    },
    
	selectDefailtShippingAddress : function(component, event, helper) 
    {
		 if(component.get('v.ShippAddress.Is_Default__c'))
        {
            //alert('Inside child before event fire>>');
            var cmpEvent = component.getEvent("appEvent");
            cmpEvent.setParams({
                "rowIndex" : component.get('v.rowIndex') ,
                "flag" : "CheckDeafultShipAdress"
            });
            
            cmpEvent.fire();
            
        } 
      
	},
    validatingfeilds: function (component,event,helper) 
    {
        //console.log('inside callingchild'+JSON.stringify(component.get("v.ShippAddress")));
        var allValid = component.find('field');
        //alert('inside on click'+allValid);
        
        var allValid = component.find('field').reduce(
            function (validSoFar, inputCmp) 
            {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && inputCmp.get('v.validity').valid;
                //return validSoFar && inputCmp.get('v.validity').valueMissing;
            }, 
            true);  
        if (!allValid) 
        { 
            //alert('in shipto if1>>'+component.get('v.shiptovalidationflag'));
             component.set('v.shiptovalidationflag',true);
             //alert('in shipto if2>>'+component.get('v.shiptovalidationflag'));
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
            //alert('in shipto else>>'+component.get('v.shiptovalidationflag'));
            component.set('v.shiptovalidationflag',false); 
        }
        //console.log('ShippAddress in end '+JSON.stringify(component.get("v.ShippAddress")));
        //@todo call server action to save data.
    }
    
   
})