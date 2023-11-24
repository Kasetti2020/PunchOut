public class PunchOutOrderCreation {
    @InvocableMethod(label='Punch Out Order Creation' description='Punch Out Order Creation')
    public static void checkforOrderType (List<string> inputParams) {
        List<Base_Order__c> BaseOrList=PunchOutOrderCreation.getBaseOrderdDetails(inputParams);
        
        if(BaseOrList.size() > 0){
            String baseordId=BaseOrList[0].Id;
       // String baseCountry=BaseOrList[0].baseOrderCountry;
        System.debug('baseordId>>'+baseordId);
       // System.debug('baseCountry>>'+baseCountry);
        
        String jsonarreyName;
        List<JF_SF_Field_Mapping__c> jfsfFieldsList = [SELECT id,ObjectNames1__c,ObjectNames2__c,SF_Object1_Field_Name__c,SF_Object2_Field_Name__c,Service_Type__c,ChildObjectName1__c,ChildObjectName2__c,RecordType__c FROM JF_SF_Field_Mapping__c WHERE Service_Type__c='a2lHz000000nhcdIAA'];
        System.debug('jfsfFieldsList::'+jfsfFieldsList);
        
        Map<String, String> objectAndFieldMap = new Map<String, String>();
        Map<String, String> fieldsWithObjectMap = new Map<String, String>();
        String baseOrder = 'SELECT ';
        string bodString = 'SELECT ';
        for(JF_SF_Field_Mapping__c jfsf : jfsfFieldsList){
            if(jfsf.ObjectNames1__c.contains('.')){
                bodString += jfsf.SF_Object1_Field_Name__c + ' ,';
            }else{
                baseOrder+= jfsf.SF_Object1_Field_Name__c + ' ,';
            }
            objectAndFieldMap.put(jfsf.ObjectNames1__c, jfsf.SF_Object1_Field_Name__c);
            fieldsWithObjectMap.put(jfsf.SF_Object1_Field_Name__c, jfsf.SF_Object2_Field_Name__c + '#' +jfsf.ObjectNames2__c);
        }
        System.debug('objectAndFieldMap:::'+objectAndFieldMap);
        System.debug('fieldsWithObjectMap:::'+fieldsWithObjectMap);
        String baseOrderFinal = removeCommaAtEnd(baseOrder);       
        
        String bodStringFinal = removeCommaAtEnd(bodString);
        
        String parentObj ;
        for(String objectName : objectAndFieldMap.keySet()){
            system.debug('objectName>>'+objectName);
            if(objectName.contains('.')){
                String[] parts = objectName.split('\\.');
                bodStringFinal += 'FROM '+ parts[1];
                parentObj = parts[0];
            }
        }
        System.debug('bodStringFinal:::'+bodStringFinal);
        //String recordid = 'a1CO00000033WPzMAM';
        String finalString = baseOrder + ' ('+ bodStringFinal +') FROM ' +  parentObj +' WHERE id=:baseordId';
        System.debug('finalString::'+finalString);
        
        List<SObject> baseOrderList = Database.query(finalString);
        System.debug('baseOrderList:'+baseOrderList);
        Map<String, String> boMap =  new Map<String, String>();
        for(SObject boObj : baseOrderList){
            String objNamee = boObj.getSObjectType().getDescribe().getName();
            System.debug('objName>>'+objNamee);
            boMap.put(objNamee, boObj.Id);
        }
        String salesorderforquery=bodStringFinal.replace('s__r','__c') +' WHERE Base_Order__c=:baseordId';
        List<SObject> salesOrderList = Database.query(salesorderforquery);
        System.debug('baseOrderList:'+salesOrderList);
        
        // Create a list to store the sObjects
        List<SObject> recordsList = new List<SObject>();
        
        //Creating list of object to store the child array
        List<sObject> childValueList = new List<sObject>();
        
        for (SObject record : baseOrderList) {
            System.debug('record::'+record);
            Map<String, Object> objectFieldValues = record.getPopulatedFieldsAsMap();
            System.debug('objectFieldValues::'+objectFieldValues);
            for(String fieldName : objectFieldValues.keySet()){
                System.debug('fieldName>>'+fieldName);
                Object fieldValue = objectFieldValues.get(fieldName);
                System.debug('fieldValue>>'+fieldValue);
                if (fieldValue instanceof List<Object>) {
                    // It's an array (List) of records
                    childValueList = (List<SObject>)fieldValue;
                    System.debug(fieldName + ' is an array:');
                    System.debug('childValueList' +childValueList);
                    
                } else {
                    // It's a single value
                    System.debug(fieldName + ' is a single value: ' + fieldValue);
                    // Check if the sObject already exists
                    SObject existingRecord = null;
                    System.debug('fieldsWithObjectMap>>'+fieldsWithObjectMap);
                    
                    if(fieldsWithObjectMap.containsKey(fieldName)){
                        
                        String[] mappingParts = fieldsWithObjectMap.get(fieldName).split('#');
                        System.debug('mappingParts>>'+mappingParts);
                        System.debug('recordsList>>'+recordsList);
                        
                        for (SObject recordValue : recordsList) { 
                            if (recordValue.getSObjectType().getDescribe().getName() == mappingParts[1]) {
                                existingRecord = recordValue;
                                break;
                            } 
                            
                        }
                        // Create or update the sObject
                        if (existingRecord == null) {
                            //system.debug('objectName>>>'+objectName);
                            //Get the object name
                            
                            SObject newRecord = Schema.getGlobalDescribe().get(mappingParts[1]).newSObject();
                            System.debug('newRecord'+newRecord);
                            String fieldvalueignorecase = String.valueOf(fieldValue).toLowercase();
                            if(boMap.containsKey('Base_Order__c')){
                                system.debug('ParentMaps Inside');
                                newRecord.put('Base_Order__c', boMap.get('Base_Order__c'));
                            }
                            newRecord.put(mappingParts[0], fieldValue);
                            
                            recordsList.add(newRecord); // Add the new sObject to your list
                            //System.debug('recordsList:::'+recordsList);
                            
                        } else {
                            existingRecord.put(mappingParts[0], fieldValue);
                        }
                    }
                    
                }
            }
        }
        
        System.debug('recordsList::'+recordsList);
        insert recordsList;
        
        List<SObject> childRecordsList = new List<SObject>();
        List<SObject> finalChildRecordsList = new List<SObject>();
        List<Object> childList = new List<Object>();
        
        String objName;
        String objNames;
        Map<String, String> parentMaps = new Map<String, String>();
        for(SObject parentObjs : recordsList){
            String objNamee = parentObjs.getSObjectType().getDescribe().getName();
            System.debug('objName>>'+objNamee);
            parentMaps.put(objNamee, parentObjs.Id);
        }
        System.debug('parentMap::'+parentMaps);
        
        
        
        for (SObject record : salesOrderList) {
            System.debug('record::'+record);
            Map<String, Object> objectFieldValuess = record.getPopulatedFieldsAsMap();
            System.debug('objectFieldValues::'+objectFieldValuess);
            childList.add(objectFieldValuess);
        }
        
        for(Object childObj : childList){
            System.debug('childObj>>'+childObj);
            //Geting object into Map
            if (childObj instanceof Map<String, Object>) {
                Map<String, Object> childMap = (Map<String, Object>) childObj;
                System.debug('childMap::'+childMap);
                
                for (String key : childMap.keySet()) {
                    Object value = childMap.get(key);
                    System.debug('Key: ' + key);
                    System.debug('Value: ' + value);
                    if(fieldsWithObjectMap.containsKey(key)){
                        String[] mappingParts = fieldsWithObjectMap.get(key).split('#');
                        System.debug('mappingParts>>'+mappingParts);
                        if(mappingParts[1].contains('.')){
                            System.debug('inside');
                            System.debug('mappingParts1>>'+mappingParts[0]);
                            System.debug('mappingParts2>>'+mappingParts[1]);
                            String[] parts=mappingParts[1].split('\\.');
                            System.debug('parts::'+parts);
                            SObject existingRecord = null;
                            System.debug('childRecordsList::'+childRecordsList);
                            //Get the object name
                            objName=parts[1].replace('s__r', '__c');
                            for (SObject recordValue : childRecordsList) {
                                if (recordValue.getSObjectType().getDescribe().getName() == objName) {
                                    existingRecord = recordValue;
                                    break;
                                }
                            }
                            // Create or update the sObject
                            if (existingRecord == null) {
                                //system.debug('objectName>>>'+objectName);
                                SObject newRecord = Schema.getGlobalDescribe().get(objName).newSObject();
                                System.debug('newRecord'+newRecord);
                                System.debug('parts[0]'+parts[0]);
                                if(parentMaps.containsKey(parts[0])){
                                    system.debug('ParentMaps Inside');
                                    newRecord.put(parts[0], parentMaps.get(parts[0]));
                                }
                                System.debug('newRecord::'+newRecord);
                                if(mappingParts[0] == 'Retailer_Detail_Line_Number__c' || mappingParts[0] == 'Ordered_Quantity__c'){
                                    newRecord.put(mappingParts[0], Integer.valueOf(value));
                                }
                                else{
                                    newRecord.put(mappingParts[0], value);
                                }
                                System.debug('newRecordAfter::'+newRecord);
                                childRecordsList.add(newRecord); // Add the new sObject to your list
                                //System.debug('recordsList:::'+recordsList);
                            } else {
                                System.debug('else');
                                if(mappingParts[0] == 'Ordered_Quantity__c' || mappingParts[0] == 'Retailer_Detail_Line_Number__c'){
                                    existingRecord.put(mappingParts[0], Integer.valueOf(value));
                                }else{
                                    existingRecord.put(mappingParts[0], value);
                                }
                                
                            }
                        }
                        else{
                            System.debug('inside else');
                        }
                    }
                }
                finalChildRecordsList.addAll(childRecordsList);
                childRecordsList.clear();
            }
        }
        System.debug('childRecordsList::'+childRecordsList);
        System.debug('finalChildRecordsList::'+finalChildRecordsList);
        insert finalChildRecordsList;
        Base_Order__c bo = new Base_Order__c();
        bo.Id = boMap.get('Base_Order__c');
        bo.Processing_Status__c = 'Success';
        bo.Start_Process__c = false;
        update bo;
            Base_Order__c base=[select id,PunchOut_Request__c from Base_Order__c Where Id=:BaseOrList[0].Id];
            PunchOut_Request__c punch =[select id,payloadID__c,BuyerCookie__c,TimeStamp__c from PunchOut_Request__c where Id=:base.PunchOut_Request__c ];
            
            BaseOrList[0].TimeStamp__c=punch.TimeStamp__c;
            BaseOrList[0].payloadID__c=punch.payloadID__c;
            BaseOrList[0].BuyerCookie__c=punch.BuyerCookie__c;
            
            BaseOrList[0].Processing_Status__c='Success';
            try {
                Update BaseOrList;
                
                delete punch;
            } catch(DmlException e) {
                System.debug('The following exception has occurred: ' + e.getMessage());
            }
        }
    }
    
    public static List<Base_Order__c> getBaseOrderdDetails (List<string> inputParams) {
        
        List<Base_Order__c> baseOrderList=[SELECT Id,BuyerCookie__c,payloadID__c,TimeStamp__c, Name, Logical_ID__c, Order_Date_Time__c,Component_ID__c, Task_ID__c, Creation_Date_Time__c, Action_Code__c, Document_ID__c, Note__c, Note_Priority_Level__c, XML_File_Name__c, Processing_Status__c, CustomerParty_PartyTypeNumber__c, CustomerParty_PartyNumber__c, CustomerParty_PartySubNumber__c, CustomerParty_CNUF__c, CustomerParty_Name__c, CustomerParty_BillTo_CityName__c, CustomerParty_BillTo_Country_Code__c, CustomerParty_BillTo_Postal_Code__c, CustomerParty_BillTo_Email__c, CustomerParty_BillTo_Telephone__c, CustomerParty_ShipTo_Address1__c, CustomerParty_ShipTo_Address2__c, CustomerParty_ShipTo_Address3__c, CustomerParty_ShipTo_Address4__c, CustomerParty_ShipTo_CityName__c, CustomerParty_ShipTo_Country_Code__c, CustomerParty_ShipTo_Postal_Code__c, CustomerParty_ShipTo_Email__c, CustomerParty_ShipTo_Telephone__c, SupplierParty_PartyTypeNumber__c, SupplierParty_PartyNumber__c, SupplierParty_PartySubNumber__c, SupplierParty_CNUF__c, SupplierParty_Name__c, SupplierParty_OrderDateTime__c, Start_Process__c, TechnicalParty_PartyTypeNumber__c, TechnicalParty_PartyNumber__c, TechnicalParty_PartySubNumber__c, CustomerParty_BillTo_Address1__c, CustomerParty_BillTo_Address2__c, CustomerParty_BillTo_Address3__c, CustomerParty_BillTo_Address4__c,Document_Customer_Order_Id__c FROM Base_Order__c WHERE Id= : inputParams]; 
        System.debug('baseOrderList><>>>'+baseOrderList);
        return baseOrderList;
        
        
        
    } 
     public static List<Base_Order_Detail__c> getBaseOrderdLineDetails (Id baseorder) {
        
        List<Base_Order_Detail__c> SoliList =[select id,CurrencyIsoCode,Size__c,Price_100_pcs__c,print__c,Price_Specification_Book_Product__c,variable_data_product__c,Product_Description__c, name,Base_Order__c,Products__c,Local_SKU__c,Colour__c,Quantity__c,Product_image_url__c,Full_Box_Order__c,BOX_QTY__c,Price_Product_by_Currency__c,Ordered_Quantity__c,Supply_Quantity__c,Supply_Quantity_num__c from Base_Order_Detail__c where Base_Order__c=:baseorder ];
            
        System.debug('SoliList><>>>'+SoliList);
        return SoliList;
        
        
        
    }
    
      public static String removeCommaAtEnd(String inputString){
        String finalString = inputString.substring(0, inputString.length() - 1);
        return finalString;
    }
    
    public class getBaseOrderValues {
        @InvocableVariable(label='passId')
        public String baseOrderId;
        @InvocableVariable(label='countryName')
        public String baseOrderCountry;
    }
    
    
    
}