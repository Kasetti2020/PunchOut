({
    getPOList : function(component, event, helper) {
        
        var searchText = component.get('v.searchText');
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
                       // duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'sticky'
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
        action.setParams({
            searchText: searchText,
            status: SOStatus
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
        // alert('getBulkSOList ::');
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
               // alert('result :::'+JSON.stringify(result));
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
    
    getSOListforPrintShop : function(component, event, helper ,NewOrdersCheck ,OrderUnderProcessCheck) {
        var searchText = component.get('v.searchText');
        //alert('NewOrdersCheck ::'+NewOrdersCheck);
       // alert('OrderUnderProcessCheck ::'+OrderUnderProcessCheck);
        //var SOStatus = component.get('v.SOStatus');        
        var action = component.get('c.printshopSO');
        action.setParams({
            "searchText": searchText,
             "NewOrders": NewOrdersCheck,
             "OrderUnderProcess": OrderUnderProcessCheck
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
                //if(result==null){
                 //alert('result ::'+result.length);
                if(result.length == 0){
                    //alert('inside');
                     helper.showError(component, event, helper);
                      var cmpEvent = component.getEvent("searchEvent");
                     cmpEvent.setParams({
                         "POList" : '[]',
                        "type":'PrintShopSO',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                    
                   
                  /*  var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Error!!!',
                        message:'No Sales Order Found',
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();*/
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
                    
                     cmpEvent.setParams({
                        "POList" : null,
                        "type":'PrintShopSO',
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
    showError : function(component, event, helper) {
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
    },
    getRetailerPO: function(component, event, helper){
        var searchText = component.get('v.searchText');
        //console.log(component.get('v.searchText'));
        var action = component.get('c.searchForRetailerPO');
        action.setParams({searchText:component.get("v.searchText")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var result = response.getReturnValue();
                if(JSON.stringify(result.PoList1)!='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'RetailerPO',
                        "searchtext": searchText,
                        "flag" : true });
                    cmpEvent.fire();
                }
                else if(JSON.stringify(result.PoList1)=='[]'){
                    var cmpEvent = component.getEvent("searchEvent");
                    cmpEvent.setParams({
                        "POList" : result,
                        "type":'RetailerPO',
                        "searchtext": searchText,
                        "flag" : true });
                   // cmpEvent.fire();
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Purchase_Order_Found"),
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                     cmpEvent.fire();
                }
            }
        });
        $A.enqueueAction(action);
    }
})