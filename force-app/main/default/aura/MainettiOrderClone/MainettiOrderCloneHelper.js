({
    updateSelected : function(component,event,selecSO,SOIDArray){
        //alert('updateSelected');
         
        var shipmentHeader = component.get("v.Shipmentheader");
        var updatestatus = component.get("c.Createshipment");
        //alert('Shipmentheader is>>>'+JSON.stringify(component.get("v.Shipmentheader")));
        
        updatestatus.setParams({
            "slctRec": JSON.stringify(selecSO),
            "shipaddress":shipmentHeader,
            "SOIDArray":JSON.stringify(SOIDArray)
            
        });
        updatestatus.setCallback(this,function(response){
            var state = response.getState();
            
            if(state == 'SUCCESS'){
                
                var spinner = component.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    //"message": "The selected PO has been Confirmed successfully, and Sales Order Created sucessfully.",
                    "message": $A.get("$Label.c.Shipment_has_been_successfully_created"),
                    "type":"SUCCESS"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                
            }
            else if (state=="ERROR") {
                
                alert('errors');
                
            }
            
        });
        $A.enqueueAction(updatestatus);
        
    },
    
    
    getSOList : function(component, event, helper,page)
    {
         page = page || 1;        
        var action = component.get("c.GetMainettiOrder");
        action.setParams({ pageNumber : page });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                var MainWrapper = response.getReturnValue();
                 component.set('v.total', MainWrapper.total);
                component.set('v.page', MainWrapper.page);
                component.set('v.pages', Math.ceil(MainWrapper.total/MainWrapper.pageSize));
                component.set("v.SOList",MainWrapper);
               	component.set('v.todate', MainWrapper.Todate);
                component.set("v.Shipmentheader.Shipment_Date__c",component.get('v.todate'));
              
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    }
})