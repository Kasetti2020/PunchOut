({
    loadJquery : function(component, event, helper) {
        jQuery(document).ready(function(){
            //alert('Inside loadJquery');
            /*var maxLength = 100;
            $('textarea').keyup(function() {
                var length = $(this).val().length;
                var length = maxLength-length;
                $('#chars').text(length);
            });*/
            
            $('#BillingStreet').keyup(function() {
                //alert('HIHIHIHHI');
                var entered = $(this).val();
                //alert('entered'+entered); 
            });
            
            $('#checkbox1').change(function() {
                alert('Jquery checkbox>>>>>');
                //$('#textbox1').val($(this).is(':checked'));
                $('#ShippingStreet').val('Test');
            });
            
            
        });
    },
    
    doInit : function(cmp, event, helper)
    {
        //cmp.set('v.registrationSuccessfull',true);
        
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        //window.location.replace(CommunityBaseURL+"/secur/logout.jsp?retUrl="+CommunityBaseURL+"/s/login");
        //alert('LogoutURL>>>'+CommunityBaseURL+"/secur/logout.jsp?retUrl="+CommunityBaseURL+"/s/login");
        cmp.set("v.LogoutURL",CommunityBaseURL+"/secur/logout.jsp?retUrl="+CommunityBaseURL+"/s/login");
        
        
        helper.getAllRetailerCodeOrderToCompanyMap(cmp,event, helper);
        helper.getAllOrderToCompanyPreferredCurrencyMap(cmp,event, helper);
        helper.CallCompanyConfiguration(cmp,event, helper);
        
        cmp.set('v.steps', [
            { label: $A.get("$Label.c.Terms_and_Condition_Section"), value: 'step-1' },
            { label: $A.get("$Label.c.Basic_Information_Section"), value: 'step-2' },
            { label: $A.get("$Label.c.Address_Section"), value: 'step-3' },
            //{ label: 'Nurturing', value: 'step-4' },
            //{ label: 'Closed', value: 'step-5' },
        ]);
            cmp.set('v.currentStep','step-1');
            
            },
            
            onCheck: function(cmp, evt) 
            {
            var checkCmp = cmp.find("checkbox");
            //alert('Checkbox value >>>'+checkCmp.get("v.value"));
            //resultCmp = cmp.find("checkResult");
            //resultCmp.set("v.value", ""+checkCmp.get("v.value"));
            
            },
            
            onCheckSameasBillTo: function(cmp, evt) 
            {            
            console.log('Inside onCheckSameasBillTo Checkbox value >>>'+cmp.get("v.SameasBillTo"));
            var BillToAddressList = cmp.get("v.BillToAddressList");
            var shippToAddressList = cmp.get("v.ShippToAddressList");
            if(cmp.get("v.SameasBillTo"))
            {
            
            for(var i = 0 ; i<BillToAddressList.length ; i++)
            {
            //alert('Inside BillToAddressList iteration');
            if(BillToAddressList[i].Is_Default__c)
        {
            for(var j = 0 ; j <shippToAddressList.length ; j++)
            {
                //alert('Inside shippToAddressList iteration');
                if(shippToAddressList[j].Is_Default__c)
                {
                    //alert('contry>>'+BillToAddressList[i].Country__c);
                    shippToAddressList[j].Factory_Name__c = BillToAddressList[i].Factory_Name__c;
                    shippToAddressList[j].Address_1__c = BillToAddressList[i].Address_1__c;
                    shippToAddressList[j].City__c = BillToAddressList[i].City__c;
                    shippToAddressList[j].State__c = BillToAddressList[i].State__c;
                    shippToAddressList[j].Country__c = BillToAddressList[i].Country__c;
                    shippToAddressList[j].Postcode__c = BillToAddressList[i].Postcode__c;
                    shippToAddressList[j].Contact__c = BillToAddressList[i].Contact__c;
                    shippToAddressList[j].Tel_No__c = BillToAddressList[i].Tel_No__c;
                    shippToAddressList[j].Email_Address__c = BillToAddressList[i].Email_Address__c;
                    //cmp.find('field1').set('v.value',BillToAddressList[i].Country__c); 
                    //alert('after>>'+shippToAddressList[j].Country__c);
                    break;
                    
                }
                
                
            }
            
        }
    }
    cmp.set("v.ShippToAddressList",shippToAddressList);
    
}
 else
 {
 var ShippToAddressList = cmp.get("v.ShippToAddressList");
for(var j = 0 ; j <ShippToAddressList.length ; j++)
{
    //alert('Inside shippToAddressList iteration');
    if(ShippToAddressList[j].Is_Default__c)
    {
        shippToAddressList[j].Factory_Name__c = '';
        shippToAddressList[j].Address_1__c = '';
        shippToAddressList[j].City__c = '';
        shippToAddressList[j].State__c = '';
        shippToAddressList[j].Country__c = '';
        shippToAddressList[j].Postcode__c = '';
        shippToAddressList[j].Contact__c = '';
        shippToAddressList[j].Tel_No__c = '';
        shippToAddressList[j].Email_Address__c = '';
        //cmp.find('field1').set('v.value','');
        
    }
}
cmp.set("v.ShippToAddressList",ShippToAddressList); 
}
//var childComp = cmp.find('childComp');
//childComp.callChild();
var shipchildComp = cmp.find('shipchildComp');
shipchildComp.shipcallChild();
//BillToAddressList
//ShippToAddressList

},
    
    
    
    
    addNewBillAddress : function(component, event, helper)
{     
    var billtoAddress = component.get("v.BillToAddressList");
    //alert('billtoAddress>>'+billtoAddress.length);
    if(billtoAddress.length == 0)
    {
        billtoAddress.push({'sobjectType':'Ship_Bill_Address__c','Is_Default__c':true});
    }
    else
    {
        billtoAddress.push({'sobjectType':'Ship_Bill_Address__c'});
    }
    component.set("v.BillToAddressList",billtoAddress); 
    component.set("v.shiptovalidationflag",true); 
    
    
    
} ,
    
    addNewShippAddress : function(component, event, helper)
{     
    var ShippToAddress = component.get("v.ShippToAddressList");
    //alert('ShippToAddress>>'+ShippToAddress.length);
    if(ShippToAddress.length == 0)
    {
        ShippToAddress.push({'sobjectType':'Ship_Bill_Address__c','Is_Default__c':true});
    }
    else
    {
        ShippToAddress.push({'sobjectType':'Ship_Bill_Address__c'});
    }
    
    component.set("v.ShippToAddressList",ShippToAddress); 
    component.set("v.SameasBillTo",false);
    component.set("v.shiptovalidationflag",true); 
    console.log('ShippToAddressList>>'+JSON.stringify(component.get("v.ShippToAddressList")));
} ,
    
    addNewInvoiceToddress : function(component, event, helper)
{     
    var InvoiceToAddress = component.get("v.InvoiceToAddressList");
    if(InvoiceToAddress.length == 0)
    {
        InvoiceToAddress.push({'sobjectType':'Ship_Bill_Address__c','Is_Default__c':true});
    }
    else
    {
        InvoiceToAddress.push({'sobjectType':'Ship_Bill_Address__c'});
    }
    component.set("v.InvoiceToAddressList",InvoiceToAddress); 
    component.set("v.shiptovalidationflag",true); 
} ,
    
    addNewBuyerToAddress : function(component, event, helper)
{     
    var BuyerToAddress = component.get("v.BuyerToAddressList");
    if(BuyerToAddress.length == 0)
    {
        BuyerToAddress.push({'sobjectType':'Ship_Bill_Address__c','Is_Default__c':true});
    }
    else
    {
        BuyerToAddress.push({'sobjectType':'Ship_Bill_Address__c'});
    }
    
    
    component.set("v.BuyerToAddressList",BuyerToAddress); 
    component.set("v.shiptovalidationflag",true); 
} ,
    
    
    handleLookupValueselected: function (component, event, helper)
{
    
    
    //alert('ObjectAPi Name is>>>'+event.getParam("objectAPIName"));
    
    //alert('Inside handleLookupValueselected>>>'+JSON.stringify(component.get("v.MainWrapperObject")));
    //alert('Inside handleLookupValueselected>>>'+JSON.stringify(component.get("v.MainWrapperObject.RetailerName")));
    //var controllerValueKey = event.getSource().get("v.value"); // get selected controller field value
    //
    
    if(event.getParam("objectAPIName") =='Retailer_Code__c')
    {
        var controllerValueKey = JSON.stringify(component.get("v.MainWrapperObject.RetailerName")); // get selected controller field value
        var depnedentFieldMap = component.get("v.depnedentFieldMap");
        
        //alert('controllerValueKey>>'+controllerValueKey);
        //alert('Before controllerValueKey>>'+"+controllerValueKey+");
        controllerValueKey = eval(controllerValueKey );
        //alert('After removed>>'+controllerValueKey);
        //alert('Static Referenced Value>>'+'PRL RTW');
        //alert('depnedentFieldMap>>'+depnedentFieldMap);
        if (controllerValueKey != '--- None ---') {
            //alert('Inside controllerValueKey not empty>>>');
            //var ListOfDependentFields = depnedentFieldMap[controllerValueKey];
            var ListOfDependentFields = depnedentFieldMap[controllerValueKey];
            //alert('Inside ListOfDependentFields>>>'+ListOfDependentFields);
            //alert('Inside ListOfDependentFields.length>>>'+typeof ListOfDependentFields);
            //if(ListOfDependentFields== undefined)
            if(ListOfDependentFields== undefined)
            {
                //alert('There are no Order to Company values configured for this Retailer!');
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Error"),
                    "type" : "warning",
                    "message": $A.get("$Label.c.There_are_no_Order_to_Company_values_configured_for_this_Retailer")
                });
                toastEvent.fire();
                var dependentFields = [];
                dependentFields.push('--- None ---');
                component.set("v.listDependingValues", dependentFields);
                
                //component.set("v.bDisabledDependentFld" , true);  
                //component.set("v.bDisabledPreferredCurrency" , true); 
                //component.set("v.MainWrapperObject.OrderToCompany" ,'--- None ---'); 
                //component.set("v.MainWrapperObject.PreferredCurrency" ,'--- None ---');
                //disabled="{!v.bDisabledPreferredCurrency || (v.MainWrapperObject.OrderToCompany=='--- None ---')}"
                
                
                return;
            }
            else
            {
                if(ListOfDependentFields.length > 0){
                    component.set("v.bDisabledDependentFld" , false);  
                    helper.fetchDepValues(component, ListOfDependentFields);    
                }else{
                    component.set("v.bDisabledDependentFld" , true); 
                    component.set("v.listDependingValues", ['--- None ---']);
                }  
                
            }
            
            
        } else {
            component.set("v.listDependingValues", ['--- None ---']);
            component.set("v.bDisabledDependentFld" , true);
        }	
        
    }
    else if(event.getParam("objectAPIName") =='Account')
    {
        //alert('Inside ObjectAPI Name is account>>');
    }
        else
        {
            //alert('Inside else Name is account>>'+event.getParam("objectAPIName"));
        }
    
    
    
    
    
},
    
    
    ClearLookupValue: function (component, event, helper) {
        
        
        if(!component.get('v.MainWrapperObject.RetailerCode'))
        {
            //alert('Inside ClearLookupValue>>>');
            component.set("v.MainWrapperObject.OrderToCompany",'--- None ---');
            component.set("v.MainWrapperObject.PreferredCurrency",'--- None ---');
            //component.set("v.MainWrapperObject.RetailerCode",'');
            //---Need to reset the previous values from  listDependingValues
            
            
        }
    },
        
        
        getData : function (component,event, helper) {
            
            var flag = event.getParam('flag');
            var rowIndex = event.getParam('rowIndex');
            //alert('rowIndex>>>'+rowIndex);
            console.log('flag>>>'+flag);
            if(flag=='CheckDeafultBillAdress')
            {
                
                var BillToAddressList = component.get('v.BillToAddressList');
                for(var i = 0 ; i<BillToAddressList.length ; i++)
                {
                    if(BillToAddressList[i].Is_Default__c && i!=rowIndex)
                    {
                        BillToAddressList[i].Is_Default__c = false;
                    }
                }
                
                component.set('v.BillToAddressList',BillToAddressList);
            }
            
            if(flag=='CheckDeafultShipAdress')
            {
                
                var ShippToAddressList = component.get('v.ShippToAddressList');
                for(var i = 0 ; i<ShippToAddressList.length ; i++)
                {
                    if(ShippToAddressList[i].Is_Default__c && i!=rowIndex)
                    {
                        ShippToAddressList[i].Is_Default__c = false;
                    }
                }
                
                component.set('v.ShippToAddressList',ShippToAddressList);
            }
            
            if(flag=='CheckDeafultInvoiceToAdress')
            {
                
                var InvoiceToAddressList = component.get('v.InvoiceToAddressList');
                for(var i = 0 ; i<InvoiceToAddressList.length ; i++)
                {
                    if(InvoiceToAddressList[i].Is_Default__c && i!=rowIndex)
                    {
                        InvoiceToAddressList[i].Is_Default__c = false;
                    }
                }
                
                component.set('v.InvoiceToAddressList',InvoiceToAddressList);
            }
            
            if(flag=='CheckDeafultBuyerToAdress')
            {
                
                var BuyerToAddressList = component.get('v.BuyerToAddressList');
                for(var i = 0 ; i<BuyerToAddressList.length ; i++)
                {
                    if(BuyerToAddressList[i].Is_Default__c && i!=rowIndex)
                    {
                        BuyerToAddressList[i].Is_Default__c = false;
                    }
                }
                
                component.set('v.BuyerToAddressList',BuyerToAddressList);
            }
            
            
            
            if(flag=='DeleteBillAdress')
            {
                
                var BillToAddressList = component.get('v.BillToAddressList');
                BillToAddressList.splice(rowIndex, 1);
                component.set('v.billtovalidationflag',false)
                //alert('DeleteBillAdress flag>>>:::::'+component.get('v.billtovalidationflag'));
                component.set('v.BillToAddressList',BillToAddressList);
            }
            
            if(flag=='DeleteShipAdress')
            {
                
                var ShippToAddressList = component.get('v.ShippToAddressList');
                ShippToAddressList.splice(rowIndex, 1);
                component.set('v.shiptovalidationflag',false)
                component.set('v.ShippToAddressList',ShippToAddressList);
                //alert('ShippToAddressList length after remove is>>'+component.get('v.ShippToAddressList').length);
                if(component.get('v.ShippToAddressList').length == 0)
                {
                    
                    component.set('v.SameasBillTo',false);
                }
            }
            
            if(flag=='DeleteInvoiceToAdress')
            {
                
                var InvoiceToAddressList = component.get('v.InvoiceToAddressList');
                InvoiceToAddressList.splice(rowIndex, 1);
                component.set('v.invoicetovalidationflag',false)
                component.set('v.InvoiceToAddressList',InvoiceToAddressList);
            }
            
            if(flag=='DeleteBuyerToAdress')
            {
                
                var BuyerToAddressList = component.get('v.BuyerToAddressList');
                BuyerToAddressList.splice(rowIndex, 1);
                component.set('v.buyertovalidationflag',false)
                component.set('v.BuyerToAddressList',BuyerToAddressList);
            }
            
            console.log('BillToAddressList'+JSON.stringify(component.get("v.BillToAddressList")));
            console.log('ShippToAddressList'+JSON.stringify(component.get("v.ShippToAddressList")));
            console.log('BuyerToAddressList'+JSON.stringify(component.get("v.BuyerToAddressList")));
            console.log('InvoiceToAddressList'+JSON.stringify(component.get("v.InvoiceToAddressList")));
            
            if(flag=='CreateContact')
            {
                
                alert('Inside Hadler>>>');
            }    
            
            
            
            
        },
            
            
            onChangeOrdeToCompany: function (component, event, helper) {
                var selectedOrderToCompany = event.getSource().get("v.value");
                //alert('selectedOrderToCompany>>>'+selectedOrderToCompany);
                var SubDepnedentFieldMap = component.get("v.SubDepnedentFieldMap");
                if (selectedOrderToCompany != '--- None ---') 
                {
                    
                    var ListOfDependentFields = SubDepnedentFieldMap[selectedOrderToCompany];
                    //alert('ListOfDependentFields>>'+ListOfDependentFields);
                    if(ListOfDependentFields.length > 0){
                        component.set("v.bDisabledPreferredCurrency" , false); 
                        component.set("v.MainWrapperObject.PreferredCurrency",'');
                        helper.fetchDepPreferredCurrencyValues(component, ListOfDependentFields);    
                    }
                    else
                    {
                        component.set("v.bDisabledPreferredCurrency" , true); 
                        component.set("v.listPreferredCurrencyDependingValues", ['--- None ---']);
                    }  
                    
                } 
                else 
                {
                    component.set("v.listPreferredCurrencyDependingValues", ['--- None ---']);
                    component.set("v.bDisabledPreferredCurrency" , true);
                }	
                //---New code to make Company configuration dynamic added on 08-Aug-2019 starts from here----
                var CompanyConfigurationList = component.get("v.CompanyConfigurationList");
                component.set("v.ShowInvoiceToBuyerToComp" , false);
                for (var i = 0; i < CompanyConfigurationList.length; i++) 
                {
                    //alert('Inside For loop>>>'+CompanyConfigurationList[i]);
                    //if(selectedOrderToCompany=='North China – Suzhou Mainetti Plastic Products Ltd')
                    if(selectedOrderToCompany== CompanyConfigurationList[i])
                    {
                        
                        //alert('Inside selectedOrderToCompany matches for CompanyConfigurationList company');	
                        component.set("v.ShowInvoiceToBuyerToComp" , true);
                        //alert('InvoiceToAddressList>>>>'+component.get("v.InvoiceToAddressList"));
                        var InvoiceToAddressList = component.get("v.InvoiceToAddressList");
                        if(InvoiceToAddressList.length == 0)
                        {
                            InvoiceToAddressList.push({'sobjectType':'Ship_Bill_Address__c'});
                            component.set("v.InvoiceToAddressList",InvoiceToAddressList); 
                            component.set("v.InvoiceToAddressList[0].Is_Default__c",true);
                            
                        }
                        else
                        {
                            component.set("v.InvoiceToAddressList",InvoiceToAddressList);
                        }
                        
                        
                        var BuyerToAddressList = component.get("v.BuyerToAddressList");
                        if(BuyerToAddressList.length == 0)
                        {
                            
                            BuyerToAddressList.push({'sobjectType':'Ship_Bill_Address__c'});
                            component.set("v.BuyerToAddressList",BuyerToAddressList); 
                            component.set("v.BuyerToAddressList[0].Is_Default__c",true); 
                        }
                        else
                        {
                            component.set("v.BuyerToAddressList",BuyerToAddressList);
                        }
                    }else
                    {
                        
                        var InvoiceToAddress = [];
                        var BuyerToAddress = [];
                        component.set("v.InvoiceToAddressList",InvoiceToAddress);
                        component.set("v.BuyerToAddressList",BuyerToAddress);  
                        
                    }
                    
                    
                } 
                
                //---New code to make Company configuration dynamic added on 08-Aug-2019 ends here----
                
                
            },
                
                
                onChangePreferredCurrency: function (component, event, helper) {
                    var selectedPreferredCurrency = event.getSource().get("v.value");
                    //alert('selectedPreferredCurrency>>>'+selectedPreferredCurrency);
                },
                    
                    handleChange: function (cmp, event) {
                        // Get the list of the "value" attribute on all the selected options
                        var selectedOptionsList = event.getParam("value");
                        //alert("Options selected: '" + selectedOptionsList + "'");
                    },
                        
                        handleClick :function (component, event, helper) 
{
    alert('selectedOptionsList>>>'+ JSON.stringify(component.get("v.defaultOptions")));
},
    
    
    
    
    registerUser : function (cmp, event, helper)
{
    /*//console.log('inside onClick ');
    var childComp = cmp.find('childComp');
    childComp.callChild();
    var shipchildComp = cmp.find('shipchildComp');
    shipchildComp[0].shipcallChild();
    //alert(cmp.get("v.ShowInvoiceToBuyerToComp"));
    if(cmp.get("v.ShowInvoiceToBuyerToComp") == true)
    {
        var InvoicechildComp = cmp.find('InvoicechildComp');
    	InvoicechildComp.InvoicecallChild();
        var BuychildComp = cmp.find('buychildComp');
    	BuychildComp.BuycallChild();
    }
    */
    //validation for billto comp
    var billAddressList = cmp.get("v.BillToAddressList");
    console.log('billaddress'+billAddressList.length);
    if(billAddressList.length > 1)
    {
        for(var i = 0 ; i<billAddressList.length ; i++)
        {
            //console.log('i>>>'+i);
            var childComp = cmp.find('childComp');
            childComp[i].callChild();
        }
    }
    else{
        var childComp = cmp.find('childComp');
        try {
            childComp.callChild();
        }
        catch (e) {
            //alert('error>>'+ e.message);
            
        }
        
    }
    
    //validation for shipto comp
    var shippToAddressList = cmp.get("v.ShippToAddressList");
    console.log('shippToAddressList'+shippToAddressList.length);
    if(shippToAddressList.length != 1)
    {
        for(var i = 0 ; i<shippToAddressList.length ; i++)
        {
            var shipchildComp = cmp.find('shipchildComp');
            shipchildComp[i].shipcallChild();
        }
    }
    else{
        var shipchildComp = cmp.find('shipchildComp');
        try {
            shipchildComp.shipcallChild();
        }
        catch (e) {
            //alert('error>>'+ e.message);
            
        }
    }
    //validation for buyerto comp
    var BuyerToAddressList = cmp.get("v.BuyerToAddressList");
    console.log('BuyerToAddressList'+BuyerToAddressList.length);
    if(cmp.get("v.ShowInvoiceToBuyerToComp") == true)
    {
        if(BuyerToAddressList.length != 1)
        {
            for(var i = 0 ; i<BuyerToAddressList.length ; i++)
            {
                //console.log('i>>>'+i);
                var BuychildComp = cmp.find('buychildComp');
                BuychildComp[i].BuycallChild();
                
            }
        }
        else{
            var BuychildComp = cmp.find('buychildComp');
            try {
                BuychildComp.BuycallChild();
            }
            catch (e) {
                //alert('error>>'+ e.message);
            }
        }
    }
    //validation for InvoiceTo comp
    var InvoiceToAddressList = cmp.get("v.InvoiceToAddressList");
    console.log('InvoiceToAddressList'+InvoiceToAddressList.length);
    if(cmp.get("v.ShowInvoiceToBuyerToComp") == true)
    {
        if(InvoiceToAddressList.length != 1)
        {
            for(var i = 0 ; i<InvoiceToAddressList.length ; i++)
            {
                //console.log('i>>>'+i);
                var InvoicechildComp = cmp.find('InvoicechildComp');
                InvoicechildComp[i].InvoicecallChild();
            }
        }
        else{
            var InvoicechildComp = cmp.find('InvoicechildComp');
            
            try {
                InvoicechildComp.InvoicecallChild();
            }
            catch (e) {
                //alert('error>>'+ e.message);
                
            }
        }
    }
    //------Code to Validate bill to addreess validations starts here--------------------  
    
    cmp.set("v.ShowErrorMesssage", false); 
    cmp.set("v.ErrorMesssage",'');
    cmp.set("v.ShowSectionWiseMesssage",'');
    var billAddressList = cmp.get("v.BillToAddressList");
    var ErrorMesssage;
    var ShowErrorMesssage = false;
    var ShowSectionWiseMesssage;
    //alert('showvalidSection>>'+cmp.get('v.showvalidSection'));
    var checkDefaultBillAddress = false;
    for(var i = 0 ; i<billAddressList.length ; i++)
    {        
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
    
    
    
    //------Code to Validate bill to addreess validations ends here--------------------  
    
    
    //------Code to Validate ship to addreess validations starts here--------------------  
    var shippToAddressList = cmp.get("v.ShippToAddressList");
    var checkDefaultShippAddress = false;
    for(var i = 0 ; i<shippToAddressList.length ; i++)
    {
        
        if(shippToAddressList[i].Is_Default__c)
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
            "message": $A.get("$Label.c.Select_atleast_one_default_shipping_Address")
        });
        toastEvent.fire();
        return;
    }
    //--------- -----Validation for ship to ship TO address Ends  here-------------
    
    //--------- -----Validation for Invoice address and Buyers address starts  here-------------
    var selectedOrderToCompany = cmp.get("v.MainWrapperObject.OrderToCompany");
    // alert('selectedOrderToCompany>>>>'+selectedOrderToCompany);
    if(selectedOrderToCompany=='North China – Suzhou Mainetti Plastic Products Ltd')
    {
        var InvoiceToAddressList = cmp.get("v.InvoiceToAddressList");
        var checkDefaultInvoiceToAddress = false;
        for(var i = 0 ; i<InvoiceToAddressList.length ; i++)
        {
            
            if(InvoiceToAddressList[i].Is_Default__c)
            {
                checkDefaultInvoiceToAddress = true;
            }
            //alert('InvoiceToAddressList[i].Address_1__c is>>>'+InvoiceToAddressList[i].Address_1__c);
            
        }
        
        if(!checkDefaultInvoiceToAddress)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Select_atleast_one_InvoiceTo_Address")
            });
            toastEvent.fire();
            return;
        }
        
        var BuyerToAddressList = cmp.get("v.BuyerToAddressList");
        
        
        var checkDefaultBuyerToAddress = false;
        for(var i = 0 ; i<BuyerToAddressList.length ; i++)
        {
            
            if(BuyerToAddressList[i].Is_Default__c)
            {
                checkDefaultBuyerToAddress = true;
            }
            // alert('BuyerToAddressList[i].Address_1__c is>>>'+BuyerToAddressList[i].Address_1__c);
            
        }
        
        if(!checkDefaultBuyerToAddress)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Select_atleast_one_BuyerTo_Address")
            });
            toastEvent.fire();
            return;
        }
        
    }
    //--------- -----Validation for Invoice address and Buyers address ends  here------------- 
    console.log('showsucess >>>'+cmp.get('v.showvalidSection'));
    if(cmp.get('v.billtovalidationflag') != true && cmp.get('v.shiptovalidationflag') != true && cmp.get('v.invoicetovalidationflag') != true && cmp.get('v.buyertovalidationflag') != true)
    {
        var spinner = cmp.find("spinner");
        $A.util.toggleClass(spinner, "slds-hide");
        helper.SaveCustomerInfo(cmp,event, helper);//Used to store the customerRegistry//Commented on April-30-2019
        
    }
    else
    {
        return;
    }
    
    
},
    
    
    addNewRetailerData :function (component, event, helper)
{
    var IndividualRetailerData = component.get("v.RetailerDataList");
    IndividualRetailerData.push({'RetailerCode':'','ManufacturerFactoryCode':'','SupplierCode':''});
    component.set("v.RetailerDataList",IndividualRetailerData); 
    
},
    
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.showAggrementSection", false);
    },
        
        likenClose: function(cmp, event, helper) {
            // Display alert message on the click on the "Like and Close" button from Model Footer 
            // and set set the "isOpen" attribute to "False for close the model Box.
            //alert('thanks for like Us :)');
            var checkCmp = cmp.find("checkbox");
            //alert('Checkbox value inside likenClose >>>'+checkCmp.get("v.value"));
            if(checkCmp.get("v.value"))
            {
                var spinner = cmp.find("spinner");
                $A.util.toggleClass(spinner, "slds-hide");
                helper.SaveCustomerInfo(cmp,event, helper);//Used to store the customerRegistry//Commented on April-30-2019
                
            }else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Warning"),
                    "type" : "Warning",
                    "message": $A.get("$Label.c.Accept_the_terms_and_conditions_to_proceed_further")
                });
                toastEvent.fire();
                return;
                
            }
            //cmp.set("v.showAggrementSection", false);
            //var spinner = cmp.find("spinner");
            //$A.util.toggleClass(spinner, "slds-hide");
            //helper.SaveCustomerInfo(cmp,event, helper);//Used to store the customerRegistry//Commented on April-30-2019
            
        }, 
            
            onCheck: function(cmp, evt) 
{
    
    //resultCmp = cmp.find("checkResult");
    //resultCmp.set("v.value", ""+checkCmp.get("v.value"));
    
},
    
    
    back : function (cmp, event, helper)
{
    history.back();
},
    
    handleSelect: function (cmp, event, helper) {
        /*var nextConfigs = cmp.get('v.tabs').map(function (config) {
            if (config.id === event.getParam('id')) {
                config.count += 1;
                config.content = 'Number of times "' + config.label + '" selected: ' + config.count;
            }
            return config;
        });
        cmp.set('v.tabs', nextConfigs);*/
        //alert('Tab ID clicked is>>>'+event.getParam('id'));
        cmp.set('v.tabs', event.getParam('id'))
        
    },
        
        
        handleShowModal: function(component, evt, helper) {
            //alert('test');
            var modalBody;
            $A.createComponent("c:modalContent", {},
                               function(content, status) {
                                   if (status === "SUCCESS") {
                                       modalBody = content;
                                       component.find('overlayLib').showCustomModal({
                                           header: "Terms and Conditions",
                                           //body: modalBody, 
                                           body: "Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus.<br/>Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus. Lorem ipsum dolor sit amet, in porro albucius qui, in nec quod novum accumsan, mei ludus tamquam dolores id. No sit debitis meliore postulant, per ex prompta alterum sanctus, pro ne quod dicunt sensibus..", 
                                           showCloseButton: true,
                                           cssClass: "mymodal",
                                           closeCallback: function() {
                                               alert('You closed the alert!');
                                           }
                                       })
                                   }                               
                               });
        },
            
            onCheck: function(cmp, evt) 
{
    //alert('Inside onCheck>>>>'+cmp.get('v.isSelected'));
    
    
    
},
    
    proceed : function (cmp, event, helper)
{
    alert('Inside onCheck>>>>'+cmp.get('v.isSelected'));
    if(cmp.get('v.isSelected'))
    {
        //alert('if');
        //cmp.set("v.showAggrementSection", false);
        cmp.set('v.tabs','two');
        
        
    }else
    {
        //alert('else');
        cmp.find('showError').showHelpMessageIfInvalid();
        return;
    }
    
    
},
    
    
    
    goForTab3 : function (cmp, event, helper)
{
    //alert('Inside goForTab3>>>>'+cmp.get('v.isSelected'));
    alert('Tab ID clicked is>>>'+event.getParam('id'));
    if(cmp.get('v.isSelected'))
    {
        cmp.find("tabs").set("v.selectedTabId",'two');
    }else
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Please_accept_aggreement_checkbox")
        });
        toastEvent.fire();
        return;
        //cmp.find('showError').showHelpMessageIfInvalid();
        return;
        
    }
    
},
    
    goToBasicInfo : function(component, event, helper) {
        //Get the current selected tab value
        
        //alert('currentTab>>'+currentTab);
        //alert('checkbox>>'+component.get('v.isSelected'));
        if(component.get('v.isSelected'))
        {
            component.set("v.showAggrementSection", false);
            component.set("v.showAddressSection", false); 
            component.set("v.showBasicInfoSection", true);
            component.set('v.currentStep','step-2');
            
        }
        else 
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Accept_terms_and_conditions")
            });
            toastEvent.fire();
            return;
        }
        
    },
        
        
        goToAddressSection : function(cmp, event, helper) 
{	
    
    var Title = cmp.get("v.MainWrapperObject.Title");
    if(Title == "")
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Select_your_title")
        });
        toastEvent.fire();
        return;
    }
    var CompanyName = cmp.get("v.MainWrapperObject.CompanyName");
    cmp.set('v.showError',null);
    //alert('CompanyName>>'+CompanyName);
    if(CompanyName == "")
    {
        //alert('Inside Company Name is empty>>>');
        //cmp.find('CompanyNameError').showHelpMessageIfInvalid();
        cmp.set('v.showError','Enter Valid Company Name.');
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_Valid_Company_Name")
        });
        toastEvent.fire();
        return;
        
    }
    
    var RetailerCode = cmp.get("v.MainWrapperObject.RetailerCode");
    //alert('RetailerCode>>>'+RetailerCode);
    
    
    
    
    if(RetailerCode == "")
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Select_Valid_RetailerCode")
        });
        toastEvent.fire();
        return;
        
    }
    
    
    
    var FirstName = cmp.get("v.MainWrapperObject.FirstName");
    if(FirstName == "")
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_Valid_First_Name")
        });
        toastEvent.fire();
        return;
        
    }
    
    var ContactNumber = cmp.get("v.MainWrapperObject.ContactNumber");
    if(!ContactNumber)
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_valid_contact_number")
        });
        toastEvent.fire();
        return;
        
    }
    
    
    if(isNaN(ContactNumber))
    {
        //alert('INside not a number errror true>>');
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_only_numeric_values_for_contact_number")
        });
        toastEvent.fire();
        return;
    }
    
    
    
    
    var OrderToCompany = cmp.get("v.MainWrapperObject.OrderToCompany");
    if(OrderToCompany == "" || OrderToCompany == "--- None ---")
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Select_a_Valid_OrderToCompany")
        });
        toastEvent.fire();
        return;
        
    }
    
    
    var LastName = cmp.get("v.MainWrapperObject.LastName");
    if(LastName == "")
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_Valid_Last_Name")
        });
        toastEvent.fire();
        return;
        
    }
    
    var Fax = cmp.get("v.MainWrapperObject.Fax");
    /*if(!Fax)
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Error",
            "type" : "error",
            "message": "Enter fax number."
        });
        toastEvent.fire();
        return;
        
    }*/
    
    var PreferredCurrency = cmp.get("v.MainWrapperObject.PreferredCurrency");
    //alert('PreferredCurrency>>>'+PreferredCurrency);
    if(PreferredCurrency == "" || PreferredCurrency == "--- None ---")
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Select_a_Valid_PreferredCurrency")
        });
        toastEvent.fire();
        return;
        
    }
    
    var JobTitle = cmp.get("v.MainWrapperObject.JobTitle");
    if(!JobTitle)
    {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_Job_Title")
        });
        toastEvent.fire();
        return;
        
    }
    
    var  EmailFlag = helper.validateEmail(JSON.stringify(cmp.get("v.MainWrapperObject.EmailId")));
    if(!EmailFlag )
    {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_Valid_email_adress")
        });
        toastEvent.fire();
        return;
        
    }
    
    //-------Validation for ManufacturerFactoryCode and  SupplierCode starts from here----------
    var RetailerCodeMap = cmp.get("v.RetailerCodeMap");
    var RetailerCodeVar =  RetailerCodeMap[RetailerCode];
    var checkManufacturerFactoryCode = RetailerCodeVar.Manufactor_Code_Mandatory__c;
    var checkSupplierCode = RetailerCodeVar.Supplier_Code_Mandatory__c;
    
    var ManufacturerFactoryCode = cmp.get("v.MainWrapperObject.ManufacturerFactoryCode");
    if(checkManufacturerFactoryCode)
    {
        if(ManufacturerFactoryCode == "" || ManufacturerFactoryCode.trim()=='')
        {
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_a_Valid_Manufactory_code")
            });
            toastEvent.fire();
            return;
            
        }
        
    }
    
      if(ManufacturerFactoryCode != null && ManufacturerFactoryCode.length > 255){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                type: "error",
                message: $A.get("$Label.c.Manufacturer_Factory_Location_POF_Code_should_be_less_than_or_equal_to_255_chara")
            });
            toastEvent.fire();
            return;
        }
    
    var SupplierCode = cmp.get("v.MainWrapperObject.SupplierCode");
    if (checkSupplierCode) {
      if (SupplierCode == "" || SupplierCode.trim() == "") {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: $A.get("$Label.c.Error"),
          type: "error",
          message: $A.get("$Label.c.Enter_a_Valid_Supplier_Vendor_Code")
        });
        toastEvent.fire();
        return;
      }
        
    }
      if(SupplierCode != null && SupplierCode.length > 255){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                type: "error",
                message: $A.get("$Label.c.Supplier_Vendor_Code_should_be_less_than_or_equal_to_255_characters")
            });
            toastEvent.fire();
            return;
        }
    
       if(EmailFlag){
         // alert(EmailFlag);
          var checkEmailaction = cmp.get("c.checkCustomRegisterEmailExists");
          checkEmailaction.setParams({CREmail: cmp.get("v.MainWrapperObject.EmailId")});
          checkEmailaction.setCallback(this,function(response){
              var status = response.getState();
              if(status == 'SUCCESS'){
                  var result = response.getReturnValue();
                  if(result){
                      var toastEvent = $A.get("e.force:showToast");
                      toastEvent.setParams({
                          "title": $A.get("$Label.c.Error"),
                          "type" : "error",
                          "message": $A.get("$Label.c.This_Email_id_has_been_used_you_should_use_different_email_id_to_register")
                      });
                      toastEvent.fire();
                      return;
                      var spinner = cmp.find("spinner");
                      $A.util.toggleClass(spinner, "slds-hide");
                  }
                  else{
                      cmp.set("v.showAddressSection", true);
                      cmp.set("v.currentStep", "step-3");
                      var spinner = cmp.find("spinner");
                      $A.util.toggleClass(spinner, "slds-hide");
                      cmp.set("v.showAggrementSection", false);
                      cmp.set("v.showBasicInfoSection", false);
                      
                      var BillToAddressList = cmp.get("v.BillToAddressList");
                      //alert('Before BillToAddressList>>>>'+BillToAddressList.length);
                      if (BillToAddressList.length == 0) {
                          BillToAddressList.push({ sobjectType: "Ship_Bill_Address__c" });
                          cmp.set("v.BillToAddressList", BillToAddressList);
                          cmp.set("v.BillToAddressList[0].Is_Default__c", true);
                      } else {
                          cmp.set("v.BillToAddressList", BillToAddressList);
                      }
                      
                      var ShippToAddressList = cmp.get("v.ShippToAddressList");
                      //alert('Before ShippToAddressList>>>>'+ShippToAddressList.length);
                      if (ShippToAddressList.length == 0) {
                          ShippToAddressList.push({ sobjectType: "Ship_Bill_Address__c" });
                          cmp.set("v.ShippToAddressList", ShippToAddressList);
                          cmp.set("v.ShippToAddressList[0].Is_Default__c", true);
                      } else {
                          cmp.set("v.ShippToAddressList", ShippToAddressList);
                      }
                      
                      var selectedOrderToCompany = cmp.get("v.MainWrapperObject.OrderToCompany");
                      if (
                          selectedOrderToCompany ==
                          "North China – Suzhou Mainetti Plastic Products Ltd"
                      ) {
                          var InvoiceToAddressList = cmp.get("v.InvoiceToAddressList");
                          if (InvoiceToAddressList.length == 0) {
                              InvoiceToAddressList.push({ sobjectType: "Ship_Bill_Address__c" });
                              cmp.set("v.InvoiceToAddressList", InvoiceToAddressList);
                              cmp.set("v.InvoiceToAddressList[0].Is_Default__c", true);
                          } else {
                              cmp.set("v.InvoiceToAddressList", InvoiceToAddressList);
                          }
                          
                          var BuyerToAddressList = cmp.get("v.BuyerToAddressList");
                          if (BuyerToAddressList.length == 0) {
                              BuyerToAddressList.push({ sobjectType: "Ship_Bill_Address__c" });
                              cmp.set("v.BuyerToAddressList", BuyerToAddressList);
                              cmp.set("v.BuyerToAddressList[0].Is_Default__c", true);
                          } else {
                              cmp.set("v.BuyerToAddressList", BuyerToAddressList);
                          }
                      }
                      
                      
                      var spinner = cmp.find("spinner");
                      $A.util.toggleClass(spinner, "slds-hide");
                  }
              }
          });
      }
