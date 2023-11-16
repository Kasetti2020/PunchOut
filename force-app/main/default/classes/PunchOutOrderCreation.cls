public class PunchOutOrderCreation {
    @InvocableMethod(label='Punch Out Order Creation' description='Punch Out Order Creation')
    public static void checkforOrderType (List<string> inputParams) {
        List<Base_Order__c> BaseOrList=PunchOutOrderCreation.getBaseOrderdDetails(inputParams);
        
        if(BaseOrList.size() > 0){
            List<Base_Order_Detail__c> prodDataList=PunchOutOrderCreation.getBaseOrderdLineDetails(BaseOrList[0].Id);
        System.debug('prodDataList><>>>'+prodDataList);
            Sales_Order__c salesOrd=new Sales_Order__c();
            salesOrd.Base_Order__c=BaseOrList[0].Id;
            
            insert salesOrd;
            System.debug('salesOrd><>>>'+salesOrd);
            list<Sales_Order_Line_Items__c> salesLineList=new list<Sales_Order_Line_Items__c>();
            for(Base_Order_Detail__c prodData :prodDataList){
             Sales_Order_Line_Items__c soli=new Sales_Order_Line_Items__c();
                soli.Sales_Order__c=salesOrd.id;
                soli.Products__c = prodData.Products__c;
                soli.Product_Description__c = prodData.Product_Description__c;
                soli.Size__c = prodData.Size__c;
                soli.print__c = prodData.print__c;
                soli.Colour__c = prodData.Colour__c;
                soli.Local_SKU__c = prodData.Local_SKU__c;
                soli.variable_data_product__c=prodData.variable_data_product__c;
                soli.Quantity__c =prodData.Quantity__c;
                soli.Ordered_Quantity__c =prodData.Ordered_Quantity__c;
                soli.Supply_Quantity__c = prodData.Supply_Quantity__c;
                soli.Supply_Quantity_num__c = Integer.valueOf(prodData.Supply_Quantity__c);
                soli.Remaining_Qty__c = Integer.valueOf(prodData.Supply_Quantity__c);
                soli.Full_Box_Order__c =prodData.Full_Box_Order__c;
                soli.BOX_QTY__c =prodData.BOX_QTY__c;
                soli.Product_image_url__c=prodData.Product_image_url__c;
                soli.Price_Specification_Book_Product__c = prodData.Price_Specification_Book_Product__c;
                soli.Price_Product_by_Currency__c = prodData.Price_Product_by_Currency__c;
                Soli.Price_100_pcs__c =prodData.Price_100_pcs__c;
                
                soli.CurrencyIsoCode = prodData.CurrencyIsoCode;
                salesLineList.add(soli);
            }
            insert salesLineList;
        }
    }
    
    public static List<Base_Order__c> getBaseOrderdDetails (List<string> inputParams) {
        
        List<Base_Order__c> baseOrderList=[SELECT Id, Name, Logical_ID__c, Order_Date_Time__c,Component_ID__c, Task_ID__c, Creation_Date_Time__c, Action_Code__c, Document_ID__c, Note__c, Note_Priority_Level__c, XML_File_Name__c, Processing_Status__c, CustomerParty_PartyTypeNumber__c, CustomerParty_PartyNumber__c, CustomerParty_PartySubNumber__c, CustomerParty_CNUF__c, CustomerParty_Name__c, CustomerParty_BillTo_CityName__c, CustomerParty_BillTo_Country_Code__c, CustomerParty_BillTo_Postal_Code__c, CustomerParty_BillTo_Email__c, CustomerParty_BillTo_Telephone__c, CustomerParty_ShipTo_Address1__c, CustomerParty_ShipTo_Address2__c, CustomerParty_ShipTo_Address3__c, CustomerParty_ShipTo_Address4__c, CustomerParty_ShipTo_CityName__c, CustomerParty_ShipTo_Country_Code__c, CustomerParty_ShipTo_Postal_Code__c, CustomerParty_ShipTo_Email__c, CustomerParty_ShipTo_Telephone__c, SupplierParty_PartyTypeNumber__c, SupplierParty_PartyNumber__c, SupplierParty_PartySubNumber__c, SupplierParty_CNUF__c, SupplierParty_Name__c, SupplierParty_OrderDateTime__c, Start_Process__c, TechnicalParty_PartyTypeNumber__c, TechnicalParty_PartyNumber__c, TechnicalParty_PartySubNumber__c, CustomerParty_BillTo_Address1__c, CustomerParty_BillTo_Address2__c, CustomerParty_BillTo_Address3__c, CustomerParty_BillTo_Address4__c,Document_Customer_Order_Id__c FROM Base_Order__c WHERE Id= : inputParams]; 
        System.debug('baseOrderList><>>>'+baseOrderList);
        return baseOrderList;
        
        
        
    } 
     public static List<Base_Order_Detail__c> getBaseOrderdLineDetails (Id baseorder) {
        
        List<Base_Order_Detail__c> SoliList =[select id,CurrencyIsoCode,Size__c,Price_100_pcs__c,print__c,Price_Specification_Book_Product__c,variable_data_product__c,Product_Description__c, name,Base_Order__c,Products__c,Local_SKU__c,Colour__c,Quantity__c,Product_image_url__c,Full_Box_Order__c,BOX_QTY__c,Price_Product_by_Currency__c,Ordered_Quantity__c,Supply_Quantity__c,Supply_Quantity_num__c from Base_Order_Detail__c where Base_Order__c=:baseorder ];
            
        System.debug('SoliList><>>>'+SoliList);
        return SoliList;
        
        
        
    }
}