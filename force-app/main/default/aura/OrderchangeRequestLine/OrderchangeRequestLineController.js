({
    doinit : function(component, event, helper) {
        //alert('ROrder>>'+JSON.stringify(component.get("v.ROrder")));
        var rowIndex = component.get("v.rowIndex");
        //alert('rowIndex>>'+rowIndex); 
        var ROrder = component.get("v.ROrder");
		var soli = component.get("v.SOdetails");        
        for(var i = 0 ; i<soli.length ; i++)
        {
            if(i==component.get("v.rowIndex") && soli[i].Production_Status__c=='Under Manufacturing')
            {
                component.set("v.DisableQuantity",true);
            }
            if(i==component.get("v.rowIndex") && (soli[i].POLI_Text_Ids__c != undefined || soli[i].Purchase_Order_LineItem__c != undefined))
            {
                component.set("v.DisablePOLIDetails",true);
            }
            if(i==component.get("v.rowIndex") && (soli[i].variable_data_product__c == 'Yes' ))
            {
                component.set("v.enablePDF",true);
            }
        }
    },
    cancelLine : function(component, event, helper) {
        var txt;
        var rowIndex = component.get("v.rowIndex");
        var ROrder = component.get("v.ROrder");
        var ReviseOrderLineList = component.get("v.ReviseOrderLineList");
        
        if (confirm($A.get("$Label.c.Are_you_sure_you_want_to_cancel"))) {
            ROrder.What_to_Revise__c = 'Cancel Line Item';
            ROrder.Revised__c = 'true';
            ROrder.New_Quantity__c = '';
            component.set("v.ROrder",ROrder);
            component.set("v.DisableQuantity",true);
            txt = $A.get("$Label.c.You_pressed_OK");
        } else {
            txt = $A.get("$Label.c.You_pressed_Cancel");
        }
    },
    changeSOLIQty : function(component, event, helper) {
        var reqline = component.get("v.ROrderLine");
        var soRec = component.get("v.SOdetails.SOLI");
        var revReq = component.get("v.ReviseOrderRequest1");
        var reviseOrderList = component.get("v.ROrder"); 
        
        var Quantity = reviseOrderList.Old_Quantity__c;
        var boxquantity = reviseOrderList.Box_Quantity__c;
        var fullboxquantity = reviseOrderList.Full_Box_Quantity__c;
        var result = Math.ceil(Quantity/boxquantity)*boxquantity;
        
        reviseOrderList.What_to_Revise__c ='Quantity';
        if(reviseOrderList.New_Quantity__c <=0)
        {
            reviseOrderList.Revised__c = false;
        }
        else 
        {
            reviseOrderList.Revised__c = true;
        }
        //console.log('reviseOrderList in line'+JSON.stringify(reviseOrderList)); 
        component.set("v.ROrder",reviseOrderList);
    },
    ViewPO : function(component, event, helper)
    {
         var viewId = event.getSource().get("v.name");
        //added by Sandhya[10/20/202] for Single SO Conversion CR
        if(viewId.includes(',')){
            var action = component.get("c.getrevisePOLI");
            action.setParams({poliIds : viewId.split(',')});
            action.setCallback(this, function(response){
                var result = response.getState();
                if(result == 'SUCCESS'){
                    var revpoliList = response.getReturnValue();
                    component.set("v.PONameList",revpoliList);
                }
            });
         /*  var mergePOLIName =  event.getSource().get("v.value");
            var POLINameList =[];
            for(var i=0; i<viewId.split(',').length; i++){
                var poliname = mergePOLIName.split(',')[i];
                var poliId = viewId.split(',')[i];
                var poLiobj ={};
                poLiobj['Id'] = poliId;
                poLiobj['Name'] = poliname;
                POLINameList.push(poLiobj);
               
            }
            
            component.set("v.PONameList",POLINameList);*/
            component.set("v.multiplePOLIPopup",true);
             $A.enqueueAction(action); 
        }
        else{
            component.set('v.isOpen',true);
             component.set("v.multiplePOLIPopup",false);
            component.set('v.viewPOLIID',viewId);
        }
        
    },
    closeModalPOLI : function(component, event, helper){
        component.set("v.multiplePOLIPopup",false);
    },
    closeModal: function(component, event, helper)
    {
        component.set("v.isOpen",false);
        
    },
    ViewPDF: function(component, event, helper)
    {
        var viewSOLIID = component.get("v.ROrder.Mainetti_SOLI__c");
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        urlString = CommunityBaseURL+"/apex/SOLICustomerPDF"+"?Id="+viewSOLIID;
        var win = window.open(urlString, '_blank');
    }
    
})