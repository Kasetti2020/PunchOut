({
    doInit : function(component, event, helper) 
    {
        if(document.referrer.indexOf(".lightning.force.com") > 0){
                //alert("welcome to lightning ");
                component.set('v.checkClassicOrLightning',false);
            }else{
                //alert("welcome to classic");
                component.set('v.checkClassicOrLightning',true);
            }
        helper.fetchBulkReviseOrder(component, event, helper);
    },
    ApproveForm : function(component, event, helper) {
        //alert('Approve form opening');
        component.set("v.ApprovalForm",true);
         // console.log('RORecords in ApproveForm >>'+JSON.stringify(component.get("v.ReviseLineList")));
    },
    closeModal : function(component, event, helper) {
        component.set("v.ApprovalForm",false);
    },
    confirmReviseOrder : function(component, event, helper) {
        helper.getApproveList(component, event, helper);
        component.set("v.ApprovalForm",false);
        component.set("v.isconfirmModalOpen", true);
    },
    closeModel : function(component, event, helper) {
        component.set("v.isconfirmModalOpen",false);
        //$A.get('e.force:refreshView').fire();
    },
    SaveReviseOrder : function(component, event, helper) {
        helper.SaveApproveOrders(component, event, helper);
    },
})