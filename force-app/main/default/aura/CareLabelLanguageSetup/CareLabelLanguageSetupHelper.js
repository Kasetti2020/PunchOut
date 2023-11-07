({
    fetchExistingConfiguration : function(component, event, helper)
    {
        var action = component.get("c.toCheckLangconfiguration");
        action.setParams({
            'retailer': component.get('v.retailerID')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();

            // alert('state'+state);
            var configRecord=response.getReturnValue();
            // alert('configRecord>>>'+JSON.stringify(configRecord));
            if (state === "SUCCESS" ) 
            { 
                
                component.set('v.RetailerLanguagesetup',configRecord);
                
                if(configRecord.Lang_1__c!=null && configRecord.Lang_1__r.Name!=null && configRecord.Lang_1__r.Name!=undefined &&  configRecord.Lang_1__r.Name!=undefined )
                {
                    
                    component.set('v.languageid1',configRecord.Lang_1__c);
                    component.set('v.languagename1',configRecord.Lang_1__r.Name);
                }
                else{
                    
                    component.set('v.languageid1',null);
                    component.set('v.languagename1',null);
                }
                if(configRecord.Lang_2__c!=null && configRecord.Lang_2__r.Name!=null && configRecord.Lang_2__r.Name!=undefined &&  configRecord.Lang_2__r.Name!=undefined )
                {
                    component.set('v.languageid2',configRecord.Lang_2__c);
                    component.set('v.languagename2',configRecord.Lang_2__r.Name);
                }else{
                    component.set('v.languageid2', null);
                    component.set('v.languagename2', null);
                }
                
                if(configRecord.Lang_3__c!=null && configRecord.Lang_3__r.Name!=null && configRecord.Lang_3__r.Name!=undefined &&  configRecord.Lang_3__r.Name!=undefined )
                {
                    component.set('v.languageid3',configRecord.Lang_3__c);
                    component.set('v.languagename3',configRecord.Lang_3__r.Name);
                }
                else{
                    component.set('v.languageid3', null);
                    component.set('v.languagename3', null);
                }
                
                if(configRecord.Lang_4__c!=null && configRecord.Lang_4__r.Name!=null && configRecord.Lang_4__r.Name!=undefined &&  configRecord.Lang_4__r.Name!=undefined )
                {
                    component.set('v.languageid4',configRecord.Lang_4__c);
                    component.set('v.languagename4',configRecord.Lang_4__r.Name);
                }
                else{
                    component.set('v.languageid4', null);
                    component.set('v.languagename4', null);
                }
                
                
                if(configRecord.Lang_5__c!=null && configRecord.Lang_5__r.Name!=null && configRecord.Lang_5__r.Name!=undefined &&  configRecord.Lang_5__r.Name!=undefined )
                {
                    component.set('v.languageid5',configRecord.Lang_5__c);
                    component.set('v.languagename5',configRecord.Lang_5__r.Name);
                }
                else{
                    component.set('v.languageid5', null);
                    component.set('v.languagename5', null);
                }
                
            }
            
            else if(state==="ERROR" ){
                component.set("v.Languageset", {'sobjectType': 'Retailer_Code__c' }); 
            }
                else
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type":"error",
                        "title": $A.get("$Label.c.Error"),
                        "message": response.getReturnValue()
                    });
                    toastEvent.fire();
                }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, 'slds-hide');
        });
        $A.enqueueAction(action);
    },
    savelanguages : function(component, event, helper)
    {
        var rlangdata=component.get('v.RetailerLanguagesetup');
        rlangdata.Name=component.get('v.retailerName');
        rlangdata.Lang_1__c=component.get('v.languageid1');
       // alert(' rlangdata.Lang_1__c>>'+rlangdata.Lang_1__c);
        rlangdata.Lang_2__c=component.get('v.languageid2');
       // alert(' rlangdata.Lang_2__c'+rlangdata.Lang_2__c);
        rlangdata.Lang_3__c=component.get('v.languageid3');
        //alert('rlangdata.Lang_3__c'+rlangdata.Lang_3__c);
        rlangdata.Lang_4__c=component.get('v.languageid4');
        //alert('rlangdata.Lang_4__c'+rlangdata.Lang_4__c);
        rlangdata.Lang_5__c=component.get('v.languageid5');
        //alert('rlangdata.Lang_5__c'+rlangdata.Lang_5__c);
        
        if(rlangdata.Lang_1__c=='' && rlangdata.Lang_2__c=='' && rlangdata.Lang_3__c==''&& rlangdata.Lang_4__c=='' && rlangdata.Lang_5__c==''){
           
            var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Required_alteast_One_language")
                });
                toastEvent.fire(); 
        }
        else{
        var languageslist=[]; 
        
        if(rlangdata.Lang_1__c!=undefined || rlangdata.Lang_1__c!=null || rlangdata.Lang_1__c!=''){
            languageslist.push(rlangdata.Lang_1__c);   
        }
        if(rlangdata.Lang_2__c!=null || rlangdata.Lang_2__c!='' || rlangdata.Lang_2__c!=undefined){
            languageslist.push(rlangdata.Lang_2__c);   
        }
        if(rlangdata.Lang_3__c!=null || rlangdata.Lang_3__c!='' || rlangdata.Lang_3__c!=undefined){
            languageslist.push(rlangdata.Lang_3__c);   
        }
        if(rlangdata.Lang_3__c!=null || rlangdata.Lang_4__c!='' || rlangdata.Lang_4__!=undefined){
            languageslist.push(rlangdata.Lang_4__c);   
        }
        if(rlangdata.Lang_3__c!=null || rlangdata.Lang_5__c!='' || rlangdata.Lang_2__c!=undefined){
            languageslist.push(rlangdata.Lang_5__c);   
        }
       // alert('languageslist>> '+languageslist);
        
        var sorted_arr = languageslist.slice().sort();
        var results = [];
        for (var i = 0; i < sorted_arr.length - 1; i++) {
            if (sorted_arr[i + 1] == sorted_arr[i]) {
                if(sorted_arr[i]!=null){
                    results.push(sorted_arr[i]);
                }
            }
        }
     // alert('result JSON>>>   '+JSON.stringify(results));
            if(rlangdata.Lang_4__c=='' &&  rlangdata.Lang_5__c!=''){
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Please_Fill_Language_Details")
                });
                toastEvent.fire();
                
            }
            else{  
          if(JSON.stringify(results)== "[]" ){
            // alert('Test1');
            if((rlangdata.Lang_1__c===null |rlangdata.Lang_1__c==='') &  (rlangdata.Lang_2__c===null | rlangdata.Lang_2__c==='') &  (rlangdata.Lang_3__c===null | rlangdata.Lang_3__c==='') &  (rlangdata.Lang_4__c===null | rlangdata.Lang_4__c==='' )& (rlangdata.Lang_5__c===null | rlangdata.Lang_5__c===''))
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Required_alteast_One_language")
                });
                toastEvent.fire();
                component.set('v.newflag','true');
            }
            else{
                var action = component.get("c.saveretailerlanguages");    
                action.setParams({
                    'retailerdata':rlangdata,
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    var configRecord=response.getReturnValue();
                    //alert('configRecord'+configRecord);
                    if (state === "SUCCESS") 
                    { 
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"success",
                            "title": $A.get("$Label.c.success"),
                            "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                        });
                        toastEvent.fire();
                        component.set('v.newflag','false');
                        component.set('v.retailerID',null);
                        component.set('v.retailerName',null);
                    }
                });
                $A.enqueueAction(action);
            }
        }
                
                
          else if(JSON.stringify(results)=== '["",""]' ){
            // alert('Test1');
            if((rlangdata.Lang_1__c===null |rlangdata.Lang_1__c==='') &  (rlangdata.Lang_2__c===null | rlangdata.Lang_2__c==='') &  (rlangdata.Lang_3__c===null | rlangdata.Lang_3__c==='') &  (rlangdata.Lang_4__c===null | rlangdata.Lang_4__c==='' )& (rlangdata.Lang_5__c===null | rlangdata.Lang_5__c===''))
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Required_alteast_One_language")
                });
                toastEvent.fire();
                component.set('v.newflag','true');
            }
            else{
                var action = component.get("c.saveretailerlanguages");    
                action.setParams({
                    'retailerdata':rlangdata,
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    var configRecord=response.getReturnValue();
                    //alert('configRecord'+configRecord);
                    if (state === "SUCCESS") 
                    { 
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"success",
                            "title": $A.get("$Label.c.success"),
                            "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                        });
                        toastEvent.fire();
                        component.set('v.newflag','false');
                        component.set('v.retailerID',null);
                        component.set('v.retailerName',null);
                        
                    }
                });
                $A.enqueueAction(action);
            }
        }
                
         else if(JSON.stringify(results)=== '["","",""]' ){
            // alert('Test1');
            if((rlangdata.Lang_1__c===null |rlangdata.Lang_1__c==='') &  (rlangdata.Lang_2__c===null | rlangdata.Lang_2__c==='') &  (rlangdata.Lang_3__c===null | rlangdata.Lang_3__c==='') &  (rlangdata.Lang_4__c===null | rlangdata.Lang_4__c==='' )& (rlangdata.Lang_5__c===null | rlangdata.Lang_5__c===''))
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Required_alteast_One_language")
                });
                toastEvent.fire();
                component.set('v.newflag','true');
            }
            else{
                var action = component.get("c.saveretailerlanguages");    
                action.setParams({
                    'retailerdata':rlangdata,
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    var configRecord=response.getReturnValue();
                    //alert('configRecord'+configRecord);
                    if (state === "SUCCESS") 
                    { 
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"success",
                            "title": $A.get("$Label.c.success"),
                            "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                        });
                        toastEvent.fire();
                        component.set('v.newflag','false');
                        component.set('v.retailerID',null);
                        component.set('v.retailerName',null);
                    }
                });
                $A.enqueueAction(action);
            }
        }
           else if(JSON.stringify(results)=== '[""]' ){
            // alert('Test1');
            if((rlangdata.Lang_1__c===null |rlangdata.Lang_1__c==='') &  (rlangdata.Lang_2__c===null | rlangdata.Lang_2__c==='') &  (rlangdata.Lang_3__c===null | rlangdata.Lang_3__c==='') &  (rlangdata.Lang_4__c===null | rlangdata.Lang_4__c==='' )& (rlangdata.Lang_5__c===null | rlangdata.Lang_5__c===''))
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Required_alteast_One_language")
                });
                toastEvent.fire();
                component.set('v.newflag','true');
            }
            else{
                var action = component.get("c.saveretailerlanguages");    
                action.setParams({
                    'retailerdata':rlangdata,
                });
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    var configRecord=response.getReturnValue();
                    //alert('configRecord'+configRecord);
                    if (state === "SUCCESS") 
                    { 
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"success",
                            "title": $A.get("$Label.c.success"),
                            "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                        });
                        toastEvent.fire();
                        component.set('v.newflag','false');
                        component.set('v.retailerID',null);
                        component.set('v.retailerName',null);
                        
                    }
                });
                $A.enqueueAction(action);
            }
        }
                
        else{
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":"error",
                "title": $A.get("$Label.c.Error"),
                "message": $A.get("$Label.c.Should_not_allow_Duplicates_Languages")
            });
            toastEvent.fire();
        }
        }
        }
    }
})