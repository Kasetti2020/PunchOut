({
    handleClick : function(component, event, helper) {
        var type = component.get('v.searchType');
        //alert('Hi');
         var searchText = component.get('v.searchText');
        if(type=="OpenPO"){
            helper.getPOList(component, event, helper);
        }
        if(type=="OrderHistory"){
            helper.getSOList(component, event, searchText);
        }
        if(type=="BulkApproval"){
            helper.getBulkSOList(component, event, helper);
        }
        if(type=="PrintShopSO"){
            helper.getSOListforPrintShop(component, event, helper);
        }
    },
    searchTextClear: function(component, event, helper) {
        
    },
    keyCheck: function(component, event, helper) {
        var value = component.get("v.searchText");
      // alert('Key check value :'+value);
        //helper.getSOList(component, event, value);
        if(component.get("v.searchText")=='' || component.get("v.searchText")==null || component.get("v.searchText")==undefined){
            var cmpEvent = component.getEvent("searchRetailerEvent");
            cmpEvent.setParams({
                "flag" : false });
            cmpEvent.fire();
        }
    },
     onblur : function(component,event,helper){       
        component.set("v.listOfSearchRecords", null );
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
        component.set("v.listOfUserSearchRecords", null );
        var forclose = component.find("searchUserRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
    keyPressController : function(component, event, helper) {
        var getInputkeyWord = component.get("v.SearchKeyWord");
       // alert('getInputkeyWord :'+getInputkeyWord);
        if( getInputkeyWord.length > 0 ){             
            var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchHelper(component,event,getInputkeyWord);
        }
        else{  
            component.set("v.listOfSearchRecords", null ); 
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
    },
      clear :function(component,event,heplper){
        var pillTarget = component.find("lookup-pill");
        var lookUpTarget = component.find("lookupField"); 
        
        $A.util.addClass(pillTarget, 'slds-hide');
        $A.util.removeClass(pillTarget, 'slds-show');
        
        $A.util.addClass(lookUpTarget, 'slds-show');
        $A.util.removeClass(lookUpTarget, 'slds-hide');
        
        component.set("v.SearchKeyWord",null);
        component.set("v.listOfSearchRecords", null );
        component.set("v.selectedRetailerRecord", {} );   
           $A.get('e.force:refreshView').fire();
    },
    
     handleComponentEvent : function(component, event, helper) {
        // get the selected Account record from the COMPONETN event 	 
        //console.log('InsidehandleComponentEvent:');
        
        var selectedrecordByEvent = event.getParam("recordByEvent");        
        if(selectedrecordByEvent != null && selectedrecordByEvent != ""){            
            
            component.set("v.selectedRetailerRecord" , selectedrecordByEvent);
             component.set("v.searchpill" , selectedrecordByEvent.Name);
            var searchText =  component.get("v.searchpill");
             //alert('searchText :'+searchText);
            helper.getSOList(component, event, searchText);
            
            var forclose = component.find("lookup-pill");
            $A.util.addClass(forclose, 'slds-show');
            $A.util.removeClass(forclose, 'slds-hide');
            
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
            
            var lookUpTarget = component.find("lookupField");
            $A.util.addClass(lookUpTarget, 'slds-hide');
            $A.util.removeClass(lookUpTarget, 'slds-show');
            component.set('v.variable1',true);
          
            
                       }
         
     },
})