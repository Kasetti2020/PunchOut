({
    successToast: function(component,event,helper,text){        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Success!",
            message: text,
            type: "success",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
    deleteRetailer : function(component,event,helper) {
       var parentId = component.get("v.retailertodelete");
        // component.set("v.showConfirmDialog", true);
         //alert('parentId:'+parentId);
        console.log('in delete account helper method.');
        var action = component.get("c.deleleretailer");
        action.setParams({retailerName:parentId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: "Success",
                    message: "Retailer Deleted successfully.",
                    type: "success"
                });
                toastEvent.fire();
            }
            $A.get('e.force:refreshView').fire();
        });
        $A.enqueueAction(action);
    },
})