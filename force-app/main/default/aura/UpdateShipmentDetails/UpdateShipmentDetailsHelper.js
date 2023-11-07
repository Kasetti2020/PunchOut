({
	SendShipmentID : function(component, event, helper) {
	var action = component.get("c.GetSalesOrderLineItems");
        action.setParams({  
            SoID : component.get('v.recordId') 
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            //var array1 = [];
            //alert('state>>>'+state);
            if (component.isValid() && state == 'SUCCESS') 
            {   
                component.set('v.SOList',response.getReturnValue());
               /*var spinner = component.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");*/
                
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
       
	},
    
     updateSelected : function(component,event,selecSO){
        
        //alert('Inside helper updateSelected');
        //alert('Inside helper updateSelected SOID>>'+component.get('v.recordId'));
        //alert('Inside helper updateSelected Shipmentheader>>'+JSON.stringify(component.get("v.Shipmentheader")));
        var updatestatus = component.get("c.Createshipment");
        updatestatus.setParams({
            "slctRec": JSON.stringify(selecSO),
            "shipaddress": component.get("v.Shipmentheader"),
             "SoID" : component.get('v.recordId') 
          
        });
        updatestatus.setCallback(this,function(response){
            var state = response.getState();
            
            if(state == 'SUCCESS'){
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    //"message": "The selected PO has been Confirmed successfully, and Sales Order Created sucessfully.",
                    "message": "Shipment details are updated successfully",
                    "type":"SUCCESS"
                });
                toastEvent.fire();
               // $A.get('e.force:refreshView').fire();
                $A.get("e.force:closeQuickAction").fire();
                
            }
            else if (state=="ERROR") {
                
                alert('errors');
                
            }
            
        });
        $A.enqueueAction(updatestatus);
        
    },
    fetchpicklist : function(component, event, helper) 
    {  
    	var pickvar = component.get("c.getshipmentPickListValues");
        pickvar.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                //alert('sucess');
                var list = response.getReturnValue();
                component.set("v.picvalue", list);
            }
            else if(state === 'ERROR'){
                //var list = response.getReturnValue();
                //component.set("v.picvalue", list);
                alert('ERROR OCCURED.');
            }
        })
        $A.enqueueAction(pickvar);
    } 
})