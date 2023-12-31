({
    show : function(component, event, helper) {
        component.set("v.toggleSpinner", false);
        helper.defaultInventory(component,helper);
        helper.invoke(component,helper);
        helper.getMainettiCompanyPicklist(component, event);
        helper.getYear(component, event); 
        helper.month(component, event, helper);
        helper.currentMonthYear(component, event);
        helper.getCompPickListValues(component, event, helper);
        helper.getRetailerPickListValuesss(component, event, helper);
        
    },
    
    doInit : function(component) {
        var vfOrigin = "https://" + component.get("v.vfHost");
        window.addEventListener("message", function(event) {
            if (event.origin !== vfOrigin) {
                // Not the expected origin: Reject the message!
                //return;
            }
            // Handle the message
            if (event.data === 'Refresh') {
                window.location.reload();
            }
        }, false);
    },
    handleEvent : function(component, event, helper) {
        var batchId = event.getParam("communication");
        helper.cmpWeekOpen(component,helper);
        helper.companyWeekData(component,helper,batchId);
    },
    companyWeekMissing : function(component, event, helper) {
        var batchId = event.getSource().get("v.name");
        helper.cmpWeekOpen(component,helper);
        helper.companyWeekData(component,helper,batchId);
    },
    
    handleSearchClick : function(component, event, helper) {
        component.set("v.toggleSpinner", true);
        var fDate = component.get("v.fromdate");
        var tDate = component.get("v.todate");
        var recordstatus = component.get("v.record.Record_Type__c");
        var batchstatus = component.get("v.record.Batch_Status__c");
        var company = component.get("v.cmp.Name");
        if(recordstatus == "Inventory"){
            if(company == ""){
                alert("Please Select Mainetti Company!");
                component.set("v.toggleSpinner", false);
                return;
            }
        }
        if(recordstatus == "Sales"){
            company = "";
        }
        var action=component.get("c.getDateandTypeRecords");
        action.setParams({
            "fromDate": fDate,
            "toDate": tDate,
            "recordStatus": recordstatus,
            "batchStatus": batchstatus,
            "mainettiCmp": company            
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.toggleSpinner", false);
                component.set("v.data", response.getReturnValue());
            } else if (state === "ERROR") {
                component.set("v.toggleSpinner", false);
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    
    handleSalesSearchClick : function(component, event, helper) {
        component.set("v.toggleSpinner", true);
        var fDate = component.get("v.fromdate");
        var tDate = component.get("v.todate");
        var recordstatus = component.get("v.record.Record_Type__c");
        var batchstatus = component.get("v.record.Batch_Status__c");
        var batchNo = component.find('batchNoSearch').get('v.value');

        var action=component.get("c.getSalesSearchRecords");
        action.setParams({
            "fromDate": fDate,
            "toDate": tDate,
            "recordStatus": recordstatus,
            "batchStatus": batchstatus,
            "batchNo": batchNo            
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.toggleSpinner", false);
                component.set("v.data", response.getReturnValue());
            } else if (state === "ERROR") {
                component.set("v.toggleSpinner", false);
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    handleRecordTypeSearchOnChange : function(component, event, helper) {
        var recType = component.get("v.record.Record_Type__c");
        var set= component.set("v.recordTypeSearch",recType);
        var get = component.get("v.recordTypeSearch");
        
    },
    
    handleMainettiCmpOnChange : function(component, event, helper) {
        var company = component.get("v.cmp.Name");
        var set= component.set("v.selectedMainettiCompany",company);
        var get = component.get("v.selectedMainettiCompany");
        
    },
    
    handleRetailerCodeOnChange : function(component, event, helper) {
        var retailer = component.get("v.retail.Name");
        var set= component.set("v.selectedRetailerCode",retailer);
        var get = component.get("v.selectedRetailerCode");        
    },
    
    //handle RecordStatus Picklist Selection
    handleRecordStatusOnChange : function(component, event, helper) {
        var recordstatus = component.get("v.itm.Record_Type__c");
        var set= component.set("v.selectedRecordType",recordstatus);
        alert('set:::'+set);
        var get = component.get("v.selectedRecordType");
        alert('get:::'+get);
        
    },
    handleMonthListOnChange : function(component, event, helper) {
        var month = component.find('monthList').get('v.value');   
        var set= component.set("v.selectedValues",month);
        
    },
    handleYearOnChange : function(component, event, helper) {
        var year = component.find('yearDynamicList').get('v.value');  
        var set= component.set("v.selectedYear",year);
    },    
    
    // function to get the error details of Inventory_Transaction_Stage__c,.    
    viewError : function(component, event, helper) {  
        
        var batchId = event.getSource().get("v.name");
        var recType = event.getSource().get("v.value");        
            var objCompB = component.find('batchDetail');
            objCompB.batchDetails(batchId);  
    },    
    
    handleParseClick : function(component, event, helper) {
        
        component.set("v.toggleSpinner", true);
        component.set("v.submit",true);
        component.set("v.submitSales",true);

        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        var MAX_FILE_SIZE= 9500000;
        var recordstatus = component.get("v.itm.Record_Type__c");
        var selectedRetailers = component.get('v.selectedRetailer');
        var company = component.get("v.selectedCompany");
        if (recordstatus== "") {
            document.getElementById('errorMissing').innerHTML='Please Select Record type!';
            component.set("v.toggleSpinner", false);
            return;
        } 
        var mainettiCmp = component.get("v.cmp.Name");
        if (mainettiCmp== "") {
            document.getElementById('errorMissing').innerHTML='Please Select Mainetti Company!';
            component.set("v.toggleSpinner", false);
            return;
        }
        
        if (fileInput.value == "") {
            document.getElementById('errorMissing').innerHTML='You forgot to attach file!';
            component.set("v.toggleSpinner", false);
            return;
        }
        if(file.type!= 'application/vnd.ms-excel'){
            component.set("v.toggleSpinner", false);
            document.getElementById('errorMissing').innerHTML='Enter a valid file';
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            document.getElementById('errorMissing').innerHTML='File size cannot exceed ' + MAX_FILE_SIZE + ' bytes.\n' +
                  'Selected file size: ' + file.size;
            component.set("v.toggleSpinner", false);
            return;
        }
        var batchNo=component.get("v.reuploadBatchNo");
        helper.parseFile(component,file,batchNo,helper);
    }, 
    
    newUpload: function(component, event, helper) {
        component.set("v.reuploadBatchNo", '');
        helper.openModal(component,helper);
    },
    
    closeModal: function(component, event, helper) {
        var modal = component.find("inventoryModal");
        var modalBackdrop = component.find("inventoryModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    
    closeErrorModal: function(component, event, helper) {
        helper.closeErrorModal(component,helper);
    },
    
    reuploadfile: function(component, event, helper) {
        var batchId = event.getSource().get("v.name");
        component.set("v.reuploadBatchNo", batchId);
        component.set("v.selectedValues","");
        component.set("v.selectedYear","");
        component.set("v.cmpsales.Name","");
        helper.openModal(component,helper);
    },
    cmpWeekClose: function(component, event, helper) {
        var modal = component.find("cmpWeekMissing");
        var modalBackdrop = component.find("cmpWeekMissingBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    
    //Onchange for Sales Minetti Company 
    handleSalesCmpOnChange : function(component, event, helper) {
        var companysales = component.get("v.cmpsales.Name");
        var set= component.set("v.selectedSalesCompany",companysales);
        var get = component.get("v.selectedSalesCompany");        
    },
    closeErrorFileFormatModal: function(component, event, helper) {
        var modal = component.find("errorFileFormatModal");
        var modalBackdrop = component.find("errorFileFormatModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    closeDataSubmittedModal: function(component, event, helper) {
        var modal = component.find("dataSubmittedModal");
        var modalBackdrop = component.find("dataSubmittedModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
     cmpOnChange : function(component, event, helper) {
        var selectedOrdToCmp = component.get('v.selectedCompany');
    },
    retailerOnChange : function(component, event, helper) {
        //var selectedRetailers = component.get('v.selectedRetailer');
       // alert('selectedRetailers:'+selectedRetailers);
        //helper.getCompPickListValues(component, event, helper,selectedRetailers);
    },
    
})