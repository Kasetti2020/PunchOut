({
    doInit : function(component, event,helper) {
        var sPageURL = window.location.search;
        var roId = sPageURL.split('=')[1];
        //alert("soId"+roId);
        component.set("v.roId",roId);
        var action = component.get("c.reviseOrderData");
        action.setParams({
            roId : roId
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var value = response.getReturnValue();
                //alert("value>>"+JSON.stringify(value.pbspOrPpcNotPresent));
                component.set("v.pbspOrPpcNotfound",value.pbspOrPpcNotPresent);
                if(component.get("v.pbspOrPpcNotfound")){
                    if(value.reviseOrderObj.Mainetti_SO__r.OrderSource__c != "Stage PO"){
                        component.set("v.pbspOrPpcNotfound",false);
                        if(value.newSoli.length>0){
                            for (var i=0 ; 0 < value.newSoli.length;i++){
                                if(value.newSoli[i].Price_Specification_Book_Product__c == null){
                                    component.set("v.pbspOrPpcNotfound",true);
                                }
                                break;
                            }
                        } 
                    }
                    else{
                        component.set("v.pbspOrPpcNotfound",true);
                    }
                }
                component.set("v.isModalOpen",true);
                component.set("v.reviseOrderObj",value.reviseOrderObj);
                component.set("v.oldSoli",value.oldSoli);
                component.set("v.newSoli",value.newSoli);
                component.set("v.adminRemarks","");
                component.set("v.contact",value.contactName);
                //alert(JSON.stringify(value.contactName));
                component.set("v.createduser",value.createduser);
            }
        });
        $A.enqueueAction(action); 
    },
    acceptReviseRequest : function(component, event, helper){
        var roId = component.get("v.reviseOrderObj.Id");
        //alert(roId);
        var SOID = component.get("v.reviseOrderObj.Mainetti_SO__c");
        var SelectedPiklistCompany = component.get("v.reviseOrderObj.Revise_Order_To_Company__c");
        var SelectedPiklistCurrency = component.get("v.reviseOrderObj.Revise_Currency__c");
        var adminRemarks = component.get("v.adminRemarks");
        if(adminRemarks == '')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.Please_Add_Remarks"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        var action = component.get("c.updateRevisedSO");
        action.setParams({
            roId : roId,
            SOID : SOID,
            SelectedPiklistCompany : SelectedPiklistCompany,
            SelectedPiklistCurrency : SelectedPiklistCurrency,
            adminRemarks : adminRemarks
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.Revise_Request_is_accepted"),
                    "duration":'10000',
                    "key": 'info_alt',
                    "type": 'success',
                    "mode": 'pester'
                });
                toastEvent.fire();
                component.set("v.isModalOpen",false);
                var recordId = event.getSource().get("v.name");
                var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": recordId
                });
                navEvt.fire();
            }
        });
        $A.enqueueAction(action);
    },
    rejectReviseRequests : function(component, event, helper){
        var roId = component.get("v.roId");
        console.log("roId>>"+roId);
        var adminRemarks = component.get("v.adminRemarks");
        if(adminRemarks == '')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.Please_Add_Remarks"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        var action = component.get("c.rejectReviseRequest");
        action.setParams({
            roId : roId,
            adminRemarks : adminRemarks
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.Revise_Request_is_Rejected"),
                    "duration":'10000',
                    "key": 'info_alt',
                    "type": 'success',
                    "mode": 'pester'
                });
                toastEvent.fire();
                component.set("v.isModalOpen",false);
                var recordId = event.getSource().get("v.name");
                var navEvt = $A.get("e.force:navigateToSObject");
                navEvt.setParams({
                    "recordId": recordId
                });
                navEvt.fire();
            }
        });
        $A.enqueueAction(action);
    },
    close : function(component, event, helper) 
    {
        component.set("v.isModalOpen", false); 
        var urlString = window.location.href;
        //alert('urlString>>'+urlString);
        var CommunityBaseURL = urlString.substring(0,urlString.indexOf("/n/"));
        //alert('Inside CommunityBaseURL>>>>'+CommunityBaseURL);
        window.location.replace(CommunityBaseURL+"/n/AdminReviseRequestTable");
    },
    link: function(component, event, helper) {
        var recordId = event.getSource().get("v.name");
        helper.navigateToRecord(component, event, helper,recordId);
    },
    handleClick: function(component, event, helper) {
        var recordId = event.target.dataset.pbspid;
        helper.navigateToRecord(component, event, helper,recordId);
    },
    handlePPc: function(component, event, helper) {
        var recordId = event.target.dataset.ppcpid;
        helper.navigateToRecord(component, event, helper,recordId);
    },
    openUser:function(component, event, helper) {
        var recordId = event.getSource().get("v.name");
        helper.navigateToRecord(component, event, helper,recordId);
    },
    openContact:function(component, event, helper) {
        var recordId = event.getSource().get("v.name");
        helper.navigateToRecord(component, event, helper,recordId);
    },
    openCustomer:function(component, event, helper) {
        var recordId = event.getSource().get("v.name");
        helper.navigateToRecord(component, event, helper,recordId);
    },
})