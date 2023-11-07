({
    handleClick : function(component, event, helper) {
        var type = component.get('v.searchType');
        if(type=="OpenPO"){
            helper.getPOList(component, event, helper);
        }
        if(type=="OrderHistory"){
            //this.keyCheck(component, event, helper);
            //helper.getSOList(component, event, helper);
        }
        if(type=="BulkApproval"){
            helper.getBulkSOList(component, event, helper);
        }
        if(type=="PrintShopSO"){
            helper.getSOListforPrintShop(component, event, helper);
        }
        if(type=="PrintShopViewShip"){
            helper.getShipments(component, event, helper);
        }
        if(type=="PrintShopCreateShip"){
            helper.CreateShipments(component, event, helper);
        }
    },
    searchTextClear: function(component, event, helper) {
        
    },
    keyCheck: function(component, event, helper) {
        var type = component.get('v.searchType');
        var value = component.get("v.searchText");
        //alert('searchText1' + value);
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