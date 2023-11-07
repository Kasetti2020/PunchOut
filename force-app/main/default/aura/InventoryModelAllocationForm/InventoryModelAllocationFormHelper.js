({
    getRetailerPickListValuesss : function(component,event,helper) {
        alert(1);        
        var action=component.get("c.getRetailerPicklistValues");
        action.setCallback(this,function (response) {
            var state = response.getState();
            //alert('state:'+state);
            if (state === "SUCCESS") {
                component.set('v.retailerList',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    getCompPickListValues : function(component,event,helper,selectedRetailers01) {        
        var action=component.get("c.getDependentPicklistValues");
        action.setParams({
            "selectedRetailer": selectedRetailers01
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            //alert('state:'+state);
            if (state === "SUCCESS") {
                component.set('v.orderToCompanyList',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
})