({
    doInit : function(component, event, helper,page) 
    {
        //page = page || 1; 
       	helper.fetchBulkSalesOrder(component, event, helper,page);
    },
    pageChange: function(component, event, helper) {
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");
        var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.fetchBulkSalesOrder(component, event, helper,page);
    },
    handleSearchEvent : function(component, event) {
        var wrap = event.getParam("POList");
        
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var txt = event.getParam("searchtext");
        
        if(flag==true && type=='BulkApproval'){
            component.set('v.searchText',txt);
            component.set('v.List',wrap.ROList);
            component.set('v.total', wrap.totalRecords);
            component.set('v.page',	wrap.page);
            component.set('v.pages', Math.ceil(wrap.totalRecords/wrap.pageSize));
        }
         else
            $A.get('e.force:refreshView').fire();
    },
     backToSO: function(component, event, helper){
        $A.get('e.force:refreshView').fire();
    }
})