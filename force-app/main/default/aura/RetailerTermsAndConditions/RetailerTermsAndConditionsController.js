({
	
    
    doInit : function(cmp, event, helper)
    {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
      
        //alert('LoggedInUser userId>>>'+userId);
        if(userId)
        {
            
             helper.getUserDetails(cmp,event, helper,userId);
        }else
        {
             
            //alert('No Logged In User founds');
        }
      

    },
    
    Proceed : function(component, event, helper) {
        
        //alert('USer Object>>'+JSON.stringify(component.get("v.LoggedInUser")));      
        if(component.get('v.LoggedInUser.Accepted_Terms_And_Conditions__c'))
        {
            component.set("v.termsSection", false); 
            helper.updateUser(component,event, helper);
           
            
        }
        else 
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Accept_terms_and_conditions")
            });
            toastEvent.fire();
            return;
        }
        
    },
    
    CloseModal : function(component, event, helper) {
      
        var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Accept_terms_and_conditions_to_access_the_Retailer_community_portal	")
            });
            toastEvent.fire();
            return;
        
    },
    
    
})