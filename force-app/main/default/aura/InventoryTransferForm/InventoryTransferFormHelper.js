({
    fetchInvFormDetails : function(component, event, helper,page) 
    {
        page = page || 1;
        var action = component.get("c.getInvTransferDetails");
        action.setParams({ 
            searchRetailer : component.get("v.selectedRetailer"),
            searchFromCompany : component.get("v.selectedFromCompany"),
            searchToCompany : component.get("v.selectedToCompany"),
            searchContainerNo : component.get("v.selectedContainerNo"),
            searchSealNo : component.get("v.selectedSealNo"),
            searchInvForm : component.get("v.InventoryFormSearch")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var res = response.getReturnValue(); 
                component.set('v.transferFormDetails', res.invTransferFormWrap);
                component.set('v.retailerList',res.getRetailerPicklistValues);
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");   
        });
        
        $A.enqueueAction(action);
    },
    
    getCompanyListBasedOnRetailerSelected: function(component, event, helper) {
        
        var selectedRetailers = component.get('v.selectedRetailer');
      
         var action = component.get("c.fetchRetailerId");
        action.setParams({
            "controllingValue":selectedRetailers
        });
        action.setCallback(this, function(response) {
            component.set("v.listOfCompanies", response.getReturnValue());
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    },
    
      getAllocatToCompanyListBasedOnRetailerSelected: function(component, event, helper) {
        
        var selectedRetailers = component.get('v.selectedRetailer');
        var action = component.get("c.getDependentPicklistValues");
       
        action.setParams({
            "controllingValue":selectedRetailers
        });
        action.setCallback(this, function(response) {
            component.set("v.listOfAllocateToCompanies", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
})