({
    cloningSO : function(component, event, helper) {
        
        var verifyAction = component.get("c.cartVerification");
        verifyAction.setParams({ 
            customerid : component.get("v.SOrder.SO.Supplier__c")
        });
        verifyAction.setCallback(this, function(verifyresponse) {
            
            var state = verifyresponse.getState();           
            if (state === "SUCCESS") {
                //alert('verifyresponse '+verifyresponse.getReturnValue());
                if(!verifyresponse.getReturnValue()){
                    
                    var action = component.get("c.SOClone");
                    action.setParams({ 
                        recordId : component.get("v.SOrder.SO.Id")
                    });
                    action.setCallback(this, function(response) {
                        
                        var state = response.getState();           
                        if (state === "SUCCESS") {
                            var res = response.getReturnValue();
                            
                            if(res == "All pricebook inactive")
                            {
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title: $A.get("$Label.c.success"),
                                    message: $A.get("$Label.c.This_order_cannot_be_cloned_as_the_pricebook_related_to_this_order_is_now_inacti"),
                                    type: "warning"
                                });
                                toastEvent.fire();
                                return;
                            }
                            else if(res == "Some pricebook inactive")
                            {
                                //firing event to open cart page
                                var StappComponentEvent = component.getEvent("StappComponentEvent");
                                StappComponentEvent.setParams({
                                    "data": {
                                        "RetailerName":component.get("v.SOrder.SO.Retailer_Code1__r.Name"),
                                        "RetailerId": component.get("v.SOrder.SO.Retailer_Code1__c"),
                                        "showremarks": component.get("v.SOrder.SO.Retailer_Code1__r.Remarks__c"),
                                    },
                                    "flag": "openCart"
                                });
                                StappComponentEvent.fire();
                                
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title: $A.get("$Label.c.success"),
                                    message: $A.get("$Label.c.Some_Order_lines_are_not_cloned_as_the_pricebook_related_to_them_is_now_inactive"),
                                    type: "warning"
                                });
                                toastEvent.fire();
                                return;
                            }
                            else
                            {
                                //firing event to open cart page
                                var StappComponentEvent = component.getEvent("StappComponentEvent");
                                StappComponentEvent.setParams({
                                    "data": {
                                        "RetailerName":component.get("v.SOrder.SO.Retailer_Code1__r.Name"),
                                        "RetailerId": component.get("v.SOrder.SO.Retailer_Code1__c"),
                                        "showremarks": component.get("v.SOrder.SO.Retailer_Code1__r.Remarks__c"),
                                    },
                                    "flag": "openCart"
                                });
                                StappComponentEvent.fire();
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title: $A.get("$Label.c.success"),
                                    message: $A.get("$Label.c.Order_cloned_and_added_as_cart"),
                                    type: "success"
                                });
                                toastEvent.fire();
                                return;
                            }
                        }
                        else if (state === "ERROR") {
                            var errors = response.getError();
                            alert(JSON.stringify(errors));
                        }
                        // var spinner = component.find('spinner');
                        //$A.util.toggleClass(spinner, "slds-hide");   
                    });
                    
                    $A.enqueueAction(action);
                }
                else
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Cannot_clone_Sales_Order_with_existing_items_in_cart"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
            }
            else if (state === "ERROR") {
                var errors = verifyresponse.getError();
                alert(errors);
            }
            // var spinner = component.find('spinner');
            //$A.util.toggleClass(spinner, "slds-hide");   
        });
        
        $A.enqueueAction(verifyAction);
    }
})