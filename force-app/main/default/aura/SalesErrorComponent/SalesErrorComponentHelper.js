({
	initializeErrorData : function(component, event, helper, page, recordToDisplay,batchId,totalRecords) {
        var missingData = component.get("v.missingData");
        var validationFailed = component.get("v.validationFailed");
        var warning = component.get("v.warning");
        var calculationFailed = component.get("v.calculationFailed");
        var dateMismatch = component.get("v.dateMismatch");
        var remarks = component.get("v.remarks");      
        var recordToDisplay = component.find("pageSize").get("v.value");
        var totalRecords = component.get("v.TotalRecords");
        var action = component.get("c.fetchsalesErrorData");  
        action.setParams({ 
            "pageNumber": page,
            "recordToDisplay": recordToDisplay,
            "batchId": batchId, 
            "missingData": missingData,
            "validationFailed":validationFailed,
            "warning":warning,
            "calculationFailed":calculationFailed,
            "dateMismatch":dateMismatch,
            "remarks":remarks,
            "totalRecords":totalRecords
        }); 
        
       action.setCallback(this, function(response) { 
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue(); 
                component.set("v.errorValues", result.salesTransStageList);
                component.set("v.PageNumber", result.pageNumber);
                component.set("v.TotalRecords", result.totalRecords);
                component.set("v.RecordStart", result.recordStart);
                component.set("v.RecordEnd", result.recordEnd);
                component.set("v.TotalPagess", Math.ceil(result.totalRecords / recordToDisplay));
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(JSON.stringify(errors));
            }             
        });        
        $A.enqueueAction(action); 
	},
    
    /*
     * this function will build table data
     * based on current page selection
     * */
    buildData : function(component, helper) {
        var data = [];
        var pageNumber = component.get("v.currentPageNumber");
        console.log('build data :::: pageNumber:::'+pageNumber);
        var pageSize = component.get("v.pageSize");
        console.log('pageSize:::'+pageSize);
        var allData = component.get("v.allData");
         var x = (pageNumber-1)*pageSize;
        
        var counter = 1;
        //creating data-table data
        for(; x<=(pageNumber)*pageSize; x++){
            console.log('x:::'+x);
            if(counter <=pageSize){
                if(allData[x]){
                    data.push(allData[x]);
                }
            }
            counter ++ ;
        }
        component.set("v.data", data);
        
        helper.generatePageList(component, pageNumber);
    },
    
    /*
     * this function generate page list
     * */
    generatePageList : function(component, pageNumber){
        pageNumber = parseInt(pageNumber);
        var pageList = [];
        var totalPages = component.get("v.totalPages");
        if(totalPages > 1){
            if(totalPages <= 10){
                var counter = 2;
                for(; counter < (totalPages); counter++){
                    pageList.push(counter);
                } 
            } else{
                if(pageNumber < 5){
                    pageList.push(2, 3, 4, 5, 6);
                } else{
                    if(pageNumber>(totalPages-5)){
                        pageList.push(totalPages-5, totalPages-4, totalPages-3, totalPages-2, totalPages-1);
                    } else{
                        pageList.push(pageNumber-2, pageNumber-1, pageNumber, pageNumber+1, pageNumber+2);
                    }
                }
            }
        }
        component.set("v.pageList", pageList);
    },
})