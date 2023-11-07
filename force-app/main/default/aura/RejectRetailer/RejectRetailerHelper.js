({
	SendRetailerDataID : function(component, event, helper) {
	var action = component.get("c.RejectRetailerData");
        var myArray = [ ];
        action.setParams({  
            RetailerDataRecordId : component.get('v.recordId') 
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (component.isValid() && state == 'SUCCESS') 
            {   
             
                //alert('Result>>>'+response.getReturnValue());
                component.set('v.message',response.getReturnValue());
                
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
        
	},
})