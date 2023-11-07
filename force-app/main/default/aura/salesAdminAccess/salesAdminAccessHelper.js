({
	initializeRetailerData : function(component,event,helper,batchId) {
        var action=component.get("c.getRetailerData");
        action.setParams({
            "batchid": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.retailerData", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    initializeModelData : function(component,event,helper,batchId) {
        var action=component.get("c.getModelData");
        action.setParams({
            "batchid": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.modelData", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    initializeUnitSoldData : function(component,event,helper,batchId) {
        var action=component.get("c.getUnitSoldData");
        action.setParams({
            "batchid": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.unitSoldData", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    initializeUnitSoldDataInDecimal : function(component,event,helper,batchId) {
        var action=component.get("c.getUnitSoldDataInDecimal");
        action.setParams({
            "batchid": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.unitSoldDataInDecimal", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    initializeUnitSoldDataBlank : function(component,event,helper,batchId) {
        var action=component.get("c.getUnitSoldDatausdeurtranscurrencyBlank");
        action.setParams({
            "batchid": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.unitSoldDataBlank", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    //Added By Bharath on 18-01-2021 ---Starts
    initializeUnitSoldWarning: function(component,event,helper,batchId) {
        var action=component.get("c.getUnitSoldWaring");
        action.setParams({
            "batchid": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.unitSoldWarning", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    //Added By Bharath on 18-01-2021 ---Ends

    processUploadingOfData: function(component,event,helper,batchId) {
        
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:BatchMasterForSales"
        });
        evt.fire();
       
        var action = component.get("c.recStatusUpsertForInventory"); 
        action.setParams({
            "batchid" : batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {                
                var status =response.getReturnValue();
                if(status){
                    helper.updateInvSuccessCheckbox(component,event,helper,batchId);
                }
            }else if(state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);      
    },
    updateInvSuccessCheckbox: function(component,event,helper,batchId) {
        var action = component.get("c.recUpdateFOrInvSuccess"); 
        action.setParams({
            "batchid" : batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {                
                var status =response.getReturnValue();
                if(status){
                  var text = 'Data is Getting Processed in the BackGround, Once Completed You will Receive a Email Notification';
                  helper.successToast(component,event,helper,text);
                }
            }else if(state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action); 
    },
    uploadAzureWindowForFileUpload: function(component,helper,batchId) {
        var w = 460;
        var h = 250;
        var left = Number((screen.width/2)-(w/2));
        var tops = Number((screen.height/2)-(h/2));
        var winObjct = window.open('/apex/azureInventoryFileUpload?Id=' + batchId,'Inventory Data Upload','width=' + (parseInt(window.innerWidth) * 0.4) + ',height=' + (parseInt(window.innerHeight) * .6) + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=0,left='+left+',top='+tops);
    },
    // Update related checkboxes on click of Notify User.
    updateInvFailureCheckbox: function(component,event,helper,batchId) {
        var action = component.get("c.recUpdateFOrInvFailure"); 
        action.setParams({
            "batchid" : batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {                
                var status =response.getReturnValue();
                if(status){
                    var text = 'Email notification to user has been sent for re-upload';
                    helper.successToast(component,event,helper,text);
                }
            }else if(state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action); 
    },
    selectNormalToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            //title: "Error",
                            message: text,
                            //type: "error",
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
})