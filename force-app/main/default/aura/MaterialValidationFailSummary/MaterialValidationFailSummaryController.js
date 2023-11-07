({
	doint : function(component, event, helper){
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide"); 
        helper.fetchAccordianHeaderDetails(component, event, helper);
    },
    
    handleChildEvent: function(component,event,Helper) {
        var rowNo = event.getParam('rowNo');
        var errorCodeDetailList = event.getParam('errorCodeDetailList');
        var accordianList = component.get('v.accordianHeader');
        accordianList[rowNo].validationErrorCodeList = errorCodeDetailList;
        component.set('v.accordianHeader',accordianList);
    },
})