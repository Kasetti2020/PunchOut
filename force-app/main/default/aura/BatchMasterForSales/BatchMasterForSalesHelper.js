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
        
        let monthConvertMap = new Map();
        monthConvertMap.set('Jan',0);
        monthConvertMap.set('Feb',1);
        monthConvertMap.set('Mar',2);
        monthConvertMap.set('Apr',3);
        monthConvertMap.set('May',4);
        monthConvertMap.set('Jun',5);
        monthConvertMap.set('Jul',6);
        monthConvertMap.set('Aug',7);
        monthConvertMap.set('Sep',8);
        monthConvertMap.set('Oct',9);
        monthConvertMap.set('Nov',10);
        monthConvertMap.set('Dec',11);
        
        var action=component.get("c.getAutoPopulateMasterValues");
        action.setParams({
            "batchId": batchId
        });
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                for(var i=0;i<result.length;i++){
                    component.set("v.selectedYear",result[i].Sales_Year__c);
                    component.set("v.cmpsales.Name",result[i].Sales_Company__c);
                    component.set("v.selectedValues",monthConvertMap.get(result[i].Sales_Month__c));
                    
                    component.set("v.IsCompanyDefault", result[i].Sales_Company__c);
                    component.set("v.IsMonthDefault", monthConvertMap.get(result[i].Sales_Month__c));
                    component.set("v.IsYearDefault", result[i].Sales_Year__c);
                    
                }
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
    defaultSales:function(component,helper)
    {
        component.set("v.appName", "SalesUpload");
        component.set("v.itm.Record_Type__c","Sales");
        component.set("v.selectedRecordType","Sales");
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
    
    parseFile : function(component,file,batchNo,helper) {
         var allValid = true;
        var recordType = component.get("v.selectedRecordType");
        if(recordType == "Sales"){
            var selMonthNum = component.get("v.selectedValues");                    
            var selYear = component.get("v.selectedYear");
            var selCompany = component.get("v.cmpsales.Name");
            var monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var date = new Date();
            var selMonth = monthsList[selMonthNum];
            var currentMonth = monthsList[date.getMonth()]; 
            var currentYear =   date.getFullYear();
            if(selCompany == ""){
                document.getElementById('errorMissing').innerHTML='Please Select the Company!';                    
                component.set("v.toggleSpinner", false);
                allValid = false;
                return;
            }
            if(selMonthNum == ""){
                component.set("v.selectedValues",selMonthNum);
                
            }
            if(selYear == ""){
                document.getElementById('errorMissing').innerHTML='Please Select a Year!';                    
                component.set("v.toggleSpinner", false);
                allValid = false;
                return;
            }            
            var getAppName = component.get("v.appName");
            var the_month = date.getMonth();            
            var month = component.find('monthList').get('v.value');
            var isreupload  = component.get("v.isReupload");
            if(selYear == currentYear && !isreupload ){
                if (month > the_month) {
                    document.getElementById('errorMissing').innerHTML='Please select a valid Month for your request.\nThe Current Selection occurs after the Current Month.';                
                    component.set("v.toggleSpinner", false);
                    allValid = false;
                    return;
                } 
            }            
            var presentMonthNum = date.getMonth();  
            
        }   
        component.set("v.isButtonActive", allValid);
        helper.isDataAlreadySubmitted(component, event, helper);
    }, 
    isDataAlreadySubmitted: function (component, event, helper){
        var allValid = true;
        console.log('##### START isDataAlreadySubmitted #########');
        var selMonthNum = component.get("v.selectedValues");
        var selYear = component.get("v.selectedYear");
        var selCompany = component.get("v.cmpsales.Name");
        var monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var date = new Date();
        var selMonth = monthsList[selMonthNum];
        var currentMonth = monthsList[date.getMonth()]; 
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];        
        var rowsExists = false;
        
        var IsMonthDefault = component.get("v.IsMonthDefault");                    
        var IsYearDefault = component.get("v.IsYearDefault");
        var selMonthDup = monthsList[IsMonthDefault];
        var IsCompanyDefault = component.get("v.IsCompanyDefault");
        
        alert(file.size);
        if (file.size > 0) 
        {
            rowsExists = true;
        } 
        if(rowsExists){
            component.set('v.isChunkDataSubmitted',true);
            var action = component.get("c.errordataSubmitted");
            action.setParams({
                "companyArray": selCompany,
                "selmonth": selMonth,
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
                    else if (isreupload && (IsCompanyDefault != selCompany || selMonthDup != selMonth || IsYearDefault != selYear) )
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
                                "selmonth": selMonth,
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
                                            var myJson = JSON.stringify(results.data);
                                            console.log('myJson:::'+myJson);
                                            var rows = results.data;
                                            console.log('rows:::'+rows);
                                            var companyrow = rows[0].Company__c;
                                            var yearrow = rows[0].Year__c;
                                            var monthrow = rows[0].Month__c;
                                           // console.log('selCompany:::::'+selCompany.toLowerCase()+'selMonth:::::'+selMonth.toLowerCase()+'companyrow:::::'+companyrow.toLowerCase()+'monthrow:::::'+monthrow.toLowerCase()+'selYear:::::'+selYear+'yearrow:::::'+yearrow);
                                          /*  if(selCompany.toLowerCase() != companyrow.toLowerCase() || selMonth.toLowerCase() != monthrow.toLowerCase()  || selYear != yearrow )
                                            {
                                                var text = 'The Selected Values in Dropdown doesnot Match with the Uploaded File Values / The File Type is Incorrect';
                                                helper.openErrorSubmittedModal(component, event, helper,text);
                                                component.set("v.toggleSpinner", false);
                                                component.set("v.parseSalesFileChunkBoolean",false);
                                                
                                            } */
                                         //   else{
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
                                                        "selMonth": selMonth,
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
                                                            //alert('Inside Error callBack  '+ errors[0].message);
                                                            helper.openErrorModal(component,helper);
                                                            return;                                
                                                        }                
                                                        if (state === "SUCCESS") {
                                                            
                                                            var batchId =response.getReturnValue();                             
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
                                           // }
                                        })
                                        
                                        var chunkComplete = $A.getCallback(function(results) {
                                            var parseSalesFileChunkComplete = component.get("v.parseSalesFileChunkBoolean");
                                            if(parseSalesFileChunkComplete){
                                            var batchNo =  component.get("v.reuploadBatchNo");
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
                                        
                                        component.set("v.toggleSpinner", true);                                    
                                         Papa.LocalChunkSize = 1024*640*1;
                                        //Papa.LocalChunkSize = 1024*704*1;  
                                       // Papa.LocalChunkSize = 1024*736*1;  
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
                                                headings[46] = helper.returnSalesHeader(component,helper,headings[46]);
                                                headings[47] = helper.returnSalesHeader(component,helper,headings[47]);
                                                headings[48] = helper.returnSalesHeader(component,helper,headings[48]);
                                                headings[49] = helper.returnSalesHeader(component,helper,headings[49]);
                                                headings[50] = helper.returnSalesHeader(component,helper,headings[50]);
                                                headings[51] = helper.returnSalesHeader(component,helper,headings[51]);
                                                headings[52] = helper.returnSalesHeader(component,helper,headings[52]);
                                                headings[53] = helper.returnSalesHeader(component,helper,headings[53]);
                                                 headings[54] = helper.returnSalesHeader(component,helper,headings[54]);
                                                 headings[55] = helper.returnSalesHeader(component,helper,headings[55]);
                                                 headings[56] = helper.returnSalesHeader(component,helper,headings[56]);
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
            console.log('1');
            //making the jason empty as bulk data is inserted via chunk
            if(postBulkInsert){
                myJson = "";
            }
            var submitStatus = component.get("v.submitSales"); 
            console.log('666666666666666666');
            console.log(submitStatus);
            console.log(batchNo);
            if(batchNo != '' && submitStatus){
                var action = component.get("c.parseSalesChunk");
                action.setParams({
                    "jsonin": myJson,
                    "batchNo": batchNo,
                    "recordType": recordType,
                    "selcomp": selCompany,
                    "selMonth": selMonth,
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
            }else{
                 console.log('2');
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
                headings[46] = helper.returnSalesHeader(component,helper,headings[46]);
                headings[47] = helper.returnSalesHeader(component,helper,headings[47]);
                headings[48] = helper.returnSalesHeader(component,helper,headings[48]);
                headings[49] = helper.returnSalesHeader(component,helper,headings[49]);
                headings[50] = helper.returnSalesHeader(component,helper,headings[50]);
                headings[51] = helper.returnSalesHeader(component,helper,headings[51]);
                headings[52] = helper.returnSalesHeader(component,helper,headings[52]);
                headings[53] = helper.returnSalesHeader(component,helper,headings[53]);
                 headings[54] = helper.returnSalesHeader(component,helper,headings[54]);
                 headings[55] = helper.returnSalesHeader(component,helper,headings[55]);
                 headings[56] = helper.returnSalesHeader(component,helper,headings[56]);
                rows[0] = headings.join(fileDelimiter);
                
                return rows.join( '\n' );
            },
            complete: complete});
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
    
    returnColumnHeader: function(component,helper,headerName) {
        if(headerName != ""  && headerName != null )
        {
            if(headerName=='Retailer Code'){
                return 'Retailer_Code__c';
            }else if(headerName=='Mainetti Company'){
                return 'Mainetti_Company__c';
            }else if(headerName=='Inventory Model'){
                return 'Inventory_Model__c';
            }else if(headerName=='Warehouse'){
                return 'Warehouse__c';
            }else if(headerName=='Color'){
                return 'Color__c';
            }else if(headerName=='Sizer Print'){
                return 'Sizer_Print__c';
            }else if(headerName=='Local System SKU'){
                return 'Local_System_SKU__c';
            }else if(headerName=='Source'){
                return 'Source__c';
            }else if(headerName=='Stock In Date'){
                return 'Stock_In_Date__c';
            }else if(headerName=='Stock In Qty'){
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
            if(headerName.trim().toLowerCase() =='Company'.trim().toLowerCase()){
                return 'Company__c';
            }else if(headerName.trim().toLowerCase() =='Year'.trim().toLowerCase()){
                return 'Year__c';
            }else if(headerName.trim().toLowerCase() =='Week'.trim().toLowerCase()){
                return 'Week__c';
            }else if(headerName.trim().toLowerCase() =='Month'.trim().toLowerCase()){
                return 'Month__c';
            }else if(headerName.trim().toLowerCase() =='Local Item Code'.trim().toLowerCase()){
                return 'Item_code__c';
            }else if(headerName.trim().toLowerCase() =='Material'.trim().toLowerCase()){
                return 'Material__c';
            }else if(headerName.trim().toLowerCase() =='Source'.trim().toLowerCase()){
                return 'Source__c';
            }else if(headerName.trim().toLowerCase() =='Model'.trim().toLowerCase()){
                return 'Model__c';
            }else if(headerName.trim().toLowerCase() =='Print'.trim().toLowerCase()){
                return 'Printed_Logo__c';
            }else if(headerName.trim().toLowerCase() =='Color'.trim().toLowerCase()){
                return 'Color__c';
            }else if(headerName.trim().toLowerCase() =='Customer'.trim().toLowerCase()){
                return 'Customer__c';
            }else if(headerName.trim().toLowerCase() =='Customer local name'.trim().toLowerCase()){
                return 'Customer_local_name__c';
            }else if(headerName.trim().toLowerCase() =='Mainetti_Brand'.trim().toLowerCase()){
                return 'Mainetti_Brand__c';
            }
                else if(headerName.trim().toLowerCase() =='Business Vertical'.trim().toLowerCase()){
                    return 'Category__c';
                }
                    else if(headerName.trim().toLowerCase() =='Sub-Category'.trim().toLowerCase()){
                        return 'Sub_Category__c';
                    }
                        else if(headerName.trim().toLowerCase() =='Family'.trim().toLowerCase()){
                            return 'Family__c';
                        }
                            else if(headerName.trim().toLowerCase() =='Order_Type'.trim().toLowerCase()){
                                return 'Order_Type__c';
                            }
                                else if(headerName.trim().toLowerCase() =='Units Sold'.trim().toLowerCase()){
                                    return 'Unit_Sold__c';
                                }
                                else if(headerName.trim().toLowerCase() =='Net Weight(KG) / 1000'.trim().toLowerCase()){
                                    return 'Net_Weight_KG_1000__c';
                                  }
                                    else if(headerName.trim().toLowerCase() =='Gross Unit Price / 100(EUR)'.trim().toLowerCase()){
                                        return 'Unit_Price_100_EUR__c';
                                    }
                                        else if(headerName.trim().toLowerCase() =='Gross Unit Price / 100(USD)'.trim().toLowerCase()){
                                            return 'Unit_Price_100_USD__c';
                                        }
                                            else if(headerName.trim().toLowerCase() =='Standard Unit Prime Cost / 100(EUR)'.trim().toLowerCase()){
                                                return 'Standard_Unit_Cost_100_EUR__c';
                                            }
                                                else if(headerName.trim().toLowerCase() =='Standard Unit Prime Cost / 100(USD)'.trim().toLowerCase()){
                                                    return 'Standard_Unit_Cost_100_USD__c';
                                                }
                                                    else if(headerName.trim().toLowerCase() =='Standard Unit Industrial Cost / 100(EUR)'.trim().toLowerCase()){
                                                        return 'Standard_Unit_Industrial_Cost_100_EUR__c';
                                                    }
                                                        else if(headerName.trim().toLowerCase() =='Standard Unit Industrial Cost / 100(USD)'.trim().toLowerCase()){
                                                            return 'Standard_Unit_Industrial_Cost_100_USD__c';
                                                        }
                                                            else if(headerName.trim().toLowerCase() =='Standard Unit Ex-Work Cost / 100(EUR)'.trim().toLowerCase()){
                                                                return 'Standard_Unit_Ex_Work_Cost_100_EUR__c';
                                                            }
                                                                else if(headerName.trim().toLowerCase() =='Standard Unit Ex-Work Cost / 100(USD)'.trim().toLowerCase()){
                                                                    return 'Standard_Unit_Ex_Work_Cost_100_USD__c';
                                                                }
                                                                    else if(headerName.trim().toLowerCase() =='Net Unit Price / 100(EUR)'.trim().toLowerCase()){
                                                                        return 'Net_Unit_Price_100_EUR__c';
                                                                    }
                                                                        else if(headerName.trim().toLowerCase() =='Net Unit Price / 100(USD)'.trim().toLowerCase()){
                                                                            return 'Net_Unit_Price_100__c';
                                                                        }
                                                                            else if(headerName.trim().toLowerCase() =='Gross Sales EUR'.trim().toLowerCase()){
                                                                                return 'Sales_EUR__c';
                                                                            }
                                                                                else if(headerName.trim().toLowerCase() =='Gross Sales USD'.trim().toLowerCase()){
                                                                                    return 'Sales_USD__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Local Currency'.trim().toLowerCase()){
                                                                                    return 'Transaction_Currency__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Local Currency Exchange rate to 1 EUR'.trim().toLowerCase()){
                                                                                    return 'ExRate_to_EUR__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Local Currency Exchange Rate to 1 USD'.trim().toLowerCase()){
                                                                                    return 'ExRate_to_USD__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Net Unit Price/100 (Local Currency)'.trim().toLowerCase()){
                                                                                    return 'Local_Net_Unit_Pirce_100__c';
                                                                                    }else if(headerName.trim().toLowerCase() =='Gross Unit Price/100 (Local Currency)'.trim().toLowerCase()){
                                                                                    return 'Gross_Unit_Price_100_Local_Currency__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Gross Sales Local Currency'.trim().toLowerCase()){
                                                                                    return 'Sales_Transaction_Currency__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Shipped To - Factory'.trim().toLowerCase()){
                                                                                    return 'Shipped_To_Factory__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Shipped To - Country'.trim().toLowerCase()){
                                                                                    return 'Shipped_To_Country__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Label'.trim().toLowerCase()){
                                                                                    return 'Label__c';
                                                                                }else if(headerName.trim().toLowerCase() =='End-user'.trim().toLowerCase()){
                                                                                    return 'End_user__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Retailer'.trim().toLowerCase()){
                                                                                    return 'Vendor__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Division'.trim().toLowerCase()){
                                                                                    return 'Division__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Retailer_Brand'.trim().toLowerCase()){
                                                                                    return 'Retailer_Brand__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Royalty Rate'.trim().toLowerCase()){
                                                                                    return 'Royalty_Rate__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Market'.trim().toLowerCase()){
                                                                                    return 'Market__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Remark'.trim().toLowerCase()){
                                                                                    return 'Remark__c';
                                                                                }else if(headerName.trim().toLowerCase() =='LOB'.trim().toLowerCase()){
                                                                                    return 'LOB__c';
                                                                                }else if(headerName.trim().toLowerCase() =='SO_Number'.trim().toLowerCase()){
                                                                                    return 'SO_Number__c';
                                                                                }else if(headerName.trim().toLowerCase() =='PO_Number'.trim().toLowerCase()){
                                                                                    return 'PO_Number__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Production Country'.trim().toLowerCase()){
                                                                                    return 'Production_Country__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Total Selling Price (USD)'.trim().toLowerCase()){
                                                                                    return 'Gross_Sales_USD__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Freight and others Charge (USD)'.trim().toLowerCase()){
                                                                                    return 'Freight_Charge_USD__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Sales_Type'.trim().toLowerCase()){
                                                                                    return 'Sales_Type__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Final Sales Destination'.trim().toLowerCase()){
                                                                                    return 'Final_Sales_Destination__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Order Date (DD-MMM-YYYY)'.trim().toLowerCase()){
                                                                                    return 'Sales_Order_Date__c';
                                                                                }else if(headerName.trim().toLowerCase() =='Delivery Date (DD-MMM-YYYY)'.trim().toLowerCase()){
                                                                                    return 'Sales_Delivery_Date__c';
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
                headings[46] = returnSalesHeader(headings[46]);
                headings[47] = returnSalesHeader(headings[47]);
                headings[48] = returnSalesHeader(headings[48]);
                headings[49] = returnSalesHeader(headings[49]);
                headings[50] = returnSalesHeader(headings[50]);
                headings[51] = returnSalesHeader(headings[51]);
                 headings[52] = returnSalesHeader(headings[52]);
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
        var action=component.get("c.hasViewAdminToProfileAccess");
        
        action.setCallback(this,function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('viewAdmintoProfileAccess:::'+result);
                if(result == true){
                    var evt = $A.get("e.force:navigateToComponent");
                    evt.setParams({
                        componentDef : "c:salesAdminAccess",
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
                        componentDef : "c:deleteAdminAccess",
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


    viewMaintainceAccess: function(component, helper) {
        var action = component.get("c.hasViewAdminToProfileAccess");

        action.setCallback(this,function (response) {
            var state = response.getState();
                
                if(state === "SUCCESS"){
                    var result = response.getReturnValue();
                    if(result == true){
                        component.set("v.MaintainceAdminAccess",true);
                    }               
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
                
            }
        });
        $A.enqueueAction(action);
    },
        
    
})