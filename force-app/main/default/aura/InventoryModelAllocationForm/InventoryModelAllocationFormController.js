({
    doInit : function(component, event, helper) {
         var today = new Date();
        component.set('v.today', today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
        helper.getRetailerPickListValuesss(component, event, helper);
    },
     retailerOnChange : function(component, event, helper) {
        var selectedRetailers = component.get('v.selectedRetailer');
        alert('selectedRetailers:'+selectedRetailers);
          helper.getCompPickListValues(component, event, helper,selectedRetailers);
    },
    cmpOnChange : function(component, event, helper) {
        var selectedOrdToCmp = component.get('v.selectedCompany');
        alert('selectedOrdToCmp:'+selectedOrdToCmp);
    },
    changeETDDate:function(component, event, helper){
        //alert('changeDate');
        var GivenDate = component.get('v.inventoryTransferForm.ETD__c');
        alert(GivenDate);
        var today = new Date();
        today.setDate(today.getDate() + 1);
        var presentDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
        alert(presentDate);
        if(GivenDate<presentDate)
        {
            //component.set("v.salesOrderObj.Expected_Delivery_Date__c",presentDate);
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":"warning",
                "title": "Warning!",
                "message": "Expected Time Dispatch Date must be later than today."
            });
            toastEvent.fire();
            event.preventDefault();
            return;
        }
        if(GivenDate!=undefined)
        {
            //alert('undefined');
            component.find('ExpectedTimeDispatchDate').showHelpMessageIfInvalid();
            return;
        }
    },
    changeETADate:function(component, event, helper){
        //alert('changeDate');
        var GivenDate = component.get('v.inventoryTransferForm.ETA__c');
         alert(GivenDate);
        var today = new Date();
        today.setDate(today.getDate() + 1);
        var presentDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
        alert(presentDate);
        if(GivenDate<presentDate)
        {
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":"warning",
                "title": "Warning!",
                "message": "Expected Time Arrival Date must be later than today."
            });
            toastEvent.fire();
            event.preventDefault();
            return;
        }
        if(GivenDate!=undefined)
        {
            //alert('undefined');
            component.find('ExpectedTimeArrivalDate').showHelpMessageIfInvalid();
            return;
        }
    },
})