$A.enqueueAction(checkEmailaction);
    
    //-----Validation for ManufacturerFactoryCode and  SupplierCode till here---------------
    
    
    
    
    /*var ExistingCustomerCode = cmp.get("v.MainWrapperObject.ExistingCustomerCode");
        if(ExistingCustomerCode == "")
        {
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Error",
                "type" : "error",
                "message": "Select a Valid Existing CustomerCode."
            });
            toastEvent.fire();
            return;
            
        }*/
    
    
    //alert('after BillToAddressList>>>>'+BillToAddressList.length);
    //alert('after pushing BillToAddressList');        
    
    
},
    
    backToAggrementSection: function(component, event, helper) 
{
    component.set("v.showAddressSection", false); 
    component.set("v.showAggrementSection", true);
    component.set("v.showBasicInfoSection", false); 
    
},
    
    goToBasicInfoSection: function(component, event, helper) 
{
    component.set("v.showAddressSection", false); 
    component.set("v.showAggrementSection", false);
    component.set("v.showBasicInfoSection", true); 
    
},
    
    closeErrorMessage : function(component, event, helper) 
{
    component.set("v.ShowErrorMesssage", false); 
    component.set("v.ErrorMesssage",'');
    
    
},   
    
    checkMobileNumber : function(component, event, helper)
{
    //alert('Inside checkMobileNumber>>>');
    var MobileNumber = component.get("v.MainWrapperObject.ContactNumber");
    if(isNaN(MobileNumber))
    {
        //alert('INside not a number errror true>>');
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.Error"),
            "type" : "error",
            "message": $A.get("$Label.c.Enter_only_numeric_values_for_contact_number")
        });
        toastEvent.fire();
        return;
    }
    
    
},
    
    
})