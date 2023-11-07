({

            getDefaultLanguage : function (cmp,event, helper)
            {
            var action = cmp.get("c.getDefaultLanguage");
            action.setCallback(this,function(response){   
            var state = response.getState();  
            if(state === "SUCCESS"){ 
            var defaultLan = response.getReturnValue();
            //alert('defaultLan>>'+defaultLan);
            cmp.set("v.defaultLanguage", defaultLan); 

            }
            else if(state === 'ERROR'){
            alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
            });
            $A.enqueueAction(action);
            },
    
    
})