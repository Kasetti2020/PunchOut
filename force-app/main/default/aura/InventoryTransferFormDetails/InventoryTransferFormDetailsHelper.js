({
    fetchInvFormDetails : function(component, event, helper,page) 
    {
        page = page || 1;
        var action = component.get("c.getretailerName");
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var res = response.getReturnValue(); 
                component.set('v.transferFormDetails', res.invTransferFormWrap);
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");   
        });
        
        $A.enqueueAction(action);
    },
    openModal: function(component, event, helper) {
        var modal = component.find("inventoryTransformDetai");
        var modalBackdrop = component.find("inventoryTransformDetaiBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");        
    },
    errorToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error!",
            message: text,
            type: "error",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
})