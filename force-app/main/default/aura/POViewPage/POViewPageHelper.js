({
    getPOList : function(comp, event, helper,page) 
    {
        page = page || 1;
        var action = comp.get("c.POListView");
        action.setParams({ pageNumber : page,
                          searchtext:comp.get("v.searchText")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var accs = response.getReturnValue();
                comp.set('v.total', accs.total);
                comp.set('v.page', accs.page);
                comp.set('v.pages', Math.ceil(accs.total/accs.pageSize));
                comp.set("v.POList",accs);
                comp.set("v.customerInfoId",accs.customerInfoId);
                //console.log('Original POList>>>>'+JSON.stringify(accs));
              	//console.log("is selected ?"+ JSON.stringify(accs.POLIList.POwrap[0].PO_Selected__c));
                
                var spinner = comp.find("spinner");
				$A.util.addClass(spinner, "slds-hide");
            }
            else if (state === "INCOMPLETE") {
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
    },
    updateSelected : function(component,event,selecPO){
        var selladress = component.get("v.supadd");
       var updatestatus = component.get("c.updatestatus");
        updatestatus.setParams({
            "slctRec": JSON.stringify(selecPO),
            "shipaddress":selladress
        });
        updatestatus.setCallback(this,function(response){
            var state = response.getState();

            if(state == 'SUCCESS'){
               
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.The_selected_PO_have_been_successfully_confirmed"),
                    "type":"SUCCESS"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                
            }
            else if (state=="ERROR") {
                alert('ERROR');
            }
            
        });
        $A.enqueueAction(updatestatus);
      
    },
    updateQuantity : function(component,event,selecPO){
        
       var updatestatus = component.get("c.updateAndValidatePOLIQty");
        updatestatus.setParams({
            "slctPORec": JSON.stringify(selecPO)
        });
        updatestatus.setCallback(this,function(response){
            var state = response.getState();

            if(state == 'SUCCESS'){
               
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.The_selected_PO_have_been_successfully_confirmed"),
                    "type":"SUCCESS"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                
            }
            else if (state=="ERROR") {
                alert('ERROR');
            }
            
        });
        $A.enqueueAction(updatestatus);
      
    },
    
    updatePOLIqty : function(component, event,helper,POLIQtyMap) 
    {
        var action = component.get("c.updatePOLineQTY");
        action.setParams({ 
            "POLIQtyString": POLIQtyMap,
        });
        action.setCallback(this, function(response)
                           {
                               var state = response.getState();
                               if (state === "SUCCESS") 
                               {
                                   var res = response.getReturnValue();
                                   
                               }
                               else if (state === "ERROR") 
                               {
                                   alert('Error : ' + JSON.stringify(response.getError()));
                               } 
                           });
        $A.enqueueAction(action);
    },
    updatePOLI : function(component, event,helper,POLIRecList,retailerId)
    {
        
        var action = component.get('c.updateconfimedPOLine');
        action.setParams({ 
            "POLIObjectString": JSON.stringify(POLIRecList),
            "retailerCodeId": retailerId,
        });
        action.setCallback(this, function(response)
                           {
                               var state = response.getState();
                               
                               if (state === "SUCCESS") 
                               {
                                   var res = response.getReturnValue();
                                   if(res.includes("Box Quantity Required"))
                                   {
                                       component.set('v.isBoxValidationRqd',true);
                                   }
                                   else
                                   {
                                       component.set('v.openChoicePopup',true);
                                       //component.set('v.shipadd',true);
                                   }
                               }
                               else if (state === "ERROR") 
                               {
                                   alert('Error : ' + JSON.stringify(response.getError()));
                               } 
                           });
        $A.enqueueAction(action);
    },
    cancelPOnPOLIChanges : function(component, event,helper) 
    {
        var selecPO = component.get("v.SelecPOList");

            var action = component.get("c.revertPOChanges");
            action.setParams({ 
                "slctRec": JSON.stringify(selecPO),
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                
                if (state === "SUCCESS") 
                {
                    //alert("Successfully updated");
                }
                else if (state === "ERROR") 
                {
                    alert('Error : ' + JSON.stringify(response.getError()));
                }
            });
            $A.enqueueAction(action);
        
    },
    getCartInfo : function(component, event, helper)
    {	
        var action = component.get("c.checkedPO");
        //action.setParams({ SelectedId : component.get("v.StorePOListIds")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var accs = response.getReturnValue();
                console.log('ACCS>>>>'+JSON.stringify(accs));
                component.set("v.DisableViewPO",accs.isCartNOTAvailable);
                component.set("v.CartCount",accs.cartSize);
        
            }
            else if (state === "INCOMPLETE") {
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