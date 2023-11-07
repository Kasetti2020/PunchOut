({
	/*fetchValidationFailSummaryOnErrorType : function(component, event, helper, errorType) {
        
        //alert('errorType:'+errorType);
        var rowNo = component.get('v.rowIndex');
        var batchNo = component.get('v.batchNo');
        //alert("batchNo:"+batchNo);
        //batchNo = '201022-7158';
        
        var action = component.get("c.getValidationFailSummaryOnErrorType");
        action.setParams({
            "batchNo": batchNo,
            "errorType": errorType
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                var cmpEvent = component.getEvent("salesValidationSummaryEvent");
                cmpEvent.setParams({
                    "rowNo" : rowNo,
                    "errorCodeDetailList" : res
                });
                cmpEvent.fire();
                //component.set('v.accordianHeader', res);
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
    },*/
})