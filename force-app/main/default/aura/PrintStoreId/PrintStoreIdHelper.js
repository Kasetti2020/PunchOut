({
	generatePDF : function(component, event, helper,id) {
       var selectedStore = component.get("v.selectedStore");
       var domain = window.location.origin;
       window.location.replace(domain+'/lightning/o/Carton_Details__c/list?filterName=Recent');
        //apex encoding
       var action = component.get("c.encoding");
       action.setParams({ idval :selectedStore.Id });
       action.setCallback(this, function(response) {
           var state = response.getState();
           if (state === "SUCCESS") {
               var scan = response.getReturnValue();
                window.open('/apex/PrintStoreIdPDFVF?Id=' + selectedStore.Id+'&encode='+scan);
           }
           else if (state === "INCOMPLETE") {
               helper.showError(component, event, helper, 'Invalid QR code Scan again');
           }
           else if (state === "ERROR") {
               helper.showError(component, event, helper, 'Invalid QR code Scan again');
               var errors = response.getError();
               if (errors) {
                   if (errors[0] && errors[0].message) {
                       console.log("Error message: " + errors[0].message);
                   }
               } else {
                   console.log("Unknown error");
               }
           }
       });
       $A.enqueueAction(action);
	},
     openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
   },
    loadStoreIds : function(component,event,getInputkeyWord) {
        var retailer = component.get("v.selectedRetailer");
        var action = component.get("c.getStore");
        action.setParams({
            'enteredValue': getInputkeyWord ,
            'retailer' : retailer.Id,
        });
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {                
                var storeResponse = response.getReturnValue();
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                component.set("v.listOfUserSearchRecords", storeResponse);
            }
        });
        $A.enqueueAction(action);        
    },
    loadRetailerIds : function(component,event,helper,getInputkeyWord) {
        var action = component.get("c.getRetailer");
        action.setParams({
            'enteredValue': getInputkeyWord ,
        });
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {                
                var retailerResponse = response.getReturnValue();
                if (retailerResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                component.set("v.listOfRetailerRecords", retailerResponse);
            }
        });
        $A.enqueueAction(action);        
    },
    showError : function(component, event, helper, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Error',
            message:message,
            duration:' 5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },
})