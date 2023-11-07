({
    invoke : function(component,helper) {
        var action=component.get("c.getSalesData");
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
    autoPopulateOnReupload : function(component,helper,batchId) {
        
       var action=component.get("c.getAutoPopulateMasterValues");
        action.setParams({
            "batchId": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                for(var i=0;i<result.length;i++){
                    helper.getPeriodPicklist(component, event, result[i].Sales_Year__c,result[i].Sales_Company__c);
                    //alert('result[i] ::'+result[i].Period__c);
                    component.set("v.selectedValues",result[i].Period__c);
                    component.set("v.selectedYear",result[i].Sales_Year__c);
                    component.set("v.cmpsales.Name",result[i].Sales_Company__c);
                    
                   
                   // var Pval = component.get('v.selectedValues');
//alert('Pval ::'+Pval);
                    component.set("v.IsCompanyDefault", result[i].Sales_Company__c);
                    component.set("v.IsMonthDefault", result[i].Period__c);
                    component.set("v.IsYearDefault", result[i].Sales_Year__c);
                     //helper.getPeriodPicklist(component, event, result[i].Sales_Year__c);
                }
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
        //component.set("v.selectedYear", currentYear);
    },
    
    getYear : function(component,helper) {
        
        var action=component.get("c.getNextYear");
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
    
    prevYear : function(component,helper) {
					var action=component.get("c.getprevYear");
					action.setCallback(this,function (response) {
					var state = response.getState();
					if (state === "SUCCESS") {
					component.set("v.prvsyearList", response.getReturnValue());
					} else if (state === "ERROR") {
					var errors = response.getError();
					console.error(errors);
					}
					});
					$A.enqueueAction(action);
					},
    
    getfilteredByYear : function(component,helper,year,company,budPeriod) {
        var action=component.get("c.getSalesDatabyYear");
		 action.setParams({
            "year": year,
              "company": company,
             "budPeriod" : budPeriod
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.data", response.getReturnValue());
                 component.set('v.loaded', false);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    
    defaultSales:function(component,helper)
    {
        component.set("v.appName", "SalesUpload");
        component.set("v.itm.Record_Type__c","Budget");
        component.set("v.selectedRecordType","Budget");
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
    
 /*   getRecordStatusPicklist: function(component, event) {
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
    },*/
    
    parseFile : function(component,file,batchNo,helper) {
        
        var recordType = component.get("v.selectedRecordType");
        if(recordType == "Budget"){
            var selperiod = component.get("v.selectedValues");  
            var selYear = component.get("v.selectedYear");
            var selCompany = component.get("v.cmpsales.Name");
            console.log('selperiod :::::'+selperiod +'    selYear :::::'+selYear + '   selCompany :::'+selCompany);
            if(selCompany == ""){
                document.getElementById('errorMissing').innerHTML='Please Select the Company!';                    
                component.set("v.toggleSpinner", false);
                return;
            }
            
            if(selYear == ""){
                document.getElementById('errorMissing').innerHTML='Please Select a Year!';                    
                component.set("v.toggleSpinner", false);
                return;
            }   
            if(selperiod == ""){
                document.getElementById('errorMissing').innerHTML='Please Select a Period!';                    
                component.set("v.toggleSpinner", false);
                return;
                
            }
            var isreupload  = component.get("v.isReupload");
        }   
         helper.isFullBudgetAlreadySubmitted(component, event, helper);
       // helper.isDataAlreadySubmitted(component, event, helper);
    }, 
    
    isFullBudgetAlreadySubmitted: function (component, event, helper){
        console.log('##### START isFullBudgetAlreadySubmitted #########');
        var selperiod = component.get("v.selectedValues");
        var selYear = component.get("v.selectedYear");
        var selCompany = component.get("v.cmpsales.Name");
		 var action = component.get("c.checkFullBudgetAlreadySubmitted");
            action.setParams({
                "reviewCompany": selCompany,
                "budgetPeriod": selperiod,
                "reviewYear": selYear
            });   
            action.setCallback(this, function(response){
			 var state = response.getState();
			 if (state === "SUCCESS"){
			 var fetchValue =response.getReturnValue();
                // alert('fetchValue ::'+fetchValue);
			 if(fetchValue == true){
			  var text = 'Budget Upload for this combination Already Exists';
                    helper.errorToast(component,event,helper,text);
                    return;
			 }
                 else{
                      helper.isDataAlreadySubmitted(component, event, helper);
                 }
			 }
                 });
        $A.enqueueAction(action);
			},
    
    isDataAlreadySubmitted: function (component, event, helper){
        console.log('##### START isDataAlreadySubmitted #########');
        var selperiod = component.get("v.selectedValues");
        var selYear = component.get("v.selectedYear");
        var selCompany = component.get("v.cmpsales.Name");
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];        
        var rowsExists = false;
        
        var IsMonthDefault = component.get("v.IsMonthDefault");                    
       var IsYearDefault = component.get("v.IsYearDefault");
        var IsCompanyDefault = component.get("v.IsCompanyDefault");
        console.log('IsCompanyDefault:::'+IsCompanyDefault+'selCompany:::'+selCompany+'IsYearDefault:::'+IsYearDefault+'selYear:::'+selYear+'IsMonthDefault::::'+IsMonthDefault+'selperiod:::'+selperiod);
        
        
        if (file.size > 0) 
        {
            rowsExists = true;
        } 
        if(rowsExists){
            component.set('v.isChunkDataSubmitted',true);
            var action = component.get("c.errordataSubmitted");
            action.setParams({
                "companyArray": selCompany,
                "selperiod": selperiod,
                "selyear": selYear
            });   
            action.setCallback(this, function(response){
                var state = response.getState();
                var batchStatus;
                var Batchstatus;
                var isreupload  = component.get("v.isReupload");
                
                if (state === "SUCCESS"){
                    var fetchValue =response.getReturnValue();
                    batchStatus = fetchValue;
                    Batchstatus = component.set("v.BatchStatus",fetchValue);
                    if((fetchValue != '' && (batchStatus != '8 - Migration Success') && !isreupload)) {
                        component.set("v.toggleSpinner", false);
                        component.set("v.errorReupload", true); 
                        component.set("v.isDataSubmitted", false);
                        helper.closeModal(component,helper);
                        var text = 'The Error File data as already been submitted, Please Use Re-Upload Button';
                        helper.openErrorSubmittedModal(component, event, helper,text);  
                        
                    }
                    else if (isreupload && (IsCompanyDefault != selCompany  || IsYearDefault != selYear || IsMonthDefault != selperiod))
                    {
                        component.set("v.toggleSpinner", false);
                        component.set("v.errorReupload", true);    
                        helper.closeModal(component,helper);
                        var text = 'The Selected Values in Dropdown does not Match with the Record Values';
                        helper.openErrorSubmittedModal(component, event, helper,text);
                    }
                    else {
                        console.log('##### INSIDE ELSE START AFTER ERRORDATA SUBMITTED isDataAlreadySubmitted #########');
                        if((rowsExists &&  isreupload)||(rowsExists && (batchStatus == '' || batchStatus == '8 - Migration Success'))){
                            var action = component.get("c.dataSubmitted");
                            action.setParams({
                                "companyArray": selCompany,
                                "selperiod": selperiod,
                                "selyear": selYear
                            });   
                            action.setCallback(this, function(response){
                                var state = response.getState();
                                if (state === "SUCCESS"){
                                    var fetchValue =response.getReturnValue();
                                    if(fetchValue > 0){
                                        component.set("v.toggleSpinner", false);
                                        component.set("v.isDataSubmitted", false);                                       
                                        helper.openDataSubmittedModal(component, event, helper);                                        
                                    }else{ 
                                        helper.closeModal(component,helper);
                                        // component.set("v.openBulkUploadConfirmation",true);
                                        //  helper.openBulkUploadConfirmation(component,helper);
                                        var chunk = $A.getCallback(function(results,parser) {
                                              console.log('##### INSIDE CHUNK START #########');
                                            var isreupload  = component.get("v.isReupload");
                                            var selperiod = component.get("v.selectedValues");
                                            var selYear = component.get("v.selectedYear");                
                                            var selCompany = component.get("v.cmpsales.Name");
                                           var myJson = JSON.stringify(results.data);
                                            console.log('myJson:::'+myJson);
                                            var rows = results.data;
                                             var myJsonrows = JSON.stringify(rows);
                                            console.log('rows:::'+rows);
                                            console.log('myJsonrows:::'+myJsonrows);
                                            var companyrow = rows[0].Mainetti_Company__c;
                                            console.log('companyrow:::'+companyrow);
                                            var yearrow = rows[0].Year__c;
                                            console.log('yearrow:::'+yearrow);
                                            var periodrow = rows[0].Period__c;
                                            console.log('periodrow:::'+periodrow);
                                          //  console.log('selCompany:::::'+selCompany.toLowerCase()+'selperiod:::::'+selperiod.toLowerCase()+'companyrow:::::'+companyrow.toLowerCase()+'selYear:::::'+selYear+'yearrow:::::'+yearrow);
                                           /* if(selCompany.toLowerCase() != companyrow.toLowerCase() || selperiod.toLowerCase() != periodrow.toLowerCase()  || selYear != yearrow )
                                            {
                                                var text = 'The Selected Values in Dropdown doesnot Match with the Uploaded File Values / The File Type is Incorrect';
                                                helper.openErrorSubmittedModal(component, event, helper,text);
                                                component.set("v.toggleSpinner", false);
                                                component.set("v.parseSalesFileChunkBoolean",false);
                                                
                                            } */
                                        //    else{
                                                ///////////////////
                                                helper.closeModal(component,helper);
                                                component.set("v.openBulkUploadConfirmation",true);
                                                helper.openBulkUploadConfirmation(component,helper);
                                                var recordType = component.get("v.selectedRecordType");
                                                var file =  component.find("file").getElement().files[0];
                                                var fileName = file.name;  
                                                var fileDelimiters = component.find('fileDelimiter').get('v.value');
                                                console.log('##### INSIDE CHUNK FileName'+ fileName);
                                                
                                                if(rows.length >= 1){       
                                                    var chunkCount = component.get("v.chunkCount");                                                 
                                                    if(!parser.paused()){                           
                                                        parser.pause();
                                                        console.log('##### INSIDE Start Pause ChunkCount'+ chunkCount);
                                                    }
                                                    var batchNo=component.get("v.reuploadBatchNo");                                                                                                 
                                                    component.set("v.chunkCount",(chunkCount+1)); 
                                                    console.log('##### INSIDE CHUNK BEFORE  ####CHUNK COUNT #####'+chunkCount+':BATCHNO:::'+batchNo+':::ROWS LENGTH:::'+rows.length);
                                                    var action = component.get("c.insertBulkSales");
                                                    action.setParams({
                                                        "jsonin": myJson,
                                                        "batchNo": batchNo,
                                                        "recordType": recordType,
                                                        "selcomp": selCompany,
                                                        "selperiod": selperiod,
                                                        "selYear": selYear,
                                                        "isreupload":isreupload,
                                                        "chunkCount":chunkCount,
                                                        "fileName":fileName,
                                                        "fileDelimiters":fileDelimiters
                                                    });                                         
                                                    action.setCallback(this, function(response){
                                                        var state = response.getState();
                                                        var errors = response.getError();
                                                        if (errors && Array.isArray(errors) && errors.length > 0) {                               
                                                            console.log('error callback post creation of Master Record:'+ errors[0].message);
                                                            helper.openErrorModal(component,helper);
                                                            return;                                
                                                        }                
                                                        if (state === "SUCCESS") {
                                                            
                                                            var batchId =response.getReturnValue();   
                                                            console.log('batchId ::'+batchId);
                                                            component.set("v.reuploadBatchNo",batchId);         
                                                            console.log('##### INSIDE CHUNK  isDataSubmitted SUCCESS ## batchId ###### '+ batchId +' ####CHUNK COUNT #####'+chunkCount);                                                        
                                                            if(parser.paused()){  
                                                                var isreUpload  = component.get("v.isReupload"); 
                                                                if(isreUpload){
                                                                    component.set("v.isReupload",false);
                                                                }
                                                                parser.resume();
                                                                console.log('##### INSIDE CHUNK  RESUME #CHUNK COUNT #####'+chunkCount);
                                                                 component.set("v.parseSalesFileChunkBoolean",true);
                                                            }     
                                                        }                            
                                                    });
                                                    $A.enqueueAction(action);
                                                }else{             
                                                }  
                                          //  }
                                        })
                                        
                                        var chunkComplete = $A.getCallback(function(results) {
                                            var parseSalesFileChunkComplete = component.get("v.parseSalesFileChunkBoolean");
                                            console.log('##### START chunkComplete   ####');
                                            if(parseSalesFileChunkComplete){
                                            var batchNo =  component.get("v.reuploadBatchNo");
                                                console.log('##### START CHUNK COMPLETE   ####'+batchNo);
                                            var fileInput = component.find("file").getElement();
                                            var file = fileInput.files[0];
                                            var recordType = component.get("v.selectedRecordType");
                                            
                                            //  console.log('##### START CHUNK COMPLETE   ####'+batchNo);
                                            component.set("v.openBulkUploadConfirmation",false);
                                            helper.parseSalesFileChunk(component,file,batchNo,helper,recordType,true); 
                                        }
                                            
                                        }) 
                                        
                                        var fileInput = component.find("file").getElement();
                                        var fileDelimiter = component.find('fileDelimiter').get('v.value');
                                        var file = fileInput.files[0];                      
                                        
                                       // component.set("v.toggleSpinner", true);                                    
                                        // Papa.LocalChunkSize = 1024*640*1;
                                        //Papa.LocalChunkSize = 1024*704*1;  
                                        Papa.LocalChunkSize = 1024*736*1;  
                                        // Papa.LocalChunkSize = 1024*696*1;  
                                        //Papa.LocalChunkSize = 7680*1;
                                        var parser =  Papa.parse(file,{
                                            delimiter: fileDelimiter,
                                            header: true,
                                            encoding: "UTF-8",
                                            beforeFirstChunk: function( chunk ) {
                                                var rows = chunk.split( /\r\n|\r|\n/ );
                                                var headings = rows[0].split( fileDelimiter );
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
                                                headings[43] = helper.returnSalesHeader(component,helper,headings[43]);
                                                headings[44] = helper.returnSalesHeader(component,helper,headings[44]);
                                                headings[45] = helper.returnSalesHeader(component,helper,headings[45]);
                                                rows[0] = headings.join(fileDelimiter);
                                                return rows.join( '\n' );
                                            },
                                            chunk: chunk,
                                            complete: chunkComplete});                                        
                                    }
                                }
                            });
                            $A.enqueueAction(action);
                        }
                    }
                }
                
            });
            $A.enqueueAction(action);
            return;
        }
        else{
            component.set("v.toggleSpinner", false); 
            helper.openErrorFileFormatModal(component, event, helper);
        }
    },
    parseSalesFileChunk : function(component,file,batchNo,helper,recordType,postBulkInsert) {     
        
        console.log('##### START parseSalesFileChunk ####batchNo::'+batchNo+':::recordType::::::'+recordType+'::::postBulkInsert::::::'+postBulkInsert);
        var selPeriod = component.get("v.selectedValues");
        var selYear = component.get("v.selectedYear");
        console.log('selYear:::'+selYear);
        var selCompany = component.get("v.cmpsales.Name");   
        var complete = $A.getCallback(function(results) {     
            
            var myJson = JSON.stringify(results.data); 
            //making the jason empty as bulk data is inserted via chunk
            if(postBulkInsert){
                myJson = "";
            }
            var submitStatus = component.get("v.submitSales"); 
            if(batchNo != '' && submitStatus){
                var action = component.get("c.parseSalesChunk");
                action.setParams({
                    "jsonin": myJson,
                    "batchNo": batchNo,
                    "recordType": recordType,
                    "selcomp": selCompany,
                    "selPeriod": selPeriod,
                    "selYear": selYear,
                    "postBulkInsert":postBulkInsert                    
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
                        console.log('##### INSIDE SUCCES parseSalesFileChunk #### batchId:::'+batchId);
                        helper.closeBulkUploadConfirmation(component,helper); 
                        //if(batchId != ''){   
                        helper.openFileDataSubmittedModal(component,helper);                                    
                        //}            
                         
                    }
                });
                $A.enqueueAction(action);
                setTimeout(
                            $A.getCallback(function() {
                                $A.get('e.force:refreshView').fire();
                            }), 750000); // Waits 30 seconds    
               
            }else{
                helper.openErrorFileFormatModal(component,helper);
                component.set("v.toggleSpinner", false);
            }
        })
        
        var file =  component.find("file").getElement().files[0];
        var fileDelimiter = component.find('fileDelimiter').get('v.value');
        console.log('parseSalesFileChunk::::fileDelimiter '+fileDelimiter);
        Papa.parse(file,{
            delimiter: fileDelimiter,
            header: true,
            encoding: "UTF-8",
            beforeFirstChunk: function( chunk ) {
                var rows = chunk.split( /\r\n|\r|\n/ );
                var headings = rows[0].split( fileDelimiter );
                
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
                headings[43] = helper.returnSalesHeader(component,helper,headings[43]);
                headings[44] = helper.returnSalesHeader(component,helper,headings[44]);
                headings[45] = helper.returnSalesHeader(component,helper,headings[45]);
                rows[0] = headings.join(fileDelimiter);
                
                return rows.join( '\n' );
            },
            complete: complete});
       // $A.get('e.force:refreshView').fire();
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
    
    openBulkUploadConfirmation: function(component, event, helper) { 
        
        component.set("v.openBulkUploadConfirmation",true);
        
    },
    closeBulkUploadConfirmation: function(component, event, helper) {
        component.set("v.openBulkUploadConfirmation",false); 
        component.set("v.openFileDataSubmitted",false); 
        
    },
    openFileDataSubmittedModal: function(component, event, helper) {
        component.set("v.openFileDataSubmitted",true);
        var modal = component.find("openFileDataSubmitted");
        var modalBackdrop = component.find("openFileDataSubmittedBackdrop");
        $A.util.addClass(modal,"slds-fade-in-open");
        $A.util.addClass(modalBackdrop,"slds-backdrop_open"); 
        
    },
    closeModalopenFileDataSubmittedModal: function(component, event, helper) {
        
        component.set("v.openFileDataSubmitted",false);
        var modal = component.find("openFileDataSubmitted");
        var modalBackdrop = component.find("openFileDataSubmittedBackdrop");
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
    
    returnSalesHeader: function(component,helper,headerName) {
        if(headerName != ""  && headerName != null )
        {             
            if(headerName.trim().toLowerCase() =='Mainetti Company'.trim().toLowerCase()){
                return 'Mainetti_Company__c';
            }else if(headerName.trim().toLowerCase() =='Budget Year'.trim().toLowerCase()){
                return 'Year__c';
            }else if(headerName.trim().toLowerCase() =='Period'.trim().toLowerCase()){
                return 'Period__c';
            }else if(headerName.trim().toLowerCase() =='Business Vertical'.trim().toLowerCase()){
                return 'Business_Vertical__c';
            }else if(headerName.trim().toLowerCase() =='SUBCATEGORY'.trim().toLowerCase()){
                return 'SubCategory__c';
            }else if(headerName.trim().toLowerCase() =='Source'.trim().toLowerCase()){
                return 'Source__c';
            }else if(headerName.trim().toLowerCase() =='Retailer'.trim().toLowerCase()){
                return 'Retailer__c';
            }else if(headerName.trim().toLowerCase() =='Local Currency'.trim().toLowerCase()){
                return 'Local_Currency__c';
            }else if(headerName.trim().toLowerCase() =='ExRate to USD'.trim().toLowerCase()){
                return 'ExRate_to_USD__c';
            }else if(headerName.trim().toLowerCase() =='ExRate To EUR'.trim().toLowerCase()){
                return 'ExRate_to_EUR__c';
            }else if(headerName.trim().toLowerCase() =='Jan Qty'.trim().toLowerCase()){
                return 'Jan_Qty__c';
            }else if(headerName.trim().toLowerCase() =='Jan Budget Gross Sales'.trim().toLowerCase()){
                return 'Jan_Budget_Gross_Sales__c';
            }
                else if(headerName.trim().toLowerCase() =='Jan Budget Net Sales'.trim().toLowerCase()){
                    return 'Jan_Budget_Net_Sales__c';
                }
                    else if(headerName.trim().toLowerCase() =='Feb Qty'.trim().toLowerCase()){
                        return 'Feb_Qty__c';
                    }
                        else if(headerName.trim().toLowerCase() =='Feb Budget Gross Sales'.trim().toLowerCase()){
                            return 'Feb_Budget_Gross_Sales__c';
                        }
                            else if(headerName.trim().toLowerCase() =='Feb Budget Net Sales'.trim().toLowerCase()){
                                return 'Feb_Budget_Net_Sales__c';
                            }
                                else if(headerName.trim().toLowerCase() =='Mar Qty'.trim().toLowerCase()){
                                    return 'Mar_Qty__c';
                                }
                                    else if(headerName.trim().toLowerCase() =='Mar Budget Gross Sales'.trim().toLowerCase()){
                                        return 'Mar_Budget_Gross_Sales__c';
                                    }
                                        else if(headerName.trim().toLowerCase() =='Mar Budget Net Sales'.trim().toLowerCase()){
                                            return 'Mar_Budget_Net_Sales__c';
                                        }
                                            else if(headerName.trim().toLowerCase() =='Apr Qty'.trim().toLowerCase()){
                                                return 'Apr_Qty__c';
                                            }
                                                else if(headerName.trim().toLowerCase() =='Apr Budget Gross Sales'.trim().toLowerCase()){
                                                    return 'Apr_Budget_Gross_Sales__c';
                                                }
                                                    else if(headerName.trim().toLowerCase() =='Apr Budget Net Sales'.trim().toLowerCase()){
                                                        return 'Apr_Budget_Net_Sales__c';
                                                    }
                                                        else if(headerName.trim().toLowerCase() =='May Qty'.trim().toLowerCase()){
                                                            return 'May_Qty__c';
                                                        }
                                                            else if(headerName.trim().toLowerCase() =='May Budget Gross Sales'.trim().toLowerCase()){
                                                                return 'May_Budget_Gross_Sales__c';
                                                            }
                                                                else if(headerName.trim().toLowerCase() =='May Budget Net Sales'.trim().toLowerCase()){
                                                                    return 'May_Budget_Net_Sales__c';
                                                                }
                                                                    else if(headerName.trim().toLowerCase() =='Jun Qty'.trim().toLowerCase()){
                                                                        return 'Jun_Qty__c';
                                                                    }
                                                                        else if(headerName.trim().toLowerCase() =='Jun Budget Gross Sales'.trim().toLowerCase()){
                                                                            return 'Jun_Budget_Gross_Sales__c';
                                                                        }
                                                                            else if(headerName.trim().toLowerCase() =='Jun Budget Net Sales'.trim().toLowerCase()){
                                                                                return 'Jun_Budget_Net_Sales__c';
                                                                            }
                                                                                else if(headerName.trim().toLowerCase() =='Jul Qty'.trim().toLowerCase()){
                                                                                    return 'Jul_Qty__c';
                                                                                }
                                                                                    else if(headerName.trim().toLowerCase() =='Jul Budget Gross Sales'.trim().toLowerCase()){
                                                                                        return 'Jul_Budget_Gross_Sales__c';
                                                                                    }
                                                                                        else if(headerName.trim().toLowerCase() =='Jul Budget Net Sales'.trim().toLowerCase()){
                                                                                            return 'Jul_Budget_Net_Sales__c';
                                                                                        }
                                                                                            else if(headerName.trim().toLowerCase() =='Aug Qty'.trim().toLowerCase()){
                                                                                                return 'Aug_Qty__c';
                                                                                            }
                                                                                                else if(headerName.trim().toLowerCase() =='Aug Budget Gross Sales'.trim().toLowerCase()){
                                                                                                    return 'Aug_Budget_Gross_Sales__c';
                                                                                                }
                                                                                                    else if(headerName.trim().toLowerCase() =='Aug Budget Net Sales'.trim().toLowerCase()){
                                                                                                        return 'Aug_Budget_Net_Sales__c';
                                                                                                    }
                                                                                                        else if(headerName.trim().toLowerCase() =='Sep Qty'.trim().toLowerCase()){
                                                                                                            return 'Sep_Qty__c';
                                                                                                        }
                                                                                                            else if(headerName.trim().toLowerCase() =='Sep Budget Gross Sales'.trim().toLowerCase()){
                                                                                                                return 'Sep_Budget_Gross_Sales__c';
                                                                                                            }
                                                                                                                else if(headerName.trim().toLowerCase() =='Sep Budget Net Sales'.trim().toLowerCase()){
                                                                                                                    return 'Sep_Budget_Net_Sales__c';
                                                                                                                }
                                                                                                                    else if(headerName.trim().toLowerCase() =='Oct Qty'.trim().toLowerCase()){
                                                                                                                        return 'Oct_Qty__c';
                                                                                                                    }
                                                                                                                        else if(headerName.trim().toLowerCase() =='Oct Budget Gross Sales'.trim().toLowerCase()){
                                                                                                                            return 'Oct_Budget_Gross_Sales__c';
                                                                                                                        }
                                                                                                                            else if(headerName.trim().toLowerCase() =='Oct Budget Net Sales'.trim().toLowerCase()){
                                                                                                                                return 'Oct_Budget_Net_Sales__c';
                                                                                                                            }
                                                                                                                                else if(headerName.trim().toLowerCase() =='Nov Qty '.trim().toLowerCase()){
                                                                                                                                    return 'Nov_Qty__c';
                                                                                                                                }else if(headerName.trim().toLowerCase() =='Nov Budget Gross Sales'.trim().toLowerCase()){
                                                                                                                                    return 'Nov_Budget_Gross_Sales__c';
                                                                                                                                }
                                                                                                                                    else if(headerName.trim().toLowerCase() =='Nov Budget Net Sales'.trim().toLowerCase()){
                                                                                                                                        return 'Nov_Budget_Net_Sales__c';
                                                                                                                                    }
                                                                                                                                        else if(headerName.trim().toLowerCase() =='Dec Qty'.trim().toLowerCase()){
                                                                                                                                            return 'Dec_Qty__c';
                                                                                                                                        }else if(headerName.trim().toLowerCase() =='Dec Budget Gross Sales'.trim().toLowerCase()){
                                                                                                                                            return 'Dec_Budget_Gross_Sales__c';
                                                                                                                                        }
                                                                                                                                            else if(headerName.trim().toLowerCase() =='Dec Budget Net Sales'.trim().toLowerCase()){
                                                                                                                                                return 'Dec_Budget_Net_Sales__c';
                                                                                                                                            }
            
                                                                                                                                                else{
                                                                                                                                                    component.set("v.submitSales",false);
                                                                                                                                                    return false;
                                                                                                                                                }
        }
        else{
            component.set("v.submitSales",false);
            return false;
        }
    },
  
    
    getPeriodPicklist: function(component, event , year, company) {
       // alert('year ::'+year);
        var action = component.get("c.getperiodpicklist");
        action.setParams({
            "reviewYear": year,
             "reviewCompany": company
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue(); 
                var partnerCompanyMap = [];
                for(var key in result){
                    partnerCompanyMap.push({key: key, value: result[key]});
                     // partnerCompanyMap.push({key: key, value: result});
                }
                component.set("v.optionss", partnerCompanyMap);
            }
        });
        $A.enqueueAction(action);
    },    

    // Company For Sales
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
    openErrorSubmittedModal: function(component, event, helper,text) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error",
            message: text,
            duration:'5000',
            type: "info",
            mode:"dismissible"
        });
        toastEvent.fire();
        
    },
    SalesFile: function (file) {
        var file = new File([csvWrapper.csvFileContent], csvWrapper.fileName, {type: "text/plain"});    
        var fileContent = atob(csvWrapper.csvFileContent);
        var fileData = new File([fileContent], csvWrapper.fileName, {type: "text/plain"});
        var fileDelimiter = component.find('fileDelimiter').get('v.value');
        console.log('SalesFile::::fileDelimiter '+fileDelimiter);
        Papa.parse(fileData,{
            delimiter: fileDelimiter,
            header: true,
            encoding: "UTF-8",
            beforeFirstChunk: function( chunk ) {
                var rows = chunk.split( /\r\n|\r|\n/ );
                //var headings = rows[0].split( ',' );
                var headings = rows[0].split( fileDelimiter );
                headings[0] = returnSalesHeader(headings[0]);
                headings[1] = returnSalesHeader(headings[1]);
                headings[2] = returnSalesHeader(headings[2]);
                headings[3] = returnSalesHeader(headings[3]);
                headings[4] = returnSalesHeader(headings[4]);
                headings[5] = returnSalesHeader(headings[5]);
                headings[6] = returnSalesHeader(headings[6]);
                headings[7] = returnSalesHeader(headings[7]);
                headings[8] = returnSalesHeader(headings[8]);
                headings[9] = returnSalesHeader(headings[9]);
                headings[10] = returnSalesHeader(headings[10]);
                headings[11] = returnSalesHeader(headings[11]);
                headings[12] = returnSalesHeader(headings[12]);
                headings[13] = returnSalesHeader(headings[13]);
                headings[14] = returnSalesHeader(headings[14]);
                headings[15] = returnSalesHeader(headings[15]);
                headings[16] = returnSalesHeader(headings[16]);
                headings[17] = returnSalesHeader(headings[17]);
                headings[18] = returnSalesHeader(headings[18]);
                headings[19] = returnSalesHeader(headings[19]);
                headings[20] = returnSalesHeader(headings[20]);
                headings[21] = returnSalesHeader(headings[21]);
                headings[22] = returnSalesHeader(headings[22]);
                headings[23] = returnSalesHeader(headings[23]);
                headings[24] = returnSalesHeader(headings[24]);
                headings[25] = returnSalesHeader(headings[25]);
                headings[26] = returnSalesHeader(headings[26]);
                headings[27] = returnSalesHeader(headings[27]);
                headings[28] = returnSalesHeader(headings[28]);
                headings[29] = returnSalesHeader(headings[29]);
                headings[30] = returnSalesHeader(headings[30]);
                headings[31] = returnSalesHeader(headings[31]);
                headings[32] = returnSalesHeader(headings[32]);
                headings[33] = returnSalesHeader(headings[33]);
                headings[34] = returnSalesHeader(headings[34]);
                headings[35] = returnSalesHeader(headings[35]);
                headings[36] = returnSalesHeader(headings[36]);
                headings[37] = returnSalesHeader(headings[37]);
                headings[38] = returnSalesHeader(headings[38]);
                headings[39] = returnSalesHeader(headings[39]);
                headings[40] = returnSalesHeader(headings[40]);
                headings[41] = returnSalesHeader(headings[41]);
                headings[42] = returnSalesHeader(headings[42]);
                headings[43] = returnSalesHeader(headings[43]);
                headings[44] = returnSalesHeader(headings[44]);
                headings[45] = returnSalesHeader(headings[45]);
            
                rows[0] = headings.join(fileDelimiter);
                return rows.join( '\n' );
            },
            complete: function(results) {
                var myJson = JSON.stringify(results.data);
                var csv = Papa.unparse(myJson);
                var file = new File([csv], csvWrapper.fileName, {type: "text/plain"});
                uploadFile(file);
            }
        });
    },
    closeModal: function(component, event, helper) {
        var modal = component.find("inventoryModal");
        var modalBackdrop = component.find("inventoryModalBackdrop");
        $A.util.removeClass(modal,"slds-fade-in-open");
        $A.util.removeClass(modalBackdrop,"slds-backdrop_open");
    },
    deleteDefunctBatch : function(component,helper,batchId) {
        console.log('########INSIDE deleteDefunctBatch:::'+batchId);
        var action=component.get("c.deleteDefunctBatchRecord");
        action.setParams({
            "batchId": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.toggleSpinner", false);
                console.log('Deletion submission successfully');
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        });
        $A.enqueueAction(action);
    },
    viewAdmintoProfileAccess : function(component,helper,batchId) {
        console.log('batchId :::'+batchId);
        var action=component.get("c.hasViewAdminToProfileAccess");
        
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('viewAdmintoProfileAccess:::'+result);
                if(result == true){
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef : "c:budgetAdminAccess",
                        componentAttributes: {
                            batchId : batchId
                        }
                    });
                    evt.fire();
                }
                else
                {
                    var text = 'You can\'t access this page';
                    helper.errorToast(component,event,helper,text);
                    return;
                }
                //  component.set("v.toggleSpinner", false);
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                
            }
        });
        $A.enqueueAction(action);
    },
    errorToast: function(component,event,helper,text){
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title: "Error!",
            message: text,
            type: "error",
            mode:"dismissable"
        });
        toastEvent.fire();
    },
        deleteAdmintoProfileAccess : function(component,helper,batchId) {
        var action=component.get("c.hasViewAdminToProfileAccess");
        
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('deleteAdmintoProfileAccess:::'+result);
                if(result == true){
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef : "c:deleteAdminAccessforBudget",
                        componentAttributes: {
                            batchId : batchId
                        }
                    });
                    evt.fire();
                }
                else
                {
                    var text = 'You can\'t access this page';
                    helper.errorToast(component,event,helper,text);
                    return;
                }
                //  component.set("v.toggleSpinner", false);
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                
            }
        });
        $A.enqueueAction(action);
    },
    viewMaintainceAccess : function(component,helper) {
        
        var action=component.get("c.hasViewAdminToProfileAccess");
        
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if(result == true){
                	component.set("v.MaintainceAdminAccess",true);
                }
                //  component.set("v.toggleSpinner", false);
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                
            }
        });
        $A.enqueueAction(action);
    }
})