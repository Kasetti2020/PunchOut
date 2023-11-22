({
	getAllFields : function(component, event, helper){
        var action = component.get("c.getAllfieldss");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var allFields = component.get("v.allField");
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var arrayMapKeys = [];
                var objectfields=result.objectfieldmap;
                for(var key in objectfields){
                    arrayMapKeys.push({key: key, value: objectfields[key]});
                }
                console.log('arrayMapKeys::'+JSON.stringify(arrayMapKeys));
                component.set("v.allObject",arrayMapKeys);
                //component.set("v.allField", arrayMapKeys);
            }else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
               // this.hideSpinner(component, event, helper);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    getAllfieldsFromMetadata : function(component, event, helper){
        var actionFields = component.get("c.getAllfieldsFromMetadata");
        actionFields.setCallback(this, function(response) {
            var state = response.getState();
            var getAllFields = component.get("v.getAllField");
            if (state === "SUCCESS") {
                //this.hideSpinner(component, event, helper);
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
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(actionFields);
    },
    
    getRelatedChildObjects : function(component, event, helper){
        var childObj = component.get("c.getAllRelatedChildObjects");
        childObj.setCallback(this, function(response) {
            var state = response.getState();
            var childFields = component.get("v.allChildObject");
            if (state === "SUCCESS") {
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
                component.set("v.allField", getallField);
                console.log('getAllField::'+JSON.stringify(component.get("v.allField")));
            }else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(childObj);
    },
    
    getChildObjects : function(component, event, helper){
        var action = component.get("c.getAllChildObjects");
        action.setCallback(this, function(response) {
            var state = response.getState();
            var allFields = component.get("v.allChildObj");
            if (state === "SUCCESS") {
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
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    callsaveHandler:function(component, event, helper){
         var jsonParse=component.get("v.storejson");
         var serviceId=component.get("v.ServiceTypeId");
        var type=component.get("c.updatesalesorder");
        type.setParams({
            'jsonData':jsonParse,
            'serviceTypeId':serviceId
        });
        type.setCallback(this,function(responce){
            var state=responce.getState(); 
            if(state==='SUCCESS'){
                var result=responce.getReturnValue();
                this.hideSpinner(component,event,helper);
                 var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({        
                    title: "Success!",      
                    message: "The record has been Updated successfully.",
                    type:"success",
                    mode:"dismissible"      
                });
                toastEvent.fire();
                 var navService = window.location.href + "https://mainetti--magnets1.sandbox.lightning.force.com/lightning/n/Mainetti_ERP"; // Replace "LwcPageName" with the actual name or URL of your LWC page        
                  window.location.replace(navService);
                
                 // $A.get('e.force:refreshView').fire();  
        
    }
        });
        $A.enqueueAction(type);
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
    
    
})