Global class PunchOutSetupRequestParser {
    public static void parseXMl(Map<String, Object> jsonResult){
        
         string valueFromDeserliz=  JSON.serialize(jsonResult);
        system.debug('valueFromDeserliz><>>>>>>'+valueFromDeserliz);
        
        valueFromDeserliz =valueFromDeserliz.replaceAll('From','From1');
        system.debug('valueFromDeserliz><>>>>>>'+valueFromDeserliz);
        CxmlWrapper cxmlRequest = (CxmlWrapper) JSON.deserialize(valueFromDeserliz, CxmlWrapper.class);
       system.debug('cxmlRequest><>>>>>>'+cxmlRequest);
        string valueFromDeserliz2=  JSON.serialize(cxmlRequest);
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://webhook.site/b1165467-0b4d-4098-8649-6c591d3c7212');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/Xml');
        request.setBody(valueFromDeserliz2);
        HttpResponse response = http.send(request);
   /* //strResp = '<cXML payloadID="{00DD639C-274F-4478-A893-0541BF35DE56}" timestamp="2023-09-19T19:31:02" version="1.2.008"><Header><Request deploymentMode="production"> <PunchOutSetupRequest operation="create"><SupplierSetup><URL>Provided by Supplier</URL></SupplierSetup><Extrinsic name="UserEmail">1036STR@SAVERS.COM</Extrinsic><Extrinsic name="UserName">1036STR</Extrinsic><BuyerCookie>Unique to PunchOutSession</BuyerCookie><BrowserFormPost><URL>https://svrsaxprod.operations.dynamics.com/punchout/cxml/%7B482E0089-33DC-DA43-C365-723F549B5144%7D</URL></BrowserFormPost></PunchOutSetupRequest></Request></Header></cXML>';
        Dom.Document doc = new Dom.Document();  
        doc.load(strResp);  
        Dom.XMLNode rootElement = doc.getRootElement();  
        for ( Dom.XMLNode childElement : rootElement.getChildElements() ) {
            //root elements of each array
            system.debug('Loop1><>>>'+childElement.getName() + '-' + childElement.getText());
            for (Dom.XMLNode detailElement : childElement.getChildElements()){
                //childs elements of each array
                system.debug('Loop2><>>>'+detailElement.getName() + '-' + detailElement.getText());
                 
                for (Dom.XMLNode detailElement1 : detailElement.getChildElements()){
                    //childs elements of each childs array
                    system.debug('Loop3><>>>'+detailElement1.getName() + '-' + detailElement1.getText());
                     for (Dom.XMLNode detailElement2 : detailElement1.getChildElements()){
                    //childs elements of each childs array
                    system.debug('Loop4><>>>'+detailElement2.getName() + '-' + detailElement2.getText());
                           for (Dom.XMLNode detailElement3 : detailElement2.getChildElements()){
                    //childs elements of each childs array
                    system.debug('Loop5><>>>'+detailElement3.getName() + '-' + detailElement3.getText());
                               for (Dom.XMLNode detailElement4 : detailElement3.getChildElements()){
                    //childs elements of each childs array
                    system.debug('Loop6><>>>'+detailElement4.getName() + '-' + detailElement4.getText());
                                   for (Dom.XMLNode detailElement5 : detailElement4.getChildElements()){
                    //childs elements of each childs array
                    system.debug('Loop7><>>>'+detailElement5.getName() + '-' + detailElement5.getText());
                }
                }
                }
                         
                }
                }
            } 
        } */ 
    }
    
    public class CxmlWrapper {
        public cXML cXML;
    }
    public class cXML {
        public String payloadID;
        public String timestamp;
        public Header header;
        public Request request;
    }

    public class Header {
        public From1 from1;
        public To to;
        public Sender sender;
    }

    public class From1 {
        public Credential credential;
    }

    public class To {
        public Credential credential;
    }

    public class Credential {
        public String domain;
        public String identity;
        public String sharedSecret; // Only for Sender
    }

    public class Sender {
        public Credential credential;
        public String userAgent;
    }

    public class Request {
        public String deploymentMode;
        public PunchOutSetupRequest punchOutSetupRequest;
    }

    public class PunchOutSetupRequest {
        public String operation;
        public String buyerCookie;
        public List<string> extrinsics;
        public BrowserFormPost browserFormPost;
        public ShipTo shipTo;
    }

    public class Extrinsic {
        public String name;
        public String value;
    }

    public class BrowserFormPost {
        public String URL;
    }

    public class ShipTo {
        public Address address;
    }

    public class Address {
        public String addressID;
        public string name;
        public PostalAddress postalAddress;
    }

    public class Name {
        public String lang;
        public String value;
    }

    public class PostalAddress {
        public String street;
        public String city;
        public String state;
        public String postalCode;
        public string country;
    }

    public class Country {
        public String isoCountryCode;
    }

        
        

}