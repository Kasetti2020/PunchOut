({
    getStoreId: function(component, event, helper){
        var id=component.get("v.storeId");
        var action = component.get("c.getStoreIdData");
        action.setParams({ idval :id });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.storeIdData",response.getReturnValue())
                component.set("v.spinner",false);
                component.set("v.componentVisibility", true);
            }
            else if (state === "INCOMPLETE") {
                helper.showError(component, event, helper, 'Scan valid QR Code');
                component.set("v.spinner",false);
            }
            else if (state === "ERROR") {
                helper.showError(component, event, helper, 'Scan valid QR Code');
                component.set("v.spinner",false);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    decode: function(component, event, helper, scan){
        var action = component.get("c.decoding");
       action.setParams({ scan :scan });
       action.setCallback(this, function(response) {
           var state = response.getState();
           if (state === "SUCCESS") {
               var id = response.getReturnValue(); 
               component.set("v.storeId",id); 
               helper.getStoreId(component,event,helper);
            
           }
           else if (state === "INCOMPLETE") {
               helper.showError(component, event, helper, 'Something went wrong ! Please try again');
               component.set("v.spinner",false);
           }
           else if (state === "ERROR") {
               helper.showError(component, event, helper, 'Something went wrong ! Please try again');
               component.set("v.spinner",false);
               var errors = response.getError();
               if (errors) {
                   if (errors[0] && errors[0].message) {
                       console.log("Error message: " + errors[0].message);
                   }
               } else {
                   console.log("Unknown error");
               }
           }
       });
       $A.enqueueAction(action);
    },
    showError : function(component, event, helper, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Error',
            message:message,
            duration:' 5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    showSuccess : function(component, event, helper, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Success',
            message:message,
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
})