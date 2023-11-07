({
    getPOList : function(component, event, helper) {
        
        var searchText = component.get('v.searchText');
       // alert('searchText =' +searchText);
        var action = component.get('c.searchForPO');
        action.setParams({
            searchText: searchText,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
                if(JSON.stringify(result.POLIList)!='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
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
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Purchase_Order_Found_please_check_in_View_Selected_PO_button"),  
                        //message:'No Purchase Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        //mode: 'pester'
                    });
                    toastEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    getSOList : function(component, event, helper) {
        var searchText = component.get('v.searchText');
        var SOStatus = component.get('v.SOStatus');
        var action = component.get('c.searchForSO');
        //console.log('searchText'+searchText);
        action.setParams({
            searchText: searchText,
            status: SOStatus
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
               // console.log('result'+JSON.stringify(result.SOList).length);
                if(result==null){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result.SOList)!='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'OrderHistory',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.SOList)=='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'OrderHistory',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
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
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result.SOList)!='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
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
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
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
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result.SOList)!='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
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
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
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
    
    getShipments: function(component, event, helper) {
        var searchText = component.get('v.searchText');
        //var SOStatus = component.get('v.SOStatus');
        
        var action = component.get('c.printshopViewShipment');
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
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result.SOList)!='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'PrintShopViewShip',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.SOList)=='[]'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
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
    
    CreateShipments: function(component, event, helper) {
        var searchText = component.get('v.searchText');
        //var SOStatus = component.get('v.SOStatus');
        
        var action = component.get('c.printshopCreateShipment');
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
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                if(JSON.stringify(result.SOList)!='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'PrintShopCreateShip',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.SOList)=='[]'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
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
    }
})