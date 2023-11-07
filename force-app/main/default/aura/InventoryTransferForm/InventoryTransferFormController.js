({
	doint : function(component, event, helper,page){
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide"); 
        var transferformid = event.getParam("inventoryTransferFormId"); 
        component.set("v.GetInventoryTransferFormId", transferformid );
       var settransferformid = component.get("v.GetInventoryTransferFormId" ); 
        helper.fetchInvFormDetails(component, event, helper,page);
    },
    
    retailerOnChange : function(component, event, helper) {
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");
        helper.getCompanyListBasedOnRetailerSelected(component , event, helper);
         helper.getAllocatToCompanyListBasedOnRetailerSelected(component , event, helper);
    },
    
    onSearch : function(component, event, helper,page) {
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");        
        helper.fetchInvFormDetails(component, event, helper,page);
    }
})