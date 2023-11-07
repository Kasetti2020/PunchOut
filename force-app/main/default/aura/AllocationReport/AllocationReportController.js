({
    doInit : function(component, event, helper) {
        component.set('v.AllocationReportColumns', [
            {label: 'Model', fieldName: 'Model', type: 'text'},
            {label: 'Color', fieldName: 'Color', type: 'text'},
            {label: 'Sizer Printer', fieldName: 'SizerPrinter', type: 'text'},
            {label: 'Total Demand', fieldName: 'TotalDemandQty', type: 'number'},
            {label: 'Total Supply', fieldName: 'TotalSupplyQty', type: 'number'},
            {label: 'Variance', fieldName: 'Variance', type: 'number'},
            {label: 'Allocated But Not Approved', fieldName: 'AllocationNotApproved', type: 'number'},
        ]);
    },
    
    onSearch : function(component, event, helper) {
        var selectedRetailer = component.get("v.selectedRetailer");
        var selectedCompany = component.get("v.selectedCompany");
            alert('selectedRetailer:'+selectedRetailer);
            alert('selectedCompany:'+selectedCompany);
    }
})