({
	doInit : function(component, event, helper) {
        var batchId = component.get("v.batchId");        
		helper.initializeRetailerData(component,event,helper,batchId);
	},
    handleAdminAccessEvent : function(component, event, helper) {
        var batchId = event.getParam("dataId");		
	},
    processClick : function(component, event, helper) {

        var retailers = component.get("v.retailerData");
        var numberOfRetailers = retailers.length;
        var totalRecords = numberOfRetailers;
        var checkboxes = document.getElementsByName("valid_check");
        var numberOfCheckedItems = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked){                
                numberOfCheckedItems++;
            }
        }
        var checkboxes = document.getElementsByName("mismatch_check");
        var numberOfMismatchChecked = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked){                
                numberOfMismatchChecked++;
            }
        }
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
    
    notifyClick : function(component, event, helper) {
        var checkboxes = document.getElementsByName("mismatch_check");
        var numberOfCheckedItems = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked){                
                numberOfCheckedItems++;
            }
        }
        var batchId = component.get("v.batchId");
        if(numberOfCheckedItems > 0){
            helper.updateInvFailureCheckbox(component,event,helper,batchId)
        }else{
            var text = 'Please select mismatch Record/s before notify';
            helper.selectNormalToast(component,event,helper,text);
        }
    }
    
})