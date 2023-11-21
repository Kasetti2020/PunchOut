public without sharing class UtilityClass 
{
    
    //returns single record of contact of current loggedin user, or null if the user don't have contact
    @AuraEnabled
    public static contact getCurrentUserContact()
    {
        Contact userContact;
        Id currentuserId = UserInfo.getUserId();
        system.debug('currentuserId>>>>'+currentuserId);
        User currentUser = [select id,name,Email, ContactId from user where id=:currentuserId];
        //User currentUser = [select id,name,Email, ContactId from user where Username='vidit123@dispostable.com']; //005p0000002aBZ1AAM
        system.debug('ContactId>>>>'+currentUser.ContactId);
        if(currentUser.ContactId !=null)
        {
            userContact = [Select id,name, Status__c, accountId, Account_Record_Type_Id__c, Order_to_Company__c, Order_to_Company1__c, Preferred_Currency__c, Preferred_Currency1__c, Supplier_Code__c, Manufacturer_Code__c, Email, HasOptedOutOfEmail, Customer_Information__c,(select id,Retailer_Code__c,Retailer_Code__r.MagNET_Catalog_Order__c from Contact_Related_Retailers__r where Retailer_Code__r.MagNET_Catalog_Order__c = true) from Contact where id=:currentUser.ContactId];         //code added based on checkbox retailes filter are added by chandana
            system.debug('userContact : '+userContact);
            return userContact;
        }
        else
        {
            return null;
        }
    } 
    
    //returns multiple records of retailers related to currently loggedin User, or null if there are none
    @AuraEnabled
    public static List<Retailer_Code__c> getContactRelatedRetailer()
    {
        List<Retailer_Code__c> listOfRetailers = new List<Retailer_Code__c>();
        
        Contact userContact = getCurrentUserContact();
        system.debug('userContact>>'+userContact.Customer_Information__c);
        if(userContact.Contact_Related_Retailers__r.size()>0)
        {
            Set<Id> retailerIds = new Set<Id>();
            for(Contact_Related_Retailer__c crr:userContact.Contact_Related_Retailers__r)
            {
                	retailerIds.add(crr.Retailer_Code__c);
            }
            
            listOfRetailers = [Select id,name, Account__c, Display_Image_In_Document__c, Online_Enquiry__c, Show_Price_in_Order__c, Full_Box_Order__c, Country__c, CurrencyIsoCode, (SELECT Id, name FROM Attachments) from Retailer_Code__c where id IN:retailerIds ];
            system.debug('listOfRetailers : '+listOfRetailers);
            return listOfRetailers;
        }
        else
        {
            return null;
        }
    }
    //returns single record of active salesorder that is saved as cart, or null if there are none
    @AuraEnabled
    public static Sales_Order__c getSORecordAsCart(Id customerInfo)
    {
        List<Sales_Order__c> cartSo = [select id,name, CurrencyIsoCode, OrderSource__c, Retailer__r.name, Retailer_Code1__c,Retailer_Code1__r.Name,Retailer_Code1__r.Market_Segment__c, Vertical__c, Company__c,Supplier__r.Name,Supplier_Contact__c,Supplier_Contact__r.Name,Supplier_Contact__r.Email,Sales_Order_Number_For_Report__c,Retailer_Code2__c,Supplier1__c from Sales_Order__c where Supplier__c  =: customerInfo AND recordtype.name='Cart' limit 1];
        if(cartSo.size()==1)
        {
            return cartSo[0];
        }
        else
        {
            Sales_Order__c emptySO = new Sales_Order__c();
            return emptySO;
        }
    }
    //returns a map of picklist values of order to company, key of the map will be API name if keyIsAPIName is true
    @AuraEnabled
    public static Map<String,String> getOrderToCompanyPicklist(boolean keyIsAPIName)
    {
        Schema.DescribeFieldResult companyResult = Online_Enquiry__c.Order_Country__c.getDescribe();
        List<Schema.PicklistEntry> values = companyResult.getPicklistValues();
        
        Map<String,String> companyPicklistMap = new Map<String,String>();
        for( Schema.PicklistEntry v : values) 
        {
            if(keyIsAPIName)
            {
                companyPicklistMap.put(v.getValue(),v.getLabel());
            }
            else            {
                companyPicklistMap.put(v.getLabel(),v.getValue());
            }
        }
        return companyPicklistMap;
    }
    
    //returns a map of picklist values of preferred currency, key of the map will be API name if keyIsAPIName is true
    @AuraEnabled
    public static Map<String,String> getPreferredCurrencyPicklist(boolean keyIsAPIName)
    {
        Schema.DescribeFieldResult currencyResult = Online_Enquiry__c.Preferred_Currency__c.getDescribe();
        List<Schema.PicklistEntry> values = currencyResult.getPicklistValues();
        
        Map<String,String> currencyPicklistMap = new Map<String,String>();
        for( Schema.PicklistEntry v : values) 
        {
            String [] currencySplit = v.getValue().split('-');
            String ResCurr = currencySplit[0].trim();
            if(keyIsAPIName)
            {
                currencyPicklistMap.put(ResCurr,v.getLabel());
            }
            else            {
                currencyPicklistMap.put(v.getLabel(),ResCurr);
            }
        }
        return currencyPicklistMap;
    }
    
    public static String getAllFields(String objectName){
        
        Map<String, Schema.SObjectField> fMap = Schema.getGlobalDescribe().get(objectName.toLowerCase()).getDescribe().Fields.getMap();
        list<string> selectFields = new list<string>();
        String selectFieldsInString = '';
        if (fMap != null){
            for (Schema.SObjectField ft : fMap.values()){
                Schema.DescribeFieldResult fd = ft.getDescribe();
                if (fd.isCreateable()){ // field is creatable
                    system.debug('fd name:'+fd.getName());
                    selectFields.add(fd.getName());
                }
            }
        }
        system.debug('selectFields:::'+selectFields);
        if (!selectFields.isEmpty()){
            for (string s:selectFields){
                selectFieldsInString += s + ',';
            }
            if (selectFieldsInString.endsWith(',')){
                selectFieldsInString = selectFieldsInString.substring(0,selectFieldsInString.lastIndexOf(','));
            }
        }
        return selectFieldsInString;
    }
    
    //to assign Bill to addess to SO
    public static Sales_Order__c assignBillToAdd(Sales_Order__c sOrder,Ship_Bill_Address__c BillAddress)
    {
        sOrder.Bill_to_Address__c = BillAddress.Id;
        sOrder.Bill_to_Factory__c = BillAddress.Factory_Name__c!=null?BillAddress.Factory_Name__c:'';
        sOrder.Bill_to_Company__c = BillAddress.Company_Name__c!=null?BillAddress.Company_Name__c:'';
        sOrder.Bill_To_Address1__c = BillAddress.Address_1__c!=null?BillAddress.Address_1__c:'';
        //sOrder.Bill_To_Address2__c = BillAddress.Address_2__c!=null?BillAddress.Address_2__c:'';
        sOrder.Bill_to_City__c = BillAddress.City__c!=null?BillAddress.City__c:'';
        sOrder.Bill_to_State__c = BillAddress.State__c!=null?BillAddress.State__c:'';
        sOrder.Bill_to_Country__c = BillAddress.Country__c!=null?BillAddress.Country__c:'';
        sOrder.Bill_to_Postcode__c = BillAddress.Postcode__c!=null?BillAddress.Postcode__c:'';
        sOrder.Bill_to_Email__c = BillAddress.Email_Address__c!=null?BillAddress.Email_Address__c:'';
        sOrder.Bill_to_Tel__c = BillAddress.Tel_No__c!=null?BillAddress.Tel_No__c:'';
        sOrder.Bill_to_Fax__c = BillAddress.Fax_No__c!=null?BillAddress.Fax_No__c:'';  
        return sOrder;
    }
    
    //to assign ship to addess to SO
    public static Sales_Order__c assignShipToAdd(Sales_Order__c sOrder,Ship_Bill_Address__c shipAddress)
    {
        sOrder.Ship_to_Address__c = shipAddress.Id;
        sOrder.Ship_to_Factory__c = shipAddress.Factory_Name__c!=null?shipAddress.Factory_Name__c:'';
        sOrder.Ship_to_Company__c = shipAddress.Company_Name__c!=null?shipAddress.Company_Name__c:'';
        sOrder.Ship_to_Address1__c = shipAddress.Address_1__c!=null?shipAddress.Address_1__c:'';
        //sOrder.Ship_to_Address2__c = shipAddress.Address_2__c!=null?shipAddress.Address_2__c:'';
        sOrder.Ship_to_City__c = shipAddress.City__c!=null?shipAddress.City__c:'';
        sOrder.Ship_to_State__c = shipAddress.State__c!=null?shipAddress.State__c:'';
        sOrder.Ship_to_Country__c = shipAddress.Country__c!=null?shipAddress.Country__c:'';
        sOrder.Ship_to_Postcode__c = shipAddress.Postcode__c!=null?shipAddress.Postcode__c:'';
        sOrder.Ship_to_Email__c = shipAddress.Email_Address__c!=null?shipAddress.Email_Address__c:'';
        sOrder.Ship_to_Tel__c = shipAddress.Tel_No__c!=null?shipAddress.Tel_No__c:'';
        sOrder.Ship_to_Fax__c = shipAddress.Fax_No__c!=null?shipAddress.Fax_No__c:'';  
        return sOrder;
    }
}