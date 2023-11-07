({
 
    moveNext : function(component,event,helper){
     // control the next button based on 'currentStep' attribute value    
     var getCurrentStep = component.get("v.currentStep");
        if(getCurrentStep == "1"){
            component.set("v.currentStep", "2");
        }
        else if(getCurrentStep == 2){
            component.set("v.currentStep", "3");
        }
         else{
            component.set("v.currentStep", "4");
        }
    },
    
    moveBack : function(component,event,helper){
      // control the back button based on 'currentStep' attribute value    
        var getCurrentStep = component.get("v.currentStep");
         if(getCurrentStep == "2"){
            component.set("v.currentStep", "1");
         }
         else if(getCurrentStep == 3){
            component.set("v.currentStep", "2");
         }
         else {
            component.set("v.currentStep", "3");
         }
    },
    
    finish : function(component,event,helper){
      // on last step show the alert msg, hide popup modal box and reset the currentStep attribute  
        alert('Thank You !');
        component.set("v.isOpen", false); 
        component.set("v.currentStep", "1");
    },
   
   // when user click direactly on step 1,step 2 or step 3 indicator then showing appropriate step using set 'currentStep'   
    selectFromHeaderStep1 : function(component,event,helper){
        component.set("v.currentStep", "1");
    },
    selectFromHeaderStep2 : function(component,event,helper){
        component.set("v.currentStep", "2");
    },
    selectFromHeaderStep3 : function(component,event,helper){
        component.set("v.currentStep", "3");
    },
    selectFromHeaderStep4 : function(component,event,helper){
        component.set("v.currentStep", "4");
    },
})