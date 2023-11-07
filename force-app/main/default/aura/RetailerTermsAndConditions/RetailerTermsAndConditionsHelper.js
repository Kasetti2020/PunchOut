({
	 getUserDetails : function (cmp,event, helper,userId)
    {
        var action = cmp.get("c.getLoggedInUserDetails");
        action.setParams({
            'LoggedInUserId' : userId
            
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            //alert('state>>'+state);
            //alert('response.getReturnValue()>>'+response.getReturnValue());
           
            
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue();
                cmp.set("v.LoggedInUser",StoreResponse);
                if(cmp.get("v.LoggedInUser.Accepted_Terms_And_Conditions__c"))
                {
                      cmp.set("v.termsSection",false);
                }
                //alert('Inside getUserDetails LoggedInUserr>>>>>'+JSON.stringify(cmp.get("v.LoggedInUser")));
 
            } else {
                alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
        
    },
    
    updateUser : function (cmp,event, helper)
    {
        var action = cmp.get("c.updateLoggedInUserDetails");
        action.setParams({
            'LoggedInUserObject' : cmp.get("v.LoggedInUser")
            
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            //alert('state>>'+state);
            //alert('response.getReturnValue()>>'+response.getReturnValue());
           
            
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue();
                cmp.set("v.LoggedInUser",StoreResponse);
                cmp.set("v.termsSection",false);
                //alert('termsSection>>>'+cmp.get("v.termsSection"));
                //alert('Inside updateLoggedInUserDetails LoggedInUserr>>>>>'+JSON.stringify(cmp.get("v.LoggedInUser")));
 
            } else {
                alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
        
    },
    
})