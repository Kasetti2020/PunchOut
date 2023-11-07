({
    fetchRA : function(component, event, helper,page) 
    {
        page = page || 1;
        var action = component.get("c.getretailerName");
        //var action = component.get("c.getorderToCompanyList"); 
        var v2 = component.get("v.Status");
        //alert('component.get("v.Status") :'+v2);
        // alert('v2 :'+v2);
        /*action.setParams({ 
            Status : component.get("v.Status"),
            pageNumber : page
        });*/
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var res = response.getReturnValue(); 
                //alert('res :'+res);                
                var wrapList = res.reuseOrdclass;
                //alert('wrapList :'+wrapList);
                component.set('v.SOresponse', res.reuseOrdclass);
                if (res) {
                    //component.set('v.SOresponse', res);
                    component.set('v.total', res.totalRecords);
                    component.set('v.page',	res.page);
                    component.set('v.pages', Math.ceil(res.totalRecords/res.pageSize));
                   }
                else
                {
                    component.set('v.SOresponse', '');
                    component.set('v.total', 0);
                    component.set('v.page',	1);
                    component.set('v.pages', 1);
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");   
        });
        
        $A.enqueueAction(action);
    },
})