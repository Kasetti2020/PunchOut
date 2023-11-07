({
    getPOList : function(component, event, helper) {
        
        var searchText = component.get('v.searchText');
        //alert('searchText :'+searchText);
        var action = component.get('c.searchForPO');
        action.setParams({
            searchText: searchText,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
                if(JSON.stringify(result.POLIList)!='[]'){
                    var cmpEvent = component.getEvent("searchRetailerEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'OpenPO',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.POLIList)=='[]'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Purchase Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    getSOList : function(component, event, value) {
     //   var searchText = component.get('v.searchText');
       // alert('value :'+value);
       // var SOStatus = component.get('v.SOStatus');
         var searchText =  component.get("v.searchpill");
         //alert('searchText :'+searchText);
        if(searchText != ''){
         var selectedretailerobj = component.get("v.selectedRetailerRecord");
        }
       // alert('selectedretailerobj :'+selectedretailerobj);
         var action = component.get('c.searchForSO');
        action.setParams({
            searchText: searchText,
            //status: SOStatus
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
               // alert('result :'+result)
                if(result==null){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Sales Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result)!='[]'){
                    var cmpEvent = component.getEvent("searchRetailerEvent");
                    cmpEvent.setParams({
                        "retailerObj" : selectedretailerobj,
                        "POList" : result,
                        "type":'OrderHistory',
                       // "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.SOList)=='[]'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Sales Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
     getBulkSOList : function(component, event, helper) {
        var searchText = component.get('v.searchText');
        //var SOStatus = component.get('v.SOStatus');
        
        var action = component.get('c.searchForBulkSO');
        action.setParams({
            searchText: searchText
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
                if(result==null){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Sales Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result.SOList)!='[]'){
                    var cmpEvent = component.getEvent("searchRetailerEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'BulkApproval',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.SOList)=='[]'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Sales Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    getSOListforPrintShop : function(component, event, helper) {
        var searchText = component.get('v.searchText');
        //var SOStatus = component.get('v.SOStatus');
        
        var action = component.get('c.printshopSO');
        action.setParams({
            searchText: searchText
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
                if(result==null){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Sales Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result.SOList)!='[]'){
                    var cmpEvent = component.getEvent("searchRetailerEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'PrintShopSO',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.SOList)=='[]'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Sales Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
     searchHelper : function(component,event,getInputkeyWord) {
        
        // call the apex class method 
        var action = component.get("c.fetchLookupRetailer"); 
        action.setParams({
            'enteredValue': getInputkeyWord
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {                
                var storeResponse = response.getReturnValue();
                //alert('storeResponse :'+storeResponse);
                // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
                component.set('v.variable1',true);
            }
            
        });
        $A.enqueueAction(action);        
    },
    
})