({
	SendVariableUploadId : function(component, event, helper) {
     var spinner = component.find("spinner");
    //alert('RecordId>>'+component.get("v.recordId"));    
	var action = component.get("c.ConvertToPO");
        action.setParams({  
            VariableUploadIdRecordId : component.get('v.recordId') 
        });
        action.setCallback(this, function(response) {
            //alert('Test'+JSON.stringify(response.getReturnValue()));
            //alert('errorMessage'+response.getReturnValue().errorMessage);
            var state =  response.getState();
            //alert(state);
           // alert(component.get("v.CloseCurrentWindow"));
            if(component.get("v.CloseCurrentWindow"))
            {
                //alert('Inside from Classic flow true>>>');
                component.set("v.Next",false);
                if(response.getReturnValue().Status == 'Error')
                {    
                    
                    component.set('v.message',response.getReturnValue().errorMessage);
                }
                if(response.getReturnValue().Status == 'PartialError')
                {    
                   
                    component.set('v.message',response.getReturnValue().errorMessage);
                }
                if(response.getReturnValue().Status == 'OK')
                {    
                    $A.util.toggleClass(spinner, "slds-hide");
                    component.set('v.CloseCurrentWindow',false);
                    component.set('v.Next',true);
                    component.set('v.message',response.getReturnValue().errorMessage);
                }
                
            }
            else
            {
                if(response.getReturnValue().Status == 'Error')
                {    
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "error",
                        "title": $A.get("$Label.c.Error"),
                        "message": response.getReturnValue().errorMessage
                    });
                    toastEvent.fire();
                    $A.util.toggleClass(spinner, "slds-hide");
                    $A.get("e.force:closeQuickAction").fire();
                    return;
                    //component.set('v.message',response.getReturnValue().errorMessage);
                }
                if(response.getReturnValue().Status == 'PartialError')
                {    
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "warning",
                        "title": $A.get("$Label.c.Warning"),
                        "message": response.getReturnValue().errorMessage
                    });
                    toastEvent.fire();
                    $A.util.toggleClass(spinner, "slds-hide");
                    $A.get("e.force:closeQuickAction").fire();
                    return;
                    //component.set('v.message',response.getReturnValue().errorMessage);
                }
                if(response.getReturnValue().Status == 'OK')
                {    
                    $A.util.toggleClass(spinner, "slds-hide");
                    component.set('v.CloseCurrentWindow',false);
                    component.set('v.Next',true);
                    /*var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "success",
                        "title": "SUCCESS!",
                        "message": 'Successfully Converted to PO'
                    });
                    toastEvent.fire();*/
                }
                
            }
            

            
        });
        $A.enqueueAction(action); 
        
	},
})