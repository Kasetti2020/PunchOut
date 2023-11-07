({
    doinit : function(component, event, helper) 
    { 
		/*var dataPromise = helper.fetchData(component, component.get("v.recordId"));
        dataPromise.then($A.getCallback(function(results) {
            console.log(`Got the results??${JSON.stringify(results.SOList[0])}`);
            component.set('v.SOdetails', results.SOList[0]);
        }));*/
        helper.fetchData(component, component.get('v.recordId'));
        //console.log(`Received Data>>>${component.get("v.SOdetails")}`);
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
    	component.set('v.today', today);
        /*var SOdetails = component.get("v.SOdetails.SO");
       	if(SOdetails.Status__c == 'Order Under Processing')	//changed on 08/01/2020
       	{
            component.set("v.cancancel",false);
       	}
       	helper.newdetails(component, event, helper);*/
    },
    
    closeOrderChangeRequest : function(component, event, helper) {
        component.set("v.OpenOrderChangeRequest",false);  
        $A.get('e.force:refreshView').fire();
        
    },
    //cancel entire Order 
    confirmcancelOrder : function(component, event, helper) 
    { 
        //alert('confirmcancelOrder');
        component.set("v.isconfirmModalOpen", true);
    },
    // cancel the revise order with reason 
    cancelRevOrder : function(component, event, helper) 
    {
        	component.set("v.showSpinner",true);
        	component.set("v.isCancelled",true);
        //alert('selected value'+component.get("v.ltngSelectedvalue"));
        //to make old header and lineitem list to empty 
            var headerList = component.get("v.ReviseHeaderList");
            var ReviseLineList = component.get("v.ReviseLineList");
            var SODetails = component.get("v.SOdetails");
            var Cloneheader = component.get("v.ReviseHeaderList");	//  its empty existing list
            var selectedcancelReason = component.get("v.ltngSelectedvalue");
            component.get("v.ReviseHeaderList").splice(0,component.get("v.ReviseHeaderList").length);
            component.get("v.ReviseLineList").splice(0,component.get("v.ReviseLineList").length);
            
        	var objRecord = {'Mainetti_SO__c' : SODetails.SO.Id, 'What_to_Revise__c' : 'Cancel Order','Revised__c':'true','Reason_to_Cancel__c':selectedcancelReason};
            Cloneheader.push(objRecord);
            component.set("v.ReviseHeaderList", Cloneheader);
            helper.saveRequest(component, event, helper);
        	let isCancelledFlag = component.get("v.isCancelled");
            if(isCancelledFlag){
            	helper.updateAfterSuccess(component, event, helper);
                	/*var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: "Succces",
                        message: 'Cancelled Successfully',
                        type: "success"
                    });
                    toastEvent.fire();*/
        	}
    },
    
    // for remove the index of SOLI by cancelling it 
    CancelLineEvent : function(component, event, helper) {
        var index = event.getParam("index");
        var headerList = component.get("v.ReviseHeaderList");
        headerList.splice(index, 1);
        component.set("v.ReviseHeaderList",headerList);  
    },
    //for submit button 
    saveChangeRequest : function(component, event, helper) {
        component.set("v.RemoveButton",true);
        component.set("v.showSpinner",true);
        helper.saveRequest(component, event, helper);
    },
    //add change request button 
    AddHeaderDetails : function(component, event, helper) 
    { 
        var index = event.target.id;
        helper.AddRequest(component, event, helper, index);
    },
    closeModel: function(component, event, helper)
    {
        location.reload();
    },
    closeModal : function(component, event, helper) 
    {
        //alert('Inside closeModal');
        //alert('Close Flag>>'+component.get("v.CloseCurrentWindow"));
        component.set("v.CloseCurrentWindow",false);
        if(component.get("v.CloseCurrentWindow"))
        {
            window.close();
        }
        else
        {
            $A.get("e.force:closeQuickAction").fire();
        } 
    },
    closeCancel: function(component, event, helper){
        component.set("v.isconfirmModalOpen",false);
    }
})