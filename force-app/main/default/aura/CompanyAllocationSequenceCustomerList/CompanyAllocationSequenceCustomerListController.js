({
    doint : function(component, event, helper,page) 
    {
        //alert('dvchxjnc');
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide"); 
        helper.fetchRA(component, event, helper,page);
    },
    StatusFilter : function(component, event, helper)
    {
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");
        helper.fetchSO(component, event, helper);
    },
    pageChange: function(component, event, helper) {
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");
        var page = component.get("v.page") || 1;
        //alert('page :'+page);
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.fetchRA(component, event, helper,page);
    },
    
    handleSearchEvent : function(component, event) {
        var retailereventvalue = event.getParam("retailerObj");
        //alert('retailereventvalue :'+retailereventvalue.Id);
        component.set('v.SelectedRetailerObj',retailereventvalue);
        
        var wrap = event.getParam("POList");
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var txt = event.getParam("searchtext");
        
        
        
        if(flag==true && type=='OrderHistory'){
            component.set('v.searchText',txt);
            component.set('v.SOresponse',wrap.reuseOrdclass);
            component.set('v.total', wrap.totalRecords);
            component.set('v.page',	wrap.page);
           // alert(' page :'+	wrap.page);
            component.set('v.pages', Math.ceil(wrap.totalRecords/wrap.pageSize));
        }
        
        
        else if(flag==false){
            var urlString = window.location.href;
            
            
            var eUrl= $A.get("e.force:navigateToURL");
            eUrl.setParams({
                "url": urlString 
            });
            eUrl.fire();
            //$A.get('e.force:refreshView').fire();
            //helper.fetchSO(component, event, helper,page);
        }
    },
    handleComponentEvent: function(Component,Event,Helper)
    {
        var Data = Event.getParam('data');
        var flag = Event.getParam('flag');
        if(flag=='openCart')
        {
            Component.set("v.SelectedRetailerName",Data.RetailerName);
            //alert(' Data.RetailerName :'+Data.RetailerName);
            Component.set("v.SelectedRetailer",Data.RetailerId);
            Component.set("v.navToCart",true);
        }
    },
    
    handleAddCmp: function(Component,Event,Helper){
        //alert('handleClick')
        Component.set("v.addCmpFlag",true);
        Component.set("v.navToAddCmp",false);
        
    },
    
    handlePageListEvent: function(Component,Event,Helper) {
        var parentId = Event.getParam('parentId');
        var retailerDetail = Event.getParam('retailerDetails');
        //alert('retailerDetails:'+retailerDetail);
    	Component.set("v.isEdit",true);
        Component.set("v.reuseOrdId",parentId);
        Component.set("v.retailerDetail",retailerDetail);
        Component.set("v.addCmpFlag",true);
        Component.set("v.navToAddCmp",false);
    },
    
    
})