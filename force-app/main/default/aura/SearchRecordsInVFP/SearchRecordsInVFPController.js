({
    
    doInit : function(component, event,helper,page) 
    { 
        var cartonDetRecordId = component.get("v.cartonDetRecordId");
        // alert('cartonDetRecordId ::'+cartonDetRecordId);
        
        var storeIdRecord = component.get("v.storeidName");
        //alert('cartonDetRecordId ::'+cartonDetRecordId);
        
         var storeName = component.get("v.storeName");
        //alert('storeName ::'+storeName);
        
        if (storeIdRecord != '') {
            component.set("v.selectedStoreIdRecord", storeIdRecord + ' '+ storeName);
            // alert('storeResponse ::'+storeIdRecord);
            component.set("v.disablepill",'true');
            var forclose = component.find("lookup-pill");
            $A.util.addClass(forclose, 'slds-show');
            $A.util.removeClass(forclose, 'slds-hide');
            
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
            
            var lookUpTarget = component.find("lookupField");
            $A.util.addClass(lookUpTarget, 'slds-hide');
            $A.util.removeClass(lookUpTarget, 'slds-show');
            
        } 
        else {
            component.set("v.selectedStoreIdRecord", '' );   
             component.set("v.disablesaveButton",'true');
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
        //alert('getInputkeyWord :'+getInputkeyWord);
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
        component.set("v.selectedStoreIdRecord", {} );   
        //$A.get('e.force:refreshView').fire();
    },
    
    handleComponentEvent : function(component, event, helper) {
        // get the selected Account record from the COMPONETN event 	 
        
        var selectedrecordByEvent = event.getParam("recordByEvent");        
        if(selectedrecordByEvent != null && selectedrecordByEvent != ""){            
            component.set("v.disablesaveButton",'true');
            component.set("v.selectedStoreIdRecord" , selectedrecordByEvent.Name + ' '+ selectedrecordByEvent.Store_Name__c);
            //alert('selectedrecordByEvent :;'+selectedrecordByEvent.Name);
            component.set("v.searchpill" , selectedrecordByEvent.Id);
            
            var searchText =  component.get("v.searchpill");
            //alert('searchText :'+searchText);
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
    
    Save : function(component,event,getInputkeyWord) {
        var cartonDetRecordId = component.get("v.cartonDetRecordId");
        //alert('cartonDetRecordId ::'+cartonDetRecordId);
        
        var selectedStoreId = component.get("v.searchpill");
        // alert('selectedStoreId :'+selectedStoreId);
        if(selectedStoreId == null || selectedStoreId == ''){
            component.set("v.forErrorMsg",'true');
            return;
        }
        
        var JSONStr = JSON.stringify(selectedStoreId); 
        //alert("JSONStr:"+JSONStr);
        var action = component.get("c.SaveStoreId");
        // alert('action ::'+action);
        action.setParams({
            'selectedStoreId1': selectedStoreId,
            'cartonDetRecordId1' : cartonDetRecordId
            
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            // $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            //alert('state ::'+state);
            if(state == 'SUCCESS'){
                component.set("v.forSuccessMsg",'true');
                //component.set("v.selectedStoreIdRecord", '');
                component.set("v.disablesaveButton",'false');
                component.set("v.disablepill",'true');
                
                var sampleEvent = $A.get("e.c:LCtoVFRefresh");
                //Set Parameter Value
                sampleEvent.setParams({"msg":"Hello World!!"});
                //Fire Event
                sampleEvent.fire();
                // window.location.reload();
            }
        });
        $A.enqueueAction(action); 
       
    },
    
    OnEdit : function(component,event,getInputkeyWord) {
        component.set("v.disablepill",'false');
        component.set("v.disablesaveButton",'true');
        
    },
    
})