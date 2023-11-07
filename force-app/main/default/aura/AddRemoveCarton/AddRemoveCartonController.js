({
    getRecordValues : function(component, event,helper) {
        helper.getRecordValueshelper(component, event,helper);
    },
    
    AddtoContainer : function(component, event,helper) {
        var action = component.get("c.addCartonfromTransferNote");
        var recordId = component.get("v.recordId");
        action.setParams({ cartonId : recordId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();
                if(stringItems === 'SUCCESS'){
                    helper.getRecordValueshelper(component, event,helper);
                    helper.showToast(component, event,'success',$A.get("$Label.c.success"),$A.get("$Label.c.Carton_Added_to_Transfer_Note"));
                    $A.get('e.force:refreshView').fire();
                }else{
                    helper.showToast(component, event,'Error',$A.get("$Label.c.Error"),$A.get("$Label.c.Please_update_Transfer_Note_status_Goods_Loded_By_Fields")); 
                }  
            }
        });
        $A.enqueueAction(action);
    },
    
    RemoveContainer : function(component, event,helper) {
        var action = component.get("c.removeCartonFromTransferNote");
        var recordId = component.get("v.recordId");
        action.setParams({ cartonId : recordId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var stringItems = response.getReturnValue();                
                if(stringItems === 'SUCCESS'){
                    helper.getRecordValueshelper(component, event,helper);
                    helper.showToast(component, event,'success',$A.get("$Label.c.success"),$A.get("$Label.c.Carton_removed_from_Transfer_Note"));
                    $A.get('e.force:refreshView').fire();
                }else{
                    helper.showToast(component, event,'Error',$A.get("$Label.c.Error"),$A.get("$Label.c.Please_update_Transfer_Note_status_Goods_Loded_By_Fields")); 
                }  
            }
        });
        $A.enqueueAction(action);
    },
    
    
})