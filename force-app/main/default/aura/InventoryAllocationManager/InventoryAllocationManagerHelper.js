({
    initializeRetailer : function(component, event, helper) {
        var action=component.get("c.getRetailerData");
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                //alert('RetailerMainettiCompany>>>'+JSON.stringify(result));
                for (var i = 0; i < result.length; i++) {
                    var row = result[i];
                    if (row.Selected_Retailer__c ) row.Selected_Retailer__c  = row.Selected_Retailer__c ;
                    if (row.Mainetti_Name_Holder__c) row.Mainetti_Name_Holder__c = row.Mainetti_Name_Holder__c;
                    if (row.User_name_holder__c) row.User_name_holder__c = row.User_name_holder__c;
                    component.set("v.retailerData",result);                     
                }       
                //alert("result:"+result.length);
                if(result.length == 0){
                    component.set("v.noEmptyRecord",false);
                }else{
                    component.set("v.noEmptyRecord",true);
                }
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    openModal: function(component, event, helper) {                                                                             
        var modal = component.find("addRetailerModal");
        var modalBackdrop = component.find("addRetailerModalBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },
    closeModal: function(component, event, helper) {
    
        var modal = component.find("addRetailerModal");
        var modalBackdrop = component.find("addRetailerModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    searchHelper : function(component,event,getInputkeyWord) {
        
        // call the apex class method 
        var action = component.get("c.fetchLookupRetailerdataList"); 
        action.setParams({
            'enteredValue': getInputkeyWord
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {                
                var storeResponse = response.getReturnValue();
                // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
            }
            
        });
        $A.enqueueAction(action);        
    },
    searchUserHelper : function(component,event,getInputkeyWord) {
        
        // call the apex class method 
        var action = component.get("c.fetchLookupUserdataList");
        action.setParams({
            'enteredValue': getInputkeyWord
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {                
                var storeResponse = response.getReturnValue();
                // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfUserSearchRecords", storeResponse);
            }
            
        });
        $A.enqueueAction(action);        
    },
    selectErrorToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error",
            message: text,
            type: "error",
            mode:"sticky"
        });
        toastEvent.fire();
    },
    successToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Success!",
            message: text,
            type: "success",
            mode:"pester"
        });
        toastEvent.fire();
    },
    // function to clear the selected retailer 
    clear :function(component,event,helper){
        var pillTarget = component.find("lookup-pill");
        var lookUpTarget = component.find("lookupField"); 
        
        $A.util.addClass(pillTarget, 'slds-hide');
        $A.util.removeClass(pillTarget, 'slds-show');
        
        $A.util.addClass(lookUpTarget, 'slds-show');
        $A.util.removeClass(lookUpTarget, 'slds-hide');
        
        component.set("v.selectedRetailer",null);
        component.set("v.selectedCompany", null );
        component.set("v.selectedRetailerRecord", {} );   
    },
    getRetailerPickListValuesss : function(component,event,helper) {       
        var action=component.get("c.getRetailerPicklistValues");
        action.setCallback(this,function (response) {
            var state = response.getState();
            //alert('state:'+state);
            if (state === "SUCCESS") {
                component.set('v.retailerList',response.getReturnValue().retailerList);
                 component.set('v.orderToCompanyList',response.getReturnValue().OrdToCompanylist);
                var a = response.getReturnValue()[0];
                //alert('a :'+a);
                if(response.getReturnValue().length ==1)
                {
                    component.set('v.IsRetailerDefault','true');
                    component.set('v.selectedRetailer', response.getReturnValue()[0]);
                    var dmy = component.get("v.selectedRetailer");
                    //helper.ShowUserAllocatedCmphelper(component , event, helper);
                }
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
 
    
    autoPopulateOnReupload : function(component,helper,batchId) {
        
        var action=component.get("c.getAutoPopulateMasterValues");
        action.setParams({
            "batchId": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                for(var i=0;i<result.length;i++){
                    // component.set("v.selectedValues","");
                    component.set("v.selectedRetailer",result[i].Selected_Retailer__c);
                    component.set("v.selectedCompany",result[i].Company__c);
                }
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
})