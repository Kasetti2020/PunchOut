({
    doinit : function(component, event, helper) 
    {
        //alert('View Revise Admin');
        var recordId = component.get("v.recordId");
         //alert('recordId ::'+recordId);
        component.set("v.AddressTable",true);
        if(recordId == ''){
            var SOID = component.get('v.AdminReviseSOID');
            component.set('v.SOID',SOID);
        }
        else{
            component.set('v.SOID',recordId);
            var retailerName =  helper.getSORetailerCode(component, event, helper,recordId);
        }
        var SelectedRetailer = component.get('v.SelectedRetailer');
        // alert('SelectedRetailer ::'+SelectedRetailer);
        var SelectedCompanyVal = component.get('v.SelectedCompanyVal');
        //alert('SelectedCompanyVal ::'+SelectedCompanyVal);
        if(SelectedRetailer != '' && recordId == ''){
            var res = helper.pickListVal(component,component.get("v.SelectedRetailer"),'Retailer_Code_Hidden__c','Order_Country__c');
        }
        else if(recordId == '')
        {
            helper.pickListVal(component,SelectedCompanyVal,'Order_Country__c','Preferred_Currency__c');
        }
        
    },
    OrderToCompany:function(component, event, helper)
    {
        component.set('v.isPicklist',true);
        var compName = event.getSource().get("v.value");
        //alert('compName ::'+compName);
        component.set('v.SelectedPiklistCompany',compName);
        // component.set('v.SelectedPiklistCurrency','');
        helper.pickListVal(component,compName,'Order_Country__c','Preferred_Currency__c');
    },
    closeTableAddress : function(component, event, helper)
    {
        // alert('closeTableAddress ::');
        component.set("v.AddressTable",false);
        var CancelLineAdminReviseCmpEvent = component.getEvent("CancelLineAdminReviseCmpEvent");
        CancelLineAdminReviseCmpEvent.setParams({
            "closePopUp": false
        });
        CancelLineAdminReviseCmpEvent.fire();
        console.log('After cancelHeader');
        $A.get("e.force:closeQuickAction").fire();
    },
    SaveTableAddress : function(component, event, helper)
    {
        var SOID = component.get("v.SOID");
        // alert('SOID ::'+SOID);
        var reasonToCancel = component.get("v.reasonToCancel");
        // alert('reasonToCancel ::'+reasonToCancel);
        var SelectedPiklistCompany = component.get("v.SelectedPiklistCompany");
        // alert('SelectedPiklistCompany ::'+SelectedPiklistCompany);
        var reviseReason = component.get("v.reviseReason");
        //alert('reviseReason ::'+reviseReason);
        var reviseReasonText = component.get("v.reviseReasonText");
        //alert('reviseReasonText ::'+reviseReasonText);
        if(reviseReasonText == '')
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
        if(reviseReason == "")
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.Please_Select_Revise_Reason"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        if((SelectedPiklistCompany == ''||SelectedPiklistCompany == 'NULL') && reasonToCancel == 'Revise Order To Company' )
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.Please_Select_a_Order_To_Company"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        var SelectedPiklistCurrency = component.get("v.SelectedPiklistCurrency");
        // alert('SelectedPiklistCurrency ::'+SelectedPiklistCurrency);
        if(SelectedPiklistCurrency == '' || SelectedPiklistCurrency=='NULL' )
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.Please_Select_a_Preferd_Currency"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        component.set('v.showConfirmDialog', true);
        component.set("v.AddressTable",false);
        // alert('SelectedPiklistCurrency ::'+SelectedPiklistCurrency);
        
    },
    //preferred to currency picklist
    preferredCurrency:function(component, event, helper)
    {
        var preferedCurrency = event.getSource().get("v.value");
        // alert('preferedCurrency ::'+preferedCurrency);
        component.set('v.SelectedPiklistCurrency',preferedCurrency);
        
    },
    handleConfirmDialogYes : function(component, event, helper) {
        // alert('Yes');
        component.set('v.showConfirmDialog', false);
        var SOID = component.get("v.SOID");
        // alert('SOID ::'+SOID);
        var reviseReason = component.get("v.reviseReason");
        var SelectedPiklistCompany = component.get("v.SelectedPiklistCompany");
        var SelectedPiklistCurrency = component.get("v.SelectedPiklistCurrency");
        var reviseReasonText = component.get("v.reviseReasonText");
        var reviseVersionNum = component.get("v.reviseVersionNum");
        var action = component.get("c.ActivateData");
        action.setParams({SOID :SOID,
                          SelectedPiklistCompany : SelectedPiklistCompany,
                          SelectedPiklistCurrency : SelectedPiklistCurrency,
                          reviseReason : reviseReason,
                          reviseReasonText : reviseReasonText,
                          reviseVersionNum : reviseVersionNum
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.Sales_Order_has_been_Revised_successfully"),
                    "duration":'10000',
                    "key": 'info_alt',
                    "type": 'success',
                    "mode": 'pester'
                });
                toastEvent.fire();
                var recordId = component.get("v.recordId");
                //alert('recordId ::'+recordId);
                if(recordId == ''){
                    component.set("v.AddressTable",false);
                }else{
                    //alert("Inside Else")
                    location.reload();
                }
                
            }
        });
        $A.enqueueAction(action);   
        window.setTimeout(
            $A.getCallback(function() {
                $A.get("e.force:refreshView").fire();
            }), 3000
        )
    },
    
    handleConfirmDialogNo : function(component, event, helper) {
        // alert('No');
        component.set('v.showConfirmDialog', false);
        component.set("v.AddressTable",true);
    },
    handleReviseReason : function(component, event, helper) {
        var reason = component.find("selectReason").get("v.value");
        component.set("v.reviseReason",reason);
        component.set("v.reasonToCancel",reason);
         if(reason == 'Revise Order To Company'){
                    var res = helper.pickListVal(component,component.get("v.SelectedRetailer"),'Retailer_Code_Hidden__c','Order_Country__c');
                    
           }
           else{
                 helper.pickListVal(component,component.get("v.SelectedCompanyVal"),'Order_Country__c','Preferred_Currency__c');
                    
             }
    }
})