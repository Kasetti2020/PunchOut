({
    fetchPickValues : function(component, event, helper)
    {
        //to get Fabric Components pick values
        var action = component.get("c.getFabricComponent");
        action.setCallback(this, function(a){
            component.set("v.listOfFabComp", a.getReturnValue());
        });
        $A.enqueueAction(action);
        //to get material pick values
        var action = component.get("c.getFabricMaterial");
        action.setCallback(this, function(a){
            component.set("v.listOfMaterial", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    checknewFabricComponent : function(component, event, helper)
    {
        var fabval =component.find('fabid').get("v.value");
        var materialval=component.find('Materialid').get("v.value");
        var FabricSetup = component.get("v.ListOffabric");
        
        var action = component.get("c.toChecknewfab");
        action.setParams({
            'retailer': component.get('v.retailerID'),
            'product' : component.get('v.productID'),
            'fancom' : fabval,
            'Material' :materialval
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
            if (state === "SUCCESS") 
            {     
                if(configRecord.length>0){
                   // alert('This component Already Having Material');  
                }
                else{ 
                    var flag = true;
                    for(var i=0;i<component.get("v.ListOffabric").length;i++){
                        var fab=JSON.stringify(component.get("v.ListOffabric")[i].Component_Name__c);
                        var fabric=fab.replace("\"","");
                        var fabricval=fabric.replace("\"","");
                        var mat=JSON.stringify(component.get("v.ListOffabric")[i].Material__c);
                        var material=mat.replace("\"","");
                        var materialv=material.replace("\"","");
                        if(fabricval.trim() ==fabval.trim() && materialv.trim()==materialval.trim())
                        {
                          //  alert('already exist');
                            flag = false;
                            break;
                        }
                        else{
                            // alert('Not  exist');
                            flag= true;
                        }   
                    }
                    //end for For loop
                    if(flag == true){
                        FabricSetup.push({
                            'Name':component.get('v.productName')+ +component.get('v.retailerName'),
                            'Retailer_Code__c': component.get('v.retailerID'),
                            'Item__c': component.get('v.productID'),
                            'Component_Name__c':fabval,
                            'Material__c':materialval
                        });
                        component.set("v.ListOffabric",FabricSetup);
                        //alert('after setting>> '+JSON.stringify(component.get("v.ListOffabric")));
                        flag= true;
                    }
                } 
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
    fetchExistingConfiguration : function(component, event, helper)
    { 
        var action = component.get("c.toCheckfabricconfig");
        action.setParams({
            'retailer': component.get('v.retailerID')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result=response.getReturnValue();
            if (state === "SUCCESS") 
            {
                if(result!=null){
                    component.set("v.retailerLang",result);
                    var languagesList = [];
                    if(result.Lang_1__c!=null)
                        //component.set("v.CompLang1",languagesList);
                        languagesList.push(result.Lang_1__r.Name);
                    if(result.Lang_2__c!=null)
                        //component.set("v.CompLang2",languagesList);
                        languagesList.push(result.Lang_2__r.Name);
                    if(result.Lang_3__c!=null)
                        //component.set("v.CompLang3",languagesList);
                        languagesList.push(result.Lang_3__r.Name);
                    if(result.Lang_4__c!=null)
                        //component.set("v.CompLang4",languagesList);
                        languagesList.push(result.Lang_4__r.Name);
                    if(result.Lang_5__c!=null)
                        //component.set("v.CompLang5",languagesList);
                        languagesList.push(result.Lang_5__r.Name);
                }
                component.set("v.ListOfLanguages",languagesList);
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
    
    saveFabricComponent : function(component, event, helper)
    {
        var Fabricrec = component.get("v.FabricSetup");
        var action = component.get("c.saveFabricComponent");
        action.setParams({
            'FabricData':Fabricrec
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert("state: " + response.getState());
            if (state === "SUCCESS") 
            {
                component.set('v.FabricSetup',{'sobjectType': 'Fabric_Component__c'});
                var fabricObject = component.get("v.FabricSetup");
              
                fabricObject.Component_Lang_1__c = '';
                fabricObject.Component_Lang_2__c = '';
                fabricObject.Component_Lang_3__c = '';
                fabricObject.Component_Lang_4__c = '';
                fabricObject.Component_Lang_5__c = '';
                
                fabricObject.Material_Lang_1__c = '';
                fabricObject.Material_Lang_2__c = '';
                fabricObject.Material_Lang_3__c = '';
                fabricObject.Material_Lang_4__c = '';
                fabricObject.Material_Lang_5__c = '';
               
                component.set("v.FabricSetup",fabricObject);
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"success",
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                });
                toastEvent.fire();
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Error_Occured")
                });
                toastEvent.fire();
            }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, 'slds-hide');
        });
        $A.enqueueAction(action);
    },
    
    getExsistingFabValues : function(component, event, helper,componentName,material){
        var action = component.get("c.getComponentValues");
        action.setParams({
            'retailer': component.get('v.retailerID'),
            'cmp' : componentName,
            'mat' : material
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var result=response.getReturnValue();
            if (state === "SUCCESS") 
            {
                if(result!=null){
                    component.set("v.FabricSetup",result);
                    if(result.Component_Lang_1__c==undefined)
                        component.set("v.FabricSetup.Component_Lang_1__c",'');
                    if(result.Component_Lang_2__c==undefined)
                        component.set("v.FabricSetup.Component_Lang_2__c",'');
                    if(result.Component_Lang_3__c==undefined)
                        component.set("v.FabricSetup.Component_Lang_3__c",'');
                    if(result.Component_Lang_4__c==undefined)
                        component.set("v.FabricSetup.Component_Lang_4__c",'');
                    if(result.Component_Lang_5__c==undefined)
                        component.set("v.FabricSetup.Component_Lang_5__c",'');
                    if(result.Material_Lang_1__c==undefined)
                        component.set("v.FabricSetup.Material_Lang_1__c",'');
                    if(result.Material_Lang_2__c==undefined)
                        component.set("v.FabricSetup.Material_Lang_2__c",'');
                    if(result.Material_Lang_3__c==undefined)
                        component.set("v.FabricSetup.Material_Lang_3__c",'');
                    if(result.Material_Lang_4__c==undefined)
                        component.set("v.FabricSetup.Material_Lang_4__c",'');
                    if(result.Material_Lang_5__c==undefined)
                        component.set("v.FabricSetup.Material_Lang_5__c",'');
                }
                var spinner = component.find('spinner');
                $A.util.addClass(spinner, 'slds-hide');
            }
            else if (state === "ERROR") 
            {
                var pickValue = component.find("selectedType").get("v.value");
                if(pickValue=='Component Name')
                    var compValue = component.find("selectedComp").get("v.value");
                if(pickValue=='Material Name')
                    var material = component.find("Materialid").get("v.value");
                var ret = component.get('v.retailerID');
                component.set('v.FabricSetup',{'sobjectType': 'Fabric_Component__c'});
                var fabricObject = component.get("v.FabricSetup");
                
                fabricObject.Component_Lang_1__c = '';
                fabricObject.Component_Lang_2__c = '';
                fabricObject.Component_Lang_3__c = '';
                fabricObject.Component_Lang_4__c = '';
                fabricObject.Component_Lang_5__c = '';
                
                fabricObject.Material_Lang_1__c = '';
                fabricObject.Material_Lang_2__c = '';
                fabricObject.Material_Lang_3__c = '';
                fabricObject.Material_Lang_4__c = '';
                fabricObject.Material_Lang_5__c = '';
                
                component.set("v.FabricSetup",fabricObject);
                if(pickValue=='Component Name')
                    component.set("v.FabricSetup.Component_Name__c",compValue);
                if(pickValue=='Material Name')
                    component.set("v.FabricSetup.Material__c",material);
                component.set('v.FabricSetup.Retailer_Code__c',ret);
            }
        });
        $A.enqueueAction(action);
    }
})