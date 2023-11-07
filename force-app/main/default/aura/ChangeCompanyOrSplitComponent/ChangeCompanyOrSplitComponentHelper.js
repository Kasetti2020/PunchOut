({
	invoke : function(component,event,helper) {
        var onlineEnquiry = component.get("v.OEid");
        var onlineEnquiryCompany = component.get("v.OECompany");
        var onlineEnquirySupplierPartyCNUF = component.get("v.OESupplierPartyCNUF");
        //alert('onlineEnquiry:'+onlineEnquiry);
        
        var action=component.get("c.getOnlineDetail");
        action.setParams({ 
            onlineEnqId : onlineEnquiry,
            onlineEnqCompany : onlineEnquiryCompany,
            onlineEnqSupplierPartyCNUF : onlineEnquirySupplierPartyCNUF
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            //alert('state:'+state);
            if (state === "SUCCESS") {
                //var returnList = response.getReturnValue().onlineDetail;
                //alert('returnList:'+returnList.length);
                //for(var i=0; i<returnList.length; i++){
                    //alert('Name:'+returnList[i].Name);
                //}
                component.set("v.accessToUser", response.getReturnValue().accessToUser);
                component.set("v.wrapperObj", response.getReturnValue().onlineDetail);
                component.set("v.orderToCompanyList", response.getReturnValue().ordToCmpList);
                component.set("v.allocateCompSplitAccess",response.getReturnValue().allocateCompSplitAccess);
                component.set("v.allocateStockBack",response.getReturnValue().allocateStockBack);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    
    submitOnlineEnquery : function(component,event,helper,selectedOrdToCmp,splitCheck,onlineDetWrapObj) {
        var onlineEnquiryId = component.get("v.OEid");
        //alert('onlineEnquiryId:'+onlineEnquiryId);
        
        var action=component.get("c.submitOnlineEnquery");
        action.setParams({ 
            onlineEnqId : onlineEnquiryId,
            selOrdToCmp : selectedOrdToCmp,
            splitCheck : splitCheck,
            jsonObj : JSON.stringify(onlineDetWrapObj)
        });
        action.setCallback(this,function (response) {
            var state = response.getState();            
            if (state === "SUCCESS") {
                //returnStatus = updateSuccess + '#' + errorText + '#' + returnSplitOrUpdate;
                var retunStatus = response.getReturnValue();
                //alert('retunStatus:'+retunStatus);
                var retStats = retunStatus.split("#");
                if(retStats[0] == 'false'){
                    alert(retStats[1]);
                } else {
                    alert(retStats[2] +' Was Successful');
                   // location.reload();
                    window.close();
                }
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        
        $A.enqueueAction(action);
    },
    
    successToast: function(component,event,helper,text){        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Success!",
            message: text,
            type: "success",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
    errorToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error!",
            message: text,
            type: "error",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
    warningToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Warning!",
            message: text,
            type: "Warning",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
})