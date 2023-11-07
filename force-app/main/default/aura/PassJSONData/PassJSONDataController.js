({
    
    init : function(component, event, helper) {  
       
       /* let ref = component.get('v.pageReference');    
        let param1 = ref.state.c__serviceType;
        let param2 = ref.state.c__countryCode;
        alert('param1');
        //Assigning the data back to an attribute
        component.set( 'v.servType', param1);
        component.set( 'v.counrty', param2);*/
        //alert('doint');
        
        const xmlSample = '<From><Credential domain="DUNS"><Identity>12345678</Identity> </Credential></From>';
		console.log(parseXmlToJson(xmlSample));

function parseXmlToJson(xml) {
    const json = {};
    for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && parseXmlToJson(res[2]);
        json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;

    }
    console.log('Json><>>>'+JSON.stringify(json));
    return json;
}
            },
            
            
            
            myControllerMethod: function(component, event, helper) {
            helper.callmyControllerMethod(component, event, helper);
            },
            activeButton:function(component, event, helper) {
            var json=component.find('Data').get("v.value");
            if(json != null){
            component.set('v.disabled',false);
            }
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
            handleChildObjName : function(component, event, helper){
            var selectedField = event.target.id;
            var childObjValue = event.getSource().get("v.value");
            component.set("v.SelChildObjName",childObjValue); 
            },
            
            onHeaderChange2 : function(component, event, helper) {
            var selectedField = event.target;
            var value=selectedField.value;
            var selectedValue = event.getSource().get("v.value");
            },
            
            saveHandler:function(component, event, helper) {
            helper.callsaveHandler(component,event,helper);  
            },
            
            activeButton:function(component, event, helper) {
            var json=component.find('Data').get("v.value");
            if(json != null){
            component.set('v.disabled',false);
            }
            },
            
            Behind:function(component, event, helper) {
            helper.callBehind(component,event,helper);
            },
            HandlerClick:function(component, event, helper) {
            helper.callHandlerClick(component, event, helper);        
            },
            
            updateSelectedText: function (component, event) {
            var selectedRows = event.getParam('selectedRows');
            component.set('v.selectedRowsCount', selectedRows.length);
            var slectCount =selectedRows.length;
            // console.log('slectCount'+slectCount);
            var setRows = [];
                      for ( var i = 0; i < selectedRows.length; i++ ) {
            setRows.push(selectedRows[i]);
        }
        component.set("v.selectedLeads", setRows);
        // console.log('selected data:'+setRows);
        if(slectCount>0){
            component.set('v.ButtonShow', true);
        }else{
            component.set('v.ButtonShow', false);
        }
    },
    
    HandleFinish:function(component, event, helper) {
        $A.get('e.force:refreshView').fire();      
    }, 
    
    handleConfirmEdit :function(component, event, helper) {
        helper.getAllFields(component, event, helper);
        var jsonData = component.get("v.storejson");
        var fetchingdata=component.get("c.getRecord");
        component.set("v.ServiceTypeEdit",true);
        component.set("v.validateprogressbarforfinal",true);
        component.set("v.PreviousValid",true);
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
            }
        });
        $A.enqueueAction(fetchingdata);
        component.set("v.showProgressBar", false);
        component.set("v.ServiceTypedetails", false);
        component.set("v.mapPage",true); 
    },
    
    handleConfirmDialogCancel : function(component, event, helper) {
        component.set('v.showDeleteBox', false);
    }, 
    handleConfirmDialog : function(component, event, helper) {
        component.set('v.showDeleteBox', true);
    },
    
    handleClicks: function(component, event, helper){
        var records = component.get("v.selectedLeads");
        helper.deltingCheckboxAccounts(component, event,helper,records);
    },
    
    navigateToParentComponent:function(component, event, helper) {
        helper.callnavigateToParentComponent(component,event,helper);
    },
    
    Step1:function(component, event, helper) {
        helper.callnavigateToLwcComponent(component, event, helper);
    },
    
    Step2:function(component, event, helper) {
        component.set("v.mapPage",false);
        helper.callHandlerClick(component, event, helper);
    },
    Step3: function(component, event, helper) {
        helper.callmyControllerMethod(component, event, helper);
    },
    Step4: function(component, event, helper) {
        helper.callsaveHandler(component, event, helper);
    },
    
    PreviewJSON:function(component, event, helper) {
        component.set("v.mapPage",false);
        //component.set("v.PostmanLink",true);
        component.set("v.mapPageForPreview",true);
    },
    previousPage:function(component, event, helper) {
        component.set("v.mapPageForPreview",false);
        component.set("v.mapPage",true);
        component.set("v.PostmanLink",false);
    },
    backToLwc:function(component,event,helper){
        var parentComponent = component.get("v.parent");                         
        parentComponent.greetingMethod();
    },
})