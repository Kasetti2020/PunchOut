({
    doInit : function(component, event, helper) {
        var recordId = component.get("v.recordId"); 
        var MSONumber = component.get("v.MSONumber");
        var action = component.get("c.getUIThemeDescription");
        action.setCallback(this, function(a) {
            //alert('recordId>>>'+a.getReturnValue());            
            if(a.getReturnValue()=='Theme3')
            {
                component.set("v.isLightning",false);
                component.set("v.isClassic",true);
            }
            else if (a.getReturnValue()=='Theme4d' || a.getReturnValue()=='Theme4t')
            {
                component.set("v.isLightning",true);
                component.set("v.isClassic",false);
            }
        });
        $A.enqueueAction(action);
        
        var actionRistrict = component.get("c.fetchMSO");
        actionRistrict.setParams({ 
            recordId : recordId
        });
        actionRistrict.setCallback(this, function(response) 
                                   {
                                       var state = response.getState();
                                       //alert(state);
                                       if (state === "SUCCESS") {
                                           //alert('responce>>'+JSON.stringify(response.getReturnValue()));
                                           var responce = response.getReturnValue(); 
                                           if(responce.Enquiry_Status__c !='Order submitted' && responce.ERP_Connected__c == true)
                                           {
                                               component.set('v.message','Cannot update the MSO number manually');
                                               component.set("v.ristrict",true);
                                           }
                                           else{
                                               component.set("v.ExpComDate",responce.Expected_Completion_Date__c);
                                               component.set("v.ExpDelDate",responce.Expected_Delivery_Date__c);
                                               
                                           }
                                       }
                                   });
        $A.enqueueAction(actionRistrict);
        
    },
    onchangedate : function(component, event, helper) 
    {
        var CurrentDate = new Date();
        var GivenDate = new Date(component.get("v.ExpComDate"));
        var expdate = component.get("v.ExpDelDate");
        if(GivenDate < CurrentDate){
             var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.The_Date_must_be_Greater_or_Equal_to_today_date"),
                    type: "warning"
                });
                toastEvent.fire();
            component.set("v.ExpComDate",expdate);
        }
    },
    onchangedateclassic : function(component, event, helper) 
    {
        var expdate = component.get("v.ExpDelDate");
        var CurrentDate = new Date();
        var GivenDate = new Date(component.get("v.ExpComDate"));
        if(GivenDate < CurrentDate){
            alert('The Date must be Greater or Equal to today date');
            component.set("v.ExpComDate",expdate);
        }
    },
    submit : function(component, event, helper) 
    {
        //alert('date>>'+component.get("v.ExpComDate"));
        var recordId = component.get("v.recordId");
        var MSONumber = component.get("v.MSONumber");
        var complitiondate = component.get("v.ExpComDate");
        var action = component.get("c.updateMSONum");
        
        action.setParams({ 
            recordId : recordId,
            MSONumber : MSONumber,
            complitiondate : complitiondate
        });
        action.setCallback(this, function(response) 
                           {
                               var state = response.getState();
                               //alert(state);
                               if (state === "SUCCESS") {
                                   var responce = response.getReturnValue(); 
                                   var toastEvent = $A.get("e.force:showToast");
                                   toastEvent.setParams({
                                       title: $A.get("$Label.c.success"),
                                       message: $A.get("$Label.c.MSO_number_updated_successfully"),
                                       type: "success"
                                   });
                                   toastEvent.fire();
                                   $A.get('e.force:refreshView').fire();
                                   $A.get("e.force:closeQuickAction").fire();
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
    submitClassic : function(component,event,helper)
    {
        
        var recordId = component.get("v.recordId");
        var MSONumber = component.get("v.MSONumber");
        var complitiondate = component.get("v.ExpComDate");
        var action = component.get("c.updateMSONum");
        action.setParams({ 
            recordId : recordId,
            MSONumber : MSONumber,
            complitiondate : complitiondate
            
        });
        action.setCallback(this, function(response) 
                           {
                               var state = response.getState();
                               //alert(state);
                               if (state === "SUCCESS") {
                                   var responce = response.getReturnValue();
                                   alert( "MSO number updated successfully" );
                                   history.back();                                   
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
    closeModal : function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire(); 
        //component.set("v.ApprovalForm",false);
    },
    closeModalClassic : function(component, event, helper) {
        history.back();
    }
    
})