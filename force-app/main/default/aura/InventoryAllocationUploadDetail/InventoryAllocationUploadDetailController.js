({        
    // function to get the error details of Inventory_Transaction_Stage__c.    
    viewError : function(component, event, helper) {  
        var params = event.getParam('arguments');
        component.set("v.flag",true);
        component.set("v.noRows",false);
        if (params) {
            var batchId = params.batchId;
            // add your code here
            var actionError=component.get("c.getErrorData");
            actionError.setParams({
                batchid: batchId
            }); 
        }             
        
        actionError.setCallback(this,function (responseErr) {
            var state = responseErr.getState();
            if (state === "SUCCESS") {
                var res=responseErr.getReturnValue();
                component.set("v.errordata", res);
                if(res==''){
                    component.set("v.noRows",true);
                }
            } else if (state === "ERROR") {
                var errors = responseErr.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(actionError);        
    }
})