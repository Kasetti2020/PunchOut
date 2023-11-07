({
    loadJquery : function(component, event, helper) {
        jQuery(document).ready(function(){
            //alert('Inside loadJquery in Bill TO Comp');  
            
            
        });
    },
        
    doAction : function(cmp, event)
    {
       // alert('Inside doAction of billtoComp>>>');
        var params = event.getParam('arguments');
        if (params) {
            var param1 = params.param1;
            //alert('param1>>'+param1);
            //alert('param2>>'+params.param2);
            //alert('cmp.get(v.rowIndex)>>'+cmp.get('v.rowIndex'));
            if(cmp.get('v.rowIndex') == params.param2)
            {
                cmp.set("v.errorMessage",'PostCode is Empty');
            }
            
        }
    },
    
    
    DeleteIndividualBillAddress : function(component, event, helper) 
    {
        //alert('Inside DeleteIndividualBillAddress before event fire>>');
        var cmpEvent = component.getEvent("appEvent");
        cmpEvent.setParams({
            "rowIndex" : component.get('v.rowIndex') ,
            "flag" : "DeleteBillAdress"
        });
        
        cmpEvent.fire();
        
    },
    
    selectDefailtBillingAddress: function(component, event, helper) 
    {
        if(component.get('v.billAddress.Is_Default__c'))
        {
            //alert('Inside child before event fire>>');
            var cmpEvent = component.getEvent("appEvent");
            cmpEvent.setParams({
                "rowIndex" : component.get('v.rowIndex') ,
                "flag" : "CheckDeafultBillAdress"
            });
            
            cmpEvent.fire();
            
        } 
        
    },
    
    validateEmail : function(component, event, helper) 
    {
        //alert('inside validateEmail>>>>'+component.get('v.billAddress'));
        
        var  EmailFlag  = helper.validateEmail(component.get("v.billAddress.Email_Address__c"));
        //alert('EmailFlag>>>'+EmailFlag);
        if(!EmailFlag )
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_Valid_email_adress")
            });
            toastEvent.fire();
            return;
            
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
            console.log('in billto if1>>'+component.get('v.billtovalidationflag'));
             component.set('v.billtovalidationflag',true);
            //alert('in billto if1>>'+component.get('v.billtovalidationflag'));
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
            component.set('v.billtovalidationflag',false); 
        }
        //@todo call server action to save data.
    }
    
})