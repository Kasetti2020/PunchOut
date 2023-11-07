({
	checkCartonStatus : function(component, event, helper) {
        helper.getLoginUserInformation(component, event, helper);
		var recordId = component.get("v.recordId");
       var userId = $A.get("$SObjectType.CurrentUser.Id");
        var action = component.get("c.getcartonRecordData");
        action.setParams({
            "recId" :recordId            
        });    
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue(); 
                var AsiaCartonsStoreProfile = $A.get("$Label.c.RTS_Store_user_Profile_Name");     
                var EuropeCartonsStoreProfile = $A.get("$Label.c.UK_RTS_Store_user");               
                var ukcartoninternalUserProfile = $A.get("$Label.c.UK_RTS_Mainetti_Internal_Re_Active_User");
                
                var userProfileName = component.get("v.profileName");
                // console.log('----userProfileName-->'+userProfileName);
                 //console.log('----AsiaCartonsStoreProfile-->'+AsiaCartonsStoreProfile);
                 //console.log('----EuropeCartonsStoreProfile-->'+EuropeCartonsStoreProfile);
                 //console.log('----Store_User__c-->'+stringItems.Store_User__c);
               // console.log('----Status__c-->'+stringItems.Status__c);
                if($A.util.isUndefinedOrNull(stringItems.Store_User__c) && (AsiaCartonsStoreProfile === userProfileName || EuropeCartonsStoreProfile === userProfileName)){
                    helper.showToast(component, event,"Warning","Warning!",'Please select Store ID!');                  
                    if((stringItems.Status__c === 'Customer Warehouse' &&  AsiaCartonsStoreProfile === userProfileName ) || (stringItems.Status__c === 'Active' &&  EuropeCartonsStoreProfile === userProfileName )){
                    	  component.set("v.ShowEditForm",true);
                        //helper.NavigationRec(component, event, helper);                       
                    }else{
                        helper.updateCartonStatusAutomation(component, event, helper); 
                    }
                }else{ 
                   // alert('hi'+userProfileName+'<------>'+ukcartoninternalUserProfile);
                    if(userProfileName === ukcartoninternalUserProfile && $A.util.isUndefinedOrNull(stringItems.Filled_Box_Weight__c)){
                         //component.set("v.ShowEditForm",true);
                       // helper.editRecordpage(component, event, helper); 
                    }else{
                        helper.updateCartonStatusAutomation(component, event, helper); 
                    }
                   
                }
            }           
        });     
        $A.enqueueAction(action);
        
	},
     handleSuccess : function(component,event,helper) {
         component.set("v.ShowEditForm",false);
         $A.get('e.force:refreshView').fire();
          helper.showToast(component, event,"Success","Success!",'Store Id Updated');
     }
  
})