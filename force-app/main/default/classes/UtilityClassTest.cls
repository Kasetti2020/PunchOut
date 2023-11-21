@IsTest
public class UtilityClassTest 
{
    @IsTest(seeAllData=false)
    public static void UtilityClassTest1()
    {
        Customer_Information__c ci = new Customer_Information__c ();
        ci.Account_Status__c = 'Active';
        ci.Supplier_Code__c = '007';
        insert ci;
        
        Account acc=new Account();
        acc.Name='Robert Retailer';
        acc.Account_Status__c = 'active';
        insert acc;
        
        Retailer_Code__c retailCode= new Retailer_Code__c();
        retailCode.Account__c = acc.id;
        retailCode.Label__c ='Private Label';
        retailCode.Market_Segment__c = 'USA';
        retailCode.Name = 'TARGET';
        retailCode.Online_Enquiry__c = true;
        insert retailCode;
        
        Contact con=new Contact();
        con.Salutation = 'Mr';
        con.firstName = 'test';
        con.lastName = 'test';
        con.AccountId = acc.id;
        con.Email = 'test@dispostable.com';
        con.RetailerCode__c = retailCode.id;
        con.Customer_Information__c  = ci.id;
        con.Order_to_Company1__c = 'India - Mainetti (India) Pvt Ltd';
        con.Order_to_Company__c = 'India - Mainetti (India) Pvt Ltd';
        con.Preferred_Currency1__c = 'INR - India Rupee';
        con.Preferred_Currency__c = 'INR - India Rupee';
        insert con;

        User u = new User(
        ProfileId = [SELECT Id FROM Profile WHERE Name = 'Garment Factory Community User'].Id,
        FirstName = 'FirstName',
        LastName = 'last',
        Email = 'test@test.com',
        Username = 'test@test.com' + System.currentTimeMillis(),
        CompanyName = 'TEST',
        Title = 'title',
        Alias = 'alias',
        TimeZoneSidKey = 'America/Los_Angeles',
        EmailEncodingKey = 'UTF-8',
        LanguageLocaleKey = 'en_US',
        LocaleSidKey = 'en_US',
        ContactId = con.id
        );
        
        Retailer_Related_Data__c rrd = new Retailer_Related_Data__c ();
        rrd.ContactID__c = con.Id;
        rrd.Supplier_Code__c  = '007';
        rrd.Manufacturer_Factory_Code__c = '007';
        rrd.Customer_Information__c  = ci.Id;
        rrd.Retailer_Code__c  = retailCode.Id;
        insert rrd;

        Ship_Bill_Address__c BillAddress = new Ship_Bill_Address__c ();
        BillAddress.Address_1__c = 'test address 1';
        BillAddress.Address_2__c = 'test address 2';
        BillAddress.Bill_Ship_Status__c = 'Active';
        BillAddress.City__c = 'test city';
        BillAddress.Company_Name__c = 'test company';
        BillAddress.Contact__c = 'test contact';
        BillAddress.Country__c = 'India';
        BillAddress.Email_Address__c = 'abc@dispostable.com';
        BillAddress.Factory_Name__c = 'test factory';
        BillAddress.Fax_No__c = '4564435246546';
        BillAddress.Is_Default__c = true;
        BillAddress.Postcode__c = '56546';
        BillAddress.State__c = 'test state';
        BillAddress.Tel_No__c = '234665887';
        BillAddress.Customer_Information__c = ci.id;
        BillAddress.RecordtypeId  = Schema.SObjectType.Ship_Bill_Address__c.getRecordTypeInfosByName().get('Bill To').getRecordTypeId();
        insert BillAddress;
        
        Sales_Order__c cartypeSo = new Sales_Order__c();
        cartypeSo.RecordtypeId  = Schema.SObjectType.Sales_Order__c.getRecordTypeInfosByName().get('Cart').getRecordTypeId();
        cartypeSo.Company__c = 'India - Mainetti (India) Pvt Ltd';
        cartypeSo.Retailer_Code1__c = retailCode.id;
        cartypeSo.CurrencyIsoCode = 'INR';
        cartypeSo.Vertical__c = 'Hanger Business';
        cartypeSo.Order_Number__c = 'ghfgfgf';
        cartypeSo.Expected_Delivery_Date__c = System.today();
        cartypeSo.Transportation_Details__c = 'Transportation_Details__c';
        cartypeSo.Shipping_Mark__c = 'Shipping_Mark__c';
        cartypeSo.Supplier__c = ci.id;
        insert cartypeSo;
        
        Test.StartTest();

        System.runAs(u)
        {
        UtilityClass.getCurrentUserContact();
        UtilityClass.getContactRelatedRetailer();
        UtilityClass.getSORecordAsCart(ci.Id);
        UtilityClass.getOrderToCompanyPicklist(true);
        UtilityClass.getOrderToCompanyPicklist(false);
        UtilityClass.getPreferredCurrencyPicklist(true);
        UtilityClass.getPreferredCurrencyPicklist(false);
        UtilityClass.getAllFields('Purchase_Order_LineItem__c');
        UtilityClass.assignShipToAdd(cartypeSo,BillAddress);
        UtilityClass.assignBillToAdd(cartypeSo,BillAddress);
        Test.stopTest();
        }
    }
    
}