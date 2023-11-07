({
    doint : function(component, event, helper,page) {
        //alert('if');
        component.set('v.IsSpinner',true);
        page = page || 1;        
        var action = component.get("c.POListViewonly");
        action.setParams({ pageNumber : page });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                var accs = response.getReturnValue(); 
                //alert(JSON.stringify(accs));
                component.set('v.total', accs.total);
                component.set('v.page', accs.page);
                component.set('v.pages', Math.ceil(accs.total/accs.pageSize));
                component.set("v.items",accs.PoList);
                component.set('v.IsSpinner',false);
               // component.set("v.items",[{expanded: false, title: accs.PoList}]);
               /* for(var i =0; i<accs.PoList.length ; i++){
                    var group = accs.PoList;
                    group.splice(i, 1); 
                    component.set("v.items", [
                        { expanded: false, title: group}
                        
                    ]);                
                }*/
                
               // alert(JSON.stringify(component.get("v.items")));
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
        helper.getPOList(component, event, helper,page);
    },
    openRecords : function(component, event, helper){
        
        component.set("v.POLIopen",true);
    },
    EditPO : function(component, event, helper){
        // alert('EditPO');
        var editrowId = event.getSource().get("v.value");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": editrowId,
            "panelOnDestroyCallback": function(event) {
                // $A.get('e.force:refreshView').fire();
                window.location.href = "/lightning/n/POViewPage";
            }
        });
        editRecordEvent.fire();
        
    },
    toggle: function(component, event, helper) {
        var items = component.get("v.items"), index = event.getSource().get("v.value");
        items[index].expanded = !items[index].expanded;
        component.set("v.items", items);
    },
    handleSearchEvent : function(component, event) {
        
        var poList = event.getParam("POList");
         //alert('poList ::'+JSON.stringify(poList));
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var sertxt = event.getParam("searchtext");
        if(flag==true && type=='RetailerPO'){
            component.set('v.total', poList.total);
            component.set('v.page', poList.page);
            component.set('v.pages', Math.ceil(poList.total/poList.pageSize));
            component.set("v.items", poList.PoList1);
            component.set("v.searchText", sertxt);
        }
        else{
            $A.get('e.force:refreshView').fire();
            }
            
    },
    
})