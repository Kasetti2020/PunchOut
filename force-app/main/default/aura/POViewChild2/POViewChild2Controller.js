({
	doint : function(component, event, helper) {
        
        component.set('v.SupplyQuantity',component.get('v.POLIlist.Supply_Quantity__c'));
        var today = new Date();
        var formattedDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
        component.set('v.ExpectedDeliveryDate',component.get('v.POLIlist.Expected_Delivery_Date__c'));
        component.set('v.POLIlist.Expected_Delivery_Date__c',formattedDate);
        //component.set('v.ExpectedDeliveryDate',formattedDate);
        var colorList = JSON.parse(component.get('v.POLIlist.Colors_Available__c'));
		component.set('v.colorList',colorList);
	},
    checkQty :function(component, event, helper) {
       // alert('checkQty');
        var Qty = component.get('v.POLIlist.Quantity__c');
        var SuppQty = component.get('v.POLIlist.Supply_Quantity__c');
        //alert(Qty);
        //alert(SuppQty);
        
        if(SuppQty > Qty){
           alert('Supply Quantity should not more than Actual Quantity');
              component.set('v.POLIlist.Supply_Quantity__c',Qty) 
        }
        else if(SuppQty < 0 || SuppQty == undefined || SuppQty == null || SuppQty == ''){
           alert('Suuply Quantity should not less than 0');
              component.set('v.POLIlist.Supply_Quantity__c',Qty) 
        }
        else{
            //alert('else');
        }
        
    },
    /*EditPOli : function(component, event, helper){
         var editrowId = event.getSource().get("v.value");
        //alert(editrowId);
        component.set('v.POliRecordId',editrowId);
    component.set('v.IsPOLI',true);
       
    },*/
    viewPOLI : function(component, event, helper)
    {
        var poliId = event.getSource().get("v.value");
        var scope= "d";
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        urlString = CommunityBaseURL+"/apex/POLICustomerPDF?id="+poliId+"&sc="+scope;
        //urlString = CommunityBaseURL+"/apex/POCustomerPDF"+"?id="+viewSOLIID+"&sc=h";
        var win = window.open(urlString, '_blank');
        
    },
    closeModal:function(component, event, helper){
        component.set('v.IsPOLI',false);
    },
    changeQty:function(component, event, helper){
        //alert('Inside changeQty POLIlist.Supply_Quantity__c>>'+component.get('v.POLIlist.Supply_Quantity__c'));
         if(component.get('v.POLIlist.Supply_Quantity__c') < 0 || isNaN(component.get('v.POLIlist.Supply_Quantity__c')) )
         {
             var toastEvent = $A.get("e.force:showToast");
             toastEvent.setParams({
                 "title": $A.get("$Label.c.Error"),
                 "type" : "error",
                 "message": $A.get("$Label.c.Enter_Valid_Quantity")
             });
             toastEvent.fire();
             
             component.set('v.POLIlist.Supply_Quantity__c',component.get('v.SupplyQuantity'));
             return;
             
         }
    },
    
     changeDate:function(component, event, helper){
         var GivenDate = component.get('v.POLIlist.Expected_Delivery_Date__c');
         if(GivenDate<$A.localizationService.formatDate(new Date(), "YYYY-MM-DD"))
            {
                component.set('v.POLIlist.Expected_Delivery_Date__c',component.get('v.ExpectedDeliveryDate'));
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"warning",
                    "title": $A.get("$Label.c.Warning"),
                    "message": $A.get("$Label.c.Expected_Delivery_date_must_not_be_in_the_past")
                });
                toastEvent.fire();
                event.preventDefault();
                return;
            }
         else
         {
             component.set('v.ExpectedDeliveryDate',component.get('v.POLIlist.Expected_Delivery_Date__c'));
         }
         /*
        //alert('Inside changeDate POLIlist.Expected_Delivery_Date__c>>'+component.get('v.POLIlist.Expected_Delivery_Date__c'));
         var GivenDate = component.get('v.POLIlist.Expected_Delivery_Date__c');
         var CurrentDate = new Date();
         //alert('CurrentDate>>>'+CurrentDate);
         GivenDate = new Date(GivenDate);
         //alert('GivenDate>>>'+GivenDate);
         if(component.get('v.POLIlist.Expected_Delivery_Date__c') == component.get('v.ExpectedDeliveryDate') ){
             //alert('Nothin jus return>>>');
             return;
         }
         if(GivenDate < CurrentDate){
              var toastEvent = $A.get("e.force:showToast");
             toastEvent.setParams({
                 "title": "Error",
                 "type" : "error",
                 "message": " Expected Delivery Date cannot be older date or empty!."
             });
             toastEvent.fire();
             
             component.set('v.POLIlist.Expected_Delivery_Date__c',component.get('v.ExpectedDeliveryDate'));
             return;
         }
         */
        
    },
    
    
     handleSuccess1 : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({"title": $A.get("$Label.c.success"),"message": $A.get("$Label.c.The_Purchase_Order_s_info_has_been_updated"),"type": "success"});toastEvent.fire();
         
        helper.hidePoli(component);
    },
     handleCancel : function(component, event, helper) {
        helper.hidePoli(component);
        event.preventDefault();
    },
})