({
	handelcancelLine : function(component, event, helper){
        //alert('orderquest>>'+JSON.stringify(component.get("v.ReviseOrderLineList")));
        var ordertocompany = component.get("v.ReviseOrderRequest.revSO.Company__c");
		var SoliId = component.get("v.ROrder.Mainetti_SOLI__c");
        var actioncancel = component.get("c.CancelRevLine");
        actioncancel.setParams({ 
            "SoliId":SoliId
        });
        actioncancel.setCallback(this, function(response){
            var state = response.getState();
            try{
                if (state === "SUCCESS") 
                {
                   var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: $A.get("$Label.c.Revise_order_Lineitem_is_Cancelled_successfully"),
                        type: "success"
                    });
                    toastEvent.fire();
                }
            }
            catch(err) 
            {
                var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.failure"),
                        message: $A.get("$Label.c.Revise_order_Lineitem_is_not_Cancelled"),
                        type: "failure"
                    });
                    toastEvent.fire();
            }
        })
        $A.enqueueAction(actioncancel);
	}
})