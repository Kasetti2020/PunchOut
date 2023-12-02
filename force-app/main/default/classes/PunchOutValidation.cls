/**
* @Author      :   Mahadevaprasad R
* @description :   This class is used for the Order confirm Cxml Validation
* @TestClass   :   PunchOutValidationTest
* @Date        :   29-11-2023
*/



public with sharing class PunchOutValidation {
 /** 
     *@description this methode is used to checking Inactive Modelid Based On cxml Payload Id and If any one model is in active status order Rejected And Error cxml will return
    *@return  its return boolean value
    *@param punchOutRqt PunchOut_Request__c Object Id
    
    
    *  */

    public static Boolean inActiveModelID(string punchOutRqt) {
       Boolean errorInCxml=false;
         List<Base_Order_Detail__c>  baseLine =[select id,Base_Order__r.PunchOut_Request__c,Price_Specification_Book_Product__r.Product_Unique_ID__r.Status__c from Base_Order_Detail__c where Base_Order__r.PunchOut_Request__c=:punchOutRqt  AND Added_As_a_Label__c=false AND Price_Specification_Book_Product__r.Product_Unique_ID__r.Status__c='Inactive' WITH SECURITY_ENFORCED];
        if(baseLine.size()>0){
            errorInCxml=true;
        }
         return errorInCxml;
    }
    
    
     /** 
     *@description this methode is used to checking base order shipto address and cxml order Confrim shipTO Address And change in shipTO Order Rejected And Error cxml will return
    *@return  its return boolean value
    *@param punchOutRqt PunchOut_Request__c Object Id
    *@param cxml order confirm Parse cxml 
    
    *  */
    
     public static Boolean getShipTOAddress(string punchOutRqt,PunchOutOrderCXMLParse.CXML cxml) {
       Boolean shipToChanged=false;
        System.debug('punchOutRqt>>>>'+punchOutRqt);
            list<Base_Order__c> basePunchOutList=[select Id,PunchOut_Request__c,CustomerParty_ShipTo_Address1__c,CustomerParty_ShipTo_CityName__c,CustomerParty_ShipTo_Postal_Code__c,CustomerParty_ShipTo_Country__c,CustomerParty_ShipTo_Address2__c,CustomerParty_ShipTo_State__c from Base_Order__c where PunchOut_Request__c=:punchOutRqt WITH SECURITY_ENFORCED ];
        
        if((basePunchOutList[0].CustomerParty_ShipTo_Address1__c)!=(cxml.request.OrderRequest.OrderRequestHeader.ShipTo.Address.Name)){
            shipToChanged=true;
        }else if((basePunchOutList[0].CustomerParty_ShipTo_Address2__c)!=(cxml.request.OrderRequest.OrderRequestHeader.ShipTo.Address.PostalAddress.Street)){
            shipToChanged=true ; 
            
        }else if((basePunchOutList[0].CustomerParty_ShipTo_CityName__c)!=(cxml.request.OrderRequest.OrderRequestHeader.ShipTo.Address.PostalAddress.City)){
            shipToChanged=true;  
        }
        else if((basePunchOutList[0].CustomerParty_ShipTo_State__c)!=(cxml.request.OrderRequest.OrderRequestHeader.ShipTo.Address.PostalAddress.State)){
            shipToChanged=true ; 
        }
        else if((basePunchOutList[0].CustomerParty_ShipTo_Postal_Code__c)!=(cxml.request.OrderRequest.OrderRequestHeader.ShipTo.Address.PostalAddress.PostalCode)){
            shipToChanged=true;  
        }
        else if((basePunchOutList[0].CustomerParty_ShipTo_Country__c)!=(cxml.request.OrderRequest.OrderRequestHeader.ShipTo.Address.PostalAddress.Country)){
            shipToChanged=true;  
        }
         
         return shipToChanged;
    }
     /** 
     *@description this methode is used to checking product price  And if change in product price Order Rejected And Error cxml will return
    *@return  its return boolean value
    *@param punchOutRqt PunchOut_Request__c Object Id
    
    
    *  */
    
    public static Boolean getPriceValue(string punchOutRqt) {
    Boolean priceValue=false;
        
   List<Base_Order_Detail__c>  baseLine =[select id,Base_Order__r.PunchOut_Request__c,Price_Product_by_Currency__r.Price_100_pcs__c,Price_100_pcs__c from Base_Order_Detail__c where Base_Order__r.PunchOut_Request__c=:punchOutRqt  AND Added_As_a_Label__c=false WITH SECURITY_ENFORCED];
       
       
        
        for(Base_Order_Detail__c b:baseLine){
            System.debug(String.ValueOf(b.Price_Product_by_Currency__r.Price_100_pcs__c)+'   '+b.Price_100_pcs__c);
            if(String.ValueOf(b.Price_Product_by_Currency__r.Price_100_pcs__c)!=b.Price_100_pcs__c){
                priceValue=true;
}
        }
        System.debug(priceValue);
    return priceValue;
    }
    }