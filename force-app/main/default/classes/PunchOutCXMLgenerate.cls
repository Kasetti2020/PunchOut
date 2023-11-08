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
    
    public static void cxmlOutPutCreate(){
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
        string  whereID='a1C9D000000drycUAA';
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
        System.debug(xmlString);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://webhook.site/b1165467-0b4d-4098-8649-6c591d3c7212');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/Xml');
        request.setBody(xmlString);
        HttpResponse response = http.send(request);
    }
    
    
    
    
    
    
}