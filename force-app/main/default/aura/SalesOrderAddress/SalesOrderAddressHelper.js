({
    toGetCustomerAddess : function(component, event,helper) 
    {
        var custInfoid =component.get("v.CustomerInfoID");
        var retailerName =component.get("v.retailerName");
        console.log("retailer name>>>>"+retailerName);
        //alert("retailer name>>>>"+retailerName);
        var action = component.get("c.FetchCustAdd");
        
        action.setParams({
            "supplierCode": component.get("v.supplierCode"),
            "custInfoid": custInfoid,
            "retailer": retailerName,
            "retailercodeId":component.get("v.retailerCodeId"),
            "orderSource": component.get("v.OrderSource")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            var res = response.getReturnValue();
            
            if (state === "SUCCESS") 
            {
                
                component.set("v.BillAddressList", res.billAddList);
                component.set("v.ShipAddressList", res.shipAddList);
                component.set("v.BuyerAddressList", res.buyerAddList);
                component.set("v.InvoiceAddressList", res.invoiceAddList);
                component.set("v.shipTermList", res.shipTermList);
                component.set("v.suzhouFlag", res.SuzhouFlag);
                component.set("v.seasonList", res.seasonsList);
                component.set("v.seasonYearList", res.seasonsYearList);
                component.set("v.divisionList", res.divisionList);
                component.set("v.SupplierUnMask",res.SOUnMask);
                component.set("v.ManufacturerUnMask",res.MOUnMask);
                component.set("v.MandatoryCheck",res.MandatoryCheckFields);
                //component.set("v.SeasonCheck",res.MandatoryCheckFields.Season_Mandatory__c);
                //component.set("v.DivisionCheck",res.MandatoryCheckFields.Division_Mandatory__c);
                //component.set("v.SeasonYearCheck",res.MandatoryCheckFields.Season_Year_Mandatory__c);
                
                //component.set("v.salesOrderObj.Supplier_Code__c", res.protoSO.Supplier_Code__c);
                //component.set("v.salesOrderObj.Manufacturer_Code__c", res.protoSO.Manufacturer_Code__c);
                if(res.protoSO.OrderSource__c == 'Cloned')
                {
                    var today = new Date();
                    var formattedDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
                    res.protoSO.Expected_Delivery_Date__c = formattedDate;
                    component.set("v.salesOrderObj", res.protoSO);
                }
                else
                {
                    component.set("v.salesOrderObj.Supplier_Code__c", res.protoSO.Supplier_Code__c);
                    component.set("v.salesOrderObj.Manufacturer_Code__c", res.protoSO.Manufacturer_Code__c);
                    component.set("v.salesOrderObj.Id", res.protoSO.Id);
                    
                }
                console.log("salesOrderObj>>>>"+JSON.stringify(component.get("v.salesOrderObj")));
                //console.log("MandatoryCheck>>>"+JSON.stringify(component.get("v.MandatoryCheck")));
                var checkFlag=component.get("v.MandatoryCheck");
                for(var j=0;j<checkFlag.length;j++){
                    component.set("v.DivisionCheck",checkFlag[j].Division_Mandatory__c);
                    component.set("v.SeasonCheck",checkFlag[j].Season_Mandatory__c);
                    component.set("v.SeasonYearCheck",checkFlag[j].Season_Year_Mandatory__c);
                    component.set("v.RetailerCheck",checkFlag[j].Retailer_PO_Mandatory__c);
                }
                
                if(component.get("v.OrderSource")=="PO")
                {
                    var currencyListVar = this.toGetDependentValues(component,res.defaultCompany,'Order_Country__c','Preferred_Currency__c');
                    component.set('v.currencyList',currencyListVar);
                    //var currList = [];
                    //currList.push(res.defaultCurrency);
                    //component.set("v.currencyList", currList);
                    
                    component.set("v.salesOrderObj.Company__c", res.defaultCompany);
                    component.set("v.salesOrderObj.CurrencyIsoCode", res.defaultCurrency);
                    
                    if(res.defaultCompany.includes("Suzhou"))
                    {
                        if(res.buyerAddList.length==0)
                        {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title: $A.get("$Label.c.Warning"),
                                message: $A.get("$Label.c.Please_update_default_company_as_Suzhou_and_add_at_least_1_Buyer_address"),
                                type: "warning"
                            });
                            toastEvent.fire();
                            //component.set("v.salesOrderObj.Company__c","NULL");
                            return;
                        }
                        if(res.invoiceAddList.length==0)
                        {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title: $A.get("$Label.c.Warning"),
                                message: $A.get("$Label.c.Please_update_default_company_as_Suzhou_and_add_at_least_1_Invoice_To_address"),
                                type: "warning"
                            });
                            toastEvent.fire();
                            //component.set("v.salesOrderObj.Company__c","NULL");
                            return;
                        }
                    }
                    console.log("salesOrderObj 1>>>>"+JSON.stringify(component.get("v.salesOrderObj")));
                }
                else
                {
                    component.set("v.companyName", res.defaultCompany);
                    console.log('res.defaultCompany >>>>>>>'+res.defaultCompany);
                    component.set("v.currencyName", res.defaultCurrency);
                    if(res.defaultCompany.includes("Suzhou"))
                    {
                        component.set("v.suzhouFlag",true);
                        
                        if(res.buyerAddList.length==0)
                        {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title: $A.get("$Label.c.Warning"),
                                message: $A.get("$Label.c.Please_update_default_company_as_Suzhou_and_add_at_least_1_Buyer_address"),
                                type: "warning"
                            });
                            toastEvent.fire();
                            component.set("v.salesOrderObj.Company__c","NULL");
                            return;
                        }
                        if(res.invoiceAddList.length==0)
                        {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title: $A.get("$Label.c.Warning"),
                                message: $A.get("$Label.c.Please_update_default_company_as_Suzhou_and_add_at_least_1_Invoice_To_address"),
                                type: "warning"
                            });
                            toastEvent.fire();
                            component.set("v.salesOrderObj.Company__c","NULL");
                            return;
                        }
                    }
                }
                
                if(res.protoSO.OrderSource__c == 'Cloned')
                {
                    this.getSelectedAddress(component, event,helper);
                }
                else
                {
                    this.getDefaultAddress(component, event,helper);
                }
            }
        });
        $A.enqueueAction(action);
    },
    getDefaultAddress : function(component, event, helper)
    {
        //to get default address index
        var BillAddressList = component.get("v.BillAddressList");
        var BillAddressIndex = component.get("v.BillAddressIndex");
        
        for(var i=0; i<BillAddressList.length; i++)
        {
            if(BillAddressList[i].Is_Default__c)
                BillAddressIndex = i;
        }
        component.set('v.BillAddressIndex',BillAddressIndex);
        
        var ShipAddressList = component.get("v.ShipAddressList");
        var ShipAddressIndex = component.get("v.ShipAddressIndex");
        for(var i=0; i<ShipAddressList.length; i++)
        {
            if(ShipAddressList[i].Is_Default__c)
                ShipAddressIndex = i;
        }
        component.set('v.ShipAddressIndex',ShipAddressIndex);
        var BuyerAddressList = component.get("v.BuyerAddressList");
        var BuyerAddressIndex = component.get("v.BuyerAddressIndex");
        for(var j=0; j<BuyerAddressList.length; j++)
        {
            if(BuyerAddressList[j].Is_Default__c)
                BuyerAddressIndex = j;
        }
        component.set('v.BuyerAddressIndex',BuyerAddressIndex);
        var InvoiceAddressList = component.get("v.InvoiceAddressList");
        var InvoiceAddressIndex = component.get("v.InvoiceAddressIndex");
        for(var k=0; k<InvoiceAddressList.length; k++)
        {
            if(InvoiceAddressList[k].Is_Default__c)
                InvoiceAddressIndex = k;
        }
        component.set('v.InvoiceAddressIndex',InvoiceAddressIndex);
    },
    getSelectedAddress : function(component, event, helper)
    {
        //to get default address index
        var so = component.get("v.salesOrderObj");
        var BillAddressList = component.get("v.BillAddressList");
        var BillAddressIndex = component.get("v.BillAddressIndex");
        for(var i=0; i<BillAddressList.length; i++)
        {
            if(BillAddressList[i].Id == so.Bill_to_Address__c)
            {
                BillAddressList[i].Is_Default__c = true;
                BillAddressIndex = i;
            }
            else
                BillAddressList[i].Is_Default__c = false;
        }
        component.set('v.BillAddressList',BillAddressList);
        component.set('v.BillAddressIndex',BillAddressIndex);
        
        var ShipAddressList = component.get("v.ShipAddressList");
        var ShipAddressIndex = component.get("v.ShipAddressIndex");
        for(var i=0; i<ShipAddressList.length; i++)
        {
            if(ShipAddressList[i].Id == so.Ship_to_Address__c)
            {
                ShipAddressList[i].Is_Default__c = true;
                ShipAddressIndex = i;
            }
            else
                ShipAddressList[i].Is_Default__c = false;
        }
        component.set('v.ShipAddressList',ShipAddressList);
        component.set('v.ShipAddressIndex',ShipAddressIndex);
        
        var BuyerAddressList = component.get("v.BuyerAddressList");
        var BuyerAddressIndex = component.get("v.BuyerAddressIndex");
        for(var j=0; j<BuyerAddressList.length; j++)
        {
            if(BuyerAddressList[j].Is_Default__c)
            {
                BuyerAddressList[j].Is_Default__c = true;
                BuyerAddressIndex = i;
            }
            else
                BuyerAddressList[j].Is_Default__c = false;
        }
        component.set('v.BuyerAddressList',BuyerAddressList);
        component.set('v.BuyerAddressIndex',BuyerAddressIndex);
        
        var InvoiceAddressList = component.get("v.InvoiceAddressList");
        var InvoiceAddressIndex = component.get("v.InvoiceAddressIndex");
        for(var k=0; k<InvoiceAddressList.length; k++)
        {
            if(InvoiceAddressList[k].Is_Default__c)
            {
                InvoiceAddressList[k].Is_Default__c = true;
                InvoiceAddressIndex = i;
            }
            else
                InvoiceAddressList[k].Is_Default__c = false;
        }
        component.set('v.InvoiceAddressList',InvoiceAddressList);
        component.set('v.InvoiceAddressIndex',InvoiceAddressIndex);
    },
    convertPOToSalesOrder : function(component, event,helper) 
    {
          component.set('v.disableConfirmButton',true);
       // alert('convertPOToSalesOrder >>>>>>>'+ component.get("v.val"));
        var BillAddIndex = component.get("v.BillAddressIndex");
        var	BillAdd = component.get("v.BillAddressList")[BillAddIndex];
        
        var custInfoid =component.get("v.CustomerInfoID");
        var ShipAddIndex = component.get("v.ShipAddressIndex");
        var ShipAdd = component.get("v.ShipAddressList")[ShipAddIndex];
        var BuyerAddressIndex = component.get("v.BuyerAddressIndex");
        var BuyerAdd = component.get("v.BuyerAddressList")[BuyerAddressIndex];
        var InvoiceAddressIndex = component.get("v.InvoiceAddressIndex");
        var InvoiceAdd = component.get("v.InvoiceAddressList")[InvoiceAddressIndex];
        var SO = component.get("v.salesOrderObj");
        var selecPO = component.get("v.comfirmPOList");
        //alert("BuyerAdd >>>>" + JSON.stringify(BuyerAdd));
        //console.log(component.get("v.suzhouFlag"));
        var action;
        if(component.get("v.SOChoiceFlag") =='Multiple SO Conversion'){
            
            action= component.get("c.convertPOstoSo");
        }
        else{
            
            action= component.get("c.convertPOstoSingleSo");
        }
        action.setParams({ 
            "SO": SO,
            "slctRec": JSON.stringify(selecPO),
            "BillAddress": BillAdd,
            "shipAddress": ShipAdd,
            "buyerAddress": BuyerAdd,
            "invoiceAddress": InvoiceAdd,
            "suzhouFlag": component.get("v.suzhouFlag"),
            "onlyvalidate":  component.get("v.val")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                
                var res = response.getReturnValue();
                console.log('res >>>>>>'+res);
                var sorecId = res.substring(res.indexOf('Id=')+3);
                var splitArr = res.split("Id=");
                res = splitArr[0];
                console.log('res array split >>>>>>'+res);
                //return;
                if(res.includes("Quantity is updated to nearest Box Quantity value"))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.success"),
                        "type" :"success",
                        "duration" : "20000ms",
                        "message": $A.get("$Label.c.The_Order_has_been_placed_successfully_and") +res
                    });
                    toastEvent.fire();
                    
                    component.set("v.AddressPopUpFlag", false);
                    $A.get('e.force:refreshView').fire(); 
                    
                    
                    this.sendOrderEmailWithAttachmentforPOtoSO(component, event, helper,sorecId);
                    return;
                }
                if (!res.includes("Success"))
                {
                     component.set('v.disableConfirmButton',false);
                    var spinner = component.find('spinner');
                    $A.util.toggleClass(spinner, "slds-hide");
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: res,
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "type" :"success",
                    "message": $A.get("$Label.c.The_Order_has_been_placed_successfully")
                });
                toastEvent.fire();
                
                //to send email
                this.sendOrderEmailWithAttachmentforPOtoSO(component, event, helper,sorecId);
                
                component.set("v.AddressPopUpFlag", false);
                $A.get('e.force:refreshView').fire();  
            }
            else if (state === "ERROR") 
            {
                var errorRes = JSON.stringify(response.getError());
                alert('Error : ' + errorRes);
                 component.set('v.disableConfirmButton',false);
                var errorString = "An error occured, please contact your Administrator";
                if(errorRes.includes("INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST"))
                    errorString = "Selected currency is not supported by the system, Please choose any other currency";
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: errorString,
                    type: "warning"
                });
                toastEvent.fire();
                return;
            } 
                else
                {
                    alert('Inside Error Callback');
                }
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    },
    
    //MOQ and Full Box Qauntity Validation Starts here.
    tovalidateMOQ : function(component, event,helper) 
    {
        //alert( component.get("v.val"));
        var BillAddIndex = component.get("v.BillAddressIndex");
        var	BillAdd = component.get("v.BillAddressList")[BillAddIndex];
        var custInfoid =component.get("v.CustomerInfoID");
        var ShipAddIndex = component.get("v.ShipAddressIndex");
        var ShipAdd = component.get("v.ShipAddressList")[ShipAddIndex];
        var BuyerAddressIndex = component.get("v.BuyerAddressIndex");
        var BuyerAdd = component.get("v.BuyerAddressList")[BuyerAddressIndex];
        var InvoiceAddressIndex = component.get("v.InvoiceAddressIndex");
        var InvoiceAdd = component.get("v.InvoiceAddressList")[InvoiceAddressIndex];
        var SO = component.get("v.salesOrderObj");
        var selecPO = component.get("v.comfirmPOList");
        //alert("BuyerAdd >>>>" + JSON.stringify(BuyerAdd));
        //console.log(component.get("v.suzhouFlag"));
        var action;
        if(component.get("v.SOChoiceFlag") =='Multiple SO Conversion'){
            
            action= component.get("c.convertPOstoSo");
        }
        else{
            
            action= component.get("c.convertPOstoSingleSo");
        }
        action.setParams({ 
            "SO": SO,
            "slctRec": JSON.stringify(selecPO),
            "BillAddress": BillAdd,
            "shipAddress": ShipAdd,
            "buyerAddress": BuyerAdd,
            "invoiceAddress": InvoiceAdd,
            "suzhouFlag": component.get("v.suzhouFlag"),
            "onlyvalidate":  component.get("v.val")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                 var res = response.getReturnValue();
                console.log('res >>>>>>'+res);
                var sorecId = res.substring(res.indexOf('Id=')+3);
                var splitArr = res.split("Id=");
                res = splitArr[0];
                if(res == ''){
                    component.set("v.val",false)
                    helper.convertPOToSalesOrder(component, event,helper);
                }                
                if(res.includes("The Order quantity"))
                {
                    
                    if (!confirm(res)) 
                    {
                        var spinner = component.find('spinner');
                        $A.util.toggleClass(spinner, "slds-hide");
                        return; 
                    }else{
                        component.set("v.val",false)
                        var spinner = component.find('spinner');
                        $A.util.toggleClass(spinner, "slds-hide");
                        helper.convertPOToSalesOrder(component, event,helper);
                    }
                }else if(!res.includes("The Order quantity"))
                {
                    var spinner = component.find('spinner');
                    $A.util.toggleClass(spinner, "slds-hide");
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: res,
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                    else{
                        //alert('Inside last else');
                        component.set("v.val",false);
                        var spinner = component.find('spinner');
                        $A.util.toggleClass(spinner, "slds-hide");
                        helper.convertPOToSalesOrder(component, event,helper);
                    }
            }
            else if (state === "ERROR") 
            {
                var errorRes = JSON.stringify(response.getError());
                alert('Error : ' + errorRes);
                var errorString = "An error occured, please contact your Administrator";
                if(errorRes.includes("INVALID_OR_NULL_FOR_RESTRICTED_PICKLIST"))
                    errorString = "Selected currency is not supported by the system, Please choose any other currency";
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: errorString,
                    type: "warning"
                });
                toastEvent.fire();
                return;
            } 
                else
                {
                    alert('Inside Error Callback');
                }
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    },
    
    
    sendOrderEmailWithAttachmentforPOtoSO : function(component, event,helper,SOID) 
    {
        
        var action = component.get("c.customerEmailAfterPOtoSOconversion");
        action.setParams({ 
            "soIdForEmail": SOID,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if (state === "SUCCESS") 
            {
                console.log("Successfully sent");
            }
            else if (state === "ERROR") 
            {
                console.log('Error : ' + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
    confirmSalesOrder : function(component, event, helper) 
    {
        
        var BillAddIndex = component.get("v.BillAddressIndex");
        var	BillAdd = component.get("v.BillAddressList")[BillAddIndex];
        var custInfoid =component.get("v.CustomerInfoID");
        var ShipAddIndex = component.get("v.ShipAddressIndex");
        var ShipAdd = component.get("v.ShipAddressList")[ShipAddIndex];
        var BuyerAddressIndex = component.get("v.BuyerAddressIndex");
        var BuyerAdd = component.get("v.BuyerAddressList")[BuyerAddressIndex];
        var InvoiceAddressIndex = component.get("v.InvoiceAddressIndex");
        var InvoiceAdd = component.get("v.InvoiceAddressList")[InvoiceAddressIndex];
        var SO = component.get("v.salesOrderObj");
        //alert(JSON.stringify(SO));
       // alert("BuyerAdd >>>>" + JSON.stringify(BuyerAdd));
        var action = component.get("c.SaveOrder");
        action.setParams({ 
            "SO": SO,
            "custInfoid": custInfoid,
            "BillAddress": BillAdd,
            "shipAddress": ShipAdd,
            "buyerAddress": BuyerAdd,
            "invoiceAddress": InvoiceAdd,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            var res = response.getReturnValue();
            if (state === "SUCCESS") 
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "type" :"success",
                    "message": $A.get("$Label.c.The_Order_has_been_placed_successfully")
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                
                //to send email
                this.sendOrderEmailWithAttachment(component, event, helper,res);
                
            }
            else if (state === "ERROR") 
            {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    },
    toGetDependentValues : function(component, controllingValue, controllingFields, dependentField) 
    {
        var actionCall = component.get("c.DependentPicklist");
        actionCall.setParams({
            "controllingValue":	controllingValue,
            "controllingFields": controllingFields,
            "dependentField": dependentField
        });
        actionCall.setCallback(this, function(response)
                               {
                                   var state = response.getState();
                                   if (state === "SUCCESS") 
                                   {
                                       //console.log('return value '+response.getReturnValue());
                                       if(dependentField=='Order_Country__c')
                                           component.set('v.companyList',response.getReturnValue());
                                       else if(dependentField=='Preferred_Currency__c')
                                           component.set('v.currencyList',response.getReturnValue());
                                           else if(dependentField=='Delivery_Instruction__c')
                                               component.set('v.shipTermList',response.getReturnValue());
                                   }
                                   else if (state === "ERROR") 
                                   {
                                       alert('Error : ' + JSON.stringify(response.getError()));
                                   } 
                               });
        $A.enqueueAction(actionCall);
    },
    PDFForCatalog : function(component, event,helper) 
    {
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");
        
        var BillAddIndex = component.get("v.BillAddressIndex");
        var	BillAdd = component.get("v.BillAddressList")[BillAddIndex];
        var custInfoid =component.get("v.CustomerInfoID");
        var ShipAddIndex = component.get("v.ShipAddressIndex");
        var ShipAdd = component.get("v.ShipAddressList")[ShipAddIndex];
        var BuyerAddressIndex = component.get("v.BuyerAddressIndex");
        
        var BuyerAdd = component.get("v.BuyerAddressList")[BuyerAddressIndex];
        var InvoiceAddressIndex = component.get("v.InvoiceAddressIndex");
        var InvoiceAdd = component.get("v.InvoiceAddressList")[InvoiceAddressIndex];
        
        var SO = component.get("v.salesOrderObj");
        var  mydate = new Date(SO.Expected_Delivery_Date__c);
        
        if(SO.Division__c=='NULL')
            SO.Division__c = '';
        if(SO.Season__c=='NULL')
            SO.Season__c = '';
        if(SO.Season_Year__c=='NULL')
            SO.Season_Year__c = '';
        if(SO.Delivery_Instructions__c=='NULL')
            SO.Delivery_Instructions__c = '';
        
        //alert(JSON.stringify(SO));
        var action = component.get("c.updateSalesOrderForPDF");
        action.setParams({ 
            "SO": SO,
            "custInfoid": custInfoid,
            "BillAddress": BillAdd,
            "shipAddress": ShipAdd,
            "buyerAddress": BuyerAdd,
            "invoiceAddress": InvoiceAdd,
            "suzhouFlag": component.get("v.suzhouFlag"),
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                //making another apex call
                var actionNo2 = component.get("c.saveCatalogSOPDF");
                actionNo2.setParams({ 
                    "SOid": response.getReturnValue(),
                });
                actionNo2.setCallback(this, function(responseNo2){
                    var state = responseNo2.getState();
                    if (state === "SUCCESS") 
                    {
                        var urlString = window.location.href;
                        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
                        //alert('Inside CommunityBaseURL>>>>'+CommunityBaseURL);
                        //alert('BillAdd.Id>>'+BillAdd.Id+' :ShipAdd.Id: '+ShipAdd.Id);
                        urlString = CommunityBaseURL+"/apex/SOConfirmationPDF"+"?DefaultBillToID="+BillAdd.Id+"&DefaultShippToID="+ShipAdd.Id+"&SupplierCode=" + SO.Supplier_Code__c+"&ManufacturerCode="+SO.Manufacturer_Code__c;
                        var win = window.open(urlString, '_blank');
                    }
                    else if (state === "ERROR") 
                    {
                        alert('Error : ' + JSON.stringify(response.getError()));
                    }
                    var spinner = component.find('spinner');
                    $A.util.toggleClass(spinner, "slds-hide");
                });
                $A.enqueueAction(actionNo2);
                
                
            }
            else if (state === "ERROR") 
            {
                alert('Error : ' + JSON.stringify(response.getError()));
            } 
        });
        $A.enqueueAction(action);
        
    },
    PDFForStagePO : function(component, event,helper,POIdList) 
    {
        var SO = component.get("v.salesOrderObj");
        console.log("salesOrderObj>>>"+ JSON.stringify(component.get("v.salesOrderObj")));
        var OrderToCompany = SO.Company__c;
        var PreferredCurrency = SO.CurrencyIsoCode;
        
        if(SO.Delivery_Instructions__c=='NULL')
            SO.Delivery_Instructions__c = '';
        var ShipmentTerms = SO.Delivery_Instructions__c;
        
        /*console.log('Buyers add>>'+JSON.stringify(component.get("v.BuyerAddressList")));
        console.log('Buyers Invoice>>>'+JSON.stringify(component.get("v.InvoiceAddressList")));
        console.log('Index Val>>'+component.get("v.BillAddressIndex"));*/
        
        var BillAddIndex = component.get("v.BillAddressIndex");
        var BillAdd = component.get("v.BillAddressList")[BillAddIndex];
        //alert('BillAdd>>>>'+BillAdd.Id);
        var DefaultBillToID = BillAdd.Id;        
        var ShipAddIndex = component.get("v.ShipAddressIndex");
        var ShipAdd = component.get("v.ShipAddressList")[ShipAddIndex];
        //alert('ShipAdd>>>>'+ShipAdd.Id);
        var DefaultShippToID = ShipAdd.Id;
        var suzhouFlag = component.get("v.suzhouFlag");
        
        var DefaultBuyerToID;
        var DefaultInvoiceToID;
        //alert('suzhouFlag>>>>'+suzhouFlag);
        if(suzhouFlag)
        {
            //alert('Inside suzhouFlag true>>>>'+suzhouFlag);
            var BuyerAddressIndex = component.get("v.BuyerAddressIndex");
            var BuyerAdd = component.get("v.BuyerAddressList")[BuyerAddressIndex];
            //alert('BuyerAdd>>>>'+BuyerAdd.Id);
            DefaultBuyerToID = BuyerAdd.Id;
            
            var InvoiceAddressIndex = component.get("v.InvoiceAddressIndex");
            var InvoiceAdd = component.get("v.InvoiceAddressList")[InvoiceAddressIndex];
            //alert('InvoiceAdd>>>>'+InvoiceAdd.Id);
            DefaultInvoiceToID = InvoiceAdd.Id;
            
            
        }else
        {
            DefaultBuyerToID ='DefaultBuyerToID';
            DefaultInvoiceToID = 'DefaultInvoiceToID';
        }
        
        if(!SO.Expected_Delivery_Date__c)
        {
            SO.Expected_Delivery_Date__c = null;
        }
        
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        //alert('CommunityBaseURL>>>>'+CommunityBaseURL);
        urlString = CommunityBaseURL+'/apex/POConfirmationPDF'+'?Id='+POIdList;
        urlString +='&SupplierCode=' + SO.Supplier_Code__c+'&ManufacturerCode='+SO.Manufacturer_Code__c;
        urlString +='&OrderToCompany='+OrderToCompany+'&PreferredCurrency='+PreferredCurrency+'&ShipmentTerms='+ShipmentTerms;
        urlString +='&suzhouFlag='+suzhouFlag;
        urlString +='&DefaultBillToID='+DefaultBillToID+'&DefaultShippToID='+DefaultShippToID;
        if(suzhouFlag)
            urlString +='&DefaultInvID='+DefaultInvoiceToID+'&DefaultBuyerID='+DefaultBuyerToID;
        urlString +='&expectedDeliveryDate='+SO.Expected_Delivery_Date__c;
        if(SO.Division__c=='NULL')
            SO.Division__c = '';
        if(SO.Season__c=='NULL')
            SO.Season__c = '';
        if(SO.Season_Year__c=='NULL')
            SO.Season_Year__c = '';
        if(!SO.Factory_Internal_PO__c)
            SO.Factory_Internal_PO__c = '';
        
        urlString +='&div='+SO.Division__c+'&seaS='+SO.Season__c+'&seaY='+SO.Season_Year__c;
        urlString +='&finternalPO='+SO.Factory_Internal_PO__c;
        //alert(SO.Transportation_Details__c);
        //alert(SO.Transportation_Details__c.replace(new RegExp('\n', 'g'), '_space'));
        if(SO.Transportation_Details__c && SO.Transportation_Details__c.includes('\n'))
            SO.Transportation_Details__c = SO.Transportation_Details__c.replace(new RegExp('\n', 'g'), '_space');
        if(SO.Transportation_Details__c)
            urlString +='&forw='+SO.Transportation_Details__c;
        else
            urlString +='&forw='+'';
        if(SO.Shipping_Mark__c && SO.Shipping_Mark__c.includes('\n'))
            SO.Shipping_Mark__c = SO.Shipping_Mark__c.replace(new RegExp('\n', 'g'), '_space');
        if(SO.Shipping_Mark__c)
            urlString +='&ship='+SO.Shipping_Mark__c;
        else
            urlString +='&ship='+'';
        //urlString +='&forw='+SO.Transportation_Details__c+'&ship='+SO.Shipping_Mark__c;
        //alert('urlString>>>>'+urlString);
        var win = window.open(urlString, '_blank');
    },
    
    cancelOrderChanges : function(component, event,helper) 
    {
        var SO = component.get("v.salesOrderObj");
        var action = component.get("c.toCancelOrder");
        action.setParams({ 
            "dOrder": SO,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                alert("Successfully saved");
            }
        });
        $A.enqueueAction(action);
    },
    sendOrderEmailWithAttachment : function(component, event,helper,SOID) 
    {
        
        var action = component.get("c.sendSOEmailToCustomer");
        action.setParams({ 
            "SOID": SOID,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if (state === "SUCCESS") 
            {
                //alert("Successfully sent");
            }
        });
        $A.enqueueAction(action);
    },
    cancelPOnPOLIChanges : function(component, event,helper) 
    {
        var selecPO = component.get("v.comfirmPOList");
        console.log(JSON.stringify(selecPO));
        var action = component.get("c.cancelPOChanges");
        action.setParams({ 
            "POString": JSON.stringify(selecPO),
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if (state === "SUCCESS") 
            {
                alert("Successfully updated");
            }
            else if (state === "ERROR") 
            {
                alert('Error : ' + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
        
    },
    unCheckAllPO : function(component, event,helper) 
    {
        var action = component.get("c.uncheckPoCheckbox");
        action.setParams({ SelectedId : component.get("v.toUncheck")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var accs = response.getReturnValue();
                
            }
            else if (state === "INCOMPLETE") {
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
    }
})