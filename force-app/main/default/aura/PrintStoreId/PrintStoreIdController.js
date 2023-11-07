({
   doInit: function(component, event, helper) {
     helper.openModel(component, event, helper);
   },

   closeModel: function(component, event, helper) {
      component.set("v.isModalOpen", false);
      var domain = window.location.origin;
      window.location.replace(domain+'/lightning/o/Carton_Details__c/list?filterName=Recent');
   },

   submitDetails: function(component, event, helper) {
      component.set("v.isModalOpen", false);
        var storeSelected = component.get("v.selectedStore");
        var id = [storeSelected.Retailer_Code__c,storeSelected.Customer_Warehouse__c];
        helper.generatePDF(component,event,helper, id); 
   },

     formonload: function(component, event, helper){
      var retailer = (component.find("retailer").get("v.value"));
      console.log("retailer selected"+retailer);
       if(retailer!=null){
         component.set("v.retailerSelected", true);
        }
        if(retailer==''){
          component.find("searchUserValue").set("v.value",'')
         component.set("v.retailerSelected", false);
         component.set("v.printPdfBtn", false);
       }
     },


    //  Custom Look up
    keyPressUserController : function(component, event, helper) {
      var getInputkeyWord = component.get("v.SearchUserKeyWord");
      if( getInputkeyWord.length > 0 ){             
          var forOpen = component.find("searchUserRes");
          $A.util.addClass(forOpen, 'slds-is-open');
          $A.util.removeClass(forOpen, 'slds-is-close');
          component.set("v.printPdfBtn", false);
          helper.loadStoreIds(component,event,getInputkeyWord);
      }
      else{  
          component.set("v.listOfUserSearchRecords", null ); 
          var forclose = component.find("searchUserRes");
          $A.util.addClass(forclose, 'slds-is-close');
          $A.util.removeClass(forclose, 'slds-is-open');
      }
  },
  keyPressRetailerController : function(component, event, helper) {
      var getInputkeyWord = component.get("v.SearchRetailerKeyWord");
      if( getInputkeyWord.length > 0 ){             
          var forOpen = component.find("searchRetailerRes");
          $A.util.addClass(forOpen, 'slds-is-open');
          $A.util.removeClass(forOpen, 'slds-is-close');
          component.set("v.printPdfBtn", false);
          component.set("v.retailerSelected",false);
          component.set("v.searchUserValue",null);
          helper.loadRetailerIds(component,event,helper,getInputkeyWord);
      }
      else{  
          component.set("v.listOfRetailerRecords", null ); 
          var forclose = component.find("searchRetailerRes");
          $A.util.addClass(forclose, 'slds-is-close');
          $A.util.removeClass(forclose, 'slds-is-open');
      }
  },
  handleComponentEvent : function(component, event, helper) {
    var selectedrecordByEvent = event.getParam("recordByEvent");
    var selectedUserrecordByEvent = event.getParam("recordUserByEvent");
    if(selectedUserrecordByEvent.RTS_Retailer__c==true){
      component.set("v.selectedRetailer",selectedUserrecordByEvent);
      component.set("v.retailerSelected",true)
      component.find("searchRetailer").set("v.value",selectedUserrecordByEvent.Name);
    }
    if(selectedUserrecordByEvent.Type__c== 'Store'){
      component.set("v.selectedStore",selectedUserrecordByEvent);
      component.set("v.printPdfBtn", true);
      var disp =selectedUserrecordByEvent.Name+ ' '+selectedUserrecordByEvent.Store_Name__c;
      component.find("searchUserValue").set("v.value",disp);
    }
}, 
onblur : function(component,event,helper){       
  component.set("v.listOfSearchRecords", null );
  component.set("v.listOfRetailerRecords", null );
  var forclose = component.find("searchRes");
  $A.util.addClass(forclose, 'slds-is-close');
  $A.util.removeClass(forclose, 'slds-is-open');
  //for store
  component.set("v.listOfUserSearchRecords", null );
  var forclose = component.find("searchUserRes");
  $A.util.addClass(forclose, 'slds-is-close');
  $A.util.removeClass(forclose, 'slds-is-open');
  //for retailer
  component.set("v.listOfRetailerRecords", null );
  var forclose = component.find("searchRetailerRes");
  $A.util.addClass(forclose, 'slds-is-close');
  $A.util.removeClass(forclose, 'slds-is-open');
},
clearUser :function(component,event,heplper){
  var pillTarget = event.getSource().get('v.label');
  var getSelectdUserList = component.get("v.selectedUserRecordClone");
  for(var i = 0; i < getSelectdUserList.length; i++){
      if(getSelectdUserList[i] == pillTarget){
          getSelectdUserList.splice(i, 1);
          component.set("v.selectedUserRecordClone", getSelectdUserList);
      }  
  }
  component.set("v.SearchUserKeyWord",null);
  component.set("v.listOfUserSearchRecords", null );
  component.set("v.selectedSkillsetExp",null);
},
})