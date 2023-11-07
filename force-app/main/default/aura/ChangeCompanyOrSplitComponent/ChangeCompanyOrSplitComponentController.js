({
    doInit : function(component, event, helper) {
        var onlineEnquiry = component.get("v.OEid");
        var onlineEnquiryCompany = component.get("v.OECompany");
        var onlineEnquiryStatus = component.get("v.OEEnquiryStatus");
        var onlineEnquiryUpdateOrSplit = component.get("v.OEUpdatedOrSplit");
        //alert('onlineEnquiryStatus:'+onlineEnquiryStatus);
        helper.invoke(component,event,helper);
        //var checkboxes = document.getElementsByName("mismatch_check");
    },
    
    onChangeSplit : function(component, event, helper) {
        
        //var isSplit = event.target.Name;
        var splitIndex = event.getSource().get("v.name");
        //alert('splitIndex:'+splitIndex);
        
        var wrapperObject = component.get("v.wrapperObj");
        
        if(wrapperObject[splitIndex].SplitCheck){
            wrapperObject[splitIndex].DisableSplitQty = false;
        } else {
            wrapperObject[splitIndex].DisableSplitQty = true;
        }
        component.set('v.wrapperObj',wrapperObject);
        
        //alert('wrapperObject:'+wrapperObject[splitIndex].DisableSplitQty);
        
        /*for(var i=0; i<wrapperObject.length; i++){
            if(i == splitIndex){
                wrapperObject[i].DisableSplitQty = false;
            }
        }*/
        
        /*var splitCheck = component.get('v.splitCheck');
        if(splitCheck){
            component.set('v.disableSplitQty',false);
        } else {
            component.set('v.disableSplitQty',true);
        }*/
        //alert('splitCheck:'+splitCheck);
    },
    
    cmpOnChange : function(component, event, helper) {
        var selectedOrdToCmp = component.get('v.selectedCompany');
        //alert('selectedOrdToCmp:'+selectedOrdToCmp);
    },
    
    onCancel : function(component, event, helper) {
        window.close();
    },
    onSubmit : function(component, event, helper) {
        var selectedOrdToCmp = component.get('v.selectedCompany');
        if(selectedOrdToCmp == null || selectedOrdToCmp == 'Select'){
            alert('Please Select Order to Company');
            return;
        }
        
        var splitCheck = false;
        var callApex = true;
        var onlineDetWrapObj = component.get("v.wrapperObj");
        for(var i=0; i<onlineDetWrapObj.length; i++){
            if(onlineDetWrapObj[i].SplitCheck){
                splitCheck = true;           
                if(onlineDetWrapObj[i].SplitQuantity == null || onlineDetWrapObj[i].SplitQuantity == ''){
                    callApex = false;
                    alert('Please enter split quantity');
                    return;
                } else if(onlineDetWrapObj[i].SplitQuantity > onlineDetWrapObj[i].Quantity){
                    callApex = false;
                    alert('Split quantity should not be greater then available quantity');
                    return;
                }
                
                if(onlineDetWrapObj[i].SplitQuantity > 0){
                    
                } else {
                    callApex = false;
                    alert('Split quantity should be positive value');
                    return;
                }
                
                var isDecimal = (onlineDetWrapObj[i].SplitQuantity - Math.floor(onlineDetWrapObj[i].SplitQuantity)) !== 0;
                if(isDecimal){
                    callApex = false;
                    alert('Split quantity should not contain decimal values');
                    return;
                }
               
                //break;
            }
        }
        //alert('callApex:'+callApex);
        //alert('splitCheck:'+splitCheck);
        helper.submitOnlineEnquery(component,event,helper,selectedOrdToCmp,splitCheck,onlineDetWrapObj);
    },


    onConfirm: function(component, event, helper){
        //var selectedOrdToCmp = component.get('v.orderToCompanyList');
        var selectedOrdToCmpList = component.get('v.orderToCompanyList');
        
        var splitCheck = false;
        var onlineDetailWrapObj = component.get("v.wrapperObj");
        var onlineEnquiryId = component.get("v.OEid");
        var action=component.get("c.submitOnlineEnquery");
        action.setParams({ 
            onlineEnqId : onlineEnquiryId,
            splitCheck  : splitCheck,
            selOrdToCmp : selectedOrdToCmpList[0],
            jsonObj : JSON.stringify(onlineDetailWrapObj)
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
                    window.close();
                }
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    
})