({
    handleClick : function(component, event, helper) {
        var type = component.get('v.searchType');
         // alert('type ::'+type);
           var NewOrdersCheck = component.get('v.NewOrdersCheck');
         // alert('NewOrdersCheck ::'+NewOrdersCheck);
           var OrderUnderProcessCheck = component.get('v.OrderUnderProcessCheck');
         // alert('OrderUnderProcessCheck ::'+OrderUnderProcessCheck);
        if(type=="OpenPO"){
            
             var getCheckAllId = component.get("v.POList.POLIList");
             // alert('getCheckAllId ::'+getCheckAllId);
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId];
        }
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
            if(getCheckAllId[i].IsSelected == true)
            {
                
                var toastEvent = $A.get("e.force:showToast");
            	toastEvent.setParams({
                title : $A.get("$Label.c.Warning"),
                message:$A.get("$Label.c.Please_confirm_and_click_ADD_PO_before_searching_the_new_PO_Number"),
                duration:' 5000',
                type: 'Warning'
            });
            toastEvent.fire();   
                return;
            }
        }
        
            
            
            
            
            helper.getPOList(component, event, helper);
        }
        if(type=="OrderHistory"){
            this.keyCheck(component, event, helper);
           // alert('test');
            //helper.getSOList(component, event, helper);
        }
        if(type=="BulkApproval"){
            helper.getBulkSOList(component, event, helper);
        }
        if(type=="PrintShopSO"){
            //alert('PrintShopSO Clicked');
            helper.getSOListforPrintShop(component, event, helper ,component.get('v.NewOrdersCheck') , component.get('v.OrderUnderProcessCheck'));
        }
        if(type=="PrintShopViewShip"){
            helper.getShipments(component, event, helper);
        }
        if(type=="PrintShopCreateShip"){
            helper.CreateShipments(component, event, helper);
        }
        if(type=="RetailerPO"){
            helper.getRetailerPO(component, event, helper);
            //alert("in retailer PO")
        }
    },
    searchTextClear: function(component, event, helper) {
        
    },
    keyCheck: function(component, event, helper) {
       // alert('Inside keyCheck');
        var getCheckAllId = component.get("v.POList.POLIList");
     // alert('  IsSelected   >>>>'+JSON.stringify(getCheckAllId));
        if(getCheckAllId != null && getCheckAllId != ''){
           // alert('Inside if CO ndition');
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId]; 
        }
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
           
            if(getCheckAllId[i].IsSelected == true)
            {
                
                var toastEvent = $A.get("e.force:showToast");
            	toastEvent.setParams({
                title : $A.get("$Label.c.Warning"),
                message:$A.get("$Label.c.Please_confirm_and_click_ADD_PO_before_searching_the_new_PO_Number"),
                duration:' 5000',
                type: 'Warning'
            });
            toastEvent.fire();   
                return;
            }
        } 
        
        }
        
        var type = component.get('v.searchType');
        var value = component.get("v.searchText");
        if(component.get("v.searchText")=='' || component.get("v.searchText")==null || component.get("v.searchText")==undefined){
            var cmpEvent = component.getEvent("searchEvent");
            cmpEvent.setParams({
                "flag" : false });
            cmpEvent.fire();
        }else{
            if(type=="OrderHistory"){
                helper.getSOList(component, event, helper);
            }
            	
        }
    }
})