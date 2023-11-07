({
    doinit : function(component, event, helper) 
    {
        var rowIndex = component.get("v.rowIndex");
        // alert('rowIndex :'+rowIndex);
        var SOrder = component.get("v.SOrder");
        //alert('SOrder length :'+SOrder.reuseOrd);
        component.set("v.isViewReviseReqAllowed",true);
        component.set("v.canRevise",false);
        
    },
    
    toggle: function(component, event, helper) {
        var chevronright = component.find('chevronright');
        var chevrondown = component.find('chevrondown');
        
        $A.util.toggleClass(chevronright, 'slds-hide');
        $A.util.toggleClass(chevrondown, 'slds-hide');
        var getAttributeValue = component.get("v.checkThis");
        if(getAttributeValue==true){
            component.set("v.checkThis", false);
            component.set('v.expanded',true);
        }
        else{
            component.set("v.checkThis", true);
            component.set('v.expanded',false);
        }
        
    },
    
    deletebox : function(component, event) {
        var parentId = event.getSource().get("v.name");
        component.set("v.retailertodelete", parentId);
        component.set("v.showConfirmDialog", true); 
    },
    
    
    onChange : function(component, event, helper) {
        var selectedRetailer = event.getSource().get("v.name");
        // alert('selectedRetailer :'+selectedRetailer);
        var identityRequest     = component.get('v.pro.Status__c');
        // alert('identityRequest :'+identityRequest);
        var action = component.get("c.statusUpdate");
        action.setParams({name:selectedRetailer.Retailer_code_Name__c,
                          status:selectedRetailer.Active__c});
        action.setCallback(this, function(response) {
        });
        $A.enqueueAction(action);
    },
    
    editComp : function(component, event, helper) {
        var parentObjId = event.getSource().get("v.name");
        var retailerdetail = event.getSource().get("v.title");
        //alert('parentObjId:'+parentObjId);
        //alert('retailerdetail:'+retailerdetail);
        
        var cmpEvent = component.getEvent("CompanyAllocationPageListEvent");
        cmpEvent.setParams({
            "parentId" : parentObjId,
            "retailerDetails" : retailerdetail
        });
        cmpEvent.fire();
    },
    handleConfirmDialogYes : function(component, event, helper) {
        console.log('Yes');
        helper.deleteRetailer(component,event,helper);
        
        component.set('v.showConfirmDialog', false);
        
    },
    
    
    handleConfirmDialogNo : function(component, event, helper) {
        console.log('No');
        component.set("v.retailertodelete" ,'');
        component.set('v.showConfirmDialog', false);
    },
})