({
    getCountryWithLanguage:function(component, event, helper){
    var action = component.get("c.getCountryandLanguageList");
        action.setParams({
            "retailerCode": component.get("v.retailerID"),
            "selectedcountry":component.get("v.selectedcountry")
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS'){
                var mainwrapper = response.getReturnValue();
                component.set("v.LangCountryList",mainwrapper);
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action);
    }
})