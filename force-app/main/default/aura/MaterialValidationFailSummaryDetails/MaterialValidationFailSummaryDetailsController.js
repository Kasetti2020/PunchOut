({
    doinit : function(component, event, helper) {
        var rowNo = component.get('v.rowIndex');
        
        var errorDetailList = component.get('v.accordianHeader.validationErrorCodeList');
        for(var i=0; i<errorDetailList.length; i++){
            errorDetailList[i].errorReportLink += 'fv0=' + component.get('v.batchNumber') + '&fv1=' + errorDetailList[i].errorCode;
            //alert(errorDetailList[i].errorReportLink)
        }
        component.set("v.accordianHeader.validationErrorCodeList", errorDetailList);
        
        
        //+ '&fv1=' + errCodeDet.errorCode v.accordianHeader.validationErrorCodeList
        
        /*if(rowNo == 0){
            //alert('rowNo:'+rowNo);
            var chevronright = component.find('chevronright');
            var chevrondown = component.find('chevrondown');
            
            //$A.util.toggleClass(chevronright, 'slds-hide');
            $A.util.toggleClass(chevrondown, 'slds-hide');
            var getAttributeValue = component.get("v.checkThis");
            if(getAttributeValue==true){
                
                var errorType = component.get("v.accordianHeader.picklistValue");
                //alert('errorType:'+errorType);
                helper.fetchValidationFailSummaryOnErrorType(component, event, helper, errorType);
                
                component.set("v.checkThis", false);
                component.set('v.expanded',true);
            }
            else{
                component.set("v.checkThis", true);
                component.set('v.expanded',false);
            }
        }*/
    },
    
    toggle: function(component, event, helper) {
        
        var errorType = event.currentTarget.name;
        var rowNo = component.get('v.rowIndex');
        //alert('rowNo:'+rowNo);
        
        var chevronright = component.find('chevronright');
        var chevrondown = component.find('chevrondown');
        
        $A.util.toggleClass(chevronright, 'slds-hide');
        $A.util.toggleClass(chevrondown, 'slds-hide');
        var getAttributeValue = component.get("v.checkThis");
        if(getAttributeValue==true){
            
            //alert('errorType:'+errorType);
            //helper.fetchValidationFailSummaryOnErrorType(component, event, helper, errorType);
            
            component.set("v.checkThis", false);
            component.set('v.expanded',true);
        }
        else{
            component.set("v.checkThis", true);
            component.set('v.expanded',false);
        }
        
    },
})