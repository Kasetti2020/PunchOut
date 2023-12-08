({
    doInit : function(component, event,helper) 
    {
        
        
        var cookieString=document.cookie;
        var rqtId = cookieString.split(';');
         var action2 = component.get("c.getLeadTime");
    action2.setParams({ "punchoutID" : rqtId[0] });

            action2.setCallback(this, function(response) {
        var state = response.getState();
        if (state === "SUCCESS") {
            var returnValue = response.getReturnValue();
            //alert(returnValue);
            component.set("v.LeadTime", returnValue);
             var today = new Date();
       // alert(component.get("v.LeadTime"));
        today.setDate(today.getDate() + component.get("v.LeadTime"));
        var formattedDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
        
        component.set("v.salesOrderObj.Expected_Delivery_Date__c",formattedDate);
        
    // alert(component.get("v.LeadTime"))
        }
    });

    $A.enqueueAction(action2);
        
        var action = component.get("c.getAllActiveCartDetails");
        action.setParams({ "punchoutID" : rqtId[0] });
        action.setCallback(this, function(response) {
            // alert('123');
            console.log(response.getReturnValue());
            console.log('DisplayCartDetail><>>'+JSON.stringify(response.getReturnValue()));
            component.set('v.DisplayCartDetail',response.getReturnValue());
        });
        $A.enqueueAction(action);
        
        var cookieString=document.cookie;
        var rqtId = cookieString.split(';');
       // alert(rqtId[0]);
        var action1 = component.get("c.getAllOldShipTO");
        action1.setParams({ "punchoutID" : rqtId[0] });
        action1.setCallback(this, function(response) {
            
            var state = response.getState();
            // alert(state);
            if (state === "SUCCESS") 
            {
                var res = response.getReturnValue();
                
                component.set("v.ShipAddressListOld", res.billAddListRqt);
                console.log('Bill Old TO<><>>'+JSON.stringify(res.billAddListRqt));
                component.set("v.OldShipTo", res.billAddListRqt);
                //alert(JSON.stringify(res));
                var oldShipto = res;
                if(component.get("v.OldShipTo")){
                    //alert(JSON.stringify(res.billAddListRqt));
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Alert!",
                    "message": "ShipTo Address is Changed",
                    "type": "Error",
                });
                toastEvent.fire();
            }
            }
        });
        $A.enqueueAction(action1);
        
        
        
        
        
        helper.toGetCustomerAddess(component, event,helper);
        // helper.toGetcustomerData(component, event,helper);
        alert('order Source '+component.get("v.OrderSource"));
        if(component.get("v.OrderSource")=="PO")
        {
            var confirmPO = component.get("v.comfirmPOList");
            var po = component.get("v.comfirmPOList[0].POwrap");
            //alert('po '+JSON.stringify(v.comfirmPOList[0].POwrap));
            component.set("v.salesOrderObj.Retailer_Code1__c",po.Retailer_Code1__c);
            var responseList = helper.toGetDependentValues(component,po.Retailer_Code1__r.Name,'Retailer_Code_Hidden__c','Order_Country__c');
            component.set('v.retailerName',po.Retailer_Code1__r.Name);
            component.set('v.companyList',responseList);
            var retailerPOnumber = '';
            for(var i=0;i<confirmPO.length;i++)
            {
                if(i != 0)
                {
                    retailerPOnumber += ',';
                }
                retailerPOnumber += confirmPO[i].POwrap.Order_Number__c;
            }
            component.set("v.salesOrderObj.Order_Number__c",retailerPOnumber);
        }
        
       
    },
    changeAddress : function(component, event,helper) 
    {
        //var recordByEvent = event.getParam("recordByEvent");
        var objectAPIName = event.getParam("objectAPIName");
        var index = parseInt(objectAPIName);
        //alert('index Inside SalesOrderAddressComp>>'+index);
        
        var context = event.getParam("context");
        if(context === "Bill")
        {
            //alert('Inside context is Bill');
            var BillAddressList = component.get("v.BillAddressList");
            component.set("v.BillAddressIndex",index);
            for(var i=0; i<BillAddressList.length; i++)
            {
                if(index!=i)
                    BillAddressList[i].Is_Default__c = false;
            }
            component.set('v.BillAddressList',BillAddressList);
            
            //below code is to make sure either bill to or bill to locked is selected
            //#BillTolocked seperate section is not required
            /*var BillLockedAddressList = component.get("v.BillLockedAddressList");
            for(var i=0; i<BillLockedAddressList.length; i++)
            {
                BillLockedAddressList[i].Is_Default__c = false;
            }
            component.set('v.BillLockedAddressList',BillLockedAddressList);
        }
        if(context === "BillLocked")
        {
            //alert('Inside context is Bill to locked');
            var BillLockedAddressList = component.get("v.BillLockedAddressList");
            component.set("v.BillLockedAddressList",index);
            for(var i=0; i<BillLockedAddressList.length; i++)
            {
                if(index!=i)
                    BillLockedAddressList[i].Is_Default__c = false;
            }
            component.set('v.BillLockedAddressList',BillLockedAddressList);
            
            //below code is to make sure either bill to or bill to locked is selected
            var BillAddressList = component.get("v.BillAddressList");
            for(var i=0; i<BillAddressList.length; i++)
            {
                BillAddressList[i].Is_Default__c = false;
            }
            component.set('v.BillAddressList',BillAddressList);*/
        }
        else if(context === "Ship")
        {
            var ShipAddressList = component.get("v.ShipAddressList");
            component.set("v.ShipAddressIndex",index);
            for(var i=0; i<ShipAddressList.length; i++)
            {
                if(index!=i)
                    ShipAddressList[i].Is_Default__c = false;
            }
            component.set('v.ShipAddressList',ShipAddressList);
        }
        if(context === "Buyer")
        {
            var BuyerAddressList = component.get("v.BuyerAddressList");
            for(var i=0; i<BuyerAddressList.length; i++)
            {
                if(index!=i)
                    BuyerAddressList[i].Is_Default__c = false;
            }
            component.set('v.BuyerAddressList',BuyerAddressList);
            component.set('v.BuyerAddressIndex',index);
        }
        else if(context === "Invoice")
        {
            var InvoiceAddressList = component.get("v.InvoiceAddressList");
            for(var i=0; i<InvoiceAddressList.length; i++)
            {
                if(index!=i)
                    InvoiceAddressList[i].Is_Default__c = false;
            }
            component.set('v.InvoiceAddressList',InvoiceAddressList);
            component.set('v.InvoiceAddressIndex',index);
        }
    },
    closeModal : function(component, event,helper) 
    {
        
        if(component.get("v.OrderSource")=="PO")
        {
            helper.cancelPOnPOLIChanges(component, event,helper);
        }
        else
        {
            helper.cancelOrderChanges(component, event,helper);
        }
        //component.set("v.cartcmp", true);
        //$A.get('e.force:refreshView').fire();  
        component.set("v.AddressPopUpFlag", false);
    },
    
    ConfirmOrder : function(component,event,helper)
    {
        var cookieString=document.cookie;
        var rqtId = cookieString.split(';');
        var action = component.get("c.deleteInactiveModel");
        action.setParams({ 
            "punchoutID": rqtId[0]
            
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            var res = response.getReturnValue();
            //alert('delete');
            if(state === 'SUCCESS'){
                
                
            }
            else if(state === 'ERROR'){
                //alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
            
            
        });
        $A.enqueueAction(action);
        
        
        
        
        helper.confirmBaseOrder(component, event,helper);
        
        
        
        //--Validation for PO to SO Default Address Selection Starts here-----
        
        /*ma   var billAddressList = component.get('v.BillAddressList');
        var checkDefaultBillAddress = false;
        for(var i = 0 ; i<billAddressList.length ; i++)
        {
            //alert('Inside billAddressList Iteration>>>');
            if(billAddressList[i].Is_Default__c)
            {
                checkDefaultBillAddress = true;
            }
        }
        if(!checkDefaultBillAddress)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Select_atleast_one_default_billing_Address")
            });
            toastEvent.fire();
            return;
        }
        
        var ShipAddressList = component.get('v.ShipAddressList');
        var checkDefaultShippAddress = false;
        for(var i = 0 ; i<ShipAddressList.length ; i++)
        {
            //alert('Inside billAddressList Iteration>>>');
            if(ShipAddressList[i].Is_Default__c)
            {
                checkDefaultShippAddress = true;
            }
            
            
        }
        if(!checkDefaultShippAddress)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Please_select_atleast_one_default_shipping_Address")
            });
            toastEvent.fire();
            return;
        }
        
        if(component.get("v.suzhouFlag"))
        {
            var BuyerAddressList = component.get('v.BuyerAddressList');
            var checkDefaultBuyAddress = false;
            for(var i = 0 ; i<BuyerAddressList.length ; i++)
            {
                //alert('Inside billAddressList Iteration>>>');
                if(BuyerAddressList[i].Is_Default__c)
                {
                    checkDefaultBuyAddress = true;
                }
            }
            if(!checkDefaultBuyAddress)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Error"),
                    "type" : "error",
                    "message": $A.get("$Label.c.Select_atleast_one_Buyer_Address")
                });
                toastEvent.fire();
                return;
            }
            
            var InvoiceAddressList = component.get('v.InvoiceAddressList');
            var checkDefaultInvAddress = false;
            for(var i = 0 ; i<InvoiceAddressList.length ; i++)
            {
                //alert('Inside billAddressList Iteration>>>');
                if(InvoiceAddressList[i].Is_Default__c)
                {
                    checkDefaultInvAddress = true;
                }
                
                
            }
            if(!checkDefaultInvAddress)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Error"),
                    "type" : "error",
                    "message": $A.get("$Label.c.Please_select_atleast_one_Invoice_Address")
                });
                toastEvent.fire();
                return;
            }
        }
        //---Validation for PO to SO Address Selection ends here-----
        var SO = component.get("v.salesOrderObj");
        
        //in open PO tab
        if(component.get("v.OrderSource")=="PO")
        {
            if(SO.Company__c=='NULL')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_select_Order_To_Company")
                });
                toastEvent.fire();
                return;
            }
            if(SO.CurrencyIsoCode=='NULL')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_select_Preferred_Currency")
                });
                toastEvent.fire();
                return;
            }
            if(SO.Delivery_Instructions__c=='NULL' ||SO.Delivery_Instructions__c=='')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_select_Delivery_Instruction")
                });
                toastEvent.fire();
                return;
            }
            // validations for Supplier Code and Manufacturer Code
            if(SO.Supplier_Code__c=='NULL' ||SO.Supplier_Code__c=='')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_give_Supplier_Code")
                });
                toastEvent.fire();
                return;
            }
            
            if(SO.Supplier_Code__c != null && SO.Supplier_Code__c.length> 255){
                
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Warning"),
                        "type" : "warning",
                        "message": $A.get("$Label.c.Supplier_Vendor_Code_should_be_less_than_or_equal_to_255_characters")
                    });
                    toastEvent.fire();
                    return;
            }
            if(SO.Manufacturer_Code__c=='NULL' ||SO.Manufacturer_Code__c=='')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_give_Manufacturer_Factory_POF_Code")
                });
                toastEvent.fire();
                return;
            }
            
            if(SO.Manufacturer_Code__c != null && SO.Manufacturer_Code__c.length> 255){
                
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Warning"),
                        "type" : "warning",
                        "message": $A.get("$Label.c.Manufacturer_Factory_POF_Code_should_be_less_than_or_equal_to_255_characters")
                    });
                    toastEvent.fire();
                    return;
            }
            
            //new date validation to be later thAn today
            var today = new Date();
            today.setDate(today.getDate() + 1);
            var presentDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
            console.log("SO.Expected_Delivery_Date__c:"+SO.Expected_Delivery_Date__c);
            console.log("presentDate:"+presentDate);
            if(SO.Expected_Delivery_Date__c<presentDate)
            {
                //component.set("v.salesOrderObj.Expected_Delivery_Date__c",presentDate);
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"warning",
                    "title": $A.get("$Label.c.Warning"),
                    "message": $A.get("$Label.c.Expected_Ex_Factory_Date_must_be_later_than_today")
                });
                toastEvent.fire();
                event.preventDefault();
                return;
            }
            
            helper.unCheckAllPO(component,event,helper);
            helper.convertPOToSalesOrder(component, event,helper);
            
        }
        
    
        else	//in catalog order tab
        {  
            var check=component.get("v.MandatoryCheck");
             for(var j=0;j<check.length;j++){
            //console.log("inside>>"+JSON.stringify(check[j].Season_Mandatory__c));
            
            if(check[j].Season_Mandatory__c==true && SO.Season__c=='NULL' ){
                 var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_select_a_Season")
                });
                toastEvent.fire();
                return;
            }
            if(check[j].Season_Year_Mandatory__c==true && SO.Season_Year__c=='NULL'){
                 var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_select_a_Season_Year")
                });
                toastEvent.fire();
                return;
            }
            if(check[j].Retailer_PO_Mandatory__c==true && SO.Order_Number__c==undefined){
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_Enter_Retailer_PO")
                });
                toastEvent.fire(); 
                return;
            }
            if(check[j].Division_Mandatory__c==true && SO.Division__c=='NULL'){
                 var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_select_a_Division")
                });
                toastEvent.fire();
                return;
            }
        }
            if(!SO.Expected_Delivery_Date__c || SO.Expected_Delivery_Date__c == null)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Expected_delivery_date_is_mandatory")
                });
                toastEvent.fire();
                return;
            }
            if(SO.Delivery_Instructions__c=='NULL'||SO.Delivery_Instructions__c=='')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_select_Delivery_Instruction")
                });
                toastEvent.fire();
                return;
            }
            
            // validations for Supplier Code and Manufacturer Code
            if(SO.Supplier_Code__c=='NULL' ||SO.Supplier_Code__c=='')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_give_Supplier_Code")
                });
                toastEvent.fire();
                return;
            }
             if(SO.Supplier_Code__c != null && SO.Supplier_Code__c.length> 255){
                
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Warning"),
                        "type" : "warning",
                        "message": $A.get("$Label.c.Supplier_Vendor_Code_should_be_less_than_or_equal_to_255_characters")
                    });
                    toastEvent.fire();
                    return;
            }
            if(SO.Manufacturer_Code__c=='NULL' ||SO.Manufacturer_Code__c=='')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.Please_give_Manufacturer_Factory_POF_Code")
                });
                toastEvent.fire();
                return;
            }
            if(SO.Manufacturer_Code__c != null && SO.Manufacturer_Code__c.length> 255){
                
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Warning"),
                        "type" : "warning",
                        "message": $A.get("$Label.c.Manufacturer_Factory_POF_Code_should_be_less_than_or_equal_to_255_characters")
                    });
                    toastEvent.fire();
                    return;
            }
            
            //new date validation to be later thAn today
            var today = new Date();
            today.setDate(today.getDate() + 1);
            var presentDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
            console.log("SO.Expected_Delivery_Date__c:"+SO.Expected_Delivery_Date__c);
            //SO.Expected_Delivery_Date__c = SO.Expected_Delivery_Date__c.split(' ')[0];
            //console.log("SO.Expected_Delivery_Date__c after:"+SO.Expected_Delivery_Date__c);
            console.log("presentDate:"+presentDate);
            if(SO.Expected_Delivery_Date__c<presentDate)
            {
                //component.set("v.salesOrderObj.Expected_Delivery_Date__c",presentDate);
                console.log("shoul d:");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"warning",
                    "title": $A.get("$Label.c.Warning"),
                    "message": $A.get("$Label.c.Expected_Ex_Factory_Date_must_be_later_than_today")
                });
                toastEvent.fire();
                event.preventDefault();
                return;
            }
            helper.confirmSalesOrder(component, event,helper);
        }
        
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");ma*/
    },
    changeDate:function(component, event, helper){
        //alert('changeDate');
        var GivenDate = component.get('v.salesOrderObj.Expected_Delivery_Date__c');
        var today = new Date();
        today.setDate(today.getDate() + component.get("v.LeadTime"));
        var presentDate = $A.localizationService.formatDate(today, "yyyy-MM-dd");
        if(GivenDate<presentDate)
        {
            //component.set("v.salesOrderObj.Expected_Delivery_Date__c",presentDate);
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":"warning",
                "title": $A.get("$Label.c.Warning"),
                "message": $A.get("$Label.c.Expected_Ex_Factory_Date_must_be_later_than_today")
            });
            toastEvent.fire();
            event.preventDefault();
            return;
        }
        if(GivenDate!=undefined)
        {
            //alert('undefined');
            component.find('ExpectedDeliveryDate').showHelpMessageIfInvalid();
            return;
        }
    },
    OrderToCompany:function(component, event, helper)
    {
        var compName = event.getSource().get("v.value");
        helper.toGetDependentValues(component,compName,'Order_Country__c','Preferred_Currency__c');
        var SO = component.get("v.salesOrderObj");
        SO.CurrencyIsoCode='NULL';
        component.set("v.salesOrderObj",SO);
        var compName = event.getSource().get("v.value");
        //helper.toGetDependentValues(component,compName,'Order_Country__c','Export_Term__c');
        helper.toGetDependentValues(component,compName,'Order_Country__c','Delivery_Instruction__c');
        //alert('comp in catalog '+compName);
        if(compName.includes("Suzhou"))
        {
            component.set("v.suzhouFlag",true);
            if(component.get("v.BuyerAddressList").length==0)
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
            if(component.get("v.InvoiceAddressList").length==0)
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
        else
        {
            component.set("v.suzhouFlag",false);
        }
    },
    toGetCurrency:function(component, event, helper)
    {
        var compName = event.getSource().get("v.value");
        helper.toGetDependentValues(component,compName,'Order_Country__c','Preferred_Currency__c');
    },
    openPDF:function(component, event, helper)
    {
        var billAddressList = component.get('v.BillAddressList');
        var checkDefaultBillAddress = false;
        for(var i = 0 ; i<billAddressList.length ; i++)
        {
            //alert('Inside billAddressList Iteration>>>');
            if(billAddressList[i].Is_Default__c)
            {
                checkDefaultBillAddress = true;
            }
        }
        if(!checkDefaultBillAddress)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Select_atleast_one_default_billing_Address")
            });
            toastEvent.fire();
            return;
        }
        
        var ShipAddressList = component.get('v.ShipAddressList');
        var checkDefaultShippAddress = false;
        for(var i = 0 ; i<ShipAddressList.length ; i++)
        {
            //alert('Inside billAddressList Iteration>>>');
            if(ShipAddressList[i].Is_Default__c)
            {
                checkDefaultShippAddress = true;
            }
            
            
        }
        if(!checkDefaultShippAddress)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Please_select_atleast_one_default_shipping_Address")
            });
            toastEvent.fire();
            return;
        }
        if(component.get("v.suzhouFlag"))
        {
            var BuyerAddressList = component.get('v.BuyerAddressList');
            var checkDefaultBuyAddress = false;
            for(var i = 0 ; i<BuyerAddressList.length ; i++)
            {
                //alert('Inside billAddressList Iteration>>>');
                if(BuyerAddressList[i].Is_Default__c)
                {
                    checkDefaultBuyAddress = true;
                }
            }
            if(!checkDefaultBuyAddress)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Error"),
                    "type" : "error",
                    "message": $A.get("$Label.c.Select_atleast_one_Buyer_Address")
                });
                toastEvent.fire();
                return;
            }
            
            var InvoiceAddressList = component.get('v.InvoiceAddressList');
            var checkDefaultInvAddress = false;
            for(var i = 0 ; i<InvoiceAddressList.length ; i++)
            {
                //alert('Inside billAddressList Iteration>>>');
                if(InvoiceAddressList[i].Is_Default__c)
                {
                    checkDefaultInvAddress = true;
                }
                
                
            }
            if(!checkDefaultInvAddress)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Error"),
                    "type" : "error",
                    "message": $A.get("$Label.c.Please_select_atleast_one_Invoice_Address")
                });
                toastEvent.fire();
                return;
            }
        }
        
        var SO = component.get("v.salesOrderObj");
        //alert('SO.Company__c>>>>'+SO.Company__c);
        var OrderToCompany = SO.Company__c;
        var PreferredCurrency = SO.CurrencyIsoCode;
        var ShipmentTerms = SO.Delivery_Instructions__c;
        var DefaultBillToID;
        var DefaultShippToID;
        var DefaultBuyerToID;
        var DefaultInvoiceToID;
        
        // validations for Supplier Code and Manufacturer Code
        if(SO.Supplier_Code__c=='NULL' ||SO.Supplier_Code__c=='')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Warning"),
                "type" : "warning",
                "message": $A.get("$Label.c.Please_give_Supplier_Code")
            });
            toastEvent.fire();
            return;
        }
        if(SO.Supplier_Code__c != null && SO.Supplier_Code__c.length> 255){
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Warning"),
                "type" : "warning",
                "message": $A.get("$Label.c.Supplier_Vendor_Code_should_be_less_than_or_equal_to_255_characters")
            });
            toastEvent.fire();
            return;
        }
        if(SO.Manufacturer_Code__c=='NULL' ||SO.Manufacturer_Code__c=='')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Warning"),
                "type" : "warning",
                "message": $A.get("$Label.c.Please_give_Manufacturer_Factory_POF_Code")
            });
            toastEvent.fire();
            return;
        }
        if(SO.Manufacturer_Code__c != null && SO.Manufacturer_Code__c.length> 255){
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Warning"),
                "type" : "warning",
                "message": $A.get("$Label.c.Manufacturer_Factory_POF_Code_should_be_less_than_or_equal_to_255_characters")
            });
            toastEvent.fire();
            return;
        }
        
        if(component.get("v.OrderSource")=="PO")
        {
            var currentURL = currentURL + '/apex/LightningPDFGenerator';
            var selecPO = component.get("v.comfirmPOList");
            //alert('selecPO>>>>'+ JSON.stringify(selecPO));   
            var list = [];
            var POLIQtyArr  = [];
            //-----For loop iteration starts from here --------------
            for(var i = 0 ; i< selecPO.length;i++)
            {
                list[i] = selecPO[i].POwrap.Id;
            }
            if(list.length>1)
            {
                component.set("v.OrderDetailFlag",false);
                component.set("v.POPDFFlag",true);
            }
            else
            {
                helper.PDFForStagePO(component, event,helper,list);
            }
        }
        else
        {
            helper.PDFForCatalog(component, event,helper); 
        }
    },
    closeBoxRqdModal:function(component, event, helper)
    {
        component.set("v.OrderDetailFlag",true);
        component.set("v.POPDFFlag",false);
    },
    printPOPDF:function(component, event, helper)
    {
        var poId = event.getSource().get("v.value");
        helper.PDFForStagePO(component, event,helper,poId);
    },
})