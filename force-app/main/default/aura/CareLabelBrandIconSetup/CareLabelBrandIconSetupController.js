({
    myAction : function(component, event, helper) {
    },
    handleLookupEvent : function(component, event, helper) 
    {
       // if(event.getParam("objectAPIName") == "Retailer_Code__c")
       // {
            //var spinner = component.find('spinner');
            //$A.util.removeClass(spinner, 'slds-hide');
            //alert('result'+component.get('v.retailerID'));
            if(component.get('v.retailerID')!=null && component.get('v.productID')!=null )
            { 
                helper.geticons(component, event, helper);
                component.set("v.SetupFlag",true);
                component.set('v.BrandIconsetup', { 'sobjectType': 'Brand__c'});
                
            }else{
                component.set("v.Brands",[]); 
                
            }
        //}
    },
     checkingExist : function(component, event, helper) 
    {
        if(component.get('v.retailerID')!=null && component.get('v.productID')!=null)
     {
        helper.ExistingData(component, event, helper);    
     }
    },
     onchangedSelected : function(component, event,helper) { 
        var checkimagevalue = component.find("checkimageNames");
        var selectedId=event.getSource().get("v.text");
        /// alert('selectedId>>>>'+selectedId);
        component.set("v.Imageid",selectedId);
        var resetCheckboxValue = false;
        if (Array.isArray(checkimagevalue)) {
            checkimagevalue.forEach(function(checkbox) {
                checkbox.set('v.value', resetCheckboxValue);
            });  
        }
        else {
            checkimagevalue.set('v.value', resetCheckboxValue);
        }
        event.getSource().set("v.value",true);
    },
    
    Editimagemodel : function(component, event, helper)
    {
        // alert('inside');
        var imgfield =component.get("v.Imageid");
        //  alert('imgfield>>>'+imgfield);
        if(imgfield!=null){
            component.set("v.isEditImageModal",true);
        }else{
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Select_Image_Edit_Record"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();  
            
        }
    },
     submitSetup1 : function(component, event, helper) 
    {   
        var imgfield =component.get("v.Imageid");
        //alert('imgfield>>>>'+imgfield);
        var files=component.find("fileId1").get("v.files");
        if(files!=undefined &&  files!=null && files.length!=undefined )
        {
            if (component.find("fileId1").get("v.files").length > 0) {
                helper.uploadHelper1(component, event,helper);
               // helper.updateinstruct1(component, event, helper);
            } else {
                alert($A.get('$Label.c.Please_Select_a_Valid_File'));
            }
        }else{
            alert($A.get('$Label.c.Please_Select_a_Valid_File')); 
        }   
    },
      Deleterecord : function(component, event, helper)
    {
        var imgfield =component.get("v.Imageid");
       //  alert('imgfield>>>'+imgfield);
        if(imgfield!=null){
          helper.deletebrand(component, event, helper);  
        }else{
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Select_Deleting_Record"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();  
        }   
    },
    
     handleFilesChange1: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.ImagefileName", fileName);
    },
    
    retailerChangeEvent : function(component, event, helper)
    {
        component.set("v.BrandIconsetup.Art_Code__c",''); 
        component.set("v.fileName", '');
        if(component.get('v.retailerName'))
        {
             component.set("v.SetupFlag",false);
             component.set("v.productID",null);
             component.set("v.productName",null);
             //component.set("v.Brands",null);
        }else{
            //alert('Inside')
            component.set("v.BrandIconsetup.Art_Code__c",''); 
        }
    },
    closeConfigurator : function(component, event, helper) 
    {
        // alert('Test4');
        //component.set("v.configuratorFlag",false);
    },
    
    checkval : function(component, event, helper) 
    {
           var brandSetup = component.get("v.BrandIconsetup");
           var art=JSON.stringify(brandSetup.Art_Code__c);
           var artcode=component.find("acodeid").get("v.value");
       
        if(artcode===" "){
             component.set("v.BrandIconsetup.Art_Code__c", null); 
        }
    },
    submitSetup : function(component, event, helper) 
    {
              var retailer=component.get("v.retailerID");
              var proid=component.get("v.productID");
              var brandSet = component.get("v.BrandIconsetup");
             var arts=brandSet.Art_Code__c;
        
         if(retailer!=undefined &&  retailer!=null && proid!=undefined && brandSet.Art_Code__c!=null && brandSet.Art_Code__c!=undefined && arts!=" ")
         {
               var action = component.get("c.duplicateartcode");
                action.setParams({
                        retailerids: component.get("v.retailerID"),
                        proid:component.get("v.productID"),
                         arts:arts
                     });
             action.setCallback(this, function(response) {
                var state = response.getState();
                var returnval=response.getReturnValue();
              //  alert('state>>>'+returnval);
                if(returnval!=null){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Art_code_should_not_allow_Duplicate"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'dismissible'
                    });
                    toastEvent.fire(); 
                    
                }else{
                helper.helperdata(component, event, helper); 
                   } 
                   });
            $A.enqueueAction(action);
        
         }else{
              helper.helperdata(component, event, helper); 
         }
    },
    
    
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
    },
    selectedIcon : function(component, event, helper) 
    {
        var selct  =component.find("act").get("v.value");
        var action = component.get("c.selectediconval");
        var proid =component.get("v.retailerID");
      //  alert('proid>>>'+proid);
        
        action.setParams({
            'selectedids': selct,
            'prod':proid
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
            var restult =JSON.stringify(configRecord);
            if (state === "SUCCESS") 
            {
                var configRecord=response.getReturnValue();
                component.set("v.BrandIconsetup",configRecord);
                component.set("v.BrandIconsetup",configRecord);
            }
            else if(state="ERROR"){
                component.set('v.BrandIconsetup', { 'sobjectType': 'Brand__c'}); 
            }
                else
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type":"error",
                        "title": $A.get("$Label.c.Error"),
                        "message": response.getReturnValue()
                    });
                    toastEvent.fire();
                }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, 'slds-hide');
        });
        $A.enqueueAction(action);
    },
    cancelmethod: function(component, event, helper) {
        component.set("v.retailerID",null);
        component.set("v.SetupFlag",false);
    },
      closeBrandModel: function(component, event, helper) {
        component.set("v.isEditOpenModal", false);
        component.set("v.Imageid", null);
    },
    closeimageModel: function(component, event, helper) {
        component.set("v.isEditImageModal", false);
        component.set("v.ImagefileName", '');
    },
    
})