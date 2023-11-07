({
    
    doInit : function(cmp, event, helper)
    {
        
        //alert('Inside AddRetailerData doInit>>>');
        //alert('Inside AddRetailerData depnedentFieldMap is>>>'+JSON.stringify(cmp.get("v.depnedentFieldMap")));
        //alert('Inside AddRetailerData  SubDepnedentFieldMap is>>>'+JSON.stringify(cmp.get("v.SubDepnedentFieldMap")));
        var selectedRetailer = cmp.get("v.selectedRetailer");
         //alert('selectedRetailer :'+selectedRetailer);
        var IndRetailerData = cmp.get("v.IndRetailerData");
          //alert('IndRetailerData :'+IndRetailerData.Retailer_Code_Name__c);
       // alert('IndRetailerData.Id>>>'+IndRetailerData.Id);
        if(IndRetailerData.Id != undefined)
        {
            //alert('IndRetailerData.Id not emptey');
            //alert('AddRetailerData IndRetailerData is:'+IndRetailerData +' and  Retailer Code is>>'+IndRetailerData.Retailer_Code__r.Name);
            //alert('AddRetailerData IndRetailerData is:'+IndRetailerData +' and  Retailer Name is>>'+IndRetailerData.Retailer_Code_Name__c);
           /* IndRetailerData.Retailer_Code_Name__c = IndRetailerData.Retailer_Code__r.Name;
            var ListOfDependentFields = depnedentFieldMap[IndRetailerData.Retailer_Code_Name__c];
            var dependentFields = [];
            dependentFields.push('--- None ---');
            for (var i = 0; i < ListOfDependentFields.length; i++) {
                dependentFields.push(ListOfDependentFields[i]);
            }
            cmp.set("v.listDependingValues", dependentFields);
            
            var SubDepnedentFieldMap = cmp.get("v.SubDepnedentFieldMap");
            if(IndRetailerData.Order_to_Company__c != undefined)
            {
                //alert('IndRetailerData.Order_to_Company__c>>'+IndRetailerData.Order_to_Company__c);
                if(IndRetailerData.Order_to_Company__c != '--- None ---') 
                {
                    var ListOfDependentFields = SubDepnedentFieldMap[IndRetailerData.Order_to_Company__c];
                    //alert('ListOfDependentFields>>'+ListOfDependentFields);
                    //alert('ListOfDependentFields.length>>'+ListOfDependentFields.length);
                    if(ListOfDependentFields.length > 0){
                        //alert('Inside ListOfDependentFields.length is > 0');
                        //cmp.set("v.bDisabledPreferredCurrency" , false); 
                        //cmp.set("v.GetInitDetailsWrapper.DefaultPreferredCurrency",'');
                        helper.fetchDepPreferredCurrencyValues(cmp, ListOfDependentFields);    
                    }
                }
            }*/
        }
        
        
        
        
    },
    
  
    handleLookupValueselected:function (component, event, helper)
    {
        //var SelectedLookupValue = component.get('v.IndRetailerData.Retailer_Code__c');
         //var SelectedLookupValue = component.get('v.IndRetailerData');
       // alert('SelectedLookupValue :'+SelectedLookupValue);
        //alert('SelectedLookupValue>>'+SelectedLookupValue +' and Name is >>'+component.get('v.IndRetailerData.Retailer_Code__r.Name'));
         var selectedRetailer = component.get("v.selectedRetailer");
      //  alert('selectedRetailer ::'+selectedRetailer);
         var selectedCompany = component.get("v.selectedCompany");
       // alert('selectedCompany ::'+selectedCompany);
         var selectedUserCompany = component.get("v.selectedUserCompany.Name");
       // alert('selectedUserCompany ::'+selectedUserCompany);
        var IndModelData = component.get('v.IndRetailerData.Inventory_Model__c');
        //alert('IndModelData Name is >>'+IndModelData);
        
        if(component.get('v.IndRetailerData.Inventory_Model__c') != null)
        {
            
           var actionCall = component.get("c.getSelectedModelDetail");
        actionCall.setParams({
            "IndModelData":	IndModelData,
            "selectedRetailer": selectedRetailer,
             "selectedCompany": selectedCompany,
             "selectedUserCompany": selectedUserCompany,
                  });
        actionCall.setCallback(this, function(response) {
              var state = response.getState();
            var state1 = response.getReturnValue();
            //alert('state1 :'+state1.Color__c);
            var JSONStr =JSON.stringify(state1); 
           // alert('JSONStr :'+JSONStr);
            //alert(response.getReturnValue());
            if (state === "SUCCESS") {
                
                //alert('ModelData:'+response.getReturnValue());
                component.set("v.IndRetailerData", response.getReturnValue());
                var getIndRet =   component.get("v.IndRetailerData");
               //this. handleModelList(component, event, helper);
                
               /* var pushAllModel = [];
                pushAllModel.add (getIndRet);
                console.log('pushAllModel ::'+pushAllModel);*/
                 //alert('getIndRet:'+getIndRet.Color__c);
                 var compEvents = component.getEvent("sampleComponentEvent");// getting the Instance of event
                //alert('compEvents ::'+compEvents);
                compEvents.setParams({ "message" : response.getReturnValue() });// setting the attribute of event
                compEvents.fire();// firing the event.
                
            }
              });
        $A.enqueueAction(actionCall); 
        }
    },
    
    handleModelList : function(component, event, helper){
        
        var getIndRet1 =   component.get("v.IndRetailerData");
        alert('getIndRet1 ::'+getIndRet1.Stock_In_Date_FB__c);
         var pushAllModel = [];
                pushAllModel.add (getIndRet);
                console.log('pushAllModel ::'+pushAllModel);
    },
    
    
     removeRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute
       component.getEvent("DeleteRowEvt").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
    }, 
  
    
    ClearLookupValue: function (component, event, helper) 
    {
        
        //alert('Inside ClearLookupValue idListStr>>'+JSON.stringify(event.getParam('data')));
        var Data = event.getParam('data');
        var ObjectAPI = Data.ObjectAPI;
        var flag = event.getParam('flag');
        var ClearedRecordID = Data.ClearedRecordID;
        //alert('Inside ClearLookupValue ObjectAPI>>'+ObjectAPI +' flag'+flag +' ClearedRecordID'+ClearedRecordID);
        
        if(flag=='ClearLookup')
        {
            //alert('Inside  ClearedLookupValue>>'+ClearedLookupValue);
            var idListStr=component.get('v.idListStr');
            if(idListStr)
                idListStr = idListStr.replace(ClearedRecordID, "");
            component.set('v.idListStr',idListStr);
            //alert('Inside ClearLookupValue idListStr>>'+component.get('v.idListStr'));
        }
    },
    
    AllocatedQty: function (component, event, helper){
      var qty =  event.getSource().get("v.value");
        var ind = component.get("v.rowIndex");
         alert(' ind :' +ind);
        alert(' qty :' +qty);
    }
            
        
         
})