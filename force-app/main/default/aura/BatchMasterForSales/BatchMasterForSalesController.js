({
    show : function(component, event, helper) {
        component.set("v.toggleSpinner", false);
        helper.defaultSales(component, helper);
        helper.invoke(component,helper);
        helper.getRecordStatusPicklist(component, event);
        helper.getBatchStatusPicklist(component, event);
        helper.getYear(component, event); 
        helper.month(component, event, helper);
        helper.getSalesCountryPicklist(component, event);
        helper.currentMonthYear(component, event);
         //Maintaince Modal PopUp
         if(component.get("v.openMaintainceModal")==true){
            helper.viewMaintainceAccess(component, helper);
            var today = new Date();
            var todayFormattedDate = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate()
            var startDate = new Date(component.get("v.MaintainceStartDate"));
            var EndDate = new Date(component.get("v.MaintainceEndDate"));
            if(startDate <= today && today <= EndDate){
                component.set("v.withinperiod",false);
            }
        }
    },
    
    doInit : function(component) {
        var vfOrigin = "https://" + component.get("v.vfHost");
        window.addEventListener("message", function(event) {
            if (event.origin !== vfOrigin) {
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
        var selCompany = component.get("v.cmpsalesSearch.Name");
      //  alert('selCompany:::'+selCompany);
        
        var action=component.get("c.getSalesSearchRecords");
        action.setParams({
            "fromDate": fDate,
            "toDate": tDate,
            "recordStatus": recordstatus,
            "batchStatus": batchstatus,
            "batchNo": batchNo,
            "selCompany": selCompany
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
    
    initRecordType : function(component, event, helper) {
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
    
    //handle RecordStatus Picklist Selection
    handleRecordStatusOnChange : function(component, event, helper) {
        var recordstatus = component.get("v.itm.Record_Type__c");
        var set= component.set("v.selectedRecordType",recordstatus);
        var get = component.get("v.selectedRecordType");
        
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
        

   /*   var batchId = event.getSource().get("v.name");
        var recType = event.getSource().get("v.value");        
        component.set("v.childRecordType",recType);
        var recordselected = component.get("v.childRecordType");
        if(recordselected == "Inventory"){
            var objCompB = component.find('batchDetail');
            objCompB.batchDetails(batchId);  
        }
        else if(recordselected == "Sales"){
            var objCompB = component.find('salesDetail');
            objCompB.batchSales(batchId);
        } */
         var batchId = event.getSource().get("v.name");
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:ViewErrorSUmmary",
            componentAttributes: {
                batchId : batchId
            }
        });
        evt.fire();
    },    
    
    bulkFileProcess : function(component, event, helper) {
        
        var buttonActive = component.get("v.isButtonActive");
        
        component.set("v.toggleSpinner", true);
        var allValid = true;
        if (!buttonActive) {
        	component.set("v.submit",true);
        component.set("v.submitSales",true);
        //component.set("v.openBulkUploadConfirmation",true);
        
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
         
        var recordstatus = component.get("v.itm.Record_Type__c");
        if (recordstatus== "") {
            document.getElementById('errorMissing').innerHTML='Please Select Record type!';
            component.set("v.toggleSpinner", false);
            return;
        }
        if (fileInput.value == "") {
           
            document.getElementById('errorMissing').innerHTML='You forgot to attach file!';
            component.set("v.toggleSpinner", false);
            return;
        }
       
        var extension = 'CSV';
        var extensionlowercase = extension.toLowerCase();
      //  alert(extensionlowercase)
        var fileextension = file.name.split(".").pop();
        
    // if(file.type!= 'application/vnd.ms-excel'){
      if(fileextension.toLowerCase() != extensionlowercase){
            component.set("v.toggleSpinner", false);
            document.getElementById('errorMissing').innerHTML='Enter a valid file';
          	allValid = false;
            component.set("v.isButtonActive", allValid);
            return;
        } 
        console.log("Before Calling PapaParser");
        
        Papa.parse(file,{
            complete: function(results){
            console.log("Finished:", results.data);
        }
                                           
        });
        console.log("After Calling PapaParser");
                                          //  beforeFirstChunk: function( chunk ) {
      
        var batchNo=component.get("v.reuploadBatchNo");
       // helper.closeModal(component,helper);
        component.set("v.isButtonActive", allValid);
        helper.parseFile(component,file,batchNo,helper);
        //helper.closeModal(component,helper);    
        }
        
    }, 
    
    newUpload: function(component, event, helper) {
        component.set("v.reuploadBatchNo", '');
        component.set("v.isReupload",false);
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
    closeModalopenFileDataSubmittedModal: function(component, event, helper) {
        helper.closeModalopenFileDataSubmittedModal(component,helper);
    },
   closeBulkUploadConfirmation: function(component, event, helper) {
        helper.closeBulkUploadConfirmation(component,helper);
    },
    
    reuploadfile: function(component, event, helper,batchId) {
        
        var batchId = event.getSource().get("v.name");   
        helper.autoPopulateOnReupload(component,helper,batchId);
        component.set("v.reuploadBatchNo", batchId);
        component.set("v.isReupload",true);
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
        var companysales = component.get("v.cmpsales.Sales_Data_Company__c");
        var set= component.set("v.selectedSalesCompany",companysales);
        var get = component.get("v.selectedSalesCompany");        
    },
    handleSalesCmpOnSearch : function(component, event, helper) {
        var companysales = component.get("v.cmpsalesSearch.Sales_Data_Company__c");
     //   var set= component.set("v.selectedSalesCompanySearch",companysales);
      //  var get = component.get("v.selectedSalesCompanySearch");        
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
    
    //firing an event for admin access only.
    viewAdmin: function(component, event, helper) {
        var batchId = event.getSource().get("v.name");
       /* var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:salesAdminAccess",
            componentAttributes: {
                batchId : batchId
            }
        });
        evt.fire(); */
        helper.viewAdmintoProfileAccess(component,helper,batchId);
    },
    //To Delete the defunct Batch Records 
    deleteDefunctBatch : function(component, event, helper) {    
        var batchId = event.getSource().get("v.name");
        event.getSource().set("v.disabled", true);
        component.set("v.toggleSpinner", true);
        helper.deleteDefunctBatch(component,helper,batchId);         
    },
    
    downloadCSV : function(component, event, helper) {
        var fileName = event.getSource().get("v.name");
        var action=component.get("c.downloadCSVfile");
        action.setParams({
            "fileName": fileName
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnData = response.getReturnValue();
                window.open(returnData);

                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    downloadConvertedCSV : function(component, event, helper) {
        var fileName = event.getSource().get("v.name");
        var action=component.get("c.downloadConvertedCSVfile");
        action.setParams({
            "fileName": fileName
        });
        //alert('fileName::::'+fileName);
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnData = response.getReturnValue();
                window.open(returnData);

                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    gotoURL_ViewUploadSummary : function (component, event, helper) {
        
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/lightning/r/00O5h000000b1ELEAY/view"
        });
        urlEvent.fire();
	},
    deleteAdmin: function(component, event, helper) {
        var batchId = event.getSource().get("v.name");
        helper.deleteAdmintoProfileAccess(component,helper,batchId);
    },
    onclickContinueUpload: function(component, event, helper){
        
        component.set("v.openMaintainceModal",false);
    }
    
})