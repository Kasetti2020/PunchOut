public class PunchOutCXMLgenerate {
    public static String xmlResponseGenerator(string resPonseData,string payloadID,string timestamp){
        Dom.Document doc = new Dom.Document();
        SYstem.debug('doc:'+doc);
        
        // Create the root element
        Dom.XmlNode root = doc.createRootElement('cXML', null, null);
        // Add the payloadID and timestamp attributes to the root element
        root.setAttribute('payloadID',payloadID );
        root.setAttribute('timestamp',timestamp );
        Dom.XmlNode header = root.addChildElement('Response', null, null);
        
        
        Dom.XmlNode fromCredential = header.addChildElement('Status ', null, null);
        fromCredential.setAttribute('code', '200');
        fromCredential.setAttribute('text', 'OK');
        fromCredential.setAttribute(' xml:lang', 'en-US');
        Dom.XmlNode fromIdentity = header.addChildElement('PunchOutSetupResponse', null, null);
        Dom.XmlNode fromPunchOutSetupResponse = fromIdentity.addChildElement('StartPage', null, null);
        Dom.XmlNode fromURL = fromPunchOutSetupResponse.addChildElement('URL', null, null);
        fromURL.addTextNode(resPonseData);
        String xmlString = doc.toXmlString();
        System.debug('xmlstring==> ' + xmlString);
        //return '<?xml version="1.0" encoding="utf-16"?><!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd"><cXML xml:lang="en-US" payloadID="635143174550687417@clientsite.com" timestamp="2013-09-09T14:57:35-05:00">   <Response>     <Status code="200" text="success" />    <PunchoutSetupResponse>      <StartPage>      <URL>https://www.ClientSite.com/Punchout/        punchoutsessionrequest.isch?ps=e82d0d33-9fee-45fe-9d87-a23400a4218d</URL>      </StartPage>    </PunchoutSetupResponse>    </Response></cXML>';
        //return '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd"><cXML xml:lang="en-US" payloadID="1655760397.690501.31608925@punchoutconnect.net" timestamp="2022-06-20T16:26:37-05:00"><Response><Status code="200" text="success"></Status><PunchOutSetupResponse><StartPage><URL>https://mainetti--lightsand.sandbox.my.site.com/MagNETFactory/secur/frontdoor.jsp?sid=00D9D0000000QEP!AQEAQL9ZMYhruB7Vni2IIjWQspnqmQdozLwVoZgtfGXeCOSBGQvIl5AMBOFVaUalW26gbioWF1OecAXArn3wIirX_6H2bL7v</URL></StartPage></PunchOutSetupResponse></Response></cXML>';
      return xmlString;
    }
    
    
    ///error in cxml 
     public static String xmlError(string resPonseData,string payloadID,string timestamp,string code,string text){
        Dom.Document doc = new Dom.Document();
        SYstem.debug('doc:'+doc);
        
        // Create the root element
        Dom.XmlNode root = doc.createRootElement('cXML', null, null);
        // Add the payloadID and timestamp attributes to the root element
        root.setAttribute('payloadID',payloadID );
        root.setAttribute('timestamp',timestamp );
        Dom.XmlNode header = root.addChildElement('Response', null, null);
        
        
        Dom.XmlNode fromCredential = header.addChildElement('Status ', null, null);
        fromCredential.setAttribute('code', code);
        fromCredential.setAttribute('text', text);
        fromCredential.setAttribute(' xml:lang', 'en-US');
         fromCredential.addTextNode(resPonseData);
      
        String xmlString = doc.toXmlString();
        System.debug('xmlstring==> ' + xmlString);
        //return '<?xml version="1.0" encoding="utf-16"?><!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd"><cXML xml:lang="en-US" payloadID="635143174550687417@clientsite.com" timestamp="2013-09-09T14:57:35-05:00">   <Response>     <Status code="200" text="success" />    <PunchoutSetupResponse>      <StartPage>      <URL>https://www.ClientSite.com/Punchout/        punchoutsessionrequest.isch?ps=e82d0d33-9fee-45fe-9d87-a23400a4218d</URL>      </StartPage>    </PunchoutSetupResponse>    </Response></cXML>';
        //return '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd"><cXML xml:lang="en-US" payloadID="1655760397.690501.31608925@punchoutconnect.net" timestamp="2022-06-20T16:26:37-05:00"><Response><Status code="200" text="success"></Status><PunchOutSetupResponse><StartPage><URL>https://mainetti--lightsand.sandbox.my.site.com/MagNETFactory/secur/frontdoor.jsp?sid=00D9D0000000QEP!AQEAQL9ZMYhruB7Vni2IIjWQspnqmQdozLwVoZgtfGXeCOSBGQvIl5AMBOFVaUalW26gbioWF1OecAXArn3wIirX_6H2bL7v</URL></StartPage></PunchOutSetupResponse></Response></cXML>';
      return xmlString;
    }
    
    //For cancelled Orders Cxml Generate
    public static void CancelledOrders(string  orderDate,string orderID,string payloadID){
          // Create a new XML document
        Dom.Document doc = new Dom.Document();
        SYstem.debug('doc:'+doc);
        
        // Create the root element
        Dom.XmlNode root = doc.createRootElement('cXML', null, null);
        // Add the payloadID and timestamp attributes to the root element
        root.setAttribute('payloadID', '958074737352@www.xyz3Demo.com');
        root.setAttribute('timestamp', '2000-06-14T12:59:09-07:00');
        
        // Create the Header element
        Dom.XmlNode header = root.addChildElement('Header', null, null);
        
        // Create the From element
        
        Dom.XmlNode from1 = header.addChildElement('From', null, null);
        Dom.XmlNode fromCredential = from1.addChildElement('Credential', null, null);
        fromCredential.setAttribute('domain', 'DUNS');
        Dom.XmlNode fromIdentity = fromCredential.addChildElement('Identity', null, null);
        fromIdentity.addTextNode('12345678');
        
        // Create the To element
        Dom.XmlNode to = header.addChildElement('To', null, null);
        Dom.XmlNode toCredential = to.addChildElement('Credential', null, null);
        toCredential.setAttribute('domain', 'Networkid');
        Dom.XmlNode toIdentity = toCredential.addChildElement('Identity', null, null);
        toIdentity.addTextNode('ANO1000002792-T');
        
        // Create the Sender element
        Dom.XmlNode sender = header.addChildElement('Sender', null, null);
        Dom.XmlNode senderCredential = sender.addChildElement('Credential', null, null);
        senderCredential.setAttribute('domain', 'www.xyz3Demo.com');
        Dom.XmlNode senderIdentity = senderCredential.addChildElement('Identity', null, null);
        senderIdentity.addTextNode('PunchoutResponse');
        Dom.XmlNode userAgent = sender.addChildElement('UserAgent', null, null);
        userAgent.addTextNode('xyz3.x Buyer Services');
        
        ///Request
        Dom.XmlNode request = root.addChildElement('Request', null, null);
         Dom.XmlNode orderRequest = request.addChildElement('OrderRequest', null, null);
         Dom.XmlNode orderRequestHeader = orderRequest.addChildElement('OrderRequestHeader', null, null);
        orderRequestHeader.setAttribute('orderDate', orderDate);
        orderRequestHeader.setAttribute('orderID', orderID);
        orderRequestHeader.setAttribute('type', 'delete');
        orderRequestHeader.setAttribute('orderVersion', '1');
        Dom.XmlNode documentReference  = orderRequestHeader.addChildElement('DocumentReference ', null, null);
        documentReference.setAttribute('payloadID',payloadID );
    }

    //////////// Cxml Generate 
   /* public static string cxmlOutPutCreate(String whereID){
        
        Base_Order__c punch=[select Id,PunchOut_Request__r.payloadID__c,PunchOut_Request__r.TimeStamp__c From Base_Order__c where Id=: whereID ];
        // Create a new XML document
        Dom.Document doc = new Dom.Document();
        SYstem.debug('doc:'+doc);
        
        // Create the root element
        Dom.XmlNode root = doc.createRootElement('cXML', null, null);
        // Add the payloadID and timestamp attributes to the root element
        root.setAttribute('payloadID', punch.PunchOut_Request__r.payloadID__c);
        root.setAttribute('timestamp', String.ValueofGmt(punch.PunchOut_Request__r.TimeStamp__c));
        
        // Create the Header element
        Dom.XmlNode header = root.addChildElement('Header', null, null);
        
        // Create the From element
        
        Dom.XmlNode from1 = header.addChildElement('From', null, null);
        Dom.XmlNode fromCredential = from1.addChildElement('Credential', null, null);
        fromCredential.setAttribute('domain', 'DUNS');
        Dom.XmlNode fromIdentity = fromCredential.addChildElement('Identity', null, null);
        fromIdentity.addTextNode('');
        
        // Create the To element
        Dom.XmlNode to = header.addChildElement('To', null, null);
        Dom.XmlNode toCredential = to.addChildElement('Credential', null, null);
        toCredential.setAttribute('domain', 'Networkid');
        Dom.XmlNode toIdentity = toCredential.addChildElement('Identity', null, null);
        toIdentity.addTextNode('');
        
        // Create the Sender element
        Dom.XmlNode sender = header.addChildElement('Sender', null, null);
        Dom.XmlNode senderCredential = sender.addChildElement('Credential', null, null);
        senderCredential.setAttribute('domain', 'www.xyz3Demo.com');
        Dom.XmlNode senderIdentity = senderCredential.addChildElement('Identity', null, null);
        senderIdentity.addTextNode('PunchoutResponse');
        Dom.XmlNode userAgent = sender.addChildElement('UserAgent', null, null);
        userAgent.addTextNode('xyz3.x Buyer Services');
        
        // Create the Message element
        Dom.XmlNode message = root.addChildElement('Message', null, null);
        Dom.XmlNode punchOutOrderMessage = message.addChildElement('PunchOutOrderMessage', null, null);
        //>>Dom.XmlNode buyerCookie = punchOutOrderMessage.addChildElement('BuyerCookie', null, null);
        //>>buyerCookie.addTextNode('1J3YVWU9QWMTB');
        
        // Create the PunchOutOrderMessageHeader element
        Dom.XmlNode punchOutOrderMessageHeader = punchOutOrderMessage.addChildElement('PunchOutOrderMessageHeader', null, null);
        punchOutOrderMessageHeader.setAttribute('operationAllowed', 'create');
        Dom.XmlNode total = punchOutOrderMessageHeader.addChildElement('Total', null, null);
        Dom.XmlNode money = total.addChildElement('Money', null, null);
        money.setAttribute('currency', 'USD');
        money.addTextNode('14.27');
        map<string,string> punchOutValue=new map<string,string>(); 
        
        
        PunchOut_XMLgenerate__c varData=[Select Object_Field_A__c,Object_Name_A__c,XML_FIeld_A__c,Object_Field_B__c,Object_Name_B__c,XML_FIeld_B__c,Object_Field_C__c,Object_Name_C__c,XML_FIeld_C__c,Object_Field_D__c,Object_Name_D__c,XML_FIeld_D__c,Object_Field_E__c,Object_Name_E__c,XML_FIeld_E__c From PunchOut_XMLgenerate__c];
        punchOutValue.put(varData.XML_FIeld_A__c,varData.Object_Field_A__c);
        punchOutValue.put(varData.XML_FIeld_B__c,varData.Object_Field_B__c);
        punchOutValue.put(varData.XML_FIeld_C__c,varData.Object_Field_C__c);
        punchOutValue.put(varData.XML_FIeld_D__c,varData.Object_Field_D__c);
        punchOutValue.put(varData.XML_FIeld_E__c,varData.Object_Field_E__c);
        
        System.debug('punchOutValue><>>>>'+punchOutValue);
       // string  whereID='a1C9D000000drycUAA';
        String lineItemValues = 'SELECT  ' +varData.Object_Name_A__c+'.'+varData.Object_Field_A__c+','+varData.Object_Name_B__c+'.'+varData.Object_Field_B__c+','+varData.Object_Field_C__c+','+varData.Object_Field_D__c+','+varData.Object_Field_E__c+' FROM '+varData.Object_Name_E__c+' Where '+varData.Object_Name_A__c+'.'+'id=:whereID';
        // lineItemValues ='SELECT  Base_Order__r.CustomerParty_Name__c , Base_Order__r.SupplierParty_CNUF__c,Item_Description__c,PurchaseOrderLine_unitCode__c,PurchaseOrderLine_Amount__c FROM Base_Order_Detail__c';
        System.debug('lineItemValues><>>>>'+lineItemValues);
        SObject[] queryResultsList  = Database.query(lineItemValues);
        System.debug('queryResultsList><>>>>'+queryResultsList);
        
        // Create ItemIn elements 
        for (SObject record : queryResultsList) {
            
            Dom.XmlNode itemIn = punchOutOrderMessage.addChildElement('ItemIn', null, null);
            itemIn.setAttribute('quantity', '1');
            Dom.XmlNode itemId = itemIn.addChildElement('ItemID', null, null);
            SObject BaseOrder =record.getSObject(varData.Object_Name_A__c);
            itemId.addChildElement('SupplierPartID', null, null).addTextNode((String) BaseOrder.get(punchOutValue.get('SupplierPartID')));
            itemId.addChildElement('SupplierPartAuxiliaryID', null, null).addTextNode((String) BaseOrder.get(punchOutValue.get('SupplierPartAuxiliaryID')));
            
            //String supplierParty=(String) BaseOrder.get('CustomerParty_Name__c');
            //System.debug('supplierParty><>'+supplierParty);
            //Object parentValue= record.get('Base_Order__r.SupplierParty_CNUF__c');
            // System.debug('parentValue::::'+(String)record.getSObject(varData.Object_Name_A__c).get('CustomerParty_Name__c'));
            //Adding Base Order Value
         
            Dom.XmlNode itemDetail = itemIn.addChildElement('ItemDetail', null, null);
            Dom.XmlNode unitPrice = itemDetail.addChildElement('UnitPrice', null, null);
            Dom.XmlNode unitPriceMoney = unitPrice.addChildElement('Money', null, null);
            unitPriceMoney.setAttribute('currency', 'USD');
            for (String fieldName : punchOutValue.keySet()) {
                String objectField = punchOutValue.get(fieldName);
                //System.debug('objectField::'+objectField);
                if (record.getSObjectType().getDescribe().fields.getMap().containsKey(objectField)) {
                    Object fieldValue = record.get(objectField);
                    if(fieldName=='Description'){
                        itemDetail.addChildElement('Description', null, null).addTextNode(String.valueOf(fieldValue));
                    }else if(fieldName=='UnitOfMeasure'){
                        itemDetail.addChildElement('UnitOfMeasure', null, null).addTextNode(String.valueOf(fieldValue));
                    } else if(fieldName=='currency'){
                        unitPriceMoney.addTextNode(String.valueOf(fieldValue));
                    }
                }
            } 
            
        }
        
        
        
        
        
        
       
        // Serialize the document to a string
        String xmlString = doc.toXmlString();
       //  PunchOutOrderMessageController.getStringList(xmlString);
        String endPointURL = 'https://webhook.site/da7a4afb-6b7b-4459-8825-df031fb32843';
        //String modifiedJsonString = '123:123';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endPointURL);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setBody(xmlString);
        HttpResponse response = http.send(request);
        System.debug('responseStatusCode: '+response.getStatusCode());
        System.debug('responseBody: '+response.getBody());
        System.debug('xmlString><>>>>>>'+xmlString);
        
       return xmlString;
    }
    */
 //////////////generating cxml Value   
     public static String generateCXML(String recordId){
          PunchOut_Request__c punch=[select Id,payloadID__c,TimeStamp__c,Street__c,City__c,State__c,PostalCode__c,Country__c,Address_Name__c From PunchOut_Request__c where Id=: recordId ];
         
         list<Base_Order__c> baseList=[select Id,PunchOut_Request__c,OrderSource__c,Company__c From Base_Order__c Where PunchOut_Request__c=:recordId ] ;
         set<id> baseListId=new set<id>();
         for(Base_Order__c b:baseList ){
             baseListId.add(b.Id);
         }
    List<JF_SF_Field_Mapping__c> mappingRecords = [SELECT Name,SF_Object1_Field_Name__c, ObjectNames1__c,Service_Type__c
            FROM JF_SF_Field_Mapping__c where Service_Type__r.Name ='Sales Order Request'];
        Map<String,String> perentMap = new Map<String,String>();  
        Map<String,String> childMap = new Map<String,String>();
         Map<String,String> jsonNameParent = new Map<String,String>();
        Map<String,String> jsonNameChild = new Map<String,String>();
         
         system.debug('mappingRecord'+mappingRecords); 
        For(JF_SF_Field_Mapping__c jf : mappingRecords){
            if(jf.ObjectNames1__c.contains('.')){
                jsonNameParent.put(jf.Name,jf.SF_Object1_Field_Name__c);
                System.debug('jf.SF_Object1_Field_Name__c::'+jf.SF_Object1_Field_Name__c);
                if(jf.SF_Object1_Field_Name__c == 'Name1'){
                    childMap.put('Name',jf.ObjectNames1__c);
                    
                }else{
                    childMap.put(jf.SF_Object1_Field_Name__c,jf.ObjectNames1__c);
                } 
                
                
            }
            else{
                System.debug('jf.SF_Object1_Field_Name__c,jf.Name::'+jf.SF_Object1_Field_Name__c+'::'+jf.Name);
                perentMap.put(jf.SF_Object1_Field_Name__c,jf.ObjectNames1__c);
                jsonNameParent.put(jf.Name,jf.SF_Object1_Field_Name__c);
                
            }
        }
          
        // Get the keys and values from the Map
        List<String> keys = new List<String>(jsonNameParent.keySet());
        List<String> values = new List<String>(jsonNameParent.values());
        
        // Now you can work with the keys and values as needed
        System.debug('Keys: ' + keys);
        System.debug('Values: ' + values);
        
        System.debug('jsonNameParent>>>'+jsonNameParent);
        String parentKeyVal;
        String parentvalue = 'SELECT ';
        String childkey;
        String childval = 'SELECT ';
        for(String s : perentMap.keySet()){
            parentvalue += s+',';
            System.debug('parentvalue>>'+parentvalue);
        }
        for(String s : perentMap.values()){
            parentKeyVal = s;
            System.debug('parentKeyVal>>'+parentKeyVal);
        }
        for(String s : childMap.keySet()){
            childval += s+',';
        }
        for(String s : childMap.values()){
            childkey = s;
        }
        System.debug('childkey?>>>'+childkey);
        String Stringvarible;
        if(String.isNotBlank(childkey)){
            
            String[] mappingParts = childkey.split('\\.');
            System.debug('mappingParts>>>'+mappingParts);
            String childObj = mappingParts[1].replace('s__r', '__c');
            System.debug('childObj'+childObj);
            if (childval.endsWith(',')) {
                childval = childval.substring(0, childval.length() -1);
            }
            System.debug('childval>>>'+childval);
            
            parentKeyVal=parentKeyVal.replace('__c', '__r.Id');
           // Stringvarible = parentvalue+'('+childval+' FROM '+childObj+') FROM '+parentKeyVal+' where id =:recordId';
             Stringvarible = +childval+' FROM '+childObj+' where '+parentKeyVal+' =:baseListId';
            System.debug('Stringvarible>>'+Stringvarible);
            
        }else{
            if (parentvalue.endsWith(',')) {
                parentvalue = parentvalue.substring(0, parentvalue.length() -1);
            }
            Stringvarible = parentvalue+' FROM '+parentKeyVal+' where id =:recordId';
            System.debug('Stringvarible>>'+Stringvarible);
            
        }
        
        System.debug('Stringvarible>>>>'+Stringvarible);
        List < sObject > sList = Database.query(Stringvarible);
        System.debug('sList>>'+sList);
        Dom.Document doc = new Dom.Document();
         Dom.XmlNode root = doc.createRootElement('cXML', null, null);
          root.setAttribute('payloadID', punch.payloadID__c);
        root.setAttribute('timestamp', String.ValueofGmt(punch.TimeStamp__c));
        
        // Create the Header element
        Dom.XmlNode header = root.addChildElement('Header', null, null);
        
        // Create the From element
        
        Dom.XmlNode from1 = header.addChildElement('From', null, null);
        Dom.XmlNode fromCredential = from1.addChildElement('Credential', null, null);
        fromCredential.setAttribute('domain', 'DUNS');
        Dom.XmlNode fromIdentity = fromCredential.addChildElement('Identity', null, null);
        fromIdentity.addTextNode('');
        
        // Create the To element
        Dom.XmlNode to = header.addChildElement('To', null, null);
        Dom.XmlNode toCredential = to.addChildElement('Credential', null, null);
        toCredential.setAttribute('domain', 'Networkid');
        Dom.XmlNode toIdentity = toCredential.addChildElement('Identity', null, null);
        toIdentity.addTextNode('');
        
        // Create the Sender element
        Dom.XmlNode sender = header.addChildElement('Sender', null, null);
        Dom.XmlNode senderCredential = sender.addChildElement('Credential', null, null);
        senderCredential.setAttribute('domain', 'www.xyz3Demo.com');
        Dom.XmlNode senderIdentity = senderCredential.addChildElement('Identity', null, null);
        senderIdentity.addTextNode('PunchoutResponse');
        Dom.XmlNode userAgent = sender.addChildElement('UserAgent', null, null);
        userAgent.addTextNode('xyz3.x Buyer Services');
        
          // Create the Message element
        Dom.XmlNode message = root.addChildElement('Message', null, null);
        Dom.XmlNode punchOutOrderMessage = message.addChildElement('PunchOutOrderMessage', null, null);
        //>>Dom.XmlNode buyerCookie = punchOutOrderMessage.addChildElement('BuyerCookie', null, null);
        //>>buyerCookie.addTextNode('1J3YVWU9QWMTB');
        
        // Create the PunchOutOrderMessageHeader element
        Dom.XmlNode punchOutOrderMessageHeader = punchOutOrderMessage.addChildElement('PunchOutOrderMessageHeader', null, null);
        punchOutOrderMessageHeader.setAttribute('operationAllowed', 'create');
        Dom.XmlNode total = punchOutOrderMessageHeader.addChildElement('Total', null, null);
        Dom.XmlNode money = total.addChildElement('Money', null, null);
        money.setAttribute('currency', 'USD');
        money.addTextNode('14.27');
         
         
         
       
        for (SObject record : sList) {
           Dom.XmlNode itemIn = punchOutOrderMessage.addChildElement('ItemIn', null, null);
            Dom.XmlNode itemId = itemIn.addChildElement('ItemID', null, null);
                     itemId.addChildElement('SupplierPartID', null, null).addTextNode(baseList[0].OrderSource__c);
            itemId.addChildElement('SupplierPartAuxiliaryID', null, null).addTextNode(baseList[0].Company__c);
             Dom.XmlNode itemDetail = itemIn.addChildElement('ItemDetail', null, null);
            Dom.XmlNode unitPrice = itemDetail.addChildElement('UnitPrice', null, null);
            Dom.XmlNode unitPriceMoney = unitPrice.addChildElement('Money', null, null);
            
            // Retrieve and iterate over the fields in the record
            for (String fieldName : jsonNameParent.keySet()) {
                String objectField = jsonNameParent.get(fieldName);
                System.debug('objectField::'+objectField);
                //System.debug('fieldName::'+fieldName);
                System.debug('record::'+record.getSObjectType().getDescribe().fields.getMap());
                //System.debug('MapValues:'+jsonNameParent.get(fieldName));
                if (record.getSObjectType().getDescribe().fields.getMap().containsKey(objectField)) {
                    Object fieldValue = record.get(objectField);
                    System.debug('fieldName::'+fieldName);
                    System.debug(fieldName+'   '+ String.valueOf(fieldValue));
                                      
                      
                    if(fieldName=='quantity'){
            itemIn.setAttribute('quantity', String.valueOf(fieldValue));
                    }
            
           // SObject BaseOrder =record.getSObject(varData.Object_Name_A__c);
           
            
                     if(fieldName=='currency'){
           
                         unitPriceMoney.setAttribute('currency', String.valueOf(fieldValue));
                    }
            else if(fieldName=='Description'){
                        itemDetail.addChildElement('Description', null, null).addTextNode(String.valueOf(fieldValue));
                    }else if(fieldName=='UnitOfMeasure'){
                        //itemDetail.addChildElement('UnitOfMeasure', null, null).addTextNode(String.valueOf(fieldValue));
                    } else if(fieldName=='currency'){
                        unitPriceMoney.addTextNode(String.valueOf(fieldValue));
                    }
                }
            }
            
             
            }
             String xmlString = doc.toXmlString();
         System.debug('xmlString><>>>>>>'+xmlString);
         return xmlString;
        }
}