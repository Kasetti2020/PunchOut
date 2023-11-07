({
    doint : function(component, event, helper,page) 
    {
        //alert('dvchxjnc');
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide"); 
        helper.fetchSO(component, event, helper,page);
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
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.fetchSO(component, event, helper,page);
    },
    
    handleSearchEvent : function(component, event) {
        var wrap = event.getParam("POList");
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var txt = event.getParam("searchtext");
        
        
        
        if(flag==true && type=='OrderHistory'){
            component.set('v.searchText',txt);
            component.set('v.SOresponse',wrap);
            component.set('v.total', wrap.totalRecords);
            component.set('v.page',	wrap.page);
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
            Component.set("v.SelectedRetailer",Data.RetailerId);
            Component.set("v.navToCart",true);
        }
    },
     getRevisedSOCompany : function(component, event, helper) {
    	
       
            component.set("v.RevisedSOCompanyCmp",true);
          component.set("v.MainFlag",true);
         },
     getRevisedSOCurrency : function(component, event, helper) {
    	
       
            component.set("v.RevisedSOCurrencyCmp",true);
          component.set("v.MainFlag",true);
         }
    
})