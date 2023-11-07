({
    invoke : function(component,helper) {
        var action=component.get("c.getData");
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.data", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    getDateByWhichFileShouldBeUploadedForSales : function(component,helper) {
        var action=component.get("c.callingCustomSettings");
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.companyMonthDate", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);        
    },
    companyWeekData : function(component,helper,batchId) {
        var selMonthNum = component.get("v.selectedValues");
        var monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var selMonth = monthsList[selMonthNum];
        var action=component.get("c.getCompanyWeekData");
        action.setParams({
            "batchid": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.companyWeekData", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    
    currentMonthYear : function(component,helper) {
        var date = new Date();
        var currentMonth = date.getMonth();
        var currentYear = date.getFullYear();
        component.set("v.selectedValues", currentMonth);
        component.set("v.selectedYear", currentYear);
    },
    
    getYear : function(component,helper) {
        
        var action=component.get("c.getPreviousYear");
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.yearList", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    
    // Make application related to only inventory.
    defaultInventory : function(component,helper) {
        component.set("v.appName", "InventoryUpload");
        component.set("v.itm.Record_Type__c","Inventory");
        component.set("v.selectedRecordType","Inventory");
    },
    
    getMainettiCompanyPicklist: function(component, event) {
        var action = component.get("c.getMainettiMap");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var recordStatusMap = [];
                for(var key in result){
                    recordStatusMap.push({key: key, value: result[key]});
                }
                component.set("v.mainettiCompanyMap", recordStatusMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    getRecordStatusPicklist: function(component, event) {
        var action = component.get("c.getRecordStatus");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var recordStatusMap = [];
                for(var key in result){
                    recordStatusMap.push({key: key, value: result[key]});
                }
                component.set("v.recordStatusMap", recordStatusMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    getBatchStatusPicklist: function(component, event) {
        var action = component.get("c.getBatchStatus");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var batchStatusMap = [];
                for(var key in result){
                    batchStatusMap.push({key: key, value: result[key]});
                }
                component.set("v.batchStatusMap", batchStatusMap);
            }
        });
        $A.enqueueAction(action);
    },
    
   /* initRecordType : function(component, event, helper) {
        var action=component.get("c.getRecordType");       
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.options", response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    }, */
    
    parseFile : function(component,file,batchNo,helper) {
        var recordType = component.get("v.selectedRecordType");
        //alert('recordType:::'+recordType);
            helper.parseInventoryFile(component,file,batchNo,helper,recordType);               
    },
    
    parseInventoryFile : function(component,file,batchNo,helper,recordType) {
        var mainettiCmp = component.get("v.cmp.Name");
        if (mainettiCmp== "") {
            document.getElementById('errorMissing').innerHTML='Please Select Mainetti Company!';
            component.set("v.toggleSpinner", false);
            return;
        }
        var company = component.get("v.selectedMainettiCompany");
        var retailerr = component.get("v.selectedRetailer");        
        var complete = $A.getCallback(function(results) {           
            var myJson = JSON.stringify(results.data);
            var submitStatus = component.get("v.submit");
            if(submitStatus){
                var action = component.get("c.parseInventory");
                action.setParams({
                    "jsonin": myJson,
                    "batchNo": batchNo,
                    "recordType": recordType,
                    "company": company
                });
                
                action.setCallback(this, function(response){
                    var state = response.getState();
                    var errors = response.getError();
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        component.set("v.toggleSpinner", false);
                        console.log('error callback post creation of Master Record:'+ errors[0].message);
                        helper.openErrorModal(component,helper);                   
                    }                
                    if (state === "SUCCESS") {
                        component.rerenderList();
                        var batchId =response.getReturnValue();                   
                        if(batchId != ''){
                            // opening Azure file Upload
                            var csv = Papa.unparse(myJson);
                            var file =  component.find("file").getElement().files[0];
                            var fileName = file.name;
                            helper.createDocument(component,helper,batchId,csv,fileName);                      
                        }else{
                            helper.openErrorModal(component,helper);
                        }                 
                    }
                });
                $A.enqueueAction(action);
            }else{
                helper.openErrorFileFormatModal(component,helper);
                component.set("v.toggleSpinner", false);
            }
        })
        
        var fileDelimiter = component.find('fileDelimiter').get('v.value');
        var file =  component.find("file").getElement().files[0];
        Papa.parse(file,{
            delimiter: fileDelimiter,
            header: true,
            beforeFirstChunk: function( chunk ) {
                var rows = chunk.split( /\r\n|\r|\n/ );
                var headings = rows[0].split( fileDelimiter );               
                var headerSize = headings.length;
                if(headerSize != 10){
                    component.set("v.submit",false);
                }
                
                headings[0] = helper.returnColumnHeader(component,helper,headings[0]);
                headings[1] = helper.returnColumnHeader(component,helper,headings[1]);
                headings[2] = helper.returnColumnHeader(component,helper,headings[2]);
                headings[3] = helper.returnColumnHeader(component,helper,headings[3]);
                headings[4] = helper.returnColumnHeader(component,helper,headings[4]);
                headings[5] = helper.returnColumnHeader(component,helper,headings[5]);
                headings[6] = helper.returnColumnHeader(component,helper,headings[6]);
                headings[7] = helper.returnColumnHeader(component,helper,headings[7]);
                headings[8] = helper.returnColumnHeader(component,helper,headings[8]);
                headings[9] = helper.returnColumnHeader(component,helper,headings[9]);
                rows[0] = headings.join(fileDelimiter);
                return rows.join( '\n' );
            },
            complete: complete});            
        
        this.closeModal(component,helper);
    },
    
    parseSalesFile : function(component,file,batchNo,helper,recordType) { 
        var selMonthNum = component.get("v.selectedValues");
        var selYear = component.get("v.selectedYear");
        var selCompany = component.get("v.cmpsales.Name");
        var monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        var date = new Date();      
        var selMonth = monthsList[selMonthNum];
        var currentMonth = monthsList[date.getMonth()];
        var getAppName = component.get("v.appName");
        
        var the_month = date.getMonth();
        var month = component.find('monthList').get('v.value');
        
        var complete = $A.getCallback(function(results) {     
            var myJson = JSON.stringify(results.data); 
            var submitStatus = component.get("v.submitSales");
            if(submitStatus){
                var action = component.get("c.parseSales");
                action.setParams({
                    "jsonin": myJson,
                    "batchNo": batchNo,
                    "recordType": recordType,
                    "selcomp": selCompany,
                    "selMonth": selMonth,
                    "selYear": selYear
                });
                
                action.setCallback(this, function(response){
                    var state = response.getState();
                    var errors = response.getError();
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        component.set("v.toggleSpinner", false);
                        console.log('error callback post creation of Master Record:'+ errors[0].message);
                        helper.openErrorModal(component,helper);                   
                    }                
                    if (state === "SUCCESS") {
                        component.rerenderList();
                        var batchId =response.getReturnValue();                   
                        if(batchId != ''){
                            // opening Azure file Upload
                            var csv = Papa.unparse(myJson);
                            var file =  component.find("file").getElement().files[0];
                            var fileName = file.name;
                            
                            var containsWarning = batchId.includes("#PWW");
                            if(containsWarning){
                                var replacedId = batchId.replace("#PWW","");
                                helper.createDocumentNotContinue(component,helper,replacedId,csv,fileName);
                                helper.openErrorModal(component,helper);                             
                            }else{                             
                                helper.createDocument(component,helper,batchId,csv,fileName);
                            }
                        }else{ 
                            helper.openErrorModal(component,helper);
                        }                 
                    }
                });
                $A.enqueueAction(action);
            }else{             
                helper.openErrorFileFormatModal(component,helper);
                component.set("v.toggleSpinner", false);
            }
        })
        
        var file =  component.find("file").getElement().files[0];
        Papa.parse(file,{
            header: true,
            beforeFirstChunk: function( chunk ) {
                var rows = chunk.split( /\r\n|\r|\n/ );
                var headings = rows[0].split( ',' );
                headings[0] = helper.returnSalesHeader(component,helper,headings[0]);
                headings[1] = helper.returnSalesHeader(component,helper,headings[1]);
                headings[2] = helper.returnSalesHeader(component,helper,headings[2]);
                headings[3] = helper.returnSalesHeader(component,helper,headings[3]);
                headings[4] = helper.returnSalesHeader(component,helper,headings[4]);
                headings[5] = helper.returnSalesHeader(component,helper,headings[5]);
                headings[6] = helper.returnSalesHeader(component,helper,headings[6]);
                headings[7] = helper.returnSalesHeader(component,helper,headings[7]);
                headings[8] = helper.returnSalesHeader(component,helper,headings[8]);
                headings[9] = helper.returnSalesHeader(component,helper,headings[9]);
                headings[10] = helper.returnSalesHeader(component,helper,headings[10]);
                headings[11] = helper.returnSalesHeader(component,helper,headings[11]);
                headings[12] = helper.returnSalesHeader(component,helper,headings[12]);
                headings[13] = helper.returnSalesHeader(component,helper,headings[13]);
                headings[14] = helper.returnSalesHeader(component,helper,headings[14]);
                headings[15] = helper.returnSalesHeader(component,helper,headings[15]);
                headings[16] = helper.returnSalesHeader(component,helper,headings[16]);
                headings[17] = helper.returnSalesHeader(component,helper,headings[17]);
                headings[18] = helper.returnSalesHeader(component,helper,headings[18]);
                headings[19] = helper.returnSalesHeader(component,helper,headings[19]);
                headings[20] = helper.returnSalesHeader(component,helper,headings[20]);
                headings[21] = helper.returnSalesHeader(component,helper,headings[21]);
                headings[22] = helper.returnSalesHeader(component,helper,headings[22]);
                headings[23] = helper.returnSalesHeader(component,helper,headings[23]);
                headings[24] = helper.returnSalesHeader(component,helper,headings[24]);
                headings[25] = helper.returnSalesHeader(component,helper,headings[25]);
                headings[26] = helper.returnSalesHeader(component,helper,headings[26]);
                headings[27] = helper.returnSalesHeader(component,helper,headings[27]);
                headings[28] = helper.returnSalesHeader(component,helper,headings[28]);
                headings[29] = helper.returnSalesHeader(component,helper,headings[29]);
                headings[30] = helper.returnSalesHeader(component,helper,headings[30]);
                headings[31] = helper.returnSalesHeader(component,helper,headings[31]);
                headings[32] = helper.returnSalesHeader(component,helper,headings[32]);
                headings[33] = helper.returnSalesHeader(component,helper,headings[33]);
                headings[34] = helper.returnSalesHeader(component,helper,headings[34]);
                headings[35] = helper.returnSalesHeader(component,helper,headings[35]);
                headings[36] = helper.returnSalesHeader(component,helper,headings[36]);
                headings[37] = helper.returnSalesHeader(component,helper,headings[37]);
                headings[38] = helper.returnSalesHeader(component,helper,headings[38]);
                headings[39] = helper.returnSalesHeader(component,helper,headings[39]);
                headings[40] = helper.returnSalesHeader(component,helper,headings[40]);
                headings[41] = helper.returnSalesHeader(component,helper,headings[41]);
                headings[42] = helper.returnSalesHeader(component,helper,headings[42]);
                rows[0] = headings.join();
                return rows.join( '\n' );
            },
            complete: complete});
    },
    
    createDocument: function(component,helper,batchId,csv,fileName) {
        var action = component.get("c.createDocument");
        action.setParams({
            "csv": csv,
            "fileName": fileName,
            "batchNo":batchId
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            var errors = response.getError();
            if (errors && Array.isArray(errors) && errors.length > 0) {
                console.log('error'+ errors[0].message);
            }                
            if (state === "SUCCESS") {
                var status =response.getReturnValue();
                if(status){
                    helper.uploadAzureWindowForFileUpload(component,helper,batchId);                        
                }else{
                }                                  
            }
        });
        $A.enqueueAction(action);
    },
    createDocumentNotContinue: function(component,helper,batchId,csv,fileName) {
        var action = component.get("c.createDocument");
        action.setParams({
            "csv": csv,
            "fileName": fileName,
            "batchNo":batchId
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            var errors = response.getError();
            if (errors && Array.isArray(errors) && errors.length > 0) {
                console.log('error'+ errors[0].message);
            }                
            if (state === "SUCCESS") {
                var status =response.getReturnValue();
                if(status){
                    // opening Azure file Upload
                    helper.uploadAzureWindowForFileUpload(component,helper,batchId);                        
                }else{
                }                                  
            }
        });
        $A.enqueueAction(action);
    },
    
    openModal: function(component, event, helper) {
        var modal = component.find("inventoryModal");
        var modalBackdrop = component.find("inventoryModalBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },
    closeModal: function(component, event, helper) {
        var modal = component.find("inventoryModal");
        var modalBackdrop = component.find("inventoryModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    openErrorModal: function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: "Error",
                            message: 'Error in the data File Uploaded, Please click the Error Details link',
                            type: "error",
                            mode:"sticky"
                        });
                        toastEvent.fire();
    },
    closeErrorModal: function(component, event, helper) {
        var modal = component.find("inventoryErrorModal");
        var modalBackdrop = component.find("inventoryErrorModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    openErrorFileFormatModal: function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: "Error",
                            message: 'Error in Format of the data File Uploaded',
                            type: "error",
                            mode:"sticky"
                        });
                        toastEvent.fire();
    },
    closeErrorFileFormatModal: function(component, event, helper) {
        var modal = component.find("errorFileFormatModal");
        var modalBackdrop = component.find("errorFileFormatModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    cmpWeekOpen: function(component, event, helper) {
        var modal = component.find("cmpWeekMissing");
        var modalBackdrop = component.find("cmpWeekMissingBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open");
    },
    uploadAzureWindowForFileUpload: function(component,helper,batchNo) {
        component.set("v.toggleSpinner", false);
        var w = 460;
        var h = 250;
        var left = Number((screen.width/2)-(w/2));
        var tops = Number((screen.height/2)-(h/2));        
        var winObjct = window.open('/apex/azureInventoryFileUpload?Id=' + batchNo,'Inventory Data Upload','width=' + (parseInt(window.innerWidth) * 0.4) + ',height=' + (parseInt(window.innerHeight) * .6) + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=0,left='+left+',top='+tops);
        
    },
    returnColumnHeader: function(component,helper,headerName) {
        if(headerName != ""  && headerName != null )
        {
        if(headerName.toLowerCase()=='Retailer Code'.toLowerCase()){
            return 'Retailer_Code__c';
        }else if(headerName.toLowerCase()=='Mainetti Company'.toLowerCase()){
            return 'Mainetti_Company__c';
        }else if(headerName.toLowerCase()=='Inventory Model'.toLowerCase()){
            return 'Inventory_Model__c';
        }else if(headerName.toLowerCase()=='Warehouse'.toLowerCase()){
            return 'Warehouse__c';
        }else if(headerName.toLowerCase()=='Color'.toLowerCase()){
            return 'Color__c';
        }else if(headerName.toLowerCase()=='Sizer Print'.toLowerCase()){
            return 'Sizer_Print__c';
        }else if(headerName.toLowerCase()=='Local System SKU'.toLowerCase()){
            return 'Local_System_SKU__c';
        }else if(headerName.toLowerCase()=='Source'.toLowerCase()){
            return 'Source__c';
        }else if(headerName.toLowerCase()=='Stock In Date'.toLowerCase()){
            return 'Stock_In_Date__c';
        }else if(headerName.toLowerCase()=='Stock In Qty'.toLowerCase()){
            return 'Stock_In_Qty__c';
        }else{
            component.set("v.submit",false);
            return false;
        }
        }
        else{
            component.set("v.submit",false);
            return false;
        }
    },
    
    returnSalesHeader: function(component,helper,headerName) {
        if(headerName != ""  && headerName != null )
        {
        if(headerName.toLowerCase() =='Company'.toLowerCase()){
            return 'Company__c';
        }else if(headerName.toLowerCase() =='Year'.toLowerCase()){
            return 'Year__c';
        }else if(headerName.toLowerCase() =='Week'.toLowerCase()){
            return 'Week__c';
        }else if(headerName.toLowerCase() =='Month'.toLowerCase()){
            return 'Month__c';
        }else if(headerName.toLowerCase() =='Item code'.toLowerCase()){
            return 'Item_code__c';
        }else if(headerName.toLowerCase() =='Material'.toLowerCase()){
            return 'Material__c';
        }else if(headerName.toLowerCase() =='Source'.toLowerCase()){
            return 'Source__c';
        }else if(headerName.toLowerCase() =='Model'.toLowerCase()){
            return 'Model__c';
        }else if(headerName.toLowerCase() =='Printed_Logo'.toLowerCase()){
            return 'Printed_Logo__c';
        }else if(headerName.toLowerCase() =='Color'.toLowerCase()){
            return 'Color__c';
        }else if(headerName.toLowerCase() =='Customer'.toLowerCase()){
            return 'Customer__c';
        }else if(headerName.toLowerCase() =='Customer local name'.toLowerCase()){
            return 'Customer_local_name__c';
        }else if(headerName.toLowerCase() =='Mainetti_Brand'.toLowerCase()){
            return 'Mainetti_Brand__c';
        }
            else if(headerName.toLowerCase() =='Category'.toLowerCase()){
                return 'Category__c';
            }
                else if(headerName.toLowerCase() =='Sub-Category'.toLowerCase()){
                    return 'Sub_Category__c';
                }
                    else if(headerName.toLowerCase() =='Family'.toLowerCase()){
                        return 'Family__c';
                    }
                        else if(headerName.toLowerCase() =='Order_Type'.toLowerCase()){
                            return 'Order_Type__c';
                        }
                            else if(headerName.toLowerCase() =='Units Sold'.toLowerCase()){
                                return 'Unit_Sold__c';
                            }
                                else if(headerName.toLowerCase() =='Unit Price / 100(EUR)'.toLowerCase()){
                                    return 'Unit_Price_100_EUR__c';
                                }
                                    else if(headerName.toLowerCase() =='Unit Price / 100(USD)'.toLowerCase()){
                                        return 'Unit_Price_100_USD__c';
                                    }
                                        else if(headerName.toLowerCase() =='Net Unit Price/100'.toLowerCase()){
                                            return 'Net_Unit_Price_100__c';
                                        }
                                            else if(headerName.toLowerCase() =='Sales EUR'.toLowerCase()){
                                                return 'Sales_EUR__c';
                                            }
                                                else if(headerName.toLowerCase() =='Sales USD'.toLowerCase()){
                                                    return 'Sales_USD__c';
                                                }else if(headerName.toLowerCase() =='Transaction Currency'.toLowerCase()){
                                                    return 'Transaction_Currency__c';
                                                }else if(headerName.toLowerCase() =='Exchange Rate to 1 EUR'.toLowerCase()){
                                                    return 'ExRate_to_EUR__c';
                                                }else if(headerName.toLowerCase() =='Exchange Rate to 1 USD'.toLowerCase()){
                                                    return 'ExRate_to_USD__c';
                                                }else if(headerName.toLowerCase() =='Local Net Unit Price/100'.toLowerCase()){
                                                    return 'Local_Net_Unit_Pirce_100__c';
                                                }else if(headerName.toLowerCase() =='Sales (Transaction Currency)'.toLowerCase()){
                                                    return 'Sales_Transaction_Currency__c';
                                                }else if(headerName.toLowerCase() =='Shipped To - Factory'.toLowerCase()){
                                                    return 'Shipped_To_Factory__c';
                                                }else if(headerName.toLowerCase() =='Shipped To - Country'.toLowerCase()){
                                                    return 'Shipped_To_Country__c';
                                                }else if(headerName.toLowerCase() =='Label'.toLowerCase()){
                                                    return 'Label__c';
                                                }else if(headerName.toLowerCase() =='End-user'.toLowerCase()){
                                                    return 'End_user__c';
                                                }else if(headerName.toLowerCase() =='Vendor'.toLowerCase()){
                                                    return 'Vendor__c';
                                                }else if(headerName.toLowerCase() =='Division'.toLowerCase()){
                                                    return 'Division__c';
                                                }else if(headerName.toLowerCase() =='Retailer_Brand'.toLowerCase()){
                                                    return 'Retailer_Brand__c';
                                                }else if(headerName.toLowerCase() =='Royalty Rate'.toLowerCase()){
                                                    return 'Royalty_Rate__c';
                                                }else if(headerName.toLowerCase() =='Market'.toLowerCase()){
                                                    return 'Market__c';
                                                }else if(headerName.toLowerCase() =='Remark'.toLowerCase()){
                                                    return 'Remark__c';
                                                }else if(headerName.toLowerCase() =='LOB'.toLowerCase()){
                                                    return 'LOB__c';
                                                }else if(headerName.toLowerCase() =='SO_Number'.toLowerCase()){
                                                    return 'SO_Number__c';
                                                }else if(headerName.toLowerCase() =='Production Country'.toLowerCase()){
                                                    return 'Production_Country__c';
                                                }else if(headerName.toLowerCase() =='Gross Sales (USD)'.toLowerCase()){
                                                    return 'Gross_Sales_USD__c';
                                                }else if(headerName.toLowerCase() =='Freight Charge (USD)'.toLowerCase()){
                                                    return 'Freight_Charge_USD__c';
                                                }else{
                                                    component.set("v.submitSales",false);
                                                    return false;
                                                }
        }
        else{
            component.set("v.submitSales",false);
            return false;
        }
        
    },
    month: function (component, event, helper) {
        helper.monthDynamic(
            $A.getCallback(function handleServerResponse(serverResponse) {
                component.set('v.optionss', serverResponse.month);
            })
        );
        var date = new Date();      
        var defaultMonth = date.getMonth();
    },
    
    monthDynamic: function (onResponse) {
        setTimeout(function () {
            var serverResponse = {
                //selectedColorId: 2,
                month: [
                    { id: 0, label: 'Jan' },
                    { id: 1, label: 'Feb'} ,
                    { id: 2, label: 'Mar'},
                    { id: 3, label: 'Apr'},
                    { id: 4, label: 'May'},
                    { id: 5, label: 'Jun'},
                    { id: 6, label: 'Jul'},
                    { id: 7, label: 'Aug'},
                    { id: 8, label: 'Sep'},
                    { id: 9, label: 'Oct'},
                    { id: 10, label: 'Nov'},
                    { id: 11, label: 'Dec'}
                    
                ]
            };
            onResponse.call(null, serverResponse);
        }, 2000);
    },
    
    
    // Mainetti Company For Sales
    getSalesCountryPicklist: function(component, event) {
        var action = component.get("c.getsalesCompanyList");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue(); 
                var partnerCompanyMap = [];
                for(var key in result){
                    partnerCompanyMap.push({key: key, value: result[key]});
                }
                component.set("v.SalesCompanyMap", partnerCompanyMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    openDataSubmittedModal: function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: "Error",
                            message: 'The File data as already been submitted',
                            type: "error",
                            mode:"sticky"
                        });
                        toastEvent.fire();
    },
    closeDataSubmittedModal: function(component, event, helper) {
        var modal = component.find("dataSubmittedModal");
        var modalBackdrop = component.find("dataSubmittedModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
   getCompPickListValues : function(component,event,helper,selectedRetailers01) {  
        var action=component.get("c.getDependentPicklistValues");
        action.setParams({
            "selectedRetailer": selectedRetailers01
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.orderToCompanyList',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    getRetailerPickListValuesss : function(component,event,helper) {    
        var action=component.get("c.getRetailerPicklistValues");
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.retailerList',response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    }
    
})