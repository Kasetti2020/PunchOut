({
	doInit : function(component, event, helper) {
        var batchId = component.get("v.batchId");        
		helper.initializeRetailerData(component,event,helper,batchId);
        helper.initializeModelData(component,event,helper,batchId);
        helper.initializeUnitSoldData(component,event,helper,batchId);
        helper.initializeUnitSoldDataInDecimal(component,event,helper,batchId);
        helper.initializeUnitSoldDataBlank(component,event,helper,batchId);
        helper.initializeUnitSoldWarning(component,event,helper,batchId);
	},
    handleAdminAccessEvent : function(component, event, helper) {
        var batchId = event.getParam("dataId");		
	},
    backClick : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:BatchSales"
        });
        evt.fire();
	},
    processClick : function(component, event, helper) {

        var retailers = component.get("v.retailerData");
        var numberOfRetailers = retailers.length;
        var models = component.get("v.modelData");
        var numberOfModels = models.length;
        var unitsold = component.get("v.unitSoldData");
        var numberOfUnitSold = unitsold.length;
        var unitsoldBlank = component.get("v.unitSoldDataBlank");
        var numberOfUnitSoldBlank = unitsoldBlank.length;
        var unitsoldInDecimal = component.get("v.unitSoldDataInDecimal");
        var numberOfUnitSoldInDecimal = unitsoldInDecimal.length;
        //Added By Bharath On 18-01-2021 
        var unitsoldwarning = component.get("v.unitSoldWarning");
        var numberOfUnitSoldwarning = unitsoldwarning.length;
        var totalRecords = numberOfRetailers + numberOfModels + numberOfUnitSold+numberOfUnitSoldBlank + numberOfUnitSoldwarning + numberOfUnitSoldInDecimal ;
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
            var text = 'Please select mismatch Record/s before proceed';
            helper.selectNormalToast(component,event,helper,text);
        }
    }
    
})