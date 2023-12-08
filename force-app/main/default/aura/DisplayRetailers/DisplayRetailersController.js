({
    doInit : function(component, event, helper) 
    {
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");
        
        helper.Getcontactid(component, event, helper);
         
       // alert('123');
       // this.Catalogcmp(component, event,helper);
    },
    Catalogcmp :function(component, event, helper) 
    {
       // alert();
        //component.set("v.onselectRetailer",event.currentTarget.name);
        component.set("v.onselectRetailer",component.get("v.retailerValue"));
        var RList = component.get("v.RoList");
        for(var i=0;i<RList.length;i++){
            if(RList[i].Name==event.currentTarget.name){
                component.set("v.onselectRetailercode",RList[i].Id);
            }
        } 
        var res = helper.pickListVal(component,component.get("v.onselectRetailer"),'Retailer_Code_Hidden__c','Order_Country__c');
        component.set("v.SelectRetailer",event.currentTarget.title);
        helper.GetcustomInfoid(component, event, helper);
        component.set("v.showConfirmDialog",true);
    },
    //Bussiness Verticle picklist
    onVerticleChange: function (component, evt, helper) {
        // alert(component.find('select').get('v.value') + ' pie is good.');
        component.set('v.SelectedPiklistVertical', component.find('select').get('v.value'));
    },
    //order to company picklist
    OrderToCompany:function(component, event, helper)
    {
        var compName = event.getSource().get("v.value");
        helper.pickListVal(component,compName,'Order_Country__c','Preferred_Currency__c');
        component.set('v.SelectedPiklistCompany',compName);
        component.set('v.selectedCurrency','NULL');
       component.set('v.SelectedPiklistCurrency','NULL');
        
    },
    //preferred to currency picklist
    preferredCurrency:function(component, event, helper)
    {
        var preferedCurrency = event.getSource().get("v.value");
        component.set('v.SelectedPiklistCurrency',preferedCurrency);
        
    },
    cancelPopUp : function(component, event, helper) {
        component.set('v.showConfirmDialog', false);
        component.set('v.selectedCompany', null);
        component.set('v.selectedCurrency', null);
    },
    handleStartOrder  : function(component, event, helper) {
        var vertical = component.get("v.SelectedPiklistVertical");
        var company = component.get("v.SelectedPiklistCompany");
        var currency = component.get("v.SelectedPiklistCurrency");
        if(vertical == ''){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:  $A.get("$Label.c.Please_select_a_Bussiness_Vertical"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        else{
            component.set('v.cartVertical',vertical);
        }
        
        if(company == '' || company == 'NULL')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.Please_Select_a_Order_To_Company"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        else{
            component.set('v.cartCompany',company);
            // alert(component.get('v.cartCompany'));
        }
        if(currency == '' || currency == 'NULL')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.Please_Select_a_Preferred_Currency"),
                type: "Error"
            });
            toastEvent.fire();
            return;
        }
        else{
            component.set('v.cartCurrency',currency);
        }
        if(component.get('v.cartVertical') != '' &&  component.get('v.cartCompany') != '' && component.get('v.cartCurrency') != ''){
            helper.loadCatalogOrder(component, event, helper);
            component.set('v.showConfirmDialog', false);  
            
        }
        
    },
    
})