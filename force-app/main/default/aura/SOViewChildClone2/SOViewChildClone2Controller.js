({
    
    doint : function(component, event, helper,page) {
        var SOLIlist = component.get('v.SOLIlist');
         var OrdQty = component.get('v.SOLIlist.Supply_Quantity__c');
        var ShipQty = component.get('v.SOLIlist.Ship_qty__c');
         var RemQtyRes = component.get('v.SOLIlist.Remaining_Qty__c');
        
        if(RemQtyRes == 0 || RemQtyRes == '')
        {
            //alert('if');
            if(ShipQty == 0 || ShipQty =='' || ShipQty == undefined || ShipQty == null){
               // alert('if if ShipQty>>>>>>>>>');
            component.set('v.SOLIlist.Ship_qty__c',OrdQty);
             }
        
        }
        else{
           //if(ShipQty == 0 || ShipQty =='' || ShipQty == undefined || ShipQty == null){
            component.set('v.SOLIlist.Ship_qty__c',RemQtyRes);
            // } 
        }
       
       
    },
    
	 checkQty :function(component, event, helper) {
    // alert('checkQty');
        var Qty = component.get('v.SOLIlist.Supply_Quantity__c');
        var SuppQty = component.get('v.SOLIlist.Ship_qty__c');
         var RemQtyRes = component.get('v.SOLIlist.Remaining_Qty__c');
       var remQty; 
          
        if(SuppQty > Qty){
           alert('Shipped Quantity should not more than Ordered Quantity');
              component.set('v.SOLIlist.Ship_qty__c',Qty);
            //component.set('v.SOLIlist.Remaining_Qty__c',0);
        }
         else if( SuppQty <0){
            alert('Shipped Quantity should not Less than Zero');
              component.set('v.SOLIlist.Ship_qty__c',Qty);
           // component.set('v.SOLIlist.Remaining_Qty__c',0);
        }
        else{
          // remQty = Qty - SuppQty;
          // component.set('v.SOLIlist.Remaining_Qty__c',remQty);
        }
         
         if(RemQtyRes > 0){
             //alert('if>>>>>>>');
           if(SuppQty > RemQtyRes){
            alert('Remaning Quatity is '+RemQtyRes+', Please Give Valid Quantity');
              component.set('v.SOLIlist.Ship_qty__c',0);
           // component.set('v.SOLIlist.Remaining_Qty__c',0);
             }   
         }
        
         
         
     }
})