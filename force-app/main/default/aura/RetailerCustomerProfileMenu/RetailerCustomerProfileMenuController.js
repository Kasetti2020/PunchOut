({
            
            doInit : function(cmp, event, helper)
            {  
                var action = cmp.get("c.getUserName");
                action.setCallback(this, function(response){
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        cmp.set("v.userName", response.getReturnValue());
                    }
                });
                $A.enqueueAction(action);
                helper.getDefaultLanguage(cmp,event, helper);
            },
            
            
            handleClick : function(cmp, event, helper) {
                var menuValue = event.detail.menuItem.get("v.value");
                var label = '23';
                
                if(menuValue =='1')
                {
                    cmp.set('v.showLanguageSection', true);
                    var action = cmp.get("c.getLanguageData");
                    action.setCallback(this,function(response){   
                        var state = response.getState();  
                        if(state === "SUCCESS"){ 
                            var records = response.getReturnValue();
                            //alert('records>>'+records);
                            cmp.set("v.availableLanguage", records); 
                            
                        }
                        else if(state === 'ERROR'){
                            alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
                        }
                    });
                    $A.enqueueAction(action);
                }    
                
                if(menuValue =='2')
                {
                    //alert('Inside Logout>>>>');
                    var urlString = window.location.href;
                    var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
                    window.location.replace(CommunityBaseURL+"/secur/logout.jsp?retUrl="+CommunityBaseURL+"/s/login");
                    
                }
                
            },
    
    
            changeLanguage: function(component, event, helper) {
                var selectedLang = component.get('v.selectedLanguage');
            },
            
            
            CloseLanguageData : function(component, event, helper) 
            {
                component.set('v.showLanguageSection', false); 
            },
            
            
            UpdateLanguageData : function(component, event, helper) 
            {
                var selectedLang = component.get('v.selectedLanguage');                
                var action = component.get("c.changeLanguageData");
                action.setParams({
                    lang: selectedLang
                });
                action.setCallback(this, function(response){
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        var changedOK = response.getReturnValue();
                        if (changedOK == 'OK')
                            location.reload();
                        else {
                            alert('error, changed not OK: ' + changedOK);
                        }
                    }
                    else {
                        alert('error in state: ' + state);
                    }
                });
                $A.enqueueAction(action);
                component.set('v.showLanguageSection', false);
            },
            
            
            
            
})