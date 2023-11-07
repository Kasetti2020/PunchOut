({
    doInit : function(component, event, helper) {  
        component.set("v.selectedArray", component.get('v.selectedArray1'));
    },
    getSelectedcompValue:function(component, event, helper){
        var picklist=component.find('ddcompanyname');
        var picklistvalue=picklist.get('v.value');
    },
    getSelectedfabValue:function(component, event, helper){
        var picklist=component.find('ddfabricname');
        var picklistvalue=picklist.get('v.value');
    },
    addFabric: function(component, event, helper){
        var compselectedval =component.find("component").get("v.value");
        var fabselectedval =component.find("fabric").get("v.value");
        var val =parseInt(component.find("compval").get("v.value"));
        if(!fabselectedval){
           var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Select_Fabric_value"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        else if(!val || val>100){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Enter_valid_Value"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }else if(val<=0)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Entered_Value_is_not_valid"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        var selectedfabval=component.get("v.selectedArray");
        //alert(JSON.stringify(selectedfabval));
        var indexToAdd=-1;
        if(selectedfabval.length>0){
            var valueValidation=val;
            for(var i=0;i<selectedfabval.length;i++)
            {
                if(selectedfabval[i].Component==compselectedval)
                {
                    if(valueValidation<=100)
                    {
                    valueValidation+=selectedfabval[i].value;
                    }else{
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.Entered_value_should_be_Lesser_or_Equal_to_100"),
                            type: "warning"
                        });
                        toastEvent.fire();
                        return;
                    }
                    if(selectedfabval[i].Fabric==fabselectedval)
                    {
                       indexToAdd=i;
                    }
                }
            }
            if(valueValidation>100)
            {
                if(compselectedval){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Value_for_the_Component")+compselectedval+ $A.get("$Label.c.is_exceeding_100"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
            }            
        }
        if(indexToAdd==-1 && selectedfabval.length<7){
            selectedfabval.push({
                'Component':compselectedval ,
                'Fabric': fabselectedval,
                'value':val
            });
        }else  if(indexToAdd>-1){
            selectedfabval[indexToAdd].value+=val;
        }else
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Maximum_of_7_combinations_are_allowed"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
        }  
       
        //phase2.1 validation for restricting the row addition
        let LogoEvent = component.getEvent("loadMyEvent"); 
       
           LogoEvent.setParams({"FabricArray" : component.get("v.selectedArray")}); 
           LogoEvent.fire();
            component.set("v.selectedArray", selectedfabval);
            component.set("v.Displayfabval", true);
            component.find('component').set('v.value', '');
            component.find('fabric').set('v.value', '');
            component.find('compval').set('v.value', '');

        var changeTabColorFabricComponent = component.getEvent("changeTabColorFabricComponent");
		changeTabColorFabricComponent.fire();
    },
    selectedval: function(component, event, helper){
        var selectedfabval=component.get("v.selectedArray");
        var fabselectedval =component.find("fabvalue").get("v.value");
        var optioval =component.find("ddfabricname").get("v.value");
        var val =component.find("compval").get("v.value");
        
        var isError = false;
         var total=0;
        if(selectedfabval.length > 0){
            selectedfabval.forEach(function(item){
                var fabricName = item.Fabric;
                var matname =item.Component;
                var compare=(optioval==matname);
                if(fabselectedval != '' && val > 0 && fabricName == fabselectedval && compare!=true){
                    var existValue = parseFloat(item.value);
                    var curVal = parseFloat(val);
                    var sum = existValue + curVal;
                    total=parseFloat(total)+sum;
                    if(total>100){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "mode":'error',
                            "title": $A.get("$Label.c.Error"),
                            "message": $A.get("$Label.c.The_record_has_Value_is_More_than_100")
                        });
                        toastEvent.fire(); 
                         isError = true;
                    }else{
                          isError = false;
                    }  
                    /*if((parseFloat(item.value)+parseFloat(val)) > 100){
                        alert('Value Is MoreThan 100%');
                        isError = true;
                       /* var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "mode":'error',
                            "title": "Success!",
                            "message": "The record has been updated successfully."
                        });
                        toastEvent.fire();*/
                   // }*/
                }else{
                    if(fabselectedval != '' && val > 0 && fabricName == fabselectedval && compare==true)
                    {
                        var existValue = parseFloat(item.value);
                        var curVal = parseFloat(val); 
                        isError = true;
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.This_material_already_having_value"),
                            type: "warning"
                        });
                        toastEvent.fire();
                        return;
                       }
                }
            });                
        }
        if(total<=100 && !isError){
           component.set("v.Displayfabval", true);
              component.find('compval').set('v.value', '');
            if(fabselectedval!='' && optioval !='' && val !='' ){
                selectedfabval.push({
                    'Fabric':fabselectedval ,
                    'Component': optioval,
                    'value':val
                });
            }
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.Please_select_all_fields"),
                    type: "warning"
                });
                toastEvent.fire();
                return;
            }
        }
        component.set("v.selectedArray", selectedfabval);
        var compareval =component.get("v.selectedArray").length;
        component.find('ddfabricname').set('v.value', '');
        component.find('ddcompanyname').set('v.value', '');
        component.find('compval').set('v.value', '');
        var test=component.get("v.selectedArray");
    },
    //method to get the selected data in list
    bindFabricData: function(component,event,helper)
    {
        component.set("v.viewedSelectedArray", component.get("v.selectedArray")); 
        component.set("v.FabricSelectedData", component.get("v.selectedArray")); 
    },
    //method to get the selected data in list in view edit option
    viewbindFabricData: function(component,event,helper)
    {
        component.set("v.viewedSelectedArray", component.get("v.selectedArray")); 
    },
    //method helps to remove the list 
    removeRow: function(component, event, helper){
        var selectedArray = component.get("v.selectedArray");
        var selectedItem = event.getSource().get("v.name");
        var deletedCLLIIdList=component.get('v.deletedCLLIIdList');
        //alert(JSON.stringify(deletedFabfun));
        if(!deletedCLLIIdList)
            deletedCLLIIdList=[];
        if(selectedArray[selectedItem].fabId)
            deletedCLLIIdList.push(selectedArray[selectedItem].fabId);
        component.set('v.deletedCLLIIdList',deletedCLLIIdList);
        //alert(component.get('v.deletedCLLIIdList'));
        selectedArray.splice(selectedItem, 1);
        component.set("v.selectedArray", selectedArray);
        console.log(''+component.get("v.selectedArray"));
        
        let LogoEvent = component.getEvent("loadMyEvent"); 
       
   LogoEvent.setParams({"FabricArray" : component.get("v.selectedArray")}); 
   LogoEvent.fire();
        
        // helper.deletedFabfun(component, event, helper,clliId);
       // alert(selectedArray.length);
        if(selectedArray.length==0){
           component.set("v.Displayfabval", false); 
             
        }
    },
    selectedval: function(component, event, helper){
        component.set('v.FabricSelectedData',component.get("v.selectedArray"));
    },
    //clear selected record from the selection
    clearData: function(component, event, helper) {
        component.set("v.selectedArray", []);
        component.set("v.Displayfabval", false);
    }
})