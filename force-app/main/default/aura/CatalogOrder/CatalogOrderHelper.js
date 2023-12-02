({

    //Family seach functon
    productFamily: function(component, event,helper) //revoked onClick of the search button
        {

        component.set("v.searchedCurrency",component.get("v.selectedCurrency"));
        component.find("Id_spinner").set("v.class" , 'slds-show');
        var action = component.get("c.searchProducts");
        action.setParams({
            'SearchKeyword': null,
            'selectedFamily': component.get("v.selectedFamily"),
            'selectedTab': component.get("v.selectedTab"),
            'retailerCode': component.get("v.SelectedRetailercode"),
            'offsetValue': component.get("v.RecordStart"),
            'orderToCompany': component.get("v.selectedCompany"),
            'preCurrency': component.get("v.selectedCurrency"),
            'pageNumber' : component.get("v.page")
        });
        action.setCallback(this, function(response) {
            // hide spinner when response coming from server 
            component.find("Id_spinner").set("v.class" , 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                
                var res = response.getReturnValue();
                for(var i=0;i< res.productList.length;i++)
                {
                    var tempList=[];
                    for(var key in res.productList[i].ProductDataMap){
                        tempList.push({value:res.productList[i].ProductDataMap[key], key:key,quantity:res.productList[i].ProductDataMap[key].quantity});
                    }
                    res.productList[i].tempMap=tempList;
                    
                }
                //alert('res>>>'+JSON.stringify(res.productFamilyList));
                component.set('v.completeWrap', res);
                //component.set("v.TotalPages", Math.ceil(res.totalRecords / 12)); 
                //component.set('v.RecordStart', 0);
                //component.set('v.RecordEnd', 12);
                //component.set('v.PageNumber', 1);
                //component.set('v.selectedTab',res.tabOverride);
                //component.set('v.TotalRecords', res.totalRecords);
                //component.set('v.total', res.totalRecords);
                component.set('v.total',res.productList.length);
                component.set('v.page',	res.pageNumber);
                component.set('v.pages', Math.ceil(res.totalRecords/res.pageSize));
                component.set('v.listOfCurrency', res.PcurrList);
                if(res.productFamilyList.length!=0)
                	component.set('v.fieldList', res.productFamilyList);
                else
                {
                    component.set('v.selectedFamily','NULL');
                    var temp = [];
                    component.set('v.fieldList',temp);
                }
                
                component.set('v.selectedCompany', res.Ocomp);
                component.set('v.selectedCurrency', res.Pcurr);
                 component.set('v.searchedCurrency', res.Pcurr);
                
                component.set('v.catalogVertical', true);
                component.set('v.sizerhanger', false);
                component.set('v.displayPagination', true);
                component.set('v.careLabelOrder', false);
                //console.log('curerncy'+component.get("v.selectedCurrency"));
                //console.log('selectedCompany'+component.get("v.selectedCompany"));
                //console.log('helper productSearch success'+JSON.stringify(component.set('v.completeWrap')));
                component.set("v.isSearch",true);  
            }
            else if (state === "ERROR") {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
        });
        $A.enqueueAction(action);
       // console.log('helper productSearch');
            
            
    },
    

    //Product seach functon
    productSearch: function(component, event,helper) //revoked onClick of the search button
    {
       if((component.get("v.selectedCurrency") =='NULL') || (component.get("v.selectedCurrency") ==''))
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Select_the_Preferred_Currency"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }   
        
        component.set("v.searchedCurrency",component.get("v.selectedCurrency"));
        component.find("Id_spinner").set("v.class" , 'slds-show');
        var action = component.get("c.searchProducts");
        action.setParams({
            'SearchKeyword': component.get("v.searchKeyword"),
            'selectedFamily': component.get("v.selectedFamily"),
            'selectedTab': component.get("v.selectedTab"),
            'retailerCode': component.get("v.SelectedRetailercode"),
            'offsetValue': component.get("v.RecordStart"),
            'orderToCompany': component.get("v.selectedCompany"),
            'preCurrency': component.get("v.selectedCurrency"),
            'pageNumber' : component.get("v.page")
        });
        action.setCallback(this, function(response) {
            // hide spinner when response coming from server 
            component.find("Id_spinner").set("v.class" , 'slds-hide');
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                
                var res = response.getReturnValue();
                for(var i=0;i< res.productList.length;i++)
                {
                    var tempList=[];
                    for(var key in res.productList[i].ProductDataMap){
                        tempList.push({value:res.productList[i].ProductDataMap[key], key:key,quantity:res.productList[i].ProductDataMap[key].quantity});
                    }
                    res.productList[i].tempMap=tempList;
                    
                }
                //alert('res>>>'+JSON.stringify(res.productFamilyList));
                component.set('v.completeWrap', res);
                //component.set("v.TotalPages", Math.ceil(res.totalRecords / 12)); 
                //component.set('v.RecordStart', 0);
                //component.set('v.RecordEnd', 12);
                //component.set('v.PageNumber', 1);
                //component.set('v.selectedTab',res.tabOverride);
                //component.set('v.TotalRecords', res.totalRecords);
                //component.set('v.total', res.totalRecords);
                component.set('v.total',res.productList.length);
                component.set('v.page',	res.pageNumber);
                component.set('v.pages', Math.ceil(res.totalRecords/res.pageSize));
                component.set('v.listOfCurrency', res.PcurrList);
                if(res.productFamilyList.length!=0)
                	component.set('v.fieldList', res.productFamilyList);
                else
                {
                    component.set('v.selectedFamily','NULL');
                    var temp = [];
                    component.set('v.fieldList',temp);
                }
                
                component.set('v.selectedCompany', res.Ocomp);
                component.set('v.selectedCurrency', res.Pcurr);
                 component.set('v.searchedCurrency', res.Pcurr);
                
                component.set('v.catalogVertical', true);
                component.set('v.sizerhanger', false);
                component.set('v.displayPagination', true);
                component.set('v.careLabelOrder', false);
                //console.log('curerncy'+component.get("v.selectedCurrency"));
                //console.log('selectedCompany'+component.get("v.selectedCompany"));
                //console.log('helper productSearch success'+JSON.stringify(component.set('v.completeWrap')));
                component.set("v.isSearch",true);  
            }
            else if (state === "ERROR") {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
        });
        $A.enqueueAction(action);
        console.log('helper productSearch');
    },
    toGetTabData : function(component, event,helper,tabId)	//revoked onload of catalog order or on selecting another tab
    {
        var page = component.get("v.page");
        var action = component.get("c.searchProducts");
        action.setParams({
            'selectedTab': tabId,
            'retailerCode': component.get("v.SelectedRetailercode"),
            'offsetValue': component.get("v.OffsetValue"),
            'orderToCompany': component.get("v.selectedCompany"),
            'preCurrency': component.get("v.selectedCurrency"),
            'pageNumber' : page
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            { 
                var res = response.getReturnValue();
                console.log('res>>>>'+JSON.stringify(response.getReturnValue()));
                for(var i=0;i< res.productList.length;i++){
                    var tempList=[];
                   //alert(response.getReturnValue().productList[i].Name+'-->'+JSON.stringify(response.getReturnValue().productList[i].ProductDataMap))
                    for(var key in res.productList[i].ProductDataMap){
                        tempList.push({value:res.productList[i].ProductDataMap[key], key:key,quantity:res.productList[i].ProductDataMap[key].quantity});
                    }
                    res.productList[i].tempMap=tempList;
                }
               //alert(res.productList.length);
                //component.set('v.total', res.totalRecords);
                component.set('v.total',res.productList.length);
                component.set('v.page',	res.pageNumber);
                component.set('v.pages', Math.ceil(res.totalRecords/res.pageSize));
               // alert('res ::'+JSON.stringify(res.Ocomp));
                component.set('v.completeWrap', res);
                component.set('v.listOfCurrency', res.PcurrList);
                component.set('v.selectedCompany', res.Ocomp);
                //component.set('v.TotalRecords', res.totalRecords);
                component.set('v.TotalRecords'+res.productList.length);
                console.log('2 No of family options :'+res.productFamilyList.length);
               if(res.productFamilyList.length!=0)
                	component.set('v.fieldList', res.productFamilyList);
                else
                {
                    component.set('v.selectedFamily','NULL');
                    var temp = [];
                    component.set('v.fieldList',temp);
                }
                var listofcomp = component.get('v.listOfCompanies');
                var selectedcom = component.get('v.selectedCompany');
                for(var i =0 ; i<listofcomp.length;i++)
                {
                     //alert('listcurr>>'+JSON.stringify(listofcomp[i])+' selectedcom>> '+selectedcom);
                    if(selectedcom.localeCompare(listofcomp[i])==0)		// if doesent contains 
                    {
                        component.set('v.selectedCurrency', res.Pcurr);
                        component.set('v.searchedCurrency', res.Pcurr);
                    }
                }
                
              component.set("v.showSpinner",false);  
            }
            else if (state === "ERROR") {
                alert('Error : ' + JSON.stringify(response.getError()));
                component.set("v.showSpinner",false);  
            }
        });
        $A.enqueueAction(action);
    },
    /*ProductfamilyList:function(component, event, helper) {
        var action = component.get("c.getPicklistValues");
        action.setParams({
            "retailerCode": component.get("v.SelectedRetailercode"),
            "vertical":  component.get("v.selectedTab")
        });
        action.setCallback(this, function(response) {
            //alert('ProductfamilyList '+JSON.stringify(response.getReturnValue()));
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
                //component.set("v.fieldList", allValues);
            }    
        });
        $A.enqueueAction(action);        
    },*/
    pickListVal:function(component, controllingValue, controllingFields, dependentField) 
    {
        //alert('controllingValue:'+controllingValue+' controllingFields:'+controllingFields+' dependentField:'+dependentField);
        var actionCall = component.get("c.getDependentPicklistValues");
        actionCall.setParams({
            "controllingValue":	controllingValue,
            "controllingFields": controllingFields,
            "dependentField": dependentField
        });
        actionCall.setCallback(this, function(response)
        {
            var state = response.getState();
            //alert(response.getReturnValue());
            if (state === "SUCCESS") 
            {
                if(dependentField=='Order_Country__c')
                {
                  //  alert('listOfCompanies :::'+response.getReturnValue())
                    component.set('v.listOfCompanies',response.getReturnValue());
                }
                else if(dependentField=='Preferred_Currency__c')
                    component.set('v.listOfCurrency',response.getReturnValue());
                
                //alert('listOfCompanies>>'+JSON.stringify(component.get('v.listOfCompanies')));
                 //alert('listOfCurrency>>'+JSON.stringify(component.get('v.listOfCurrency')));
            }
            else if (state === "ERROR") 
            {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
        });
        $A.enqueueAction(actionCall);       
    },
    GetcustomInfoid: function(component, event,helper) {
        var action = component.get("c.getcostomerinfo");
        action.setParams({
            "retailerCode":	component.get("v.SelectedRetailercode"),
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.onselectcustomeid', response.getReturnValue().Customer_Information__c);
            }else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + 
                              errors[0].message);
                    }
                    
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    toCheckSORetailer: function(component, event,helper,selectedId) 
    {
        //alert('toCheckSORetailer');
       // alert('selectedId ::'+selectedId);
        var action = component.get('c.checkRetailerInSO');
        action.setParams({ 
            "customerid": component.get('v.onselectcustomeid')
        });
        action.setCallback(this, function(actionResult) {
            var status=actionResult.getState();
            if(status==="SUCCESS")
            {
                var response = actionResult.getReturnValue();
                
                if(response)
                {
                    component.set("v.vertical",response.Vertical__c);
                    var verticalVal =response.Vertical__c;
                    if(!verticalVal || verticalVal==null)
                        verticalVal = 'Hanger Business';
                    if(selectedId == verticalVal)
                    {
                        this.toGetTabData(component, event, helper,selectedId);
                    }
                    else
                    {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.Not_Allowed_to_change_tabs_when_cart_is_not_empty"),
                            type: "warning"
                        });
                        toastEvent.fire();
                        component.set('v.selectedTab',verticalVal);
                    }
                }
                else{
                    this.toGetTabData(component, event, helper,selectedId);
                }
            }
        });
        $A.enqueueAction(action);
    },
    getCartCount: function(component, event,helper) 
    { 
        
        var retrievedData = sessionStorage.getItem('PunchOutRqtId');
       // alert(retrievedData);
        var action = component.get('c.getCartDataCount');
        action.setParams({ 
            "customerid": retrievedData
        });
        action.setCallback(this, function(actionResult) {
            var status=actionResult.getState();
           // alert('status ::'+status);
            if(status==="SUCCESS")
            {
               //  alert('status ::'+status);
                var response = actionResult.getReturnValue();
                component.set('v.CartCount',response);
            }
        });
        $A.enqueueAction(action);
    },
    

    
})