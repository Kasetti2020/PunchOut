public class PunchOutLoginCXMLParse {
    
    public class CXML {
        public Header header { get; set; }
        public Request request { get; set; }
        public string payloadID {get;set;}
        public string timestamp {get;set;}
        public Response response {get;set;}
    }
    public class Header {
        public  fromNode fromNode { get; set; }
        public To to { get; set; }
        public Sender sender { get; set; }
        
    }
    public class fromNode {
        public Credential Credential;
    }
    public class To {
        public Credential Credential;
    }
    
    public class Credential {
        public String domain { get; set; }
        public String identity { get; set; }
        public String sharedSecret { get; set; }
    }
    
    
    public class Sender {
        public Credential credential { get; set; }
        public String userAgent { get; set; }
        
    }
    
    public class PostalAddress {
        public String street { get; set; }
        public String city { get; set; }
        public String state { get; set; }
        public String postalCode { get; set; }
        public String country { get; set; }
    }
    
    public class Address {
        public String addressID { get; set; }
        public String name { get; set; }
        public PostalAddress postalAddress { get; set; }
    }
    
    public class ShipTo {
        public Address address { get; set; }
    }
    
    public class Extrinsic {
        public String name { get; set; }
        public String value { get; set; }
    }
    
    public class BrowserFormPost {
        public String URL { get; set; }
    }
    
    public class PunchOutSetupRequest {
        public String operation { get; set; }
        public String buyerCookie { get; set; }
        public List<Extrinsic> extrinsics { get; set; }
        public BrowserFormPost browserFormPost { get; set; }
        public ShipTo shipTo { get; set; }
    }
    
    public class Request {
        public PunchOutSetupRequest punchOutSetupRequest { get; set; }
        public OrderRequest orderRequest { get; set; }
    }
    //////////OrderRequest node code getting Wrapper class
    
    
    public class OrderRequest {
        public OrderRequestHeader orderRequestHeader { get; set; }
        
    }
    public class OrderRequestHeader {
        
        public string orderID { get; set; }
        public string orderDate { get; set; }
        public string typeOrder { get; set; }
        
    }
    
    
    
    
    //////responce status code getting Wrapper class
    public class Response {
        public Status  Status  { get; set; }
    }
    public class Status {
        public string code { get; set; }
        public string text { get; set; }
        public PunchOutSetupResponse  PunchOutSetupResponse  { get; set; }
    }
    public class PunchOutSetupResponse {
        public StartPage  StartPage  { get; set; }
    }
    public class StartPage {
        public string  url  { get; set; }
    }
    
    
    public static CXML parseCXML(String cxmlData) {
        Dom.Document doc = new Dom.Document();
        doc.load(cxmlData);
        
        Dom.XmlNode cxmlNode = doc.getRootElement();
        CXML cxml = new CXML();
        
        
        
        cxml.payloadID = cxmlNode.getAttribute('payloadID', null);
        cxml.timestamp = cxmlNode.getAttribute('timestamp', null);
        /////1)checking Header node And Response node Value
        /////if header node not null it will Parse Input login Cxml Value
        
        if(cxmlNode.getChildElement('Header', null)!=null){
            ////Parse Header Node
            Dom.XmlNode headerNode = cxmlNode.getChildElement('Header', null);
            cxml.header = new Header();
            /////Parse Header From Node
            Dom.XmlNode fromNode=headerNode.getChildElement('From', null);
            cxml.header.fromNode = parseFrom(fromNode.getChildElement('Credential', null));
            /////Parse Header To Node
            Dom.XmlNode to=headerNode.getChildElement('To', null);
            cxml.header.To = parseTo(to.getChildElement('Credential', null));
            /////Parse Header Sender Node
            Dom.XmlNode sender=headerNode.getChildElement('Sender', null);
            cxml.header.sender = parseSender(sender.getChildElement('Credential', null));
            cxml.header.sender.userAgent = sender.getChildElement('UserAgent', null).getText();
            // cxml.header.sender = parseSender(headerNode.getChildElement('Sender', null));
            
            // Parse Request Node
            Dom.XmlNode requestNode = cxmlNode.getChildElement('Request', null);
            cxml.request = new Request();
            if(requestNode.getChildElement('PunchOutSetupRequest', null)!=null){
                cxml.request.punchOutSetupRequest = parsePunchOutSetupRequest(requestNode.getChildElement('PunchOutSetupRequest', null));
                
                
                System.debug('PunchOutLoginCXMLParse><>>>'+cxml);
                PunchOutLoginCXMLParse.xmlLoginMethod(cxml);
                
            }
            else if(requestNode.getChildElement('OrderRequest', null)!=null){
                PunchOutOrderCXMLParse.parseCXML(cxmlData);
            }
            
        }
        
        /////if Response node not null it will Parse Response Cxml Value
        else if(cxmlNode.getChildElement('Response', null)!=null){
            ////Response Node
            Dom.XmlNode response = cxmlNode.getChildElement('Response', null);
            cxml.Response =new Response();
            ////Status Node
            Dom.XmlNode status  = response.getChildElement('Status', null);
            cxml.Response.Status=new Status();
            ////Status Node getAttribute
            cxml.Response.Status.code = status.getAttribute('code', null);
            cxml.Response.Status.text = status.getAttribute('text', null);
            ////PunchOutSetupResponse Node
            Dom.XmlNode punchOutSetupResponse  = response.getChildElement('PunchOutSetupResponse', null);
            cxml.Response.Status.PunchOutSetupResponse=new PunchOutSetupResponse();
            ////StartPage Node
            Dom.XmlNode startPage  = punchOutSetupResponse.getChildElement('StartPage', null);
            cxml.Response.Status.PunchOutSetupResponse.StartPage=new StartPage();
            ////StartPage Node Url Value
            cxml.Response.Status.PunchOutSetupResponse.StartPage.url= startPage.getChildElement('URL', null).getText();
        }
        ///////////finale Wrapper class
        System.debug('PunchOutLoginCXMLParse><>>>'+cxml);
        
        
        return cxml;
    }
    //////////From Node ////////
    public static fromNode parseFrom(Dom.XmlNode credentialNode) {
        fromNode fr=new fromNode();
        Credential credential = new Credential();
        credential.domain = credentialNode.getAttribute('domain', null);
        credential.identity = credentialNode.getChildElement('Identity', null).getText();
        fr.Credential=credential;
        System.debug('frOm><>>>'+fr);
        return fr;
    }
    
    //////////TO Node ////////
    public static TO parseTo(Dom.XmlNode credentialNode) {
        TO to=new TO();
        Credential credential = new Credential();
        credential.domain = credentialNode.getAttribute('domain', null);
        credential.identity = credentialNode.getChildElement('Identity', null).getText();
        to.Credential=credential;
        System.debug('frOm><>>>'+to);
        return to;
    }
    
    //////////Sender Node ////////
    public static Sender parseSender(Dom.XmlNode senderNode) {
        Sender send=new Sender();
        Credential credential = new Credential();
        credential.domain = senderNode.getAttribute('domain', null);
        credential.identity = senderNode.getChildElement('Identity', null).getText();
        credential.SharedSecret = senderNode.getChildElement('SharedSecret', null).getText();
        send.credential=credential;
        //send.userAgent=senderNode.getChildElement('UserAgent', null).getText();
        return send;
    }
    ////// PunchOutSetupRequest Node
    public static PunchOutSetupRequest parsePunchOutSetupRequest(Dom.XmlNode requestNode) {
        PunchOutSetupRequest punchOutSetupRequest = new PunchOutSetupRequest();
        punchOutSetupRequest.operation = requestNode.getAttribute('operation', null);
        punchOutSetupRequest.buyerCookie = requestNode.getChildElement('BuyerCookie', null).getText();
        punchOutSetupRequest.extrinsics = new List<Extrinsic>();
        List<Dom.XMLNode> extrinsicsNode = requestNode.getChildElements();
        
        System.debug('extrinsicsNode><>>>'+extrinsicsNode.size());
        if (extrinsicsNode != null) {
            for (Dom.XmlNode extrinsicNode : extrinsicsNode) {
                Extrinsic extrinsic = new Extrinsic();
                if(extrinsicNode.getAttribute('name', null)!=null){
                System.debug('extrinsicNode><>>>'+extrinsicNode.getAttribute('name', null));
                extrinsic.name = extrinsicNode.getAttribute('name', null);
                extrinsic.value = extrinsicNode.getText();
                punchOutSetupRequest.extrinsics.add(extrinsic);
                }
            }
        }
        
        punchOutSetupRequest.browserFormPost = parseBrowserFormPost(requestNode.getChildElement('BrowserFormPost', null));
        punchOutSetupRequest.shipTo = parseShipTo(requestNode.getChildElement('ShipTo', null));
        
        return punchOutSetupRequest;
    }
    ////Parse BrowserFormPost Node
    public static BrowserFormPost parseBrowserFormPost(Dom.XmlNode formPostNode) {
        BrowserFormPost formPost = new BrowserFormPost();
        formPost.URL = formPostNode.getChildElement('URL', null).getText();
        return formPost;
    }
    ////Parse ShipTo Node
    public static ShipTo parseShipTo(Dom.XmlNode shipToNode) {
        ShipTo shipTo = new ShipTo();
        shipTo.address = parseAddress(shipToNode.getChildElement('Address', null));
        return shipTo;
    }
    ////Parse Address Node
    public static Address parseAddress(Dom.XmlNode addressNode) {
        Address address = new Address();
        address.addressID = addressNode.getAttribute('addressID', null);
        address.name = addressNode.getChildElement('Name', null).getText();
        address.postalAddress = parsePostalAddress(addressNode.getChildElement('PostalAddress', null));
        return address;
    }
    ////Parse PostalAddress Node
    public static PostalAddress parsePostalAddress(Dom.XmlNode postalAddressNode) {
        PostalAddress postalAddress = new PostalAddress();
        postalAddress.street = postalAddressNode.getChildElement('Street', null).getText();
        postalAddress.city = postalAddressNode.getChildElement('City', null).getText();
        postalAddress.state = postalAddressNode.getChildElement('State', null).getText();
        postalAddress.postalCode = postalAddressNode.getChildElement('PostalCode', null).getText();
        postalAddress.country = postalAddressNode.getChildElement('Country', null).getText();
        return postalAddress;
    }
    
    /////creating PunchOut_Request__c Record 
    public static void xmlLoginMethod(CXML cxml){
        System.debug(cxml);
        /////From Wrapper class 
        string buyerCookie=cxml.request.PunchOutSetupRequest.buyerCookie;
        string operation=cxml.request.PunchOutSetupRequest.operation;
        string timeStamp=cxml.timestamp;
        string payloadID=cxml.payloadID;
        list<PunchOut_Request__c> punchOut=[select Id,BuyerCookie__c,Operation__c From PunchOut_Request__c Where BuyerCookie__c=:buyerCookie];
       
        ////when punchOut size is Equal to zero
        if(punchOut.size()==0){
            PunchOut_Request__c rqt=new PunchOut_Request__c();
            rqt.BuyerCookie__c=buyerCookie;
            rqt.TimeStamp__c=timeStamp;
            rqt.payloadID__c=payloadID;
            rqt.Operation__c=operation;
            insert rqt;
        }else if(punchOut.size()>0){
             punchOut[0].Operation__c=operation;
            update punchOut;
        }
        
        
    }
    
}