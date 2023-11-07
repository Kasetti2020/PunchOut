({

    displayTooltip : function(cmp, event, helper) {
        //alert('test');
        var helpText = cmp.find('helpText');
        $A.util.removeClass(helpText, 'slds-hide');
        
    },
    hideTooltip : function(cmp, event, helper) {
        var helpText = cmp.find('helpText');
        $A.util.addClass(helpText, 'slds-hide');
    },
    handleClick : function(cmp, event, helper) {
        //alert('Inside alert????');
        var menuValue = event.detail.menuItem.get("v.value");
        //var source = event.getSource();
        //var label = source.get("v.label");
        var label = '23';
        //alert('label>>>'+label);
        //console.log('label'+label);
       /*if(label =='My Profile')
        {
            //alert('After Setting showProfileSection>>>'+label);
            //alert('Inside My Profile>>>');
            cmp.set('v.showProfileSection', true);
            //helper.GetInitDetails(cmp,event, helper);
            helper.GetInitDetails1(cmp,event, helper);

            //cmp.set('v.CustomerInfoTemp', cmp.get('v.CustomerInfo'));
            //alert('Temp Title>>>'+cmp.get('v.CustomerInfoTemp.Title__c'));
            //alert('Real Title>>>'+cmp.get('v.CustomerInfoTemp.Title__c'));

        }*/
        if(menuValue =='1')
        {
            //alert('After Setting showProfileSection>>>'+label);
            //alert('Inside My Profile>>>');
            cmp.set('v.showProfileSection', true);
            //helper.GetInitDetails(cmp,event, helper);
            helper.GetInitDetails1(cmp,event, helper);

            //cmp.set('v.CustomerInfoTemp', cmp.get('v.CustomerInfo'));
            //alert('Temp Title>>>'+cmp.get('v.CustomerInfoTemp.Title__c'));
            //alert('Real Title>>>'+cmp.get('v.CustomerInfoTemp.Title__c'));
        }
        if(menuValue =='2')
        {
            //cmp.set('v.loadSpinner', true);
            cmp.set('v.showAddressSection', true);
            cmp.set("v.ShowErrorMesssage", false);
            cmp.set("v.ErrorMesssage",'');

            helper.GetAddressDetails(cmp,event, helper);

        }
        if(menuValue =='3')
        {
            //alert('Inside Edit Retailer Data');
            //alert('After Setting showProfileSection>>>'+label);
            cmp.set('v.showRetailerDataSection', true);
            //alert('1 After assigning showRetailerDataSection ');
            cmp.set('v.ShowErrorMesssage', false);
            //alert('2 After ShowErrorMesssage');
            var Old_RetailerDataList = [];
            cmp.set('v.RetailerDataListToDelete',Old_RetailerDataList);
            //alert('3 After assigning Old_RetailerDataList');
            //alert('4 Before calling helper fetchRetalerData function ');

            var spinner = cmp.find("mySpinner");
            $A.util.toggleClass(spinner, "slds-hide");

            helper.fetchRetalerData(cmp,event, helper);

        }
        if(menuValue =='4')
        {
            //alert('Inside Change Password>>');
            cmp.set('v.showPasswordSection', true);

            var passwordPolicy=$A.get("$Label.c.X1_At_least_6_characters")
            +"\n" + $A.get("$Label.c.X2_Combination_of_upper_and_lower_case_characters")
            +"\n"+ $A.get("$Label.c.X3_One_or_more_digits")
            +"\n" + $A.get("$Label.c.X4_Do_not_use_5_previously_used_password");

            cmp.set('v.passwordPolicy', passwordPolicy);
            //cmp.set('v.password',null);

            //-----Code commentedto work on -------
            /*window.setTimeout(
            $A.getCallback(function() {
               cmp.set("v.password",'');


            }),1000
            )

            //Password strength styles
            let passwordStrengthStyle = {
                0: 'slds-theme--error',
                1: 'slds-theme--error',
                2: 'slds-theme--warning',
                3: 'slds-theme--info',
                4: 'slds-theme--alt-inverse',
                5: 'slds-theme--success'
            };

              var psBadge = cmp.find('psBadge');
            //for(let strengthStyle in passwordStrengthStyle) {
                 alert('Before passwordStrength set to null');
                $A.util.removeClass(psBadge,'slds-badge slds-theme--success');

                cmp.set("v.passwordStrength",'Very Weak');
                alert('after passwordStrength set to null');
            //}

            $A.util.addClass(psBadge,'slds-theme--error');
             alert('after addClass set to null');*/

            //-----Code commentedto work on till here-------


        }

        if(menuValue =='5')
        {
            //alert('Inside Logout>>>>');
            var urlString = window.location.href;
            var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
            //alert('Inside CommunityBaseURL>>>>'+CommunityBaseURL);
            window.location.replace(CommunityBaseURL+"/secur/logout.jsp?retUrl="+CommunityBaseURL+"/s/login");

        }
        
      
        if(menuValue =='6')
        {
                cmp.set('v.showLanguageSection', true);

                /* var userLang = navigator.language || navigator.userLanguage; 
                cmp.set('v.availableLanguage', userLang);

                const languageNames = new Intl.DisplayNames(['en'], {
                type: 'language'
                });
                */

                var action = cmp.get("c.getLanguageData");
                action.setCallback(this,function(response){   
                var state = response.getState();  
                if(state === "SUCCESS"){ 
                    var records = response.getReturnValue();
                    //alert('records>>'+records);
                    cmp.set("v.availableLanguage", records); 

                }
                else if(state === 'ERROR'){
                    alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
                }
            });
            $A.enqueueAction(action);
        }    

    },
    
    
    changeLanguage: function(component, event, helper) {
        var selectedLang = component.get('v.selectedLanguage');
        //alert('test1>>'+test1);
            
    },
    
    
     CloseLanguageData : function(component, event, helper) 
    {
        component.set('v.showLanguageSection', false); 
    },
    
    
    UpdateLanguageData : function(component, event, helper) 
    {
        var selectedLang = component.get('v.selectedLanguage');
        //alert('selectedLang>>'+selectedLang);

        var action = component.get("c.changeLanguageData");
        action.setParams({
            lang: selectedLang
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var changedOK = response.getReturnValue();
                if (changedOK == 'OK')
                    location.reload();
                else {
                    alert('error, changed not OK: ' + changedOK);
                }
            }
            else {
                alert('error in state: ' + state);
            }
        });
        $A.enqueueAction(action);
        component.set('v.showLanguageSection', false);
    },
    
    
    
    
    isRefreshed: function(component, event, helper) {
        //alert('Inside isRefreshed');
        location.reload();
        // alert('Inside isRefreshed reload');
    },
    
    CloseModal : function(component, event, helper) 
    {
        component.set('v.showProfileSection', false); 
        component.set('v.showAddressSection', false); 
        component.set('v.showRetailerDataSection', false); 
        component.set('v.showPasswordSection', false); 
        component.set("v.listPreferredCurrencyDependingValues",component.get('v.TemplistPreferredCurrencyDependingValues'));
    },
    closeErrorMessage : function(component, event, helper) 
    {
        component.set("v.ShowErrorMesssage", false); 
        component.set("v.ErrorMesssage",'');  
    },
    addNewRetailerData :function (component, event, helper)
    {       
        var RetailerDataList = component.get("v.RetailerDataList");
        component.set("v.RetailerDataListBackup",component.get("v.RetailerDataList"));
        component.set("v.OrdertoMainettiCompany",RetailerDataList[RetailerDataList.length-1].ContactID__r.Order_to_Company__c);
        RetailerDataList.splice(0, 0, {'sObjectType':'Retailer_Related_Data__c','Customer_Information__c':component.get('v.RetailerDataList')[RetailerDataList.length-1].Customer_Information__c,'ContactID__c':component.get('v.RetailerDataList')[RetailerDataList.length-1].ContactID__c,'Customer_Email__c':component.get('v.RetailerDataList')[RetailerDataList.length-1].ContactID__r.Email});
        component.set("v.RetailerDataList",RetailerDataList);
        component.set("v.addednewRetailer",true);
    },
    UpdateRetailerData:function (component, event, helper)
    {
        var RetailerDataList = component.get("v.RetailerDataList");
        console.log(`Before Update Finishes>>> ${JSON.stringify(RetailerDataList)}`);
        var RetailerCodeMap = component.get("v.RetailerCodeMap");
    	//console.log(`Retailer Code Map>>> ${JSON.stringify(RetailerCodeMap)}`);
        var ErrorMesssage;
        var ShowErrorMesssage = false;
        var ShowSectionWiseMesssage;
        if(RetailerDataList.length == 0)
        {
            ShowErrorMesssage = true;
            ErrorMesssage = $A.get("$Label.c.Add_atleast_one_retailer_to_update");
            component.set("v.ErrorMesssage",ErrorMesssage);
            component.set("v.ShowErrorMesssage",true);
            component.set("v.ShowSectionWiseMesssage",'Retailer Data');
            return;
            
        }
        for(var i = 0 ; i<RetailerDataList.length ; i++)
        {
            //alert('RetailerDataList[i].Id>>>>'+RetailerDataList[i].Id);
            if(RetailerDataList[i].Id != undefined)
            {
                //alert('Before making RetailerDataList[i].Send_Email_to_Customer__c is making false>>>>'+RetailerDataList[i].Send_Email_to_Customer__c);
                RetailerDataList[i].Send_Email_to_Customer__c = false;
                //alert('After MakinRetailerDataList[i].Send_Email_to_Customer__c is making false>>>>'+RetailerDataList[i].Send_Email_to_Customer__c);
            }
            if(!RetailerDataList[i].Retailer_Code__c)
            {
                //alert('Inside Billto address Street is empty');
                ShowErrorMesssage = true;
                ErrorMesssage = $A.get("$Label.c.Select_Retailer_code_at")+(i+1) + $A.get("$Label.c.row");
                component.set("v.ErrorMesssage",ErrorMesssage);
                component.set("v.ShowErrorMesssage",true);
                component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                return;
            }
            //-----New Validation for Supplier_Code_Mandatory__c and Manufactor_Code_Mandatory__c starts from here ------
            var RetailerCodeValidationMap = component.get("v.RetailerCodeValidationMap");
            var RetailerCodeVar =  RetailerCodeValidationMap[RetailerDataList[i].Retailer_Code__c];
            var checkManufacturerFactoryCode = RetailerCodeVar.Manufactor_Code_Mandatory__c;
            var checkSupplierCode = RetailerCodeVar.Supplier_Code_Mandatory__c;			
            if(checkSupplierCode)
            {
                // alert('Inside checkSupplierCode>>>'+checkSupplierCode);
                if(!RetailerDataList[i].Supplier_Code__c || RetailerDataList[i].Supplier_Code__c.trim() =='')
                {
                    //alert('Inside Billto address Street is empty');
                    ShowErrorMesssage = true;
                    ErrorMesssage = $A.get("$Label.c.Enter_Supplier_code_at") +(i+1) + $A.get("$Label.c.row");
                    component.set("v.ErrorMesssage",ErrorMesssage);
                    component.set("v.ShowErrorMesssage",true);
                    component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                    return;
                }
                
                
            }
              //add validation for supplier code should not be more than 255 char
                if(RetailerDataList[i].Supplier_Code__c !=null && RetailerDataList[i].Supplier_Code__c.trim() !='' && RetailerDataList[i].Supplier_Code__c.length >255)
                {
                    //alert('Inside Billto address Street is empty');
                    ShowErrorMesssage = true;
                    ErrorMesssage = $A.get("$Label.c.Supplier_Vendor_Code_should_be_less_than_or_equal_to_255_characters_at") +(i+1) +$A.get("$Label.c.row");
                    component.set("v.ErrorMesssage",ErrorMesssage);
                    component.set("v.ShowErrorMesssage",true);
                    component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                    return;
                }
            
            if(checkManufacturerFactoryCode)
            {
                if(!RetailerDataList[i].Manufacturer_Factory_Code__c || RetailerDataList[i].Manufacturer_Factory_Code__c.trim() =='')
                {
                    //alert('Inside Billto address Street is empty');
                    ShowErrorMesssage = true;
                    ErrorMesssage = $A.get("$Label.c.Enter_Manufacture_code_at") +(i+1) + $A.get("$Label.c.row");
                    component.set("v.ErrorMesssage",ErrorMesssage);
                    component.set("v.ShowErrorMesssage",true);
                    component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                    return;
                }
               
            }
            //add validation for manufacturere Factory code should not be more than 255 char
                if(RetailerDataList[i].Manufacturer_Factory_Code__c !=null && RetailerDataList[i].Manufacturer_Factory_Code__c.trim() !='' && RetailerDataList[i].Manufacturer_Factory_Code__c.length >255)
                {
                    //alert('Inside Billto address Street is empty');
                    ShowErrorMesssage = true;
                    ErrorMesssage = $A.get("$Label.c.Manufacturer_Factory_POF_Code_should_be_less_than_or_equal_to_255_characters_at") +(i+1) +$A.get("$Label.c.row");
                    component.set("v.ErrorMesssage",ErrorMesssage);
                    component.set("v.ShowErrorMesssage",true);
                    component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                    return;
                }
            if(RetailerDataList[i].Order_to_Company__c == "" || RetailerDataList[i].Order_to_Company__c == "--- None ---")
            {
                ShowErrorMesssage = true;
                ErrorMesssage = $A.get("$Label.c.Select_a_valid_Order_To_Company_code_at") +(i+1) + $A.get("$Label.c.row");
                component.set("v.ErrorMesssage",ErrorMesssage);
                component.set("v.ShowErrorMesssage",true);
                component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                return;
            }			
            
            
            if(RetailerDataList[i].Preferred_Currency__c == "" || RetailerDataList[i].Preferred_Currency__c == "--- None ---")
            {
                ShowErrorMesssage = true;
                ErrorMesssage = $A.get("$Label.c.Select_a_valid_Preferred_Currency_at") +(i+1) + $A.get("$Label.c.row");
                component.set("v.ErrorMesssage",ErrorMesssage);
                component.set("v.ShowErrorMesssage",true);
                component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                return;
            }	
            
            //-----New Validation for Supplier_Code_Mandatory__c and Manufactor_Code_Mandatory__c starts from here ------
            
            //--Validation for Duplicate Suplpier code for same Retialer code starts here
            var ExistingRetailerDataList = RetailerCodeMap[RetailerDataList[i].Retailer_Code__c];
            
            if(ExistingRetailerDataList)
            {
                for(var j = 0 ; j<ExistingRetailerDataList.length ; j++)
                {
                    //console.log("ExistingRetailerDataList["+j+"]>>>>"+JSON.stringify(ExistingRetailerDataList[j]));
                    //console.log("RetailerDataList["+i+"]>>>>"+JSON.stringify(RetailerDataList[i]));
                    
                    if(ExistingRetailerDataList[j].Supplier_Code__c == RetailerDataList[i].Supplier_Code__c)
                    {
                        
                        //alert('Inside second if');
                        
                        ShowErrorMesssage = true;
                        ErrorMesssage = $A.get("$Label.c.Supplier_code_is_already_in_use_for_this_retailer_code") +ExistingRetailerDataList[j].Retailer_Code__r.Name + $A.get("$Label.c.row") +(i+1);
                        component.set("v.ErrorMesssage",ErrorMesssage);
                        //component.set("v.ShowErrorMesssage",true);//---Commented to remove validation
                        component.set("v.ShowSectionWiseMesssage",'Retailer Data');
                        //return;//---Commented to remove validation
                        
                    }
                    
                }
            }
            //--Validation for Duplicate Suplpier code for same Retialer code ends here
            //Validation for same values for same retailer
            console.log(`Length of Retailer Data List>>>${RetailerDataList.length}`);
            for(let i=0; i<RetailerDataList.length;i++){
                for(let j=1;j<RetailerDataList.length;j++){
                    console.log(`Retailer of i=${i}>>${RetailerDataList[i].Supplier_Code__c} and Retailer of j=${j}>>${RetailerDataList[j].Supplier_Code__c}`);
                    if(i!=j){
                        if(RetailerDataList[i].Supplier_Code__c == RetailerDataList[j].Supplier_Code__c && RetailerDataList[i].Order_to_Company__c == RetailerDataList[j].Order_to_Company__c && RetailerDataList[i].Retailer_Code_Name__c == RetailerDataList[j].Retailer_Code_Name__c && RetailerDataList[i].Preferred_Currency__c == RetailerDataList[j].Preferred_Currency__c && RetailerDataList[i].Manufacturer_Factory_Code__c == RetailerDataList[j].Manufacturer_Factory_Code__c ){
                        	var toastEvent = $A.get("e.force:showToast");
                    		toastEvent.setParams({
                        		title: "Warning",
                                message: `Retailer with same data already exist at row ${j}.`,
                        		type: "warning"
                    		});
                    		toastEvent.fire();
                        	return;
                    	}
                    }
                }
            }
        }
        
        var spinner = component.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
        
        helper.UpdateRetailerData(component,event, helper)//Commneted on Feb 24 2020
    },
    
    DeleteRetailerData :function (component, event, helper)
    {
        var flag = event.getParam('flag');
        var rowIndex = event.getParam('rowIndex');
        var RetailerDataList = component.get("v.RetailerDataList");
        if(flag=='DeleteIndividualRetailer')
        {
            var flag = event.getParam('flag');
            var rowIndex = event.getParam('rowIndex');
            //var RecordID = event.getParam('RecordID');
            //alert('rowIndex>>>'+rowIndex);
            var RetailerDataList = component.get("v.RetailerDataList");
            if(flag=='DeleteIndividualRetailer')
            {
                //alert('Rowto Remove>>>>'+RetailerDataList[rowIndex]);
                var CurrentRowToDelete = RetailerDataList[rowIndex];
                if(CurrentRowToDelete.Id != null)
                {
                    var result = confirm($A.get("$Label.c.Are_you_really_Want_to_delete_this_Retailer_from_database"));
                    if (result)
                    {
                        var RetailerDataListToDelete = component.get('v.RetailerDataListToDelete');
                        if(RetailerDataListToDelete)
                        {
                            
                            //alert('Inside if'+RetailerDataList[rowIndex].Bill_Ship_Status__c); 
                            RetailerDataList[rowIndex].Status__c = 'Inactive';
                            RetailerDataListToDelete.push(RetailerDataList[rowIndex]);
                            component.set('v.RetailerDataListToDelete',RetailerDataListToDelete);                        
                        }
                        else
                        {
                            var Old_RetailerDataList = [];
                            RetailerDataList[rowIndex].Status__c = 'Inactive';
                            Old_RetailerDataList.push(RetailerDataList[rowIndex]);
                            component.set('v.RetailerDataListToDelete',Old_RetailerDataList);
                            
                        }
                        RetailerDataList.splice(rowIndex, 1);
                        component.set('v.RetailerDataList',RetailerDataList);
                    }else
                    {
                        //alert('Inside delete false>>>');
                    }
                    
                }else
                {
                    RetailerDataList.splice(rowIndex, 1);
                    component.set('v.RetailerDataList',RetailerDataList);
                    
                }
            }   
        }  
    },
    doInit : function(cmp, event, helper)
    {
        helper.GetCustInfoDetails(cmp,event, helper);
        cmp.set("v.ShowErrorMesssage",false);
        cmp.set("v.ErrorMesssage",'');
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );

        helper.getDefaultLanguage(cmp,event, helper);

    },
    
    UpdateCustomerInfo : function(cmp, event, helper) 
    {
        
        cmp.set('v.CustomerInfo',cmp.get('v.CustomerInfoTemp'));  
        
        
        //alert('Inside UpdateCustomerInfo>>>'+JSON.stringify(cmp.get('v.CustomerInfo')));
        var objDetails = cmp.get("v.CustomerInfo");
        
        var Title = objDetails.Title__c;
        if(!Title)
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
        var CompanyName = objDetails.Name;
        //cmp.set('v.showError',null);
        //alert('CompanyName>>'+CompanyName);
        if(!CompanyName)
        {
            //alert('Inside Company Name is empty>>>');
            //cmp.find('CompanyNameError').showHelpMessageIfInvalid();
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_Valid_Company_Name")
            });
            toastEvent.fire();
            return;
            
        }
        
        
        
        //alert('objDetails>>>'+objDetails.Email__c);
        if(!objDetails.First_Name__c)
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
        
        if(!objDetails.Phone__c)
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
        
        if(isNaN(objDetails.Phone__c))
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
        
        var OrderToCompany = cmp.get("v.GetInitDetailsWrapper.DefaultOrderToCompany");
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
        
        if(!objDetails.Last_Name__c)
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
        
        var PreferredCurrency = cmp.get("v.GetInitDetailsWrapper.DefaultPreferredCurrency");
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
        
        if(!objDetails.Position__c)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_your_valid_position")
            });
            toastEvent.fire();
            return;
            
        }
        
        if(!objDetails.Email__c)
        {
            //alert('Inside Email is empty true');
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_Valid_email_adress")
            });
            toastEvent.fire();
            return;
        }
        var  EmailFlag = helper.validateEmail(objDetails.Email__c);
        //alert('EmailFlag>>>'+EmailFlag);
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
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
        helper.UpdateCustomerInfoDetails(cmp,event, helper);
    },
    
    addNewBillAddress : function(component, event, helper)
    {     
        var billtoAddress = component.get("v.AddressWrapperObject.BillToAddressList");
        //alert('billtoAddress>>'+billtoAddress.length);
        if(billtoAddress.length == 0)
        {
            billtoAddress.push({'sobjectType':'Ship_Bill_Address__c'});
        }
        else
        {
            billtoAddress.push({'sobjectType':'Ship_Bill_Address__c'});
        }
        component.set("v.AddressWrapperObject.BillToAddressList",billtoAddress); 
        
    } ,
    
    
    addNewShippAddress : function(component, event, helper)
    {     
        var ShippToAddress = component.get("v.AddressWrapperObject.ShippToAddressList");
        if(ShippToAddress.length == 0)
        {
            ShippToAddress.push({'sobjectType':'Ship_Bill_Address__c','Is_Default__c':true});
        }
        else
        {
            ShippToAddress.push({'sobjectType':'Ship_Bill_Address__c'});
        }
        component.set("v.AddressWrapperObject.ShippToAddressList",ShippToAddress); 
    } ,
    
    addNewInvoiceToddress : function(component, event, helper)
    {     
        var InvoiceToAddress = component.get("v.AddressWrapperObject.InvoiceToAddressList");
        if(InvoiceToAddress.length == 0)
        {
            InvoiceToAddress.push({'sobjectType':'Ship_Bill_Address__c','Is_Default__c':true});
        }
        else
        {
            InvoiceToAddress.push({'sobjectType':'Ship_Bill_Address__c'});
        }
        component.set("v.AddressWrapperObject.InvoiceToAddressList",InvoiceToAddress); 
    } ,
    
    addNewBuyerToAddress : function(component, event, helper)
    {     
        var BuyerToAddress = component.get("v.AddressWrapperObject.BuyerToAddressList");
        if(BuyerToAddress.length == 0)
        {
            BuyerToAddress.push({'sobjectType':'Ship_Bill_Address__c','Is_Default__c':true});
        }
        else
        {
            BuyerToAddress.push({'sobjectType':'Ship_Bill_Address__c'});
        }
        component.set("v.AddressWrapperObject.BuyerToAddressList",BuyerToAddress); 
    } ,
    
    getData : function (component,event, helper) {
        
        var flag = event.getParam('flag');
        var rowIndex = event.getParam('rowIndex');
        //alert('rowIndex>>>'+rowIndex);
        //alert('flag>>>'+flag);
        //----Code to check the CheckDeafultBillAdress starts from here------------
        if(flag=='CheckDeafultBillAdress')
        {
            var BillToAddressList = component.get('v.AddressWrapperObject.BillToAddressList');
            for(var i = 0 ; i<BillToAddressList.length ; i++)
            {
                if(BillToAddressList[i].Is_Default__c && i!=rowIndex)
                {
                    BillToAddressList[i].Is_Default__c = false;
                }
            }
            
            component.set('v.AddressWrapperObject.BillToAddressList',BillToAddressList);
            
            //---Extra code to disselect default BillToLocked address if any
            var ShowBillToLockedComp = component.get('v.ShowBillToLockedComp');
            if(ShowBillToLockedComp)
            {
                var BillToLockedAddressList = component.get('v.AddressWrapperObject.BillToLockedAddressList');
                for(var i = 0 ; i<BillToLockedAddressList.length ; i++)
                {
                    if(BillToLockedAddressList[i].Is_Default__c)
                    {
                        BillToLockedAddressList[i].Is_Default__c = false;
                    }
                }
                
                component.set('v.AddressWrapperObject.BillToLockedAddressList',BillToLockedAddressList);
            }
            
        }
        
        //----Code to check the CheckDeafultBillAdress starts from here------------
        
        
        //----Code to check the CheckDeafultBillToLockedAddressList starts from here------------
        if(flag=='CheckDeafultBillToLockedAdress')
        {
            var BillToLockedAddressList = component.get('v.AddressWrapperObject.BillToLockedAddressList');
            for(var i = 0 ; i<BillToLockedAddressList.length ; i++)
            {
                if(BillToLockedAddressList[i].Is_Default__c && i!=rowIndex)
                {
                    BillToLockedAddressList[i].Is_Default__c = false;
                }
            }
            
            component.set('v.AddressWrapperObject.BillToLockedAddressList',BillToLockedAddressList);
            
            //---Extra code to disselect default BillToLocked address if any
            var BillToAddressList = component.get('v.AddressWrapperObject.BillToAddressList');
            //alert('BillToAddressList.length>>>'+BillToAddressList.length);
            if(BillToAddressList.length > 0)
            {
                var BillToAddressList = component.get('v.AddressWrapperObject.BillToAddressList');
                for(var i = 0 ; i<BillToAddressList.length ; i++)
                {
                    if(BillToAddressList[i].Is_Default__c)
                    {
                        BillToAddressList[i].Is_Default__c = false;
                    }
                }
                
                component.set('v.AddressWrapperObject.BillToAddressList',BillToAddressList);
            }
            
        }
        
        //----Code to check the CheckDeafultBillToLockedAddressList ends here------------
        
        
        if(flag=='CheckDeafultShipAdress')
        {
            var ShippToAddressList = component.get('v.AddressWrapperObject.ShippToAddressList');
            for(var i = 0 ; i<ShippToAddressList.length ; i++)
            {
                if(ShippToAddressList[i].Is_Default__c && i!=rowIndex)
                {
                    ShippToAddressList[i].Is_Default__c = false;
                }
            }
            component.set('v.AddressWrapperObject.ShippToAddressList',ShippToAddressList);
        }
        if(flag=='CheckDeafultInvoiceToAdress')
        {
            var InvoiceToAddressList = component.get('v.AddressWrapperObject.InvoiceToAddressList');
            for(var i = 0 ; i<InvoiceToAddressList.length ; i++)
            {
                if(InvoiceToAddressList[i].Is_Default__c && i!=rowIndex)
                {
                    InvoiceToAddressList[i].Is_Default__c = false;
                }
            }
            component.set('v.AddressWrapperObject.InvoiceToAddressList',InvoiceToAddressList);
        }
        if(flag=='CheckDeafultBuyerToAdress')
        {
            var BuyerToAddressList = component.get('v.AddressWrapperObject.BuyerToAddressList');
            for(var i = 0 ; i<BuyerToAddressList.length ; i++)
            {
                if(BuyerToAddressList[i].Is_Default__c && i!=rowIndex)
                {
                    BuyerToAddressList[i].Is_Default__c = false;
                }
            }
            component.set('v.AddressWrapperObject.BuyerToAddressList',BuyerToAddressList);
        }
        if(flag=='DeleteBillAdress')
        {
            var BillToAddressList = component.get('v.AddressWrapperObject.BillToAddressList');
            //alert('Rowto Remove>>>>'+BillToAddressList[rowIndex]);
            var CurrentAddressToDelete = BillToAddressList[rowIndex];
            
            
            //alert('OldBillToAddressList>>>'+JSON.stringify(OldBillToAddressList));
            //alert('OldBillToAddressList.Id>>>'+OldBillToAddressList.Id);
            //alert('OldBillToAddressList.Bill_Ship_Status__c>>>'+OldBillToAddressList.Bill_Ship_Status__c);
            //alert('typeof OldBillToAddressList.Bill_Ship_Status__c>>>'+typeof OldBillToAddressList);
            if(CurrentAddressToDelete.Id != null)
            {
                
                /*var Old_BillToAddressList = component.get('v.AddressWrapperObject.Old_BillToAddressList');
                Old_BillToAddressList.push(OldBillToAddressList);
				component.set('v.AddressWrapperObject.Old_BillToAddressList',Old_BillToAddressList); 
                alert('Inside remove Details>>>'+JSON.stringify(component.get('v.AddressWrapperObject.Old_BillToAddressList')));*/
                var result = confirm($A.get("$Label.c.Are_you_really_Want_to_delete_this_address_from_database"));
                if (result)
                {
                    var AddressWrapperObject = component.get('v.AddressWrapperObject');
                    if(AddressWrapperObject.Old_BillToAddressList)
                    {
                        
                        //alert('Inside if'+BillToAddressList[rowIndex].Bill_Ship_Status__c); 
                        BillToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        AddressWrapperObject.Old_BillToAddressList.push(BillToAddressList[rowIndex]);
                        component.set('v.AddressWrapperObject',AddressWrapperObject);                        
                    }
                    else
                    {
                        //alert('Inside else'); 
                        var Old_BillToAddressList = [];
                        //alert('Inside else'+BillToAddressList[rowIndex].Bill_Ship_Status__c); 
                        BillToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        Old_BillToAddressList.push(BillToAddressList[rowIndex]);
                        AddressWrapperObject.Old_BillToAddressList = Old_BillToAddressList;
                        component.set('v.AddressWrapperObject',AddressWrapperObject);
                        
                    }
                    
                    //alert('AddressWrapperObject.Old_BillToAddressList>>'+JSON.stringify(AddressWrapperObject.Old_BillToAddressList));
                    //alert('AddressWrapperObject.Old_BillToAddressList.length>>'+AddressWrapperObject.Old_BillToAddressList.length);
                    BillToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.BillToAddressList',BillToAddressList);
                }else
                {
                    //alert('Inside delete false>>>');
                }
                
                //alert('deleteAddressResult in COntroller>>'+deleteAddressResult);
                
            }else
            {
                BillToAddressList.splice(rowIndex, 1);
                component.set('v.AddressWrapperObject.BillToAddressList',BillToAddressList);
                
            }
            
            
        }
        if(flag=='DeleteShipAdress')
        { 
            var ShippToAddressList = component.get('v.AddressWrapperObject.ShippToAddressList');
            var CurrentAddressToDelete = ShippToAddressList[rowIndex];
            if(CurrentAddressToDelete.Id != null)
            {
                
                var result = confirm($A.get("$Label.c.Are_you_really_Want_to_delete_this_address_from_database"));
                if (result)
                {
                    var AddressWrapperObject = component.get('v.AddressWrapperObject');
                    if(AddressWrapperObject.Old_ShippToAddressList)
                    {
                        
                        ShippToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        AddressWrapperObject.Old_ShippToAddressList.push(ShippToAddressList[rowIndex]);
                        component.set('v.AddressWrapperObject',AddressWrapperObject);                        
                    }
                    else
                    {
                        
                        var Old_ShippToAddressList = [];
                        ShippToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        Old_ShippToAddressList.push(ShippToAddressList[rowIndex]);
                        AddressWrapperObject.Old_ShippToAddressList = Old_ShippToAddressList;
                        component.set('v.AddressWrapperObject',AddressWrapperObject);
                        
                    }
                    
                    ShippToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.ShippToAddressList',ShippToAddressList);
                }else
                {
                    
                }
                
                
            }else
            {
                ShippToAddressList.splice(rowIndex, 1);
                component.set('v.AddressWrapperObject.ShippToAddressList',ShippToAddressList);
                
            }
            
            
        }   
        if(flag=='DeleteInvoiceToAdress')
        {
            var InvoiceToAddressList = component.get('v.AddressWrapperObject.InvoiceToAddressList');
            var CurrentAddressToDelete = InvoiceToAddressList[rowIndex];
            if(CurrentAddressToDelete.Id != null)
            {
                var result = confirm($A.get("$Label.c.Are_you_really_Want_to_delete_this_address_from_database"));
                if (result)
                {
                    var AddressWrapperObject = component.get('v.AddressWrapperObject');
                    if(AddressWrapperObject.Old_InvoiceToAddressList)
                    {
                        
                        InvoiceToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        AddressWrapperObject.Old_InvoiceToAddressList.push(InvoiceToAddressList[rowIndex]);
                        component.set('v.AddressWrapperObject',AddressWrapperObject);                        
                    }
                    else
                    {
                        
                        var Old_InvoiceToAddressList = [];
                        InvoiceToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        Old_InvoiceToAddressList.push(InvoiceToAddressList[rowIndex]);
                        AddressWrapperObject.Old_ShippToAddressList = Old_InvoiceToAddressList;
                        component.set('v.AddressWrapperObject',AddressWrapperObject);
                        
                    }
                    
                    InvoiceToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.InvoiceToAddressList',InvoiceToAddressList);
                }else
                {
                    
                }                
            }else
            {
                InvoiceToAddressList.splice(rowIndex, 1);
                component.set('v.AddressWrapperObject.InvoiceToAddressList',InvoiceToAddressList);
                
            }
            
        }
        if(flag=='DeleteBuyerToAdress')
        {
            var BuyerToAddressList = component.get('v.AddressWrapperObject.BuyerToAddressList');
            var CurrentAddressToDelete = BuyerToAddressList[rowIndex];
            if(CurrentAddressToDelete.Id != null)
            {
                var result = confirm($A.get("$Label.c.Are_you_really_Want_to_delete_this_address_from_database"));
                if (result)
                {
                    var AddressWrapperObject = component.get('v.AddressWrapperObject');
                    if(AddressWrapperObject.Old_BuyerToAddressList)
                    {
                        
                        BuyerToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        AddressWrapperObject.Old_BuyerToAddressList.push(BuyerToAddressList[rowIndex]);
                        component.set('v.AddressWrapperObject',AddressWrapperObject);                        
                    }
                    else
                    {
                        
                        var Old_BuyerToAddressList = [];
                        BuyerToAddressList[rowIndex].Bill_Ship_Status__c = 'Inactive';
                        Old_BuyerToAddressList.push(BuyerToAddressList[rowIndex]);
                        AddressWrapperObject.Old_ShippToAddressList = Old_BuyerToAddressList;
                        component.set('v.AddressWrapperObject',AddressWrapperObject);
                        
                    }
                    
                    BuyerToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.BuyerToAddressList',BuyerToAddressList);
                }else
                {
                    
                }
                
            }else
            {
                BuyerToAddressList.splice(rowIndex, 1);
                component.set('v.AddressWrapperObject.BuyerToAddressList',BuyerToAddressList);
                
            }   
        }
        
        if(flag=='CreateContact')
        {
            alert('Inside Handler>>>');
        }    
    },
    
    UpdateCustomerAddressDetails : function(cmp, event, helper) 
    {
        //console.log('test')
        var Old_BillToAddressList = cmp.get('v.AddressWrapperObject.Old_BillToAddressList');
        var BillToAddressList = cmp.get('v.AddressWrapperObject.BillToAddressList');
        
        //------Code to Validate bill to addreess validations starts here--------------------  
        var CustomerInfoId = cmp.get("v.AddressWrapperObject.CustomerInfoId");
        cmp.set("v.ShowErrorMesssage", false); 
        cmp.set("v.ErrorMesssage",'');
        cmp.set("v.ShowSectionWiseMesssage",'');
        var billAddressList = cmp.get("v.AddressWrapperObject.BillToAddressList");
        var shippToAddressList = cmp.get("v.AddressWrapperObject.ShippToAddressList");
        var BuyerToAddressList = cmp.get("v.AddressWrapperObject.BuyerToAddressList");
        var InvoiceToAddressList = cmp.get("v.AddressWrapperObject.InvoiceToAddressList");
        
        var ErrorMesssage;
        var ShowErrorMesssage = false;
        var ShowSectionWiseMesssage;
        var checkDefaultBillAddress = false;
        var checkDefaultBillToLockedAddress = false;
        
        /* new code for validation*/
        //validation for billto comp
        cmp.set("v.Allvalidationflag",false);				// when event fires from multiple component -to set initially flag to "false" 
        if (billAddressList.length > 1) {
            for (var i = 0; i < billAddressList.length; i++) {
                console.log('i>>>'+i);
                var childComp = cmp.find("childComp");
                childComp[i].callChild();
            }
        } else {
            var childComp = cmp.find("childComp");
            try {
                childComp.callChild();
            } catch (e) {
                //alert('error>>'+ e.message);
            }
        }
        
        //validation for shipto comp
        console.log("shippToAddressList" + shippToAddressList.length);
        if (shippToAddressList.length != 1) {
            for (var i = 0; i < shippToAddressList.length; i++) {
                var shipchildComp = cmp.find("shipchildComp");
                shipchildComp[i].shipcallChild();
            }
        } else {
            var shipchildComp = cmp.find("shipchildComp");
            try {
                shipchildComp.shipcallChild();
            } catch (e) {
                //alert('error>>'+ e.message);
            }
        }
        //validation for buyerto comp");
        console.log("BuyerToAddressList" + BuyerToAddressList.length);
        if (cmp.get("v.ShowInvoiceToBuyerToComp") == true) {
            if (BuyerToAddressList.length != 1) {
                for (var i = 0; i < BuyerToAddressList.length; i++) {
                    //console.log('i>>>'+i);
                    var BuychildComp = cmp.find("buychildComp");
                    BuychildComp[i].BuycallChild();
                }
            } else {
                var BuychildComp = cmp.find("buychildComp");
                try {
                    BuychildComp.BuycallChild();
                } catch (e) {
                    //alert('error>>'+ e.message);
                }
            }
        }
        //validation for InvoiceTo comp
        console.log("InvoiceToAddressList" + InvoiceToAddressList.length);
        if (cmp.get("v.ShowInvoiceToBuyerToComp") == true) {
            if (InvoiceToAddressList.length != 1) {
                for (var i = 0; i < InvoiceToAddressList.length; i++) {
                    var InvoicechildComp = cmp.find("InvoicechildComp");
                    InvoicechildComp[i].InvoicecallChild();
                }
            } else {
                var InvoicechildComp = cmp.find("InvoicechildComp");
                
                try {
                    InvoicechildComp.InvoicecallChild();
                } catch (e) {
                    //alert('error>>'+ e.message);
                }
            }
        }
        
        
        /*end code for validation **/
        for(var i = 0 ; i<billAddressList.length ; i++)
        {
            if(billAddressList[i].Is_Default__c)
            {
                checkDefaultBillAddress = true;
                checkDefaultBillToLockedAddress = true;
            }
            if(billAddressList[i].Customer_Information__c == null)
            {
                billAddressList[i].Customer_Information__c = CustomerInfoId;
            }
            if(billAddressList[i].RecordTypeId== null)
            {
                billAddressList[i].RecordTypeId = cmp.get("v.AddressWrapperObject.BillToRecordTypeId");
            }
            
        }
        if(cmp.get("v.ShowBillToLockedComp"))
        {
            var BillToLockedAddressList = cmp.get("v.AddressWrapperObject.BillToLockedAddressList");
            for(var i = 0 ; i<BillToLockedAddressList.length ; i++)
            {
                
                if(BillToLockedAddressList[i].Is_Default__c)
                {
                    checkDefaultBillToLockedAddress = true;
                    checkDefaultBillAddress = true;
                }
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
        
        var checkDefaultShippAddress = false;
        for(var i = 0 ; i<shippToAddressList.length ; i++)
        {
            if(shippToAddressList[i].Is_Default__c)
            {
                checkDefaultShippAddress = true;
            }
            if(shippToAddressList[i].Customer_Information__c== null)
            {
                shippToAddressList[i].Customer_Information__c = CustomerInfoId;
            }
            if(shippToAddressList[i].RecordTypeId== null)
            {
                shippToAddressList[i].RecordTypeId = cmp.get("v.AddressWrapperObject.ShipToRecordTypeId");
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
        
        //--------- -----Validation for InvoiceToAddressList and BuyerToAddressList address starts  here-------------
        if(cmp.get("v.ShowInvoiceToBuyerToComp"))
        {
            var InvoiceToAddressList = cmp.get("v.AddressWrapperObject.InvoiceToAddressList");
            if(InvoiceToAddressList.length >  0)
            {
            }
            else
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
            var checkDefaultInvoiceToAddress = false;
            for(var i = 0 ; i<InvoiceToAddressList.length ; i++)
            {
                
                if(InvoiceToAddressList[i].Is_Default__c)
                {
                    checkDefaultInvoiceToAddress = true;
                }
                if(InvoiceToAddressList[i].Customer_Information__c== null)
                {
                    InvoiceToAddressList[i].Customer_Information__c = CustomerInfoId;
                }
                if(InvoiceToAddressList[i].RecordTypeId== null)
                {
                    InvoiceToAddressList[i].RecordTypeId = cmp.get("v.AddressWrapperObject.InvoiceToRecordTypeId");
                }
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
            
            var checkDefaultBuyerToAddress = false;
            for(var i = 0 ; i<BuyerToAddressList.length ; i++)
            {
                if(BuyerToAddressList[i].Is_Default__c)
                {
                    checkDefaultBuyerToAddress = true;
                }
                if(BuyerToAddressList[i].Customer_Information__c== null)
                {
                    BuyerToAddressList[i].Customer_Information__c = CustomerInfoId;
                }
                if(BuyerToAddressList[i].RecordTypeId== null)
                {
                    BuyerToAddressList[i].RecordTypeId = cmp.get("v.AddressWrapperObject.BuyerToRecordTypeId");
                }
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
        //------Code to Validate BillToLockedAddress starts here--------------------
        if(cmp.get("v.ShowBillToLockedComp"))
        {		
            var BillToLockedAddressList = cmp.get("v.AddressWrapperObject.BillToLockedAddressList");
            if(!checkDefaultBillToLockedAddress)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.Error"),
                    "type" : "error",
                    "message": $A.get("$Label.c.Select_default_Bill_To_LockedAddress")
                });
                toastEvent.fire();
                //return;
            }
        }
        //--------- -----Validation for BillToLockedAddress Ends  here-------------
        if (
            cmp.get("v.billtovalidationflag") != true &&
            cmp.get("v.shiptovalidationflag") != true &&
            cmp.get("v.invoicetovalidationflag") != true &&
            cmp.get("v.buyertovalidationflag") != true &&
            cmp.get("v.Allvalidationflag") != true
        ) {
            helper.UpdateAddress(cmp,event, helper);
        } else {
            return;
        }
        
    },
    
    onChangeOrdeToCompany: function (component, event, helper) {
        var selectedOrderToCompany = event.getSource().get("v.value");
        var SubDepnedentFieldMap = component.get("v.SubDepnedentFieldMap");
        if (selectedOrderToCompany != '--- None ---') 
        {
            var ListOfDependentFields = SubDepnedentFieldMap[selectedOrderToCompany];
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledPreferredCurrency" , false); 
                component.set("v.GetInitDetailsWrapper.DefaultPreferredCurrency",'');
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
            //alert('Inside main else');
            component.set("v.listPreferredCurrencyDependingValues", ['--- None ---']);
            component.set("v.bDisabledPreferredCurrency" , true);
        }	
        
        
    },
    
    onChangePreferredCurrency: function (component, event, helper) {
        var selectedPreferredCurrency = event.getSource().get("v.value");
        //alert('selectedPreferredCurrency>>>'+selectedPreferredCurrency);
    },
    
    
    checkPasswordStrength : function(component, helper) {
        
        //Get password
        //alert('Inside checkPasswordStrength>>');
        var password = component.get("v.password");
        //alert('Inside password>>'+password);
        //Password strength
        let strength = {
            1: $A.get("$Label.c.Very_Weak"),
            2: $A.get("$Label.c.Weak"),
            3: $A.get("$Label.c.Medium"),
            4: $A.get("$Label.c.Strong"),
            5: $A.get("$Label.c.Very_Strong")
        };
        
        //Password Strength Check
        let strengthValue = {
            'caps': false,
            'length': false,
            'special': false,
            'numbers': false,
            'small': false
        };
        
        //Password strength styles
        let passwordStrengthStyle = {
            0: 'slds-theme--error',
            1: 'slds-theme--error',
            2: 'slds-theme--warning',
            3: 'slds-theme--info',
            4: 'slds-theme--alt-inverse',
            5: 'slds-theme--success'
        };
        
        //Check Password Length
        if(password.length >= 8) {
            strengthValue.length = true;
        }
        
        //Calculate Password Strength
        for(let index=0; index < password.length; index++) {
            let char = password.charCodeAt(index);
            if(!strengthValue.caps && char >= 65 && char <= 90) {
                strengthValue.caps = true;
            } else if(!strengthValue.numbers && char >=48 && char <= 57){
                strengthValue.numbers = true;
            } else if(!strengthValue.small && char >=97 && char <= 122){
                strengthValue.small = true;
            } else if(!strengthValue.numbers && char >=48 && char <= 57){
                strengthValue.numbers = true;
            } else if(!strengthValue.special && (char >=33 && char <= 47) || (char >=58 && char <= 64)) {
                strengthValue.special = true;
            }
        }
        let strengthIndicator = 0;
        for(let metric in strengthValue) {
            if(strengthValue[metric] === true) {
                strengthIndicator++;
            }
        }
        
        //get badge
        var psBadge = component.find('psBadge');
        
        //Remove style
        for(let strengthStyle in passwordStrengthStyle) {
            $A.util.removeClass(psBadge, passwordStrengthStyle[strengthStyle]);
        }
        
        //Add style
        $A.util.addClass(psBadge, passwordStrengthStyle[strengthIndicator]);
        
        //set password strength
        component.set("v.passwordStrength", strength[strengthIndicator]);
        component.set("v.strengthValue",strengthValue);
        
    },
    
    ChangePass : function (cmp, event, helper) 
    {
        var password = cmp.get("v.password");
        var passwordStrength = cmp.get("v.passwordStrength");
        var strengthValue = cmp.get("v.strengthValue");
        var ErrorMessage;
        var showpasswordError = false;
        if(!strengthValue.caps)
        {
            ErrorMessage = $A.get("$Label.c.Password_should_contain_atleast_one_capital_letter");  
            showpasswordError = true;
        }
        if(!strengthValue.numbers)
        {
            ErrorMessage = $A.get("$Label.c.Password_should_contain_atleast_one_numeric_value");  
            showpasswordError = true;
        }
       
        if(!strengthValue.special)
        {
            ErrorMessage = $A.get("$Label.c.Password_should_contain_atleast_one_special_character");  
            showpasswordError = true;
        }
        
        if(password.length <= 6)
        {
            ErrorMessage = $A.get("$Label.c.Password_should_be_at_least_6_characters");
            showpasswordError = true;
            
        }
        if(showpasswordError)
        {
            //alert('Inside showpasswordError true');
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Warning"),
                "type" : "Warning",
                "message": ErrorMessage
            });
            toastEvent.fire();
            return;       
        }
        helper.UpdatePassword(cmp,event, helper);
        
    },
    handleAddressvalidation : function(component, event, helper) {
        var name =event.getParam("flag");
        component.set("v.Allvalidationflag",name);
    }
})