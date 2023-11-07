({
    doinit : function(component, event, helper){    
        var param= window.location.search;
        var recId=((param.replace('?','')).replace('=','')).split('scan');
        var scan=recId[1];
        helper.decode(component, event, helper, scan);
        
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set("v.selectedDate", today);
        component.set("v.recordId", recId[1]);
        
    },
    dateController : function(component, event, helper){
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        var dateValue = component.get("v.selectedDate");
        if(dateValue > today){
            helper.showError(component, event, helper, 'You cannot enter greater than today');
            dateValue = today;
            component.set("v.selectedDate", dateValue);
        }
    },
    createTracker : function(component, event, helper){
        var storeId = component.get("v.storeIdData");
       var trackeringdate = component.get("v.selectedDate");
        var trackeringCount = Number(component.get("v.cartonNos"));
       
        if((trackeringCount==0 || isNaN(trackeringCount) || trackeringCount<1 || !(Number.isInteger(trackeringCount)))){
           
            helper.showError(component, event, helper, 'Please enter appropriate carton number count');
        }else if(trackeringCount>=999999999999999999){
            
            helper.showError(component, event, helper, 'Please enter valid carton number less than 18 digits');
        }
        else{
                    component.set("v.disablecartonNos", true);   
                    var action = component.get("c.createTrackerdata");
                    action.setParams({
                        'storeId': storeId.Id,
                        'trackeringdate':trackeringdate,
                        'trackeringCount':trackeringCount
                    });
                     action.setCallback(this, function(response) {
                        var state = response.getState(); 
                        if (state === "SUCCESS") {
                            component.set("v.disablecartonNos", true);    
                            var stringItems = response.getReturnValue();
                             helper.showSuccess(component,event,helper,'Carton Count Updated Successfully');
                             component.set("v.showMessage",true);
                             component.set("v.componentVisibility", false);
                             const url = new URL(window.location.origin+'/RTS/s/store-id');
                            url.searchParams.set('scan', 'nan');
                            window.history.replaceState({}, '', url);
                            window.history.pushState({}, '', url)
                             window.history.forward();
                             function noBack() {
                                 window.history.forward();
                             }

                        }
                        else if( state=="ERROR"){
                            var errors = response.getError();
                            if (errors) {
                                if (errors[0] && errors[0].message) {
                                    // log the error passed in to AuraHandledException
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
    },

})