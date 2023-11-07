({
    getLoginUserInformation : function(component, event, helper) {        
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        var action = component.get("c.getUserInformation");          
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();
                component.set("v.profileName",stringItems);                          
            }            
        });     
        $A.enqueueAction(action);
    },
    editRecordpage : function(component, event, helper) {
        // alert('Inside Edit Page');
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId":  component.get("v.recordId")
        });
        editRecordEvent.fire();
        var showEditMode = true; 
         
        return showEditMode;
    },
    
       NavigationRec : function(component, event, helper) {
        //alert('NavigationRec ::');
        component.find("navId").navigate({
            type: 'standard__recordPage',
            attributes: {
                recordId :  component.get("v.recordId"), // record id from given objectApiName
                actionName: 'view',  //Valid values include clone, edit, and view.
                objectApiName: 'Carton_Details__c' //The API name of the record’s object
            }}, true);
    },
    
    
   
    
    updateCartonStatusAutomation : function(component, event, helper) {
        var recordId = component.get("v.recordId");
       // alert('Inside Helper updateCartonStatusAutomation');
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        var action = component.get("c.CartonStatusAutomation");
        action.setParams({
            "recId" :recordId            
        });    
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue(); 
               // alert('stringItems:'+stringItems);
                component.set("v.cartonDetails", stringItems);
                /* var customProfileName = $A.get("$Label.c.RTS_Store_user_Profile_Name");
                if(!$A.util.isUndefinedOrNull(stringItems.Store_User__c) && customProfileName === userProfileName){
                    window.location.reload();  
                } */
                                          
            }
            if (state === "ERROR") {            
                helper.showToast(component, event,"Error","Error!",'Carton Information Not Updated,Please contact Warehouse.');
            }
        });     
        $A.enqueueAction(action);
        //$A.get('e.force:refreshView').fire();
    },
    
	showToast : function(component, event,Type,title,message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": Type,
            "title": title,
            "message": message
        });
        toastEvent.fire();
    },
})