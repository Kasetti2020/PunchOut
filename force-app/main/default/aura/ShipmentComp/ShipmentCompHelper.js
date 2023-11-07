({
	getSHList : function(comp, event, helper,page) 
    {
        page = page || 1;
        var action = comp.get("c.GetShipdetails");
        action.setParams({ pageNumber : page });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                var MainWrapper = response.getReturnValue();
                 component.set('v.total', MainWrapper.total);
                component.set('v.page', MainWrapper.page);
                component.set('v.pages', Math.ceil(MainWrapper.total/MainWrapper.pageSize));
                component.set("v.SHList",MainWrapper);
               	
              //alert(JSON.stringify(component.get("v.SHList")));
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
        });
        $A.enqueueAction(action);
    },
})