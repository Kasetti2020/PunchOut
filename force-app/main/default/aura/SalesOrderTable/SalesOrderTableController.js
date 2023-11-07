({
	doinit : function(component, event, helper) 
    {
        var rowIndex = component.get("v.rowIndex");
        var SOrder = component.get("v.SOrder");
        //alert(SOrder.SO.Supplier__c);
        //console.log('SOrder in salesorder table>>'+JSON.stringify(component.get("v.SOrder")));
        if(SOrder.SOLI != null && SOrder.SOLI.length==0)
            component.set("v.expanded",false);
        
        if(SOrder.SO.Status__c=='Cancelled'||SOrder.SO.Enquiry_Status__c=='Order submitted'||SOrder.SO.Enquiry_Status__c=='Order Locked' || SOrder.SO.Status__c == 'Partially Shipped' || SOrder.SO.Status__c == 'Fully Shipped' || SOrder.SO.Status__c == 'Approve Pending'||SOrder.SO.Enquiry_Status__c=='Change Approved'||SOrder.SO.Status__c == 'Under Processing'||SOrder.SO.Enquiry_Status__c=='Pending for change approval')
        	component.set("v.canRevise",false);
        if(SOrder.SO.Status__c == 'Approve Pending'||SOrder.SO.Status__c == 'Under Processing'||SOrder.SO.Enquiry_Status__c=='Pending for change approval')
        {
            component.set("v.isViewReviseReqAllowed",true);
        }
        if((SOrder.SO.Status__c == 'Revised' && SOrder.SO.Enquiry_Status__c=='Change Received') || (SOrder.SO.Status__c == 'Revised' && SOrder.SO.Enquiry_Status__c=='Change Rejected'))
        {
            component.set("v.isViewReviseReqAllowed",false);
        }
        //alert('SalesOrderTable doinit:'+SOrder.SOLI.length+' so '+SOrder.SO.Name);
        //console.log('SalesOrderTable SOrder:'+JSON.stringify(SOrder.SOLI));
        //alert('SalesOrderTable doinit:');
    },
    viewchangerequest: function(component, event, helper) {
        
        component.set("v.toViewReviseReq",true);
    },
     toggle: function(component, event, helper) {
        var chevronright = component.find('chevronright');
        var chevrondown = component.find('chevrondown');
        
        $A.util.toggleClass(chevronright, 'slds-hide');
        $A.util.toggleClass(chevrondown, 'slds-hide');
        var getAttributeValue = component.get("v.checkThis");
        if(getAttributeValue==true){
            component.set("v.checkThis", false);
            component.set('v.expanded',true);
        }
        else{
            component.set("v.checkThis", true);
            component.set('v.expanded',false);
        }
       
    },
    changerequest: function(component, event, helper)
    {
        var SOrder= component.get("v.SOrder");
      	if(SOrder.SO.Status__c == 'Cancelled'|| SOrder.SO.Status__c == 'Partially Shipped' || SOrder.SO.Status__c == 'Fully Shipped')
        {
            //alert('order is already '+SOrder.SO.Status__c+' cannot Revise');
             var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.order_is_in") +SOrder.SO.Status__c+  $A.get("$Label.c.Status_Cannot_Revise"),
                        type: "warning"
                    });
                    toastEvent.fire();
            component.set("v.showOrderChangeRequest",false);
        }
        else
        {
            component.set("v.showOrderChangeRequest",true);
        }
        
        //component.set("v.showOrderChangeRequest",true);
    },
    
    ViewSO : function(component, event, helper)
    {
        component.set('v.isOpen',true);
    },
    ViewSO : function(component, event, helper)
    {
        var viewSOID = component.get("v.SOrder.SO.Id");
        
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        //urlString = CommunityBaseURL+"/apex/SOCustomerPDF"+"?Id="+viewSOID;
        urlString = CommunityBaseURL+"/apex/SOConfirmationPDF"+"?Id="+viewSOID+"&sol=1";
        var win = window.open(urlString, '_blank');
        
        //component.set("v.isOpenSOLI",true);
        //alert('After ID viewSOLIID>>>'+component.get("v.viewSOLIID"));
    },
    ViewSOLI : function(component, event, helper)
    {
        var viewSOLIID = event.getSource().get("v.name");
        var viewSOLIName = event.getSource().get("v.value");
        //alert('viewSOLIName>>>'+viewSOLIName);
        component.set("v.viewSOLIID",viewSOLIID);
        component.set("v.viewSOLIName",viewSOLIName);
        
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        urlString = CommunityBaseURL+"/apex/SOLICustomerPDF"+"?Id="+viewSOLIID;
        //urlString = CommunityBaseURL+"/apex/SOConfirmationPDF"+"?DefaultBillToID="+BillAdd.Id+"&DefaultShippToID="+ShipAdd.Id;
        var win = window.open(urlString, '_blank');
        
        //component.set("v.isOpenSOLI",true);
        //alert('After ID viewSOLIID>>>'+component.get("v.viewSOLIID"));
    },
    
    
    closeModal: function(component, event, helper)
    {
        component.set("v.isOpen",false);
        
    },
    closeModalSOLI: function(component, event, helper)
    {
        
        component.set('v.isOpenSOLI',false);
        
    },
    cloneOrder: function(component, event, helper)
    {
        helper.cloningSO(component, event, helper);
    },
    
})