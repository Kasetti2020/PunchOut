({
    doInit : function(component, event,helper,page) 
    {
        //helper.GetcustomInfoid(component, event, helper);
        //var res = helper.pickListVal(component,component.get("v.SelectedRetailer"),'Retailer_Code_Hidden__c','Order_Country__c');
        //var res = helper.pickListVal(component ,'','BEST & LESS','Retailer_Code_Hidden__c','Order_Country__c');
        //alert('res :'+res);
        // helper.getCartCount(component, event, helper);
         var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide"); 
        var retailer = component.get("v.selectedRetailerRecord");
       // alert('retailer :'+retailer.Name);
        var isEdit = component.get('v.isEdit');
        if(isEdit){
            var retailerDet = component.get('v.retailerDetail');
            var retailerDetailList = retailerDet.split("$");
            //alert(retailerDetailList[1]);
            component.set("v.retailerDetailListName" , retailerDetailList[1]);
             helper.pickListVal(component ,'',retailerDetailList[1],'Retailer_Code_Hidden__c','Order_Country__c');
        } else {
            helper.pickListVal(component ,'',retailer.Name,'Retailer_Code_Hidden__c','Order_Country__c');
            component.set("v.retailerDetailListName" , retailer.Name);
        }
        //helper.pickListVal(component ,'',retailer.Name,'Retailer_Code_Hidden__c','Order_Country__c');
        //helper.addRowInit(component, event, helper);
        
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
    },
    
    handleComponentEvent : function(component, event, helper) {
        // get the selected Account record from the COMPONETN event 	 
        //console.log('InsidehandleComponentEvent:');
        
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
            component.set('v.variable1',true);
            var res = helper.pickListVal(component ,'',selectedrecordByEvent.Name,'Retailer_Code_Hidden__c','Order_Country__c');
            
            var isEdit = component.get('v.isEdit');
            if(isEdit){
                var reuseOrdId = component.get('v.reuseOrdId');
                helper.companySearchForEdited(component,event,helper,reuseOrdId);
            }
        }
         
     },
    
    addRow: function(component, event, helper) {
        
        var indexVal = component.get('v.indexVal');
        console.log('indexVal Initial:'+indexVal);
        
        var compList = component.get('v.listOfCompanies');
        for(var k=0; k<compList.length; k++){
            //console.log('BeforeRemove:'+compList[k].label+'--> '+compList[k].selected);                            
        }
        
       var cmpMap;
        if(indexVal != 0){            
            cmpMap = component.get('v.listOfCompaniesMap');
            var cmpList = component.get('v.listOfCompanies');
            var selectedList = component.get('v.selectedCompanyList');
            var selectedListString = selectedList.toString();
            var filteredList = [];            
            
            for(var i=0; i<cmpList.length; i++){
                if(!selectedListString.includes(cmpList[i].id)){
                    filteredList.push(cmpList[i]);
                }
            }
            cmpMap[indexVal] = filteredList;
            
        } else {
            console.log('indexVal=0:'+indexVal);
            var cmpList = component.get('v.listOfCompanies');
            cmpMap = new Map();
            cmpMap[indexVal] = cmpList;
        }
        //console.log('cmpMap:'+cmpMap);        
        component.set('v.listOfCompaniesMap',cmpMap);        
        
        helper.addAccountRecord(component, event,indexVal);        
        //var selectedComListGet = component.get("v.selectedCompanyList");
    },
    
    removeRow: function(component, event, helper) {
        var accountList = component.get("v.accountList");
        var selectedItem = event.currentTarget;
        var index = selectedItem.dataset.record;
        //alert('index:'+index);
        
        /*Also Remove the selected company for a perticular row from the selectedList
        so that the company dropdown list will not be filtered for that row.*/
        var selCompany = accountList[index].selectedCountry;
        var selectedList = component.get('v.selectedCompanyList');
        for(var i=0; i<selectedList.length; i++){
            if(selectedList[i] == selCompany){
                selectedList.splice(i, 1);
            }
        }
        
        
        accountList.splice(index, 1);
        component.set("v.accountList", accountList);
        //component.set("v.accountListafterdelete", accountList);
    },     
    
    handleConfirmDialogYes : function(component, event, helper) {
        console.log('Yes');
        var companydeleted = component.get("v.accountListafterdelete");
        component.set("v.accountList", companydeleted);
        //helper.deleteselectedrow(component, event,helper,accountList);
        
        var text = 'You Removed a List';
        helper.successToast(component,event,helper,text);
        component.set('v.showConfirmDialog', false);
    },
     
    handleConfirmDialogNo : function(component, event, helper) {
        console.log('No');
        component.set('v.showConfirmDialog', false);
    },
    
    OrderToCompany:function(component, event, helper) {
                
        var compName = event.getSource().get("v.value");        
        var selectedComList = component.get("v.selectedCompanyList");
        selectedComList.push(compName);
        component.set("v.selectedCompanyList", selectedComList);
        
        //console.log('compName:'+compName);
        
        var indexVal = event.getSource().get("v.name");
        var cmpMap = component.get('v.listOfCompaniesMap');
        var cmpList = cmpMap[indexVal];
        
        for(var i=0; i<cmpList.length; i++){
            if(cmpList[i].id == compName){                
                cmpList.splice(i, 1);
            }            
        }
                
        cmpList.push({id: compName,
                      label: compName,
                      selected: true
                     });
        var accountList = component.get("v.accountList");
        accountList[indexVal].Order_Country__c = cmpList;
        //accountList[indexVal].selectedCountry = compName;
        component.set("v.accountList", accountList);        
        //console.log('indexVal:'+indexVal);
    },
    
    save: function(component, event, helper) {
        var wrapObjToInsert = component.get("v.accountList");
        var readyToSave = true;
        for(var i=0; i<wrapObjToInsert.length; i++){
            
            var cmp = wrapObjToInsert[i].selectedCountry;
            //var seqNo = wrapObjToInsert[i].Sequencenumber;
            var region = wrapObjToInsert[i].Region;
            var subRegion = wrapObjToInsert[i].subRegion;
            //alert('seqNo:'+seqNo+'\n'+'cmp:'+cmp+'\n'+'region:'+region+'\n'+'subRegion:'+subRegion);
            if(cmp == '' || cmp == 'NONE' || region == '' || subRegion == ''){
                readyToSave = false;
                var text = 'Please Enter all the required fields';
                helper.warningToast(component,event,helper,text)
            }
        }
        
        if(readyToSave){
            helper.saveAccountList(component, event);
        }
        //helper.saveAccountList(component, event);
    },
    
     SelectRegion:function(component, event, helper)
    {
       // alert('hi');
        var compName = event.getSource().get("v.value");
        //alert('compName :'+compName);
        helper.pickListValRegion(component, event, helper);
    },
    SelectedCompany:function(component, event, helper){
        var compName = event.getSource().get("v.value");
       // alert('compNamess :'+compName);
        var actionCall = component.get("c.getDependentPicklist");
        actionCall.setParams({
            "compName":	compName,
        });
        actionCall.setCallback(this, function(response){
            
            var state = response.getState();
            //alert(response.getReturnValue());
            if (state === "SUCCESS") 
            {
                component.set('v.listOfCompanies',response.getReturnValue());              
            }
        });
        $A.enqueueAction(actionCall);  
    },
     cancel : function(component, event, helper) {
          $A.get('e.force:refreshView').fire();
        //component.set('v.pagelistCmpFlag', true);
        //component.set('v.variable1', false);
    },
    
    
    
})