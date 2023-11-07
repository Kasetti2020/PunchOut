({ 
    doInit : function(component, event,helper,page) 
    {
        helper.GetcustomInfoid(component, event, helper);
        var res = helper.pickListVal(component,component.get("v.SelectedRetailer"),'Retailer_Code_Hidden__c','Order_Country__c');
        helper.getCartCount(component, event, helper);
    },
    Search: function(component, event, helper) 
    {
        component.set("v.page",1)
        helper.productSearch(component, event, helper);
    },
    selectTab : function(component, event, helper) 
    {
        component.set("v.showSpinner",true);
        helper.toCheckSORetailer(component, event, helper,event.getSource().get('v.id'));  
        component.set("v.viewbulk",true);
        component.set("v.selectedFamily",'NULL');
        component.set("v.displayPagination",true);
        component.set("v.catalogVertical",true);
        component.set("v.catalogOrder",false);
        component.set("v.sizerhanger",false);
        component.set("v.careLabelOrder",false);
        
    },
    pageChange: function(component, event, helper) {
        //var spinner = component.find('spinner');
        //$A.util.toggleClass(spinner, "slds-hide");
        var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        component.set("v.page",page);
        
        if(component.get("v.isSearch"))
        {
            helper.productSearch(component, event, helper);
        }
        else
        {
            helper.toGetTabData(component, event, helper,component.get("v.selectedTab"));
        }
    },
    Shipcmp:function(component, event, helper) {
        component.set("v.parentcmp",false);
        component.set("v.isShipcmp",true);
    },  
    //function helps to hide the increment and  decrement of number field
    afterRender: function (component, event, helper) {
        this.superAfterRender();
        
        //disable up, down, right, left arrow keys
        window.addEventListener("keydown", function(e) {
            if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
        
        //disable mousewheel
        window.addEventListener("mousewheel", function(e) {
            e.preventDefault();
        }, false);
        
        window.addEventListener("DOMMouseScroll", function(e) {
            e.preventDefault();
        }, false);
        
    },
    OrderToCompany:function(component, event, helper)
    {
        var compName = event.getSource().get("v.value");
        helper.pickListVal(component,compName,'Order_Country__c','Preferred_Currency__c');
    },
    preferredCurrency:function(component, event, helper)
    {
        component.set('v.selectedFamily','NULL');
        var templist = [];
        component.set('v.fieldList',templist);
    },
    handleCatalogEvent:function(component, event, helper){
        var flag = event.getParam("flag");
        if(flag=='BlockRetailer')
        {
            component.set('v.cartFlag',true);
        }
        else if(flag=='fromSizer')
        {  
            helper.productSearch(component, event, helper);
        }
        else if(flag=='allSizerRemoved' && !component.get('v.CartCount'))
        {
            component.set('v.cartFlag',false);
        }
    },
    bulkAdd:function(component,event,helper)
    {
        var bulkadd='';
        if(component.get('v.selectedTab')=='Hanger Business')            
        {
            bulkadd = component.find("hangerBulkaddId");
        }
        else if(component.get('v.selectedTab')=='Flexible Packaging')
        {
            bulkadd = component.find("fexyBulkaddId");
        }
            else if(component.get('v.selectedTab')=='TLA')
            {
                bulkadd = component.find("tlaBulkaddId");
            }
                else if(component.get('v.selectedTab')=='EAS & RFID')
                {
                    bulkadd = component.find("rfidBulkaddId");
                }
                    else if(component.get('v.selectedTab')=='Labels & Tickets')
                    {
                        bulkadd = component.find("labelBulkaddId");
                    }
        var status=bulkadd.getBulkData();
    },
    
    
     vision: function(cmp, evt, helper) {
    
    cmp.set("v.isVisionPopup",true);
        
    },
     closeModel: function(cmp, evt, helper) {
         
     cmp.set("v.isVisionPopup",false);
    },
    readFile: function (component, event, helper) {
      
        var files = component.get("v.files");
        alert('files :'+files);
        if (files && files.length > 0 && files[0] && files[0][0]) {
            var file = files[0][0];
            if (file.size > 5000000) {
                return alert("The file exceeds the limit of 5MB.");
            }
            var reader = new FileReader();
            reader.onloadend = function () {
                var dataURL = reader.result;
                component.set("v.imageURL", null);
                component.set("v.pictureSrc", dataURL);  
            // FileReader.readAsDataURL()

                 //component.set("v.Label", a);
               // alert(str);
                //helper.upload(component);
            var ret = dataURL.replace('data:image/png;base64,','');
                    //console.log(ret); 
                component.set("v.Label1",dataURL);
                 //alert(component.get("v.Label1"));
           component.find("Id_spinner").set("v.class" , 'slds-show');
        var action=component.get("c.predictInternal");
        action.setParams({
            sample: ret
            
        });
                
        action.setCallback(this,function(response){
            var state=response.getState();
           component.find("Id_spinner").set("v.class" , 'slds-hide');
            alert(state);
            console.log('status:'+  status);
            if(state==='SUCCESS'){
                

                console.log(response.getReturnValue());
                alert(response.getReturnValue().label[0]);
                
                component.set("v.searchKeyword",response.getReturnValue().label[0]);
                document.getElementById("search1").click();
            }
        });
        $A.enqueueAction(action);
            
            
            };
            reader.readAsDataURL(file);
            component.set("v.isVisionPopup",false);
              //alert(reader.readAsDataURL(file));
              
        }
        
    },
    init: function(cmp, evt, helper) {
        var myPageRef = cmp.get("v.pageReference");
        var firstname = myPageRef.state.c__productname;
        if(firstname){
            cmp.set("v.firstname", firstname);
        cmp.set("v.searchKeyword",firstname);
             window.setTimeout(
    $A.getCallback(function() {
       
         document.getElementById("search1").click();  
    }), 4000
);  
            // document.getElementById("search1").click();  
        }
       
        let currentUser = $A.get("$SObjectType.CurrentUser.Email");
        //var  currentUser="selvapmk5@gmail.com";
       // alert('selva'+currentUser);
        var url1=cmp.get("v.RecProUrl1")+currentUser;
        cmp.set("v.RecProUrl1",url1);
        var img1=cmp.get("v.RecProImg1")+currentUser;
        cmp.set("v.RecProImg1",img1);
        var url2=cmp.get("v.RecProUrl2")+currentUser;
        cmp.set("v.RecProUrl2",url2);
        var img2=cmp.get("v.RecProImg2")+currentUser;
        cmp.set("v.RecProImg2",img2);
        var url3=cmp.get("v.RecProUrl3")+currentUser;
        cmp.set("v.RecProUrl3",url3);
        var img3=cmp.get("v.RecProImg3")+currentUser;
        cmp.set("v.RecProImg3",img3);
        
       var url4=cmp.get("v.RecProUrl4")+currentUser;
        cmp.set("v.RecProUrl4",url4);
        var img4=cmp.get("v.RecProImg4")+currentUser;
        cmp.set("v.RecProImg4",img4);
       
      
  // alert($A.get("$SObjectType.CurrentUser.Email")); document.getElementById('search1').click();
  // var message =$A.get("$SObjectType.CurrentUser.Email");
    //    var vfOrigin = "https://" + component.get("v.vfHost");
      //  var vfWindow = component.find("vfFrame").getElement().contentWindow;
        //vfWindow.postMessage(message, vfOrigin);
        
    },
    showRec: function(cmp, evt, helper) {
        cmp.set("v.RecPro",true);
       //document.getElementById('submitForm').click();
        
    },
      handleFilesChange: function (component, event, helper) {
      // This will contain the List of File uploaded data and status
    
        var uploadFile = event.getSource().get("v.files");
          console.log('uploadFile :'+uploadFile);
      var self = this;
      var file = uploadFile[0]; // getting the first file, loop for multiple files
      var reader = new FileReader();
      reader.onload =  $A.getCallback(function() {
      var dataURL = reader.result;
      var base64 = 'base64,';
      var dataStart = dataURL.indexOf(base64) + base64.length;
          console.log('dataStart :'+dataStart);
          alert('dataStart :'+dataStart);
      dataURL= dataURL.substring(dataStart);
         console.log('dataURL :'+dataURL);
           alert('dataURL :'+dataURL);
  
   //component.find("Id_spinner").set("v.class" , 'slds-show');
        var action=component.get("c.predictInternal");
        action.setParams({
            sample: dataURL
            
        });
                
        action.setCallback(this,function(response){
            var state=response.getState();
          // component.find("Id_spinner").set("v.class" , 'slds-hide');
            alert(state);
            console.log('status:'+  status);
            if(state==='SUCCESS'){
                

                //console.log(response.getReturnValue());
                alert(response.getReturnValue().label[0]);
                
                //component.set("v.searchKeyword",response.getReturnValue().label[0]);
           
                document.getElementById("search1").click();
            }
             else if(state == "ERROR"){
                        var errors = response.getError();                       
                           
                            console.log('Error:'+  errors[0].message);
                    }
        });
        $A.enqueueAction(action);
            
  
                 });
      reader.readAsDataURL(file);
       
       component.set("v.isVisionPopup",false);
            },
})