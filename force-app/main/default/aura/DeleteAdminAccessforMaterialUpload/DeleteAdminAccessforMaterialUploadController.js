({
	doInit : function(component, event, helper) {
        var batchId = component.get("v.batchId");   
        // alert('inside dellete component');     
		helper.initializeDeleteData(component,event,helper,batchId);
	},
    handleAdminAccessEvent : function(component, event, helper) {
        var batchId = event.getParam("dataId");		
	},
    processClick : function(component, event, helper) {

        var retailers = component.get("v.deleteInventoryTransactionMasterBatch");
        var numberOfRetailers = retailers.length;
        var totalRecords = numberOfRetailers;
        var checkboxes = document.getElementsByName("valid_check");
        var numberOfCheckedItems = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked){                
                numberOfCheckedItems++;
            }
        }
        var numberOfMismatchChecked = 0;
        if(numberOfMismatchChecked == 0){
            if(totalRecords == numberOfCheckedItems){
                var batchId = component.get("v.batchId");
                helper.processUploadingOfData(component,event,helper,batchId);            
            }else{
                var text = 'Please validate all records before proceed';
                helper.selectNormalToast(component,event,helper,text);
            }
        }else{
            var text = 'Please validate all records before proceed';
            helper.selectNormalToast(component,event,helper,text);
        }
    },
    
})