Global with sharing class PunchOutDemoclass {
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

      // Connected App credentials
    private static final String CLIENT_ID = '3MVG9N6eDmZRVJOkogIaHQibQG2yWhVXoo8mNTKBz6_7ZJ.ZkPOINrFRGtidZBj.Uxrw5md3KUKK7WNajdhkI';
    private static final String CLIENT_SECRET = 'BD9E2C6243CB53A94A7B2E0849B79B5F24933517D1C48BBF819CFF251DDCBC21';
    private static final String REDIRECT_URI = 'https://mainetti--lightsand.sandbox.my.site.com/MagNETFactory/oauth2/callback';

    // Salesforce login URL
        private static final String LOGIN_URL = 'https://mainetti--lightsand.sandbox.my.site.com/MagNETFactory/services/oauth2/authorize';

    public static String getAuthorizationUrl() {
        // Construct the authorization URL
        
        String authUrl = LOGIN_URL  +
                         '?response_type=code' +
                         '&client_id=' + CLIENT_ID +
                         '&redirect_uri=' + REDIRECT_URI+
							'&scope=api';
        System.debug(authUrl);
        HttpRequest request = new HttpRequest();
        request.setEndpoint(authUrl);
        
        request.setMethod('POST');
        
        
        HttpResponse response = new Http().send(request);
        System.debug('Token Request Payload: ' + response.getStatusCode());
        System.debug('accessToken><>>'+response.getBody());
       
        return authUrl;
    }

    public static void authenticateAndDoSomething(String authCode) {
        // Exchange the authorization code for an access token
       
        String tokenUrl = 'https://mainetti--lightsand.sandbox.my.site.com/MagNETFactory/services/oauth2/token';
        String requestBody = 'grant_type=authorization_code' +
                                '&code=' + authCode+
                                '&client_id=' + CLIENT_ID +
                                '&client_secret=' + CLIENT_SECRET +
                                '&redirect_uri=' + REDIRECT_URI ;
            

        HttpRequest request = new HttpRequest();
        request.setEndpoint(tokenUrl);
        
        request.setMethod('POST');
       
         request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
         request.setHeader('Content-length','307');
        request.setBody(requestBody);

        HttpResponse response = new Http().send(request);
		System.debug('Token Request Payload: ' + response.getStatusCode());
			System.debug('accessToken><>>'+response.getBody());
        // Parse the response
        if (response.getStatusCode() == 200) {
            Map<String, Object> authResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());

            // Extract the access token
            String accessToken = (String) authResponse.get('access_token');

            // Use the access token for subsequent requests
				System.debug('accessToken><>>'+accessToken);
            // Perform additional operations here

        } else {
            System.debug('Authentication failed. Response: ' + response.getBody());
        }
    }
   
    // Replace these with your Connected App's values
    
    private static final String CALLBACK_URL = 'https://mainetti--lightsand.sandbox.my.site.com/MagNETFactory/oauth2/callback';
    private static final String SCOPES = 'api';  // Add any additional scopes as needed

    public static String getAuthorizationUrll() {
        String authUrl = 'https://login.salesforce.com/services/oauth2/authorize';
        authUrl += '?response_type=code';
        authUrl += '&client_id=' + EncodingUtil.urlEncode('3MVG9N6eDmZRVJOkogIaHQibQG2yWhVXoo8mNTKBz6_7ZJ.ZkPOINrFRGtidZBj.Uxrw5md3KUKK7WNajdhkI', 'UTF-8');
        authUrl += '&redirect_uri=' + EncodingUtil.urlEncode(CALLBACK_URL, 'UTF-8');
        authUrl += '&scope=' + EncodingUtil.urlEncode(SCOPES, 'UTF-8');
        System.debug('authUrl><>>'+authUrl);
        PunchOutDemoclass.getAccessToken(authUrl);
        return authUrl;
    }

    // This method should be called from the callback URL handler
    public static String getAccessToken(String code) {
        String accessToken = '';

        // Request the access token using the authorization code
        accessToken = requestAccessToken(code);
		System.debug('accessToken><>>'+accessToken);
        return accessToken;
    }

    private static String requestAccessToken(String code) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://login.salesforce.com/services/oauth2/token');
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.setBody('grant_type=authorization_code' +
                   '&client_id=' + EncodingUtil.urlEncode(CLIENT_ID, 'UTF-8') +
                   '&client_secret=' + EncodingUtil.urlEncode(CLIENT_SECRET, 'UTF-8') +
                   '&redirect_uri=' + EncodingUtil.urlEncode(CALLBACK_URL, 'UTF-8') +
                   '&code=' + EncodingUtil.urlEncode(code, 'UTF-8'));

        Http http = new Http();
        HttpResponse res = http.send(req);

        
        System.debug('accessToken><>>'+res.getBody());
        // Parse the response to get the access token
        //Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
       // String accessToken = (String) responseMap.get('access_token');

        return 'accessToken';
    }
    
 // Define Salesforce REST API endpoints
    private static final String SALESFORCE_LOGIN_URL = 'https://login.salesforce.com/services/oauth2/token';

    // Replace these values with your connected app's details
   // private static final String CLIENT_ID = 'your_connected_app_client_id';
   // private static final String CLIENT_SECRET = 'your_connected_app_client_secret';
    private static final String USERNAME = 'crm.support@mainetti.com.lightsand';
    private static final String PASSWORD = 'kasetti555' ;

    // Method to authenticate and get an access token
    public static String getAccessToken() {
         HttpRequest request = new HttpRequest();
        request.setEndpoint('https://test.salesforce.com/services/oauth2/token');
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.setBody('grant_type=password' +
            '&client_id=' + EncodingUtil.urlEncode(CLIENT_ID, 'UTF-8') +
            '&client_secret=' + EncodingUtil.urlEncode(CLIENT_SECRET, 'UTF-8') +
            '&username=' + EncodingUtil.urlEncode(USERNAME, 'UTF-8') +
            '&password=' + EncodingUtil.urlEncode(PASSWORD, 'UTF-8'));

        Http http = new Http();
        HttpResponse response = http.send(request);
		System.debug( response.getStatusCode());
        System.debug( response.getBody());
        System.debug(UserInfo.getOrganizationId().substring(0, 15) + ' ' +  UserInfo.getSessionId().substring(15));
        if (response.getStatusCode() == 200) {
            Map<String, Object> authResult = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            String accessToken = (String) authResult.get('access_token');
            return accessToken;
        } else {
            // Handle authentication error
            System.debug('Authentication error: ' + response.getBody());
            return null;
        }
        
    }
        
    
    // Salesforce OAuth endpoint for the production environment
    private static final String TOKEN_ENDPOINT = 'https://test.salesforce.com/services/oauth2/token';
    
    // Your Connected App's client ID and client secret
   // private static final String CLIENT_ID1 = '3MVG9N6eDmZRVJOkogIaHQibQG8ckzH2p_YFtzzezrkLFIiIUhbmltIEaIC10eLeL6SdP7Co8ZxGOgqa.3C_T';
    //private static final String CLIENT_SECRET1 = 'BD9E2C6243CB53A94A7B2E0849B79B5F24933517D1C48BBF819CFF251DDCBC21';

    // Method to obtain the access token using the Client Credentials grant type
      public static void getAccessToken12() {
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        Http http = new Http();

        // Set the token endpoint and grant type
        req.setEndpoint(TOKEN_ENDPOINT);
        req.setMethod('POST');

        // Set the request body
        String requestBody = 'grant_type=client_credentials&client_id=' + EncodingUtil.urlEncode(CLIENT_ID, 'UTF-8') + '&client_secret=' + EncodingUtil.urlEncode(CLIENT_SECRET, 'UTF-8');
        req.setBody(requestBody);

        // Set the request headers
        req.setHeader('Content-Type', 'application/x-www-form-urlencoded');

        try {
            // Make the HTTP request
            res = http.send(req);
			system.debug(res.getBody());
            system.debug(res.getStatusCode());
            
            // Check the HTTP status code
            if (res.getStatusCode() == 200) {
                // Parse the JSON response
                Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());

                // Get the access token from the response
                String accessToken = (String) responseMap.get('access_token');

                // Return the access token
               // return accessToken;
            } else {
                // Handle non-200 status code
                System.debug('Non-200 status code received: ' + res.getStatusCode() + ' ' + res.getStatus());
            }
        } catch (Exception e) {
            // Handle any exceptions or errors
            System.debug('Error getting access token: ' + e.getMessage());
            System.debug('Exception Type: ' + e.getTypeName());
            //return null;
        }
    }
    
     public static void storeInSession(Id punchId) {
     // String partitionInput = 'local.PunchOut';
            System.debug('punchId><>>'+punchId);
           // Cache.SessionPartition  sessionPartition = Cache.Session.getPartition(partitionInput);
            //System.debug('sessionPartition><>>'+sessionPartition.isAvailable());
           
         Cache.Org.put('PunchOutId', punchId);
         Object value = Cache.Org.get('PunchOutId');
         System.debug('value><>'+value);
           // sessionPartition.put('PunchOutId', punchId);
            
           // Id punchOutRefId= (Id)sessionPartition.get('PunchOutId');
            //System.debug('punchOutRefId><>'+punchOutRefId);
     }


 
    
    
    
    
}