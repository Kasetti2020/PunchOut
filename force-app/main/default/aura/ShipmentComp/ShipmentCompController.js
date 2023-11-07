({
	doint : function(component, event, helper,page) {
	//alert('if');
        page = page || 1;        
        var action = component.get("c.GetShipdetails");
        //alert('action>>>>');
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
    pageChange: function(component, event, helper) {
        var spinner = component.find("mySpinner");
        var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.getSHList(component, event, helper,page);
    },
    handleSearchEvent : function(component, event) {
        
        var shipments = event.getParam("POList");
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var sertxt = event.getParam("searchtext");

        if(flag==true && type=='PrintShopViewShip'){
            component.set('v.total', shipments.total);
            component.set('v.page', 1);
            component.set('v.pages', 1);
            component.set("v.SHList",shipments);
            component.set('v.searchText', sertxt);
        }
        else
            $A.get('e.force:refreshView').fire();
        //helper.getPOList(component, event, helper);
    }
})