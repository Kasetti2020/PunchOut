({
    updatePOLine1 : function(component, event, helper) 
    {
        //alert('Inside helper updatePOLine POLIVar is :'+JSON.stringify(component.get("v.POLIVar")));
        //var action = component.get("c.updatePOLineQuantity");
        var action = component.get("c.updatePOLine");
        action.setParams({ 
            'POLIObjectString' : JSON.stringify(component.get("v.POLIVar"))
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var response =  response.getReturnValue();
            //alert("state>>>"+ state);
            if (response === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "type" : "success",
                    "message": $A.get("$Label.c.POLI_quantity_has_been_updated_successfully")
                });
                toastEvent.fire();
                /*var spinner = component.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");*/
                    
                component.set('v.IsPOLI',false);
                //alert("Success response>>>"+response);
            }
            else if (response === "Error") {
               alert("Error response>>>"+response);
            }     
        });
        
        $A.enqueueAction(action);
    },
    
})