({
    doInit : function(component, event, helper) {
        component.set("v.noEmptyRecord",false);
        helper.initializeRetailer(component,helper);
        component.set("v.SearchKeyWord","");
        component.set("v.SearchUserKeyWord","");
        component.set("v.selectedUserRecord",[]);
        helper.getRetailerPickListValuesss(component, event, helper);
        //  helper.getCompPickListValues(component, event, helper);
    },
    
    addRetailer : function(component, event, helper) {
        document.getElementById('errorMissingSelected').innerHTML='';
        helper.openModal(component,helper);
    },
    
    handleRemoveUserClick : function(component, event, helper) {
        var mainettiCmp = event.getSource().get("v.value");
        var userName = event.getSource().get("v.name");
        var action = component.get("c.deleteUser"); 
        action.setParams({
            "retailercode" : mainettiCmp.Selected_Retailer__c,
            "mainettiName" : mainettiCmp.Company_Name_Holder__c,
            "userName" : mainettiCmp.User_name_holder__c
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {                
                var status =response.getReturnValue();
                if(status){
                    component.rerenderList();
                    var text = 'User deleted successfully.';
                    helper.successToast(component,event,helper,text);
                    component.rerenderList();
                    //window.location.reload();
                }
            }else if(state === "ERROR") {
                var errors = response.getError();
                console.error(errors);                
            }
        });
        $A.enqueueAction(action); 
    },
    
    Save: function(component, event, helper) {
        // var retailer = component.get("v.selectedRetailerRecord");
        var userList = component.get("v.selectedUserRecord");
        // alert('userList:::'+userList);
        var selectedRetailers = component.get('v.selectedRetailer');
        // alert('selectedRetailers:'+selectedRetailers);
        var selectedOrdToCmp = component.get('v.selectedCompany');
        //  alert('selectedOrdToCmp:'+selectedOrdToCmp);
        //  
        if(userList == "" || userList == null || userList.length == 0){
            document.getElementById('errorMissingSelected').innerHTML='Please Select users';
            return;
        }
        if(selectedRetailers == "" || selectedRetailers == null || selectedRetailers =='Select Retailer'){
            console.log('selectedRetailers ::'+selectedRetailers);
            document.getElementById('errorMissingSelected').innerHTML='Please Select Retailer';
            return;
        }
        if(selectedOrdToCmp == "" || selectedOrdToCmp == null || selectedOrdToCmp =='Select'){
            document.getElementById('errorMissingSelected').innerHTML='Please Select Company';
            return;
        }
        //alert(1);
        var action = component.get("c.saveDataa");    
        action.setParams({
            "selectedRetailerr": selectedRetailers,
            "selecctedCompany": selectedOrdToCmp,
            "userList":userList
        });
        
        action.setCallback(this,function (response) {
            var state = response.getState();
            // alert('state ::'+state);
            if (state === "SUCCESS") {                
                var status =response.getReturnValue();
                // alert('status ::'+status);
                if(status){
                    component.rerenderList();
                    helper.clear(component,event,helper);
                    helper.closeModal(component, event, helper);
                    var text = 'Company saved successfully.';
                    helper.successToast(component,event,helper,text);
                }
            }else if(state === "ERROR") {
                var errors = response.getError();
                console.error(errors);                
            }
        });
        $A.enqueueAction(action);        
    },
    
    
    openModal: function(component, event, helper) {
        var modal = component.find("addRetailerModal");
        var modalBackdrop = component.find("addRetailerModalBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },
    closeModal: function(component, event, helper) {
        helper.clear(component,event,helper);
        component.rerenderList();
        var modal = component.find("addRetailerModal");
        var modalBackdrop = component.find("addRetailerModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    
    //Custom Lookup Retailerdata Controllers     
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
        // check if getInputKeyWord size id more then 0 then open the lookup result List and 
        // call the helper 
        // else close the lookup result List part.   
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
    
    keyPressUserController : function(component, event, helper) {
        var getInputkeyWord = component.get("v.SearchUserKeyWord");
        // check if getInputKeyWord size id more then 0 then open the lookup result List and 
        // call the helper 
        // else close the lookup result List part.   
        if( getInputkeyWord.length > 0 ){             
            var forOpen = component.find("searchUserRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchUserHelper(component,event,getInputkeyWord);
        }
        else{  
            component.set("v.listOfUserSearchRecords", null ); 
            var forclose = component.find("searchUserRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
    },
    
    // function to clear the selected retailer 
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
    },
    
    // function to clear the selected user 
    clearUser :function(component,event,heplper){
        
        var userName = event.getSource().get("v.name");    
        var getSelectdUserList = component.get("v.selectedUserRecord");
        console.log("userName:"+userName.Name);
        //var newUserList = [];
        for(var i = 0; i < getSelectdUserList.length; i++){
            if(getSelectdUserList[i].Id == userName){
                getSelectdUserList.splice(i, 1);
                component.set("v.selectedUserRecord", getSelectdUserList);
            }  
        }
        component.set("v.SearchUserKeyWord",null);
        component.set("v.listOfUserSearchRecords", null );  
    },
    
    // This function call when the end User Select any record from the result list.   
    handleComponentEvent : function(component, event, helper) {
        // get the selected Account record from the COMPONETN event 	 
        
        var selectedrecordByEvent = event.getParam("recordByEvent");
        
        
        if(selectedrecordByEvent != null && selectedrecordByEvent != ""){            
            
            component.set("v.selectedRetailerRecord" , selectedrecordByEvent);
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
        var selectedUserrecordByEvent = event.getParam("recordUserByEvent");
        if(selectedUserrecordByEvent != null && selectedUserrecordByEvent != ""){
            var pushToSelectdUser = component.get("v.selectedUserRecord")
            pushToSelectdUser.push(selectedUserrecordByEvent);
            component.set("v.selectedUserRecord" , pushToSelectdUser);
            var forclose = component.find("lookupUser-pill");
            $A.util.addClass(forclose, 'slds-show');
            $A.util.removeClass(forclose, 'slds-hide');
            
            var forclose = component.find("searchUserRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
        
    },
    retailerOnChange : function(component, event, helper) {
        var selectedRetailers = component.get('v.selectedRetailer');
    },
    cmpOnChange : function(component, event, helper) {
        var selectedOrdToCmp = component.get('v.selectedCompany');
        // alert('selectedOrdToCmp:'+selectedOrdToCmp);
    },
})