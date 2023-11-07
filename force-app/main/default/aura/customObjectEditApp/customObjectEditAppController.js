({
	doInit : function(component, event, helper) 
    {
		//alert('Inside App CloseCurrentWindow>>>>');
        var sPageURL = decodeURIComponent(window.location.search.substring(1));
        //alert('Inside App  window.location.pathname>>>>'+window.location.pathname);
        var pageName = window.location.pathname.split('/apex/,');
        alert('Inside App pageName>>>>'+pageName);
        if(pageName=='/apex/ApproveCustomerRegistryPage')
        {
            alert('Inside App pageName is /apex/ApproveCustomerRegistryPage:');
            component.get("v.CurrentComponentToPass",'c:ActivateCustomer');
            
        }
        
        
        
	},
})