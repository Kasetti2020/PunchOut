({
    
    addAccountRecord: function(component, event,indexVal) {
        //alert(indexVal);
        var listAfterSplice = component.get("v.listOfCompanies");        
        
        var cmpMap = component.get('v.listOfCompaniesMap');
        var compList = cmpMap[indexVal];
        //console.log('cmpMap[indexVal]:'+cmpMap[indexVal]);
        
        var accountList = component.get("v.accountList");
        accountList.push({
            'sobjectType': 'CompanyAllocationObj',
            'Order_Country__c': compList,
            'selectedCountry': '',
            'Region': '',
            'subRegion': '',
            'active': true,
            //'Sequencenumber': '',
        });
        component.set("v.accountList", accountList);
        indexVal = indexVal + 1;
        component.set('v.indexVal',indexVal);
        
        //alert('accountList :'+accountList);
        // helper.pickListVal(component, controllingValue, controllingFields, dependentField);
    },
    searchHelper : function(component,event,getInputkeyWord) {
        
        // call the apex class method 
        var action = component.get("c.fetchLookupRetailer"); 
        action.setParams({
            'enteredValue': getInputkeyWord
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {                
                var storeResponse = response.getReturnValue();
                //alert('storeResponse :'+storeResponse);
                // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
                component.set('v.variable1',true);
            }
            
        });
        $A.enqueueAction(action);        
    },
    
    searchUserHelper : function(component,event,getInputkeyWord) {
        
        // call the apex class method 
        //alert('getInputkeyWord :'+getInputkeyWord);
        var action = component.get("c.fetchLookupUserdataList"); 
        action.setParams({
            'enteredValue': getInputkeyWord
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {                
                var storeResponse = response.getReturnValue();
                alert('storeResponse :'+storeResponse);
                // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfUserSearchRecords", storeResponse);
                //component.set('v.selectedCompany', res.Ocomp);
            }
            
        });
        $A.enqueueAction(action);        
    },
    pickListVal:function(component,compName, controllingValue, controllingFields, dependentField,helper) 
    {
        console.log('InsidepickListVal:');
        //alert('controllingValue:'+controllingValue+' controllingFields:'+controllingFields+' dependentField:'+dependentField+' compName:'+compName);
        var actionCall = component.get("c.getDependentPicklistValues");
        actionCall.setParams({
            "controllingValue":	controllingValue,
            "controllingFields": controllingFields,
            "dependentField": dependentField,
            "selectedValue":compName
        });
        actionCall.setCallback(this, function(response) {
            var state = response.getState();
            //alert(response.getReturnValue());
            if (state === "SUCCESS") {
                var responseList = response.getReturnValue();
                //component.set('v.listOfCompanies',response.getReturnValue());
                var companyConcatList = [];
                for(var i=0; i<responseList.length; i++){
                    companyConcatList.push({id: responseList[i],
                                            label: responseList[i]
                                           });
                }
                //console.log('companyConcatList:'+companyConcatList);
                component.set('v.listOfCompanies',companyConcatList);
                
                var isEdit = component.get('v.isEdit');
                //alert('isEdit:'+isEdit);
                if(isEdit){
                    var reuseOrdId = component.get('v.reuseOrdId');
                    this.companySearchForEdited(component,event,helper,reuseOrdId);
                } else {
                    this.addRowInit(component, event, helper);
                }
                //this.addRowInit(component, event, helper);
                
            }
            else if (state === "ERROR") {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
             var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");
        });
        $A.enqueueAction(actionCall);       
    },
    saveAccountList: function(component, event, helper) {
        //Call Apex class and pass account list parameters        
        //var retailerCode = component.get("v.selectedRetailerRecord");        
        var acclist = component.get("v.accountList");
        var retailerId;
        
        var isEdit = component.get('v.isEdit');
        if(isEdit){
            var retailerDet = component.get('v.retailerDetail');
            var retailerDetailList = retailerDet.split("$");
            retailerId = retailerDetailList[0];
        } else {
            var retailerCode = component.get("v.selectedRetailerRecord");
            retailerId = retailerCode.Id;
        }
        
        var stringList = JSON.stringify(acclist); 
        //alert('acclist :'+acclist);
        //alert('stringList :'+stringList);
        var action = component.get("c.saveCompanyLists");
        action.setParams({
            "jsonObj": stringList,
            "retailerCode": retailerId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //component.set("v.accountList", []);
                var insertStatus = response.getReturnValue();                
                if(insertStatus){
                    var text = 'Company Allocations Created successfully';
                     component.set('v.Hidesubmit', true); 
                    this.successToast(component,event,helper,text)     
                    $A.get('e.force:refreshView').fire();
                } else {
                    var text = 'Failed to Create Company Allocations';
                    this.errorToast(component,event,helper,text)
                }
                //component.set('v.pagelistCmpFlag', true);
                //component.set('v.variable1', false);
                
            }
        }); 
        $A.enqueueAction(action);
    },
    
    companySearchForEdited : function(component,event,helper,reuseOrdId) {
        
        var action = component.get("c.getCompanyAllocated"); 
        action.setParams({
            'reuseOrderId': reuseOrdId
        });  
        action.setCallback(this, function(response) {            
            var state = response.getState();
            if (state === "SUCCESS") {                
                var returnValue = response.getReturnValue();
                if(returnValue.length > 0){
                    var accountList = component.get("v.accountList");
                    var selectedComList = component.get("v.selectedCompanyList");
        
                    for(var i=0; i<returnValue.length; i++){
                        var ordTOComp = returnValue[i].Order_To_Company__c;
                        var region = returnValue[i].Region__c;
                        var subRegion = returnValue[i].Sub_Region__c;
                        var active = returnValue[i].Active__c;                        
                        
                        var cmpMap;
                        if(i != 0){
                            // When i > 0
                            var cmpList = component.get('v.listOfCompanies');                            
                            var selectedListString = selectedComList.toString();
                            var filteredList = [];                            
                            for(var k=0; k<cmpList.length; k++){
                                if(!selectedListString.includes(cmpList[k].id)){
                                    filteredList.push(cmpList[k]); //Filter previously added companies
                                }
                            }
                            
                            for(var l=0; l<filteredList.length; l++){ 
                                if(filteredList[l].id == ordTOComp){                
                                    filteredList.splice(l, 1); //Remove selected company from the list
                                }            
                            }
                            filteredList.push({id: ordTOComp, //and add it back with selected as true
                                label: ordTOComp,
                                selected: true
                               });


                            cmpMap[i] = filteredList;                            
                            accountList.push({
                                'sobjectType': 'CompanyAllocationObj',
                                'Order_Country__c': filteredList,
                                'selectedCountry': ordTOComp,
                                'Region': region,
                                'subRegion': subRegion,
                                'active': active,
                            });
                            
                            selectedComList.push(ordTOComp);                            
                        } else {
                            //Initially when i = 0                            
                            var cmpList = component.get('v.listOfCompanies');                            
                            for(var j=0; j<cmpList.length; j++){ 
                                if(cmpList[j].id == ordTOComp){                
                                    cmpList.splice(j, 1); //Remove selected from the list
                                }            
                            }
                            cmpList.push({id: ordTOComp, //and add it back with selected as true
                                label: ordTOComp,
                                selected: true
                               });

                            cmpMap = new Map();
                            cmpMap[i] = cmpList;                            
                            accountList.push({
                                'sobjectType': 'CompanyAllocationObj',
                                'Order_Country__c': cmpList,
                                'selectedCountry': ordTOComp,
                                'Region': region,
                                'subRegion': subRegion,
                                'active': active,
                            });                            
                            selectedComList.push(ordTOComp);                            
                        }                        
                    }                    
                    var indexVal = accountList.length;
                    component.set('v.indexVal',indexVal);                    
                    component.set("v.selectedCompanyList", selectedComList);
                    component.set("v.accountList", accountList);
                    component.set('v.listOfCompaniesMap',cmpMap);
                }
            }
            
        });
        $A.enqueueAction(action);        
    },
    
    addRowInit: function(component, event, helper) {
        //alert('Inside add row');
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
        
        this.addAccountRecord(component, event,indexVal);        
        //var selectedComListGet = component.get("v.selectedCompanyList");
    },
    
    
    
    successToast: function(component,event,helper,text){        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Success!",
            message: text,
            type: "success",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
    errorToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error!",
            message: text,
            type: "error",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
    warningToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Warning!",
            message: text,
            type: "Warning",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
    
})