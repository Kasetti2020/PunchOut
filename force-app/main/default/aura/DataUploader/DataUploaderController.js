({
    doInit:function(component, event, helper){
        helper.getVerticles(component);
    },
    DisableValue:function(component, event, helper){
    	//alert(event.getSource().get("v.name"));
        var ind=event.getSource().get("v.name");
        var DestinationIndicator=component.get('v.DestinationIndicator');
        //alert(DestinationIndicator[ind].fieldName);
        var FieldNameValues=component.get('v.FieldNameValues');
        for(var i=0;i<FieldNameValues.length;i++)
        {
            if(FieldNameValues[i].fieldAPI==DestinationIndicator[ind].fieldName)
            {
                //alert(i+'-->'+FieldNameValues[i].fieldAPI);
                //alert('in');
            }
        }
    },
    clearData : function(component, event, helper) {
        component.find("SelectOptions1")[event.target.name].set("v.value","Select QBO Field");
        //component.find("input1")[event.target.name].set("v.value",""); 
        component.find("SelectOptions2")[event.target.name].set("v.value","none");
        component.find("SelectOptions3")[event.target.name].set("v.value","No");
    },
    objectNameSelectHandler : function(component, event, helper) {
        //alert(event.getSource().get("v.name"));
        var ind=event.getSource().get("v.name");
        var DestinationIndicator=component.get('v.DestinationIndicator');
        DestinationIndicator[ind].fieldName="Select QBO Field";
        component.set('v.DestinationIndicator',DestinationIndicator);
    },
    onloadFile : function(component, event, helper) {

        var RetailerValid=component.get("v.RetailerNames");
        //alert('Error check>>>'+Err[0].objectName);
        if(!RetailerValid.Excaretid)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                //"message": "Please select all picklist Value from the QBO ENTITY and Destination Indicator."
                "message": "Please select Retailer"
            });
            toastEvent.fire();
            return;
        }
        else if(RetailerValid.ProductVertical == 'None')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                //"message": "Please select all picklist Value from the QBO ENTITY and Destination Indicator."
                "message": "Please select Product vertical"
            });
            toastEvent.fire();
            return;
        }
        
        //alert('File Size'+component.find("file").getElement().files[0]);
        if(component.find("file").getElement().files[0] === undefined)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                "message": "Please select File"
            });
            toastEvent.fire();
            return;
        }
        
        if(component.get("v.RetailerNames.Excaretid") && component.get("v.RetailerNames.ProductVertical") != 'None')
        {   var clearfile;    
            var getRetailer = component.get("c.TemplateDataActive");
         	var retailerName= component.get("v.RetailerNames.ExcaretName");
            var verticalName= component.get("v.RetailerNames.ProductVertical");    
            getRetailer.setParams(
                { 
                    "RetailedId" : component.get("v.RetailerNames.Excaretid"),
                    "ProductVertical" : component.get("v.RetailerNames.ProductVertical"),
                });
            getRetailer.setCallback(this, function(a) {
                if(a.getReturnValue().length > 0)
                {
                    clearfile=confirm('\''+a.getReturnValue()[0].fieldLabel+'\' Template is already existed for \''+ retailerName + '\' Retailer and \'' + verticalName + '\' Vertical. If you want to save this as active template Click on OK');
                    if(clearfile)
                        helper.uploadFile(component);       
                }
                else
                {
                    helper.uploadFile(component);
                }
                //component.set("v.ExistingTemplateName",a.getReturnValue());
                
            });
            $A.enqueueAction(getRetailer); 
        }
    
    },
    doSave : function(component, event, helper) {
        var Err=component.get("v.DestinationIndicator");
        var ErrFlag=false;
        var ErrFlag1=false;
        var RetailerValid=component.get("v.RetailerNames");
        //alert('Error check>>>'+Err[0].objectName);
        if(!RetailerValid.Excaretid)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                //"message": "Please select all picklist Value from the QBO ENTITY and Destination Indicator."
                "message": "Please select Retailer"
            });
            toastEvent.fire();
            return;
        }
        if(!RetailerValid.FileHeader)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                "message": "Please Enter Template name"
            });
            toastEvent.fire();
            return;
        }
        if(Err == undefined)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                "message": "Please Upload the file before Saving"
            });
            toastEvent.fire();
            return;
        }
        for(var i=0;i<Err.length;i++)
        {
            if(Err[i].objectName == "None")
                ErrFlag1=true;
            //alert(Err[i].fieldName);
            if((Err[i].fieldName == "Select QBO Field") && Err[i].defaultValue == null){
                // if(Err[i].mandatoryField == "Yes")
                ErrFlag=true;  
            }   
        }
        
        if(ErrFlag)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                "message": "Please Select the QBO ENTITY."
            });
            toastEvent.fire();
            return;
        }
        else if(ErrFlag1)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                //"message": "Please select all picklist Value from the QBO ENTITY and Destination Indicator."
                "message": "Please Select Destination Indicator"
            });
            toastEvent.fire();
            return;
        }
         var DestinationIndicator=component.get('v.DestinationIndicator');
        for(var i=0;i<DestinationIndicator.length;i++)
        {
            for(var j=i+1;j<DestinationIndicator.length;j++)
            {
                if((DestinationIndicator[i].fieldName==DestinationIndicator[j].fieldName && DestinationIndicator[i].objectName==DestinationIndicator[j].objectName)
                  || (DestinationIndicator[i].fieldName==DestinationIndicator[j].fieldName && (DestinationIndicator[i].objectName=='Both' || DestinationIndicator[j].objectName=='Both')))
               {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "error",
                        "title": "ERROR!",
                        "message": "Duplicate field '"+DestinationIndicator[i].fieldName+"' found at line "+(i+1)+" & "+(j+1)+"."
                    });
                    toastEvent.fire();
                    return;
                }
            }
        }
        helper.uploadHelper(component, event,helper);
        /*if(component.get("v.RetailerNames.Excaretid") && component.get("v.RetailerNames.ProductVertical") != 'None')
        {          
            var getRetailer = component.get("c.TemplateExist");
            getRetailer.setParams(
                { 
                    "RetailedId" : component.get("v.RetailerNames.Excaretid"),
                    "ProductVertical" : component.get("v.RetailerNames.ProductVertical"),
                });
            getRetailer.setCallback(this, function(a) {
                if(a.getReturnValue() == true)
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "error",
                        "title": "ERROR!",
                        "message": "Template is already existed for this retailer and Product vertical"
                    });
                    toastEvent.fire();
                    return;
                }
                else{
                    component.set("v.ErrorMessage","v.DestinationIndicator");
        helper.uploadHelper(component, event,helper);
                }
                
            });
            $A.enqueueAction(getRetailer); 
        }*/

        
        /*if (component.find("file").get("v.files").length > 0) {
            helper.uploadHelper(component, event);
        } else {
            alert('Please Select a Valid File');
        }*/
    },
    onload : function(component, event, helper) {
        
        var getActionWrapperHeader = component.get("c.FieldValues");
        getActionWrapperHeader.setCallback(this, function(a) { 
            component.set("v.FieldNameValues",a.getReturnValue()); 
        });
        
        $A.enqueueAction(getActionWrapperHeader);
        
        var getRetailer = component.get("c.RetailCodes");
        getRetailer.setCallback(this, function(a) { 
            component.set("v.RetailNames",a.getReturnValue()); 
        });
        $A.enqueueAction(getRetailer);
    },
    handleFilesChange: function(component, event, helper) {
        helper.DisplayFileName(component, event, helper);
    } ,
    FieldNameChange : function(component, event, helper) {
        //alert(event.target.name);
        //alert(component.find("SelectOptions1")[event.target.name]);
    },
    handleLookupValueselected: function (component, event, helper) {
        if(event.getParam("objectAPIName")==='Retailer_Code__c'){
            var getRetailer = component.get("c.TemplateData");
            
            getRetailer.setParams(
                { 
                    "RetailedId" : component.get("v.RetailerNames.Excaretid"),
                    "ProdVertical" : component.get("v.RetailerNames.ProductVertical"),
                });
            
            getRetailer.setCallback(this, function(a) {
                //alert('return Value'+a.getReturnValue());
                component.set("v.RetailNameValues",a.getReturnValue());
                
            });
            
            $A.enqueueAction(getRetailer);  
        }
    },
    PickRetailName:  function (component, event, helper) {
        var pickValChange=component.find("SelectOptions4");
        var onRetailchange=component.get("v.RetailerNames.Excaretid");
        component.set("v.selectedTemplate",pickValChange.get("v.value"));
        var noneTemp=component.get("v.selectedTemplate");
        if(noneTemp == "none")
            return;
        component.set("v.createContactFlag",true);    
    },
    ActiveTemplates:function (component, event, helper) {
        helper.activeTemp(component, event,helper);
    },
    closeTemplate:  function (component, event, helper) {
        component.set("v.createContactFlag",false);
        component.set("v.ActiveTemplateFlag",false);
    },
    ChangeActiveTemplate :function (component, event, helper) {
        component.set("v.ActiveTemplateFlag",true);  
    },
    CancelActiveTemplate : function (component, event, helper) {
        component.set("v.ActiveTemplateFlag",false); 
        component.set("v.RetailerNames.ActiveTemp",false);
    },
    CancelUpload : function (component, event, helper) {
        var clearfile=confirm('Uploaded data will be cleared');
        if(clearfile)
        {
            component.set("v.DestinationIndicator",undefined);
            component.set("v.RetailerNames.FileHeader",undefined);
            //component.set("v.RetailerNames.ActiveTemp",undefined);
            component.set("v.RetailerNames.Excaretid",undefined);
            component.set("v.RetailerNames.ProductVertical",'None');
            component.find("file").getElement().value='';
            component.set("v.fileName",'');
            component.set("v.DisableUpload",false);    
        }
    },
    ClearPickValue : function (component, event, helper) {
        if(!component.get('v.RetailerNames.Excaretid'))
        {
            component.find('SelectOptions4').set('v.value','none');
        }
    },
    
    
})