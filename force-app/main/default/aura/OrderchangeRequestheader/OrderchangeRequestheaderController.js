({
    doinit : function(component, event, helper) {
        var rowIndex = component.get("v.rowIndex");
        //var ROrderheader = component.get("v.ROrderheader");
        var SOdetails = component.get("v.SOdetails.SO");
        var ReviseOrderRequest = component.get("v.ReviseOrderRequest");
        var shipTo1 = component.get("v.shipToheader1");
        var shipToDate1 = component.get("v.shipToDateheader1");
        //console.log('SOdetails>>'+JSON.stringify(component.get("v.SOdetails")));
       //if(SOdetails.Status__c == 'Order Under Processing' || SOdetails.Status__c == 'Under Processing' )
       if(SOdetails.Status__c == 'Order Under Processing')
       {
           component.set("v.restrict3headers",false);
       }
    },
    onChange : function(component, event, helper) 
    {
        var seloption=component.find("distance").get("v.value");
        var reqhead = component.get("v.ROrderheader");
        
        var completeHeadList = component.get("v.ReviseOrderHeaderList");
        var checkduplicate = component.get("v.checkduplicate");
        var previousValue = null;
        var array = [];
        
        //alert('seloption>>'+seloption);
        for(var i=0;i<completeHeadList.length;i++)
        {
            //console.log('array>>'+array);
            //console.log('previousValue>>'+previousValue);
            //console.log('completeHeadList each>>'+JSON.stringify(completeHeadList[i]));
            if(completeHeadList[i].What_to_Revise__c != null && completeHeadList[i].What_to_Revise__c != "" && array.includes(seloption))
            {
                helper.cancelHeaderhelper(component, event, helper);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.selected_piclist_already_exist"),
                    type: "warning"
                });
                toastEvent.fire();
                return;
            }
            else if(completeHeadList[i].What_to_Revise__c != previousValue  )
            {
                reqhead.What_to_Revise__c =seloption;
            }
            component.set("v.ROrderheader",reqhead);
            //alert('head'+JSON.stringify(component.get("v.ROrderheader")));
            if(seloption=='Please select')
            {
                //alert('hii');
                component.set("v.shipTo",false);
                component.set("v.shipToDate",false);
                component.set("v.FactoryInternalPO",false);
                component.set("v.ShippingMark",false);
                component.set("v.ForwarderTransportation",false);
            }
            else if(seloption=='Ship To')
            {
                component.set("v.shipToDate",false);
                component.set("v.shipTo",true);
                component.set("v.FactoryInternalPO",false);
                component.set("v.ShippingMark",false);
                component.set("v.ForwarderTransportation",false);
            }
                else if(seloption=='Ship Date')
                {
                    component.set("v.shipToDate",true);
                    component.set("v.shipTo",false);
                    component.set("v.FactoryInternalPO",false);
                    component.set("v.ShippingMark",false);
                    component.set("v.ForwarderTransportation",false);
                }
                    else if(seloption=='Factory Internal PO')
                    {
                        component.set("v.shipToDate",false);
                        component.set("v.shipTo",false);
                        component.set("v.FactoryInternalPO",true);
                        component.set("v.ShippingMark",false);
                        component.set("v.ForwarderTransportation",false);
                    }
                        else if(seloption=='Shipping Mark/Special Instruction')
                        {
                            component.set("v.shipToDate",false);
                            component.set("v.shipTo",false);
                            component.set("v.FactoryInternalPO",false);
                            component.set("v.ShippingMark",true);
                            component.set("v.ForwarderTransportation",false);
                        }
                            else if(seloption=='Forwarder/Transportation Details')
                            {
                                component.set("v.shipToDate",false);
                                component.set("v.shipTo",false);
                                component.set("v.FactoryInternalPO",false);
                                component.set("v.ShippingMark",false);
                                component.set("v.ForwarderTransportation",true);
                            }
            previousValue = completeHeadList[i].What_to_Revise__c;
            array.push(completeHeadList[i].What_to_Revise__c);
            component.set("v.checkduplicate",completeHeadList[i].What_to_Revise__c);
            console.log('checkduplicate each>>'+JSON.stringify(component.set("v.checkduplicate")));
        }
        console.log('final checkduplicate each>>'+JSON.stringify(component.set("v.checkduplicate")));
    },
    changeSOExpDelDate : function(component, event, helper) 
    { 
        var index=event.getSource().get("v.name");
        var soRec = component.get("v.SOdetails");
        var reqhead = component.get("v.ROrderheader");
        reqhead.Mainetti_SO__c = soRec.SO.Id;
        if(reqhead.What_to_Revise__c == 'Ship Date')
        {
            var CurrentDate = new Date();
            var GivenDate = new Date(reqhead.New_Expected_Delivery_Date__c);
            if(GivenDate < CurrentDate){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.The_Date_must_be_Greater_or_Equal_to_today_date"),
                    type: "warning"
                });
                toastEvent.fire();
                component.set("v.ROrderheader.NewExpectedDeliveryDate",'');
                component.set("v.ROrderheader.Revised__c",false);
            }
            else{
                if(reqhead.Mainetti_SO__c == soRec.SO.Id)
                {
                    reqhead.Old_Expected_Delivery_Date__c = soRec.SO.Expected_Completion_Date__c;
                    //reqhead.Revised__c = true;								//one boolean flag that whether its changed or not 
                    if(reqhead.New_Expected_Delivery_Date__c =='')
                    {
                        reqhead.Revised__c = false;
                    }
                    else 
                    {
                        reqhead.Revised__c = true;
                    }
                }
                component.set("v.ROrderheader",reqhead);
            }
        }
    },
    changeFactoryInternalPO : function(component, event, helper) 
    { 
        var index=event.getSource().get("v.name");
        var soRec = component.get("v.SOdetails");
        var reqhead = component.get("v.ROrderheader");
        reqhead.Mainetti_SO__c = soRec.SO.Id;
        if(reqhead.What_to_Revise__c == 'Factory Internal PO')
        {
            if(reqhead.Mainetti_SO__c == soRec.SO.Id)
            {
                reqhead.Old_Factory_Internal_PO__c = soRec.SO.Factory_Internal_PO__c;
                
                if(reqhead.New_Factory_Internal_PO__c =='')
                {
                    reqhead.Revised__c = false;
                }
                else 
                {
                    reqhead.Revised__c = true;
                }
            }
            component.set("v.ROrderheader",reqhead);
        }
    },
    changeShippingmark : function(component, event, helper) 
    { 
        var index=event.getSource().get("v.name");
        var soRec = component.get("v.SOdetails");
        var reqhead = component.get("v.ROrderheader");
        reqhead.Mainetti_SO__c = soRec.SO.Id;
        if(reqhead.What_to_Revise__c == 'Shipping Mark/Special Instruction')
        {
            if(reqhead.Mainetti_SO__c == soRec.SO.Id)
            {
                reqhead.Old_Shipping_Mark__c = soRec.SO.Shipping_Mark__c;
                
                if(reqhead.New_Shipping_Mark__c =='')
                {
                    reqhead.Revised__c = false;
                }
                else 
                {
                    reqhead.Revised__c = true;
                }
            }
            component.set("v.ROrderheader",reqhead);
        }
    },
    changeForwarderTransportation : function(component, event, helper) 
    { 
        var index=event.getSource().get("v.name");
        var soRec = component.get("v.SOdetails");
        var reqhead = component.get("v.ROrderheader");
        reqhead.Mainetti_SO__c = soRec.SO.Id;
        if(reqhead.What_to_Revise__c == 'Forwarder/Transportation Details')
        {
            if(reqhead.Mainetti_SO__c == soRec.SO.Id)
            {
                reqhead.Old_Forwarder_Transportation_Details__c = soRec.SO.Transportation_Details__c;
                
                if(reqhead.New_Forwarder_Transportation_Details__c =='')
                {
                    reqhead.Revised__c = false;
                }
                else 
                {
                    reqhead.Revised__c = true;
                }
            }
            component.set("v.ROrderheader",reqhead);
        }
    },
    cancelHeader : function(component, event, helper) 
    {
        helper.cancelHeaderhelper(component, event, helper);
    },
    displayTableAddress : function(component, event, helper)
    {
        var SOdetails = component.get("v.SOdetails");
        var custid = component.get("v.SOdetails.SO.Supplier__c");
        var CurrentAddressid = component.get("v.SOdetails.SO.Ship_to_Address__c");
        //console.log('SOdetails>>'+JSON.stringify(SOdetails)+'<<<custid>>'+custid+'<<<CurrentAddressid>>>'+CurrentAddressid);
        var action = component.get("c.fetchShiptoAddressdetails");
        action.setParams({ 
            "custid":component.get("v.SOdetails.SO.Id"),
            "SalesOrderAddressId":component.get("v.SOdetails.SO.Ship_to_Address__c")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var responcevalue = response.getReturnValue();
                component.set("v.AddressList",responcevalue);
            }
        });
        $A.enqueueAction(action);
       // alert('addresslist>>'+JSON.stringify(component.get("v.AddressList")));
        component.set("v.AddressTable",true);  
    },
    onRadioChange : function(component, event, helper)
    {
        var selected = event.getSource().get('v.value'); 
        var soRec = component.get("v.SOdetails");
        var addressList = component.get("v.AddressList");
        var reqhead = component.get("v.ROrderheader");
        reqhead.New_Expected_Delivery_Date__c = null;
        reqhead.Old_Expected_Delivery_Date__c = null;
        reqhead.What_to_Revise__c ='Ship To';
        reqhead.Old_Bill_to_Ship_to_Address__c = soRec.SO.Ship_to_Address__c;
        reqhead.New_Bill_to_Ship_to_Address__c = selected.Id;
        reqhead.Old_Ship_to_Company__c = soRec.SO.Ship_to_Factory__c;
        reqhead.New_Ship_to_Company__c = selected.Factory_Name__c;
        reqhead.Old_Ship_to_Address1__c = soRec.SO.Ship_to_Address1__c;
        reqhead.New_Ship_to_Address1__c = selected.Address_1__c;
        reqhead.Old_Ship_to_State__c = soRec.SO.Ship_to_State__c;
        reqhead.New_Ship_to_State__c = selected.State__c;
        reqhead.Old_Ship_to_City__c = soRec.SO.Ship_to_City__c;
        reqhead.New_Ship_to_City__c = selected.City__c;
        reqhead.Old_Ship_to_Country__c = soRec.SO.Ship_to_Country__c;
        reqhead.New_Ship_to_Country__c = selected.Country__c;
        reqhead.Old_Ship_to_Postcode__c = soRec.SO.Ship_to_Postcode__c;
        reqhead.New_Ship_to_Postcode__c = selected.Postcode__c;
        reqhead.Old_Ship_to_Tel__c = soRec.SO.Ship_to_Tel__c;
        reqhead.New_Ship_to_Tel__c = selected.Tel_No__c;
        reqhead.Old_Ship_to_Email__c = soRec.SO.Ship_to_Email__c;
        reqhead.New_Ship_to_Email__c = selected.Email_Address__c;
        // reqhead.Old_Ship_to_Contact_Name__c = soRec.SO.Ship_to_Address__r.Contact__c;
        //  reqhead.New_Ship_to_Contact_Name__c = selected.Contact__c;
        
        reqhead.Revised__c = true;
        
        component.set("v.shiptoname",selected.Name);
        component.set("v.ROrderheader",reqhead);
    },
    SaveTableAddress : function(component, event, helper)
    {
        component.set("v.AddressTable",false);
    },
    closeTableAddress : function(component, event, helper)
    {
        var reqhead = component.get("v.ROrderheader");
        reqhead.New_Expected_Delivery_Date__c = null;
        reqhead.Old_Expected_Delivery_Date__c = null;
        reqhead.What_to_Revise__c ='Ship To';
        reqhead.New_Bill_to_Ship_to_Address__c = '';
        reqhead.New_Ship_to_Company__c = '';
        reqhead.New_Ship_to_Address1__c = '';
        reqhead.New_Ship_to_State__c = '';
        reqhead.New_Ship_to_City__c = '';
        reqhead.New_Ship_to_Country__c = '';
        reqhead.New_Ship_to_Postcode__c = '';
        reqhead.New_Ship_to_Tel__c = '';
        reqhead.New_Ship_to_Email__c = '';
        reqhead.Revised__c = false;
        component.set("v.shiptoname",'');
        component.set("v.ROrderheader",reqhead);
        component.set("v.AddressTable",false);
    }
})