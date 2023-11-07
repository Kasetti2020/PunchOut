({
    doInit : function(component, event, helper) 
    {
        //var recordId = component.get("v.recordId"); 
        //alert('recordId>>>'+recordId);
        helper.SendShipmentID(component,event, helper);
        helper.fetchpicklist(component,event, helper);
    },
    
    closeModal : function(component, event, helper) 
    {
        //alert('Inside closeModal');
        //alert('Close Flag>>'+component.get("v.CloseCurrentWindow"));
        component.set("v.CloseCurrentWindow",false);
        if(component.get("v.CloseCurrentWindow"))
        {
            window.close();
        }
        else
        {
            $A.get("e.force:closeQuickAction").fire();
        }
        //
        
        
    },
    
    
    
    closeModal1: function(component, event, helper) {
        // set "isOpen" attribute to false for hide/close model box 
        component.set("v.ConfirmShip", false);
        helper.SendShipmentID(component,event, helper);
        //$A.get('e.force:refreshView').fire();
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
    
    update: function(component,event, helper)
    {
        
    },
    
    CreateShipment: function(component, event, helper)
    {
        //alert('Inside CreateShipment SOID>>'+component.get('v.recordId'));
        
        var ListOfSOLIs = component.get("v.SOList.SOLIList");
        //alert('ListOfSOLIs>>'+JSON.stringify(component.get('v.SOList.SOLIList')));
        if (!Array.isArray(ListOfSOLIs)) {
            ListOfSOLIs = [ListOfSOLIs];
        }
        var selctedRec = [];
        var shipqtyres;
        var ErrorMesssage;
        var ShowErrorMesssage = false;
        var IsSimilarShipAddress = true;
        var ShipAddressArray = [];
        var flag = false;
        
        for (var i = 0; i < ListOfSOLIs.length; i++) {
            if(ListOfSOLIs[i].IsSelected == true )
            {
                
                //---- Ship to Address Validation starts from here --------
                
                //alert('selectedValue inside Parent>>'+ListOfSOLIs[i].NewPickValueList);
                
                if(ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c == 0)
                {
                    //alert('Inside Remaining Qty is zero check 1>>>')
                    if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c > ListOfSOLIs[i].SOLIwrap.Supply_Quantity__c)
                    {
                        //alert('Inside Remaining Qty is zero check 1>>>')
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
                            "title": "Error",
                            "type" : "error",
                            "message": 'Ship quantity cannot exceed Ordered quantity '+'At Row :'+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                        });
                        toastEvent.fire();
                        return;
                        
                    }
                }
                else if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c > ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c)
                {
                    //alert('Inside Remaining Qty is zero check 2>>>')
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": 'Ship quantity cannot exceed Ordered Quantity '+'At Row :'+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                    });
                    toastEvent.fire();
                    return;
                    
                }
                
                if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c < 0)
                {
                    
                    //alert('Before Firing an toast event 3>>>');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": 'Ship quantity cannot be negative '+'At Row :'+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                    });
                    toastEvent.fire();
                    return;
                    
                }
                
                
                 if(ListOfSOLIs[i].SOLIwrap.Ship_qty__c == 0)
                {
                    //alert('Before Firing an toast event 4>>>');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": 'Ship quantity cannot be zero '+'At Row :'+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                    });
                    toastEvent.fire();
                    return;
                    
                }
                
                
                
                //alert('Shipped_Date__c>>'+ListOfSOLIs[i].SOLIwrap.Shipped_Date__c);
                //2019-10-17
               /* 
                if(ListOfSOLIs[i].SOLIwrap.Shipped_Date__c == null)
                {
                    //alert('Before Firing an toast event>>>');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": 'Enter Shipped Date '+'At Row :'+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
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
                
                var todayFormattedDate = yyyy+'-'+mm+'-'+dd;
                if(ListOfSOLIs[i].SOLIwrap.Shipped_Date__c > todayFormattedDate)
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "type" : "error",
                        "message": 'Future date cannot be selected '+'At Row :'+(i+1)+' '+ ListOfSOLIs[i].SOLIwrap.Name
                    });
                    toastEvent.fire();
                    return;
                }          */      
                
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
                    
                    //New Calculation for Ship Quantity added on 06-November-2019 by Rags from here
                   // ListOfSOLIs[i].SOLIwrap.Ship_qty__c = ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c - ListOfSOLIs[i].SOLIwrap.Ship_qty__c;
                      //New Calculation for Ship Quantity added on 06-November-2019 by Rags till here
                    
                    //alert('INside else before modifying Remaining_Qty__c >>>'+ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);
                }
                
                
                if(ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c == 0)
                {
                    ListOfSOLIs[i].SOLIwrap.Status__c = 'Shipped';  
                    ListOfSOLIs[i].SOLIwrap.Production_Status__c = 'Shipped';
                    ListOfSOLIs[i].SOLIwrap.Online_Detail_Status__c = 'Fully Shipped';
                    
                }
                else
                {
                    ListOfSOLIs[i].SOLIwrap.Status__c = 'Partially Shipped';  
                    ListOfSOLIs[i].SOLIwrap.Online_Detail_Status__c = 'Order Partial';  
                    
                }
                
                /*alert('shipped qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Ship_qty__c);
                alert('remning qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Remaining_Qty__c);
                alert('ordered qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Ordered_Quantity__c);
                alert('Supply_Quantity__c qty of '+ListOfSOLIs[i].SOLIwrap.Name+ ' is ' +ListOfSOLIs[i].SOLIwrap.Supply_Quantity__c);
                alert('Final  ListOfSOLIs[i].SOLIwrap.Status__c>>>'+ ListOfSOLIs[i].SOLIwrap.Status__c);                
                */
                //--------------------Overwriting some extra fields till here -----------------------
                selctedRec.push(ListOfSOLIs[i]); 
                
                flag = true;
            }
            
        }
        
        //alert('Final Selected Flag is>>>'+flag);
        if(flag)
        {
            //alert('Inside confirmshipment true>>>'+flag);
            //alert('Inside helper updateSelected selecSO is>>>'+JSON.stringify(selctedRec));
            component.set("v.ConfirmShip",true);
            //helper.updateSelected(component,event,selctedRec);
        }
        else
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Select atealst one SOLI !'
            });
            toastEvent.fire();
            return;
            
        }
        
        
        //
        
    },
    
    
    ConfirmShipment:function(component, event, helper)
    {
        //-----Validation for Shipment Header Object from here--------- 
        //alert('Inside ConfirmShipment');
        var shipmentHeader = component.get("v.Shipmentheader");
        if(!shipmentHeader.Delivery_Person__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Fill service provider!'
            });
            toastEvent.fire();
            return;
            
        } 
        if(!shipmentHeader.Shipment_Date__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": 'Select shipment date!'
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
        }
       /* if(!shipmentHeader.Truck_No__c)
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
            
        } */
        
        
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
        var SOID;
        
        
        var RetailerCodeId;
        var RetailerContactId;
        for (var i = 0; i < ListOfSOLIs.length; i++)
        {
            if(ListOfSOLIs[i].IsSelected == true )
            {
                RetailerContactId = ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Retailer_Contact__c;
                RetailerCodeId = ListOfSOLIs[i].SOLIwrap.Sales_Order__r.Retailer_Code1__c;
                break; 	
            }
        }
        
         shipmentHeader.Retailer_Code__c = RetailerCodeId;
         shipmentHeader.Retailer_Contact__c = RetailerContactId;
         component.set("v.Shipmentheader",shipmentHeader);
        
        for (var i = 0; i < ListOfSOLIs.length; i++) {
            
            if(ListOfSOLIs[i].IsSelected == true )
            {
                
                selctedRec.push(ListOfSOLIs[i]); 
                /*if(SOIDArray.includes(ListOfSOLIs[i].SOLIwrap.Sales_Order__c))
                {
                    //alert('Inside SOIDArray already includes SOID>>'+ListOfSOLIs[i].SOLIwrap.Sales_Order__c);
                }else
                {
                    //alert('Inside SOIDArray not includes SOID>>'+ListOfSOLIs[i].SOLIwrap.Sales_Order__c);
                    SOIDArray.push(ListOfSOLIs[i].SOLIwrap.Sales_Order__c); 
                    
                }*/
                
                
                
            }
            
        }
        
        
        //alert('Inside helper  SOID>>'+component.get('v.recordId'));
        helper.updateSelected(component,event,selctedRec);
        
        
        
        
    },
    

})