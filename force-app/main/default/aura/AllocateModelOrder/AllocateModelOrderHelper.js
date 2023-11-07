({
    pickListVal:function(component, controllingValue, controllingFields, dependentField,helper) 
    {
        console.log('InsidepickListVal:');
        var selectedUserCompany = component.get('v.selectedUserCompany');
        console.log('selectedUserCompany : '+selectedUserCompany);
        console.log('controllingValue:'+controllingValue+' controllingFields:'+controllingFields+' dependentField:'+dependentField);
        var actionCall = component.get("c.getDependentPicklistValues");
        actionCall.setParams({
            "controllingValue":	controllingValue,
            "controllingFields": controllingFields,
            "dependentField": dependentField,
            "selectedUserCompany1":selectedUserCompany
        });
        actionCall.setCallback(this, function(response) {
            var state = response.getState();
            //alert(response.getReturnValue());
            if (state === "SUCCESS") {
                if(dependentField=='Order_Country__c')
                {
                    component.set('v.listOfCompanies',response.getReturnValue());
                }
                else if(dependentField=='Preferred_Currency__c')
                    component.set('v.listOfCurrency',response.getReturnValue());
            }
            else if (state === "ERROR") 
            {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
        });
        $A.enqueueAction(actionCall); 
    },
    
    
    retailerOnChangehelper : function(component, event, helper) {
        var action = component.get("c.getRetailerPicklistValues");
        action.setCallback(this, function(response) {
            var state = response.getState();
            // alert(response.getReturnValue());
            if (state === "SUCCESS") {
                component.set('v.retailerList',response.getReturnValue());
                //alert('response.getReturnValue() :'+response.getReturnValue().length);
                var a = response.getReturnValue()[0];
                // alert('a :'+a);
                if(response.getReturnValue().length ==1)
                {
                    component.set('v.IsRetailerDefault','true');
                    component.set('v.selectedRetailer', response.getReturnValue()[0]);
                    var dmy = component.get("v.selectedRetailer");
                    // alert('dmy:::'+dmy);
                    helper.ShowUserAllocatedCmphelper(component , event, helper);
                }
            }
        });
        $A.enqueueAction(action); 
    },
    
    
    ShowUserAllocatedCmphelper: function(component, event, helper) {
        var selectedRetailers = component.get('v.selectedRetailer');
        var action = component.get("c.fetchUserAllocatedCmp");
        action.setParams({"selectedRetailers":selectedRetailers});
        action.setCallback(this, function(response) {
            component.set("v.lstOfRecordType1", response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    
    
    successToast: function(component,event,helper,text){        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Success!",
            message: text,
            type: "success",
            mode:"dismissable"
        });
        toastEvent.fire();
        $A.get('e.force:refreshView').fire();
    },
    
    errorToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error!",
            message: text,
            type: "error",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
    warningToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Warning!",
            message: text,
            type: "Warning",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
    updateremainingQty : function(component, event, helper){
        var get = component.get('v.enteredValue');
        var getInd = component.get('v.indVal');
        var modelList1 = component.get("v.relatedModelList");
        modelList1[index].RemainingQuantity = modelList1[index].RemainingQuantity - value;
        component.set('v.relatedModelList',modelList1);
    },
    
    
    
})