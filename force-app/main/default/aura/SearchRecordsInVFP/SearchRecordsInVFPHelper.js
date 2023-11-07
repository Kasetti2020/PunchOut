({
    
    searchHelper : function(component,event,getInputkeyWord) {
        
        var customerWarehouseId = component.get("v.cartonDetRecordId");
        //alert('customerWarehouseId ::'+customerWarehouseId);
        var cartonDetCustomerWarehouseId = component.get("v.cartondetailsCustomerId");
        // alert('cartonDetCustomerWarehouseId ::'+cartonDetCustomerWarehouseId);
        // alert('getInputkeyWord:'+getInputkeyWord);
        
        // call the apex class method 
        var action = component.get("c.getCustomerWarehouseORstoreId");
        // alert('action:'+action);
        action.setParams({
            'enteredValue': getInputkeyWord,
            'cartonDetCustomerWarehouseId' :cartonDetCustomerWarehouseId
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            // $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            // alert('state ::'+state);
            if (state === "SUCCESS") {                
                var storeResponse = response.getReturnValue();
                // alert('storeResponse :'+storeResponse);
             
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", ' ');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
                component.set('v.variable1',true);
            }
            else if (state === "ERROR") {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
            
        });
        $A.enqueueAction(action);        
    },
    
    
})