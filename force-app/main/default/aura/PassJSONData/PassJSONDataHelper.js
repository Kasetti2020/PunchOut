({
    
    
    getAllFields : function(component, event, helper){
        this.showSpinner(component, event, helper);
        var action = component.get("c.getAllfieldss");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var allFields = component.get("v.allField");
            if (state === "SUCCESS") {
                this.hideSpinner(component, event, helper);
                var result = response.getReturnValue();
                 // console.log('apex results--> '+JSON.stringify(result));
                var arrayMapKeys = [];
                var objectfields=result.objectfieldmap;
                for(var key in objectfields){
                    arrayMapKeys.push({key: key, value: objectfields[key]});
                }
                
                component.set("v.allObject",arrayMapKeys);
                component.set("v.allField", arrayMapKeys);
            }
            else if (status === "INCOMPLETE") {
                this.hideSpinner(component, event, helper);
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                this.hideSpinner(component, event, helper);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    this.hideSpinner(component, event, helper);
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    //
    
    getAllfieldsFromMetadata : function(component, event, helper){
        this.showSpinner(component, event, helper);
        var actionFields = component.get("c.getAllfieldsFromMetadata");
        actionFields.setCallback(this, function(response) {
            var state = response.getState();
            var getAllFields = component.get("v.getAllField");
            if (state === "SUCCESS") {
                this.hideSpinner(component, event, helper);
                var result = response.getReturnValue();
                // console.log('apex results--> '+JSON.stringify(result));
                var arrayMapKey = [];
                var objectfields=result.objectfield;
                for(var key in objectfields){
                    arrayMapKey.push({key: key, value: objectfields[key]});
                }
                
                component.set("v.getAllObject",arrayMapKey);
                // component.set("v.getAllField", arrayMapKey);
            }
            else if (status === "INCOMPLETE") {
                this.hideSpinner(component, event, helper);
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                this.hideSpinner(component, event, helper);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    this.hideSpinner(component, event, helper);
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(actionFields);
    },
    
    
    //
    deltingCheckboxAccounts : function(component, event, helper, deltIds) {
        var action = component.get('c.deleteRecord');
        action.setParams({
            "deleteIds": deltIds
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                this.hideSpinner(component, event, helper);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({        
                    title: "Success!",      
                    message: "The record has been deleted successfully.",
                    type:"success",
                    mode:"dismissible"      
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
    },
    
    showSpinner: function (component, event, helper) {
        component.set('v.showmyspinner',true);
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
    hideSpinner: function (component, event, helper) {
        window.setTimeout(
            $A.getCallback(function() {
                component.set('v.showmyspinner',false);
                var spinner = component.find("mySpinner");
                $A.util.addClass(spinner, "slds-hide");
            }), 1000
        );        
        
    },
    
    callmyControllerMethod: function(component, event, helper) {
        
        this.showSpinner(component, event, helper);
        var object=component.find('Service').get("v.value");
        component.set("v.servicerecord",object);
        var validation=false;
        if(object==[]){
            validation=true;
            this.hideSpinner(component, event, helper);
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: "Error!",
                mode:"dismissible",
                message: "Please Choose One Service Type",
                type:"error"
            });
            toastEvent.fire();
            var next = "s2";
            component.set("v.current", next);
        }
        else{
            var json;
            if(component.get("v.actionNameVar") == null){
                json=component.find('Data').get("v.value");
                component.set("v.recordName",json);
                var validations=false;
                
                try{
                    this.hideSpinner(component, event, helper);
                    var json=component.find('Data').get("v.value");
                    var jsonData =json ;
                    var deserializedObject = JSON.parse(jsonData);
                    function traverseObject(obj, result, currentKey) {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                var newKey = currentKey ? currentKey + '.' + key : key;
                                if (typeof obj[key] === 'object') {
                                    traverseObject(obj[key], result, newKey);
                                } else {
                                    result.push({ key: newKey, value: obj[key] });
                                }
                            }
                        }
                    }
                    var nestedKeysWithValues = [];
                    var pushallvalue =[];
                    traverseObject(deserializedObject, nestedKeysWithValues, '');
                    nestedKeysWithValues.forEach(function (item) {
                        nestedKeysWithValues.push(item.key);
                        var removzerofromarraykeys =  item.key;
                        var deleted = removzerofromarraykeys.replace(".0", ' ');
                        var updatedStr1 = deleted.replace(/\.0/g, '');
                        var removeemptyspace =updatedStr1.replace(/\s+/g, "");
                        pushallvalue.push({"Name":removeemptyspace,"SF_Object1_Field_Name__c":null,"ObjectNames1__c":"Base_Order__c","ChildObjectName1__c":null,"ChildObjectName2__c":null,"ObjectNames2__c":"Sales_Order__c","Mandatory_Field__c":false});  
                    });
                    this.getAllFields(component, event, helper);
                    this.getChildObjects(component, event, helper);
                    this.getAllfieldsFromMetadata(component, event, helper);
                    this.getRelatedChildObjects(component, event, helper);
                    
                    component.set("v.storejson",pushallvalue);
                    component.set("v.validateprogressbarforfinal",true);
                    component.set("v.mapPage",true);
                    component.set("v.InsertJosnData",false);
                    var next = "s3";
                    component.set("v.current", next);
                }
                catch(exception){
                    this.hideSpinner(component, event, helper);
                    var next = "s2";
                    component.set("v.current", next);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        duration:"2000",
                        title: "Error!",
                        mode:"dismissible",
                        message: "Please Enter Valid JsonData",
                        type:"error"
                    });
                    toastEvent.fire();
                }
                
            }else{
                this.getAllFields(component, event, helper);
                json=component.get("v.record");
                component.set("v.recordName",json);
                var jsonData = component.get("v.storejson");
                var fetchingdata=component.get("c.getRecord");
                component.set("v.ServiceTypeEdit",true);
                component.set("v.validateprogressbarforfinal",true);
                component.set("v.PreviousValid",true);
                var serviceRecordId = component.get("v.serviceRecordId");
                fetchingdata.setParams({
                    'serviceRecordId' :serviceRecordId
                });
                fetchingdata.setCallback(this,function(responce){
                    var state=responce.getState(); 
                    if(state=='SUCCESS'){
                        var result=responce.getReturnValue();
                        var items=[];
                        for (var i = 0; i < result.length; i++) {
                            items.push(result[i]);
                        }
                        component.set("v.storejson",items);
                        helper.showSpinner(component, event, helper);
                    }else{
                        var error = responce.getError(); 
                        console.log('error-->'+error);
                    }
                });
                $A.enqueueAction(fetchingdata);
                component.set("v.showProgressBar", false);
                component.set("v.ServiceTypedetails", false);
                component.set("v.mapPage",true); 
                component.set("v.InsertJosnData",false);
            }
            
        }
        
        
    },
    callHandlerClick:function(component, event, helper) {
        var getprgpage=component.get("v.validateprogressbarpage");
        if(getprgpage == true){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                duration:"2000",
                title: "Error!",
                mode:"dismissible",
                message: "Please Click on Finish Button",
                type:"error"
            });
            toastEvent.fire();
        }
        else{
            var next = "s2";
            component.set("v.current", next);
            component.set("v.ServiceTypedetails", false);
            component.set("v.InsertJosnData",true);
            component.set("v.PreviousValid",false);
            component.set("v.validateprogressbar",true);
        }
        
    },
    
    
    callsaveHandler:function(component, event, helper) {
        var getvalidprog=component.get("v.validateprogressbarforfinal");
        if(getvalidprog == false){
            var next = "s1";
            component.set("v.current", next);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: "Error!",
                mode:"dismissible",
                message: "Please Complete Step 3",
                type:"error"
            });
            toastEvent.fire();
        }
        else{
            this.showSpinner(component, event, helper);
            var jsonParse=component.get("v.storejson");
            console.log('jsonPrase-->'+JSON.stringify(jsonParse));
            var service = component.get("v.servType");
            //   alert('service>>>'+service);
            var country = component.get("v.counrty");
            //   alert('country>>>'+country);
            
            var jsonedit=component.get("v.ServiceTypeEdit");
            //   alert('jsonedit>>>'+jsonedit);
            
            var type=component.get("c.getServicetype");
            //   alert('type>>>'+type);
            
            var jsonSample = component.get("v.record");
            //   alert('jsonSample>>>'+jsonSample);
            
            var serviceRecordId = component.get("v.serviceRecordId");
            //   alert('serviceRecordId>>>'+serviceRecordId);
            
            type.setParams({
                'services' :service,
                'jsonData':jsonParse,
                'jsonedit':jsonedit,
                'countryCode':country,
                'jsonSample' :jsonSample,
                'serviceRecordId' :serviceRecordId
            });
            type.setCallback(this,function(responce){
                var state=responce.getState(); 
                if(state==='SUCCESS'){
                    var result=responce.getReturnValue();
                    if(jsonedit==false){
                        this.hideSpinner(component, event, helper);
                        var result=responce.getReturnValue();
                       
                        var next = "s4";
                        // component.set("v.current", next);
                        // component.set("v.validateprogressbarpage",true);
                        component.set("v.mapPage",false);
                        //  component.set("v.PostmanLink",true);
                        var hostname = window.location.origin;
                        var arr = hostname.split(".");
                        var instance = arr[0];
                        var instances='.my.salesforce.com/services/apexrest/TestingClass/';
                        component.set("v.records",instance+instances);
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({        
                            title: "Success!",      
                            message: "The record has been Inserted successfully.",
                            type:"success",
                            mode:"dismissible"      
                        });
                       
                        toastEvent.fire();
                        this.callnavigateToParentComponent(component, event, helper);
                        $A.get('e.force:refreshView').fire();
                        
                        if(component.get("v.radioButtonValue") === 'Both'){
                            // alert('result>>>>'+result);
                            /*  var a = component.find("n1").get("v.value");
                            var b = component.find("n2").get("v.value");
                            var res = parseInt(a) + parseInt(b);
                            res = res + '';*/
                            var service = component.get("v.servType");
                            var country = component.get("v.counrty");
                            // alert('service>>'+service);
                            // alert('country>>>'+country);
                            component.find("navService").navigate({   
                                "type": "standard__component",
                                "attributes": {
                                    "componentName": "c__PassJsonDataForBoth"    
                                },    
                                "state": {
                                    "c__service":service,
                                    "c__country":country,
                                    "c__result":result
                                }
                            });
                            /*  var appEvent = $A.get("e.c:PassJsonDataForOutPutBoth1");
                  appEvet.setParams({"PassData":"Application Event Workking Fine"});
                  appEvent.fire();*/
                            /*   alert('component.get("v.radioButtonValue")>>>>'+component.get("v.radioButtonValue"));
                 var service = component.get("v.servType");
                 var country = component.get("v.counrty");
                 var serviceRecordId = component.get("v.serviceRecordId");
                  alert('serviceRecordId>>>'+serviceRecordId);
                  alert('service>>'+service);
                  alert('country>>>'+country);
        var country = component.get("v.counrty");
        var evt = $A.get("e.force:navigateToComponent");
        console.log('Event '+evt);
        var accountFromId = component.get("v.recordId");
        evt.setParams({
            componentDef  : "c:PassJsonDataForBoth" ,
            componentAttribute : {
                service : service,
                country : country

            }
        

        });
      
        evt.fire();
                  
                  */
                            /*   var callOutput = component.get("v.outputComp");   
              callOutput.callOutputMethod();
              alert('callOutputMethod');*/
                        }else{
                            //call lwc component
                            var parentComponent = component.get("v.parent");                         
                           // parentComponent.greetingMethod();
                        }
                        
                        
                        
                        
                    }
                    else{
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({        
                            title: "Success!",      
                            message: "The record has been Updated successfully.",
                            type:"success",
                            mode:"dismissible"      
                        });
                        toastEvent.fire();
                        $A.get('e.force:refreshView').fire();
                    }
                }else{
                    var error = responce.getError(); 
                    console.log(JSON.stringify(error));
                }
                
            });
            $A.enqueueAction(type);
            this.serviceType(component, event, helper);
        }
    },
    callBehind:function(component, event, helper) {
        this.showSpinner(component, event, helper);
        var validprev=component.get("v.PreviousValid");
        if(validprev == false){
            this.hideSpinner(component, event, helper);
            component.set("v.InsertJosnData", true);
            component.set("v.mapPage",false);
            component.set("v.record",component.get("v.recordName"));
            component.set("v.storejson",[]);
        }
        else{
            this.hideSpinner(component, event, helper);
            component.set("v.showProgressBar", true);
            component.set("v.ServiceTypedetails", true);
            component.set("v.mapPage",false);
            component.set("v.ButtonShow",false);
            component.set("v.record",component.get("v.recordName"));
            component.set("v.storejson",[]);
        }
    },
    
    callnavigateToParentComponent:function(component, event, helper) {
         var navService = window.location.href + "https://mainetti--magnets1.sandbox.lightning.force.com/lightning/n/Mainetti_ERP"; // Replace "LwcPageName" with the actual name or URL of your LWC page        
                  window.location.replace(navService);
       // var parentComponent = component.get("v.parent");                         
       // parentComponent.greetingMethod();
    },
    
    serviceType: function(component, event, helper) {component.set('v.columns', [
        {label: 'Service Type', fieldName: 'Name', type: 'text'}
    ]);
                                                     var action = component.get('c.featchService');
                                                     action.setCallback(this, function(response) {
                                                         var state = response.getState();
                                                         if (state === "SUCCESS") {
                                                             component.set('v.data', response.getReturnValue());               
                                                         }
                                                     });
                                                     $A.enqueueAction(action);
                                                    },
    
    getChildObjects : function(component, event, helper){
        this.showSpinner(component, event, helper);
        var action = component.get("c.getAllChildObjects");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var allFields = component.get("v.allChildObj");
            if (state === "SUCCESS") {
                this.hideSpinner(component, event, helper);
                var result = response.getReturnValue();
                var arrayMapKeys = [];
                var childMapValues = [];
                // console.log('result::'+JSON.stringify(result));
                var childObjects=result.childObjectmap;
                // console.log('objectfields::'+JSON.stringify(childObjects));
                for(var key in childObjects){
                    // console.log('key::'+key+':result[key]:'+childObjects[key]);
                    arrayMapKeys.push({key: key, value: childObjects[key]});
                }
                component.set("v.allChildObj",arrayMapKeys);
                // console.log('allchild::'+component.get("v.allChildObj"));
                var childObjectFields=result.childFieldsMap;
                // console.log('objectfields::'+JSON.stringify(childObjectFields));
                // console.log('Before allField::'+JSON.stringify(component.get("v.allField")));
                for(var key in childObjectFields){
                    console.log('key::'+key+':result[key]:'+childObjectFields[key]);
                    childMapValues.push({key: key, value: childObjectFields[key]});
                }
                var allField = component.get("v.allField");
                allField = allField.concat(childMapValues);
                // Set the updated list back to the allField attribute
                component.set("v.allField", allField);
                // console.log('allField::'+JSON.stringify(component.get("v.allField")));
                // component.set("v.allField", arrayMapKeys);
            }else if (status === "INCOMPLETE") {
                this.hideSpinner(component, event, helper);
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                this.hideSpinner(component, event, helper);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    this.hideSpinner(component, event, helper);
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    
    
    getRelatedChildObjects : function(component, event, helper){
        this.showSpinner(component, event, helper);
        // alert('inside getRelatedChildObjects');
        var childObj = component.get("c.getAllRelatedChildObjects");
        childObj.setCallback(this, function(response) {
            // alert('returned');
            var state = response.getState();
            var childFields = component.get("v.allChildObject");
            if (state === "SUCCESS") {
                this.hideSpinner(component, event, helper);
                var result = response.getReturnValue();
                var childarrayMapKeys = [];
                var childarrayMapValues = [];
                console.log('result::'+JSON.stringify(result));
                var relChildObjects=result.relatedObjectmap;
                console.log('objectfields::'+JSON.stringify(relChildObjects));
                for(var key in relChildObjects){
                    console.log('key::'+key+':result[key]:'+relChildObjects[key]);
                    childarrayMapKeys.push({key: key, value: relChildObjects[key]});
                }
                component.set("v.allChildObject",childarrayMapKeys);
                // alert(component.get("v.allChildObject"));
                console.log('all Child Object::'+component.get("v.allChildObject"));
                var relChildObjectFields=result.relatedFieldsMap;
                console.log('objectfields::'+JSON.stringify(relChildObjectFields));
                console.log('Before allField::'+JSON.stringify(component.get("v.allField")));
                for(var key in relChildObjectFields){
                    console.log('key::'+key+':result[key]:'+relChildObjectFields[key]);
                    childarrayMapValues.push({key: key, value: relChildObjectFields[key]});
                }
                var getallField = component.get("v.getAllField");
                getallField = getallField.concat(childarrayMapValues);
                component.set("v.getAllField", getallField);
                console.log('getAllField::'+JSON.stringify(component.get("v.getAllField")));
            }else if (status === "INCOMPLETE") {
                this.hideSpinner(component, event, helper);
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                this.hideSpinner(component, event, helper);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    this.hideSpinner(component, event, helper);
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(childObj);
    },
})