({ 
    doInit:function(component, event, helper){
        helper.getVerticles(component);
        
    },
    PickTemplateName:function(component, event, helper){
        helper.fetchTemplate(component);
        
    },
    viewTemplate:function(component, event, helper){
        helper.getTemplateData(component);    
    },
    closeTemplate:  function (component, event, helper) {
        component.set("v.createContactFlag",false);
    },
    Uploadfile : function(component, event, helper) {
        helper.save(component);
    },
    handleFilesChange: function(component, event, helper) {
        helper.DisplayFileName(component, event, helper);
    },
    
    downloadError : function(component, event, helper) {
        helper.download(component, event, helper);
    },
    OkayConform:function(component, event , helper){
        component.set("v.footer",true);
    },
    SavePO:function(component, event, helper){
        helper.POHelper(component);
    },
    cancel:function(component, event, helper){
        component.set("v.Next",false);
        helper.CancelUpload(component);
        //location.reload();
    },
    ok:function(component, event, helper){
        location.reload();
    },
    downloadTemplate:function(component, event, helper){
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var Verticalname=component.get("v.RetailNamesNProdVertical.ProdVertical");
        var templateName=component.get("v.RetailNamesNProdVertical.Tempalte");
        //alert('Verticalname '+Verticalname + ' templateName '+templateName);
        var action = component.get("c.getVariableTemplateDat");
        action.setParams(
            { 
                // UserId : UserIds,
                ProdVertical : component.get("v.RetailNamesNProdVertical.ProdVertical"),
                TemplateName : component.get("v.RetailNamesNProdVertical.Tempalte"),
            });
        
        action.setCallback(this, function(response) { 
            var state = response.getState();
            if(state == "SUCCESS")
            {   
                var returnValues=response.getReturnValue();
                //alert('returnValues :::'+returnValues);
                
                var urlString = window.location.href;
                var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
                var url = CommunityBaseURL+'/apex/VariableDataMappingVFP?ListId='+returnValues;
                console.log('url ::'+url);
                window.open(url);
            }
        });
        
        // component.set("v.createContactFlag",true);
        $A.enqueueAction(action);
    }
})