({
	init : function(component, event, helper) {
        //alert('EditJsonOutPutJSONController');
         let ref = component.get('v.pageReference'); 
        let param1 = ref.state.c__param1;
        let param2 = ref.state.c__param2;
        helper.showSpinner(component,event,helper);
        helper.getAllFields(component, event, helper);
          helper.getAllfieldsFromMetadata(component, event, helper);
           helper.getChildObjects(component, event, helper);
           helper.getRelatedChildObjects(component, event, helper);
        var jsonData = component.get("v.storejson");
        component.set("v.ServiceTypeEdit",true);
        component.set("v.PreviousValid",true);
        component.set("v.ServiceTypeId",param1.Id);
        var fetchingdata=component.get("c.getRecord");
         fetchingdata.setParams({
                serviceTypeId : param1.Id,
             erpCountry:param2
            });
        fetchingdata.setCallback(this,function(responce){
            var state=responce.getState(); 
            if(state=='SUCCESS'){
                 helper.hideSpinner(component,event,helper);
                var result=responce.getReturnValue();
                console.log('result'+JSON.stringify(result));
                var items=[];
                for (var i = 0; i < result.length; i++) {
                    items.push(result[i]);
                }
                component.set("v.storejson",items);
                console.log('result'+JSON.stringify(component.get("v.storejson")));
            }
        });
        $A.enqueueAction(fetchingdata);
	},
    handleChange : function(component, event, helper){
            var selectedField = event.target.id;
            var selectedValue = event.getSource().get("v.value");
            component.set("v.SelObj",selectedValue); 
            },
            
            handleChange2 : function(component, event, helper){
            var selField = event.target.id;
            var selectedValue = event.getSource().get("v.value");
            component.set("v.SelectedObj",selectedValue); 
            },
    
    PreviewJSON:function(component, event, helper){
        helper.showSpinner(component,event,helper);
        component.set("v.EditPage",false);
        component.set("v.UpdateRecordPage",true);
        helper.hideSpinner(component,event,helper);
    },
    handleChildObjName : function(component, event, helper){
            var selectedField = event.target.id;
            var childObjValue = event.getSource().get("v.value");
            component.set("v.SelChildObjName",childObjValue); 
            },
    
    SaveHandler: function(component, event, helper){
        helper.showSpinner(component,event,helper);
        helper.callsaveHandler(component, event, helper);
    },
    Behind: function(component, event, helper){
        component.set("v.storejson",[]);
        component.set("v.allField",[]);
        component.set("v.getAllObject",[]);
        component.set("v.allChildObject",[]);
        var navService = window.location.href + "https://mainetti--magnets1.sandbox.lightning.force.com/lightning/n/Mainetti_ERP"; // Replace "LwcPageName" with the actual name or URL of your LWC page        
                  window.location.replace(navService);
       // component.set("v.calllwcforback",true);
        //component.set("v.EditPage",false);
       /* var navEvt = $A.get("e.force:navigateToComponent");
        navEvt.setParams({
            componentDef: "c:mainettiServiceType", 
            componentAttributes: {
                // Pass any attributes to the LWC if needed
            }
        });
        navEvt.fire();
        */
    }
})