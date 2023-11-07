({
    doint : function(component, event, helper,page) {
        // alert('if');
       helper.getSOList(component, event, helper,page);
      
    },
    
    selectAll: function(component,event, helper){
        var slctCheck = event.getSource().get("v.value");
        var SOLI = component.get("v.SOList.SOLIList");
        //alert('POLI'+JSON.stringify(POLI));
        console.log('1st'+JSON.stringify(SOLI));
        var solipush = [];
        if(slctCheck)
        {
            //alert('if');
            for(var i=0; i<SOLI.length; i++)
            {
                
                SOLI[i].IsSelected= true;
                solipush.push(SOLI[i]);
                
            }
            component.set("v.SOList.SOLIList",SOLI); 
            console.log('last'+JSON.stringify(SOLI));
            
        }
        else
        {
            // alert('else');
            for(var i=0; i<SOLI.length ; i++)
            {
                SOLI[i].IsSelected = false;
                solipush.push(SOLI[i]);
            }
            component.set('v.SOList.SOLIList',solipush); 
        }
        
        
    },
    pageChange: function(component, event, helper) {
        var spinner = component.find("mySpinner");
        var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.getSOList(component, event, helper,page);
    },
    
    ConfirmShipment: function(component, event, helper)
    {
        
        var ListOfSOLIs = component.get("v.SOList.SOLIList");
        component.set('v.flag',false);
        if (!Array.isArray(ListOfSOLIs)) {
            ListOfSOLIs = [ListOfSOLIs];
        }
        var selctedRec = [];
        var shipqtyres;
        var ErrorMesssage;
        var ShowErrorMesssage = false;
        var IsSimilarShipAddress = true;
        var ShipAddressArray = [];
        
        
        for (var i = 0; i < ListOfSOLIs.length; i++) {
            
            if(ListOfSOLIs[i].IsSelected == true )
            {
                //------ Validation starts from here ---
                /*alert('Ordered Quantity>>>'+ListOfSOLIs[i].SOLIwrap.Supply_Quantity__c);
                alert('Shipping  Quantity>>>'+ListOfSOLIs[i].SOLIwrap.Ship_qty__c);
                alert('Remaining Quantity>>>'+ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);*/
          		
                //---- Ship to Address Validation starts from here --------
                //alert('Ship to Address Id>>>'+ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Ship_to_Address__c);
              
                if (ShipAddressArray === undefined || ShipAddressArray.length == 0) 
                {
                    //alert('Inside ShipAddressArra empty');
                    ShipAddressArray.push(ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Ship_to_Address__c); 
                }
                else
                {
                    //alert('Inside ShipAddressArra not empty');
                    if(ShipAddressArray.includes(ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Ship_to_Address__c))
                    {
                        //alert('Inside IsSimilarShipAddress if');
                        //IsSimilarShipAddress = true;
                    }else
                    {
                        //alert('Inside IsSimilarShipAddress else');
                        IsSimilarShipAddress = false;
                        ShipAddressArray.push(ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Ship_to_Address__c); 
                        //return;
                        
                    }
                    
                }
                

                //---- Ship to Address Validation starts from here --------
                
                //alert('Ship Qty>>'+ListOfSOLIs[i].SOLIwrap.Ship_qty__c);
                //alert('Remaining Qty>>'+ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);
                if(ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c == 0)
                {
                    //alert('Inside Remaining Qty is zero check>>>')
                    if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c > ListOfSOLIs[i].SOLIwrap.Supply_Quantity__c)
                    {
                        /*alert('Ship Qty cannot exceed Order Quntity at>>'+i);
                        ShowErrorMesssage = true;
                        //ErrorMesssage = 'Supplier code is already in use for this retailer code:'+ExistingRetailerDataList[j].Retailer_Code__r.Name + ' at row '+(i+1);
                        ErrorMesssage = 'Ship Qty cannot exceed Order Quantity : '+ 'at row '+(i+1);
                        component.set("v.ErrorMesssage",ErrorMesssage);
                        component.set("v.ShowErrorMesssage",true);
                        return;*/
                        
                        //alert('Before Firing an toast event>>>');
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": $A.get("$Label.c.Error"),
                            "type" : "error",
                            "message": $A.get("$Label.c.Ship_quantity_cannot_exceed_Ordered_quantity") +$A.get("$Label.c.At_Row")+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                        });
                        toastEvent.fire();
                        return;
                        
                    }
                }
               
                else if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c > ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c)
                {
                    //alert('Ship Qty>>'+ListOfSOLIs[i].SOLIwrap.Ship_qty__c);
                    //alert('Remaining Qty>>'+ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Error"),
                        "type" : "error",
                        "message": $A.get("$Label.c.Ship_quantity_cannot_exceed_remaining_quantity")+$A.get("$Label.c.At_Row")+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                    });
                    toastEvent.fire();
                    return;
                    
                }
                
                 if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c <= 0)
                {
                    //alert('Before Firing an toast event>>>');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Error"),
                        "type" : "error",
                        "message": $A.get("$Label.c.Ship_quantity_cannot_be_less_than_zero")+$A.get("$Label.c.At_Row")+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                    });
                    toastEvent.fire();
                    return;

                }
                //------ Validation ends till here ---
              	
                //--------------------Overwriting some extra fields -----------------------
                if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c == ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c)
                {
                    ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c = 0;
                }else
                {
                    
                    //alert('INside else Supply_Quantity__c  >>>'+ListOfSOLIs[i].SOLIwrap.Supply_Quantity__c);
                    //alert('INside else Ship_qty__c >>>'+ListOfSOLIs[i].SOLIwrap.Ship_qty__c);
                    //alert('INside else before modifying Remaining_Qty__c >>>'+ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);
                    //alert('Supply Qty>> >>>'+ListOfSOLIs[i].SOLIwrap.Supply_Quantity__c +' And Ship_qty__c>>'+ListOfSOLIs[i].SOLIwrap.Ship_qty__c);
                    //alert('correct  Remaining_Qty__c>>>'+(ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c - ListOfSOLIs[i].SOLIwrap.Ship_qty__c));
                    
                    ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c = ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c - ListOfSOLIs[i].SOLIwrap.Ship_qty__c;
                    //alert('INside else before modifying Remaining_Qty__c >>>'+ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);
                }
                
                
                if(ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c == 0)
                {
                    
                    //ListOfSOLIs[i].SOLIwrap.Status__c = 'Shipped'; 
                    ListOfSOLIs[i].SOLIwrap.Online_Detail_Status__c = 'Fully Shipped';
                    ListOfSOLIs[i].SOLIwrap.Production_Status__c = 'Shipped';
                }
                else
                {
                    //ListOfSOLIs[i].SOLIwrap.Status__c = 'Partially Shipped';
                    ListOfSOLIs[i].SOLIwrap.Online_Detail_Status__c = 'Order Partial';
                    ListOfSOLIs[i].SOLIwrap.Production_Status__c = 'Under Manufacturing';
                    
                }
                
                /*alert('shipped qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Ship_qty__c);
                alert('remning qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);
                alert('ordered qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Ordered_Quantity__c);
                alert('Supply_Quantity__c qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Supply_Quantity__c);
                alert('Final  ListOfSOLIs[i].SOLIwrap.Status__c>>>'+ ListOfSOLIs[i].SOLIwrap.Status__c);                
                */
                //--------------------Overwriting some extra fields till here -----------------------
                
                component.set('v.flag',true);
              
            }
            
        }
        
        //alert('final IsSimilarShipAddress flag is>>>'+IsSimilarShipAddress);
        if(!IsSimilarShipAddress)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.All_selected_SOLI_should_have_same_ship_to_address")
            });
            toastEvent.fire();
            return;
            
        }
        
        var flag = component.get('v.flag');
        if(flag){
            component.set('v.ConfirmShip',true);
        }
        else{
            //alert('select atleast one Order');
            return null;
        }
        
        
        
        
    },
    
    CreateShipment:function(component, event, helper){
        
      //-----Validation for Shipment Header Object from here---------
     
        var RetailerCodeId;
        var RetailerContactId;
        var ListOfSOLIs = component.get("v.SOList.SOLIList");
        for (var i = 0; i < ListOfSOLIs.length; i++)
        {
            if(ListOfSOLIs[i].IsSelected == true )
            {
			    RetailerContactId = ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Retailer_Contact__c;
                RetailerCodeId = ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Retailer_Code1__c;
				break; 	
            }
        }
        
        //alert('RetailerContactId>>'+RetailerContactId);
        //alert('RetailerCodeId>>'+RetailerCodeId);
       //alert('shipmentHeader>>'+JSON.stringify(component.get("v.Shipmentheader")));
       var shipmentHeader = component.get("v.Shipmentheader");
        if(!shipmentHeader.Delivery_Person__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Fill_service_provider")
            });
            toastEvent.fire();
            return;
            
        } 
        if(!shipmentHeader.Shipment_Date__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Select_shipment_date")
            });
            toastEvent.fire();
            return;
            
        } 
        if(shipmentHeader.Shipment_Date__c == null)
                {
                    //alert('Before Firing an toast event>>>');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Error"),
                        "type" : "error",
                        "message": $A.get("$Label.c.Enter_Shipped_Date")
                    });
                    toastEvent.fire();
                    return;
                    
                }
                
                var today = new Date();        
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();
                // if date is less then 10, then append 0 before date   
                if(dd < 10){
                    dd = '0' + dd;
                } 
                // if month is less then 10, then append 0 before date    
                if(mm < 10){
                    mm = '0' + mm;
                }
               // alert('shipmentHeader.Shipment_Date__c>>'+shipmentHeader);
                var todayFormattedDate = yyyy+'-'+mm+'-'+dd;
                if(shipmentHeader.Shipment_Date__c > todayFormattedDate)
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Error"),
                        "type" : "error",
                        "message": $A.get("$Label.c.Future_date_cannot_be_selected")
                    });
                    toastEvent.fire();
                    return;
                }   
                
        
        /*if(!shipmentHeader.Truck_No__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Enter truck number!'
            });
            toastEvent.fire();
            return;
            
        } 
        
         if(!shipmentHeader.Waybill_Number__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Enter waybill number!'
            });
            toastEvent.fire();
            return;
            
        } 
        
         if(!shipmentHeader.Consignment_Number__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Enter consignment number!'
            });
            toastEvent.fire();
            return;
            
        } 
        
        if(!shipmentHeader.Tracking_URL__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Enter tracking url!'
            });
            toastEvent.fire();
            return;
            
        } 
*/
        
         //var shipmentHeaderNew = component.get("v.Shipmentheader");
         shipmentHeader.Retailer_Code__c = RetailerCodeId;
         shipmentHeader.Retailer_Contact__c = RetailerContactId;
         component.set("v.Shipmentheader",shipmentHeader);
        //alert('Final Shipmentheader is>>>'+JSON.stringify(component.get("v.Shipmentheader")));
         
        //alert('RetailerContactId>>'+RetailerContactId);
        //alert('RetailerCodeId>>'+RetailerCodeId);
      
        /*var today = new Date();        
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        // if date is less then 10, then append 0 before date   
        if(dd < 10){
            dd = '0' + dd;
        } 
        // if month is less then 10, then append 0 before date    
        if(mm < 10){
            mm = '0' + mm;
        }
        
        var todayFormattedDate = yyyy+'-'+mm+'-'+dd;
        if(shipmentHeader.Shipment_Date__c > todayFormattedDate)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Shipment date cannot be future date!'
            });
            toastEvent.fire();
            return;
        } */               

        
        
        
        
        
        //-----Validation for Shipment Header Object till here---------
        
        
        
        var ListOfSOLIs = component.get("v.SOList.SOLIList");
        if (!Array.isArray(ListOfSOLIs)) {
            ListOfSOLIs = [ListOfSOLIs];
        }
        var selctedRec = [];
        var SOIDArray = [];
        
        for (var i = 0; i < ListOfSOLIs.length; i++) {
            
            if(ListOfSOLIs[i].IsSelected == true )
            {
                
                selctedRec.push(ListOfSOLIs[i]); 
                if(SOIDArray.includes(ListOfSOLIs[i].SOLIwrap.Sales_Order__c))
                {
                    //alert('Inside SOIDArray already includes SOID>>'+ListOfSOLIs[i].SOLIwrap.Sales_Order__c);
                }else
                {
                    //alert('Inside SOIDArray not includes SOID>>'+ListOfSOLIs[i].SOLIwrap.Sales_Order__c);
                    SOIDArray.push(ListOfSOLIs[i].SOLIwrap.Sales_Order__c); 
                    
                }
                
            }
            
        }
        
        //component.set("v.SOList.SOLIList",selctedRec);
        
        //var selecSO = component.get("v.SOList");
        //alert('Final SOIDArray is>>>'+SOIDArray);
        //alert('Final SOIDArray length is>>>'+SOIDArray.length);
        
        var spinner = component.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
        
        helper.updateSelected(component,event,selctedRec,SOIDArray);
    },
    
    closeModal: function(component, event, helper) {
        // set "isOpen" attribute to false for hide/close model box 
        component.set("v.ConfirmShip", false);
        $A.get('e.force:refreshView').fire();
    },  
    
    closeErrorMessage : function(component, event, helper) 
    {
        component.set("v.ShowErrorMesssage", false); 
        component.set("v.ErrorMesssage",'');
    }, 
    
     handleSearchEvent : function(component, event) {
        
        var shipments = event.getParam("POList");
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var sertxt = event.getParam("searchtext");

        if(flag==true && type=='PrintShopCreateShip'){
            component.set('v.total', shipments.total);
            component.set("v.SOList",shipments);
            component.set('v.todate', shipments.Todate);
            component.set('v.searchText', sertxt);
            //component.set("v.Shipmentheader.Shipment_Date__c",component.get('v.todate'));
        }
        else
            $A.get('e.force:refreshView').fire();
        //helper.getPOList(component, event, helper);
    }
    
})