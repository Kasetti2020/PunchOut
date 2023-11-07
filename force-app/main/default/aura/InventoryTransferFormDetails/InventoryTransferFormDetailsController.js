({
    childInit : function(component, event, helper) {
        console.log('childInit');
        var expParentObjId = component.get("v.InventoryTransferForms");
        var parentObjId = component.get("v.setParentObjId");
        console.log('InventoryTransferForms::'+expParentObjId+'setParentObjId::'+parentObjId);
        if((expParentObjId != null && parentObjId != null) && (expParentObjId == parentObjId))
        {
            var chevronright = component.find('chevronright'+expParentObjId);
            var chevrondown = component.find('chevrondown'+expParentObjId);            
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
        }
        
        
    },
    
    toggle: function(component, event, helper) {
        var parentObjId = event.target.id;        
        var chevronright = component.find('chevronright'+parentObjId);
        var chevrondown = component.find('chevrondown'+parentObjId);
        
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
    editComp : function(component, event, helper) {
        var parentObjId = event.getSource().get("v.name");
        var recordIdset= component.set("v.recordId",parentObjId.Id);
        var recordIdget = component.get("v.recordId");
        var ContainerNoSet= component.set("v.ContainerNo",parentObjId.Container_No__c);
        var ContainerNoGet = component.get("v.ContainerNo");
        var SealNoSet= component.set("v.SealNo",parentObjId.Seal_No__c);
        var SealNoGet = component.get("v.SealNo");
        var ShortNoSet= component.set("v.ShortNo",parentObjId.Short_No__c);
        var ShortNoGet = component.get("v.ShortNo");
        var DispatchDateSet= component.set("v.DispatchDate",parentObjId.ETD__c);
        var DispatchDateGet = component.get("v.DispatchDate");
        var ArrivalDateSet= component.set("v.ArrivalDate",parentObjId.ETA__c);
        var ArrivalDateGet = component.get("v.ArrivalDate");
        var InventoryTransferFormsSet= component.set("v.InventoryTransferForms",parentObjId.Inventory_Transfer_Form__c);
        var InventoryTransferFormsGet = component.get("v.InventoryTransferForms");      
        helper.openModal(component,helper);
    },
    closeModal: function(component, event, helper) {
        var modal = component.find("inventoryTransformDetai");
        var modalBackdrop = component.find("inventoryTransformDetaiBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    Save : function(component, event, helper) {
        var recordId = event.getSource().get("v.name");
        var ContainerNo = component.find("ContainerNo").get("v.value");
        var SealNo = component.find("SealNo").get("v.value");       
        var ShortNo = component.find("ShortNo").get("v.value");
        var ETD = component.find("ETD").get("v.value");
        var ETA = component.find("ETA").get("v.value");
        var InventoryTransferFormId = document.getElementById("InventoryTrasferForm").value;       
        
        var action=component.get("c.save");
        action.setParams({
            "ids": recordId,
            "containerno": ContainerNo,
            "sealno": SealNo,
            "shortno": ShortNo,
            "etd": ETD,
            "eta": ETA,
            "inventoryTransferForm":InventoryTransferFormId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnvalue = response.getReturnValue();
                var transferFormIdSet = component.set("v.expandRecordId",returnvalue);
                var transferFormIdGet = component.get("v.expandRecordId");
                var cmpEvent = component.getEvent("InventoryAllocationSearchPageListEvent");
                cmpEvent.setParams({
                    "inventoryTransferFormId" : transferFormIdGet
                });
                
                cmpEvent.fire();
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }           
        });
        $A.enqueueAction(action);        
    },
    
    DispatchdateController : function(component, event, helper){
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        var DispatchDate = component.get("v.DispatchDate");
    },
    
    
    ArrivaldateController : function(component, event, helper){
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");        
        var ArrivalDate = component.get("v.ArrivalDate");
        var DispatchDate = component.get("v.DispatchDate");
        if(DispatchDate != null){
            
            if( ArrivalDate <= DispatchDate ){
                var text = 'Please Select a valid Date,Which is greater than Dispatch Date';
                helper.errorToast(component,event,helper,text);
                ArrivalDate = null;
                component.set("v.ArrivalDate", ArrivalDate);
            }
        }
        else{
            var text = 'Please Provide a valid Dispatch Date';
            helper.errorToast(component,event,helper,text);
            ArrivalDate = null;
            component.set("v.ArrivalDate", ArrivalDate);
        }
        
    },
})