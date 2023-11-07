({
	fetchBulkSalesOrder : function(component, event, helper,page)  
    {
        //alert('inside fetchbulk>>> '+$A.get( "$SObjectType.CurrentUser.Id" ));
        page = page || 1; 
        var searchstring = null;
        //var action = component.get("c.fetchBulkSalesOrder");   Commented By Bharath on 08/12/2021
         var action = component.get("c.fetchBulkSalesOrderForAdminRevise");
        action.setParams({pageNumber : page,
                         Searchtext : searchstring
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var responce = response.getReturnValue(); 
                console.log('responce>>'+JSON.stringify(responce));  
                component.set("v.List",response.getReturnValue());
                   component.set("v.ListWrapper",response.getReturnValue());
                component.set('v.total', response.getReturnValue().totalRecords);
                component.set('v.page',	response.getReturnValue().page);
                component.set('v.pages', Math.ceil(response.getReturnValue().totalRecords/response.getReturnValue().pageSize));
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
	}
})