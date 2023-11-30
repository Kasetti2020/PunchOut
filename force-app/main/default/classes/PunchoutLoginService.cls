/**
* @Author      :   Sushil Kulkarni
* @Desc        :   This class is used for the Punchout Login Request
* @TestClass   :   PunchoutLoginServiceTest
* @Date        :   03-11-2023
**/

@RestResource(urlMapping='/login/*')
global class PunchoutLoginService {
    @HttpPost 
    global static String getLoginRequest() {
        
        String logincXML = RestContext.request.requestBody.toString();
        System.debug('logincXML'+logincXML);
                
        string retrunXml=PunchOutLoginCXMLParse.parseCXML(logincXML);
        System.debug('retrunXml><>>>>>>>'+retrunXml);
       return retrunXml;
      // return '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.040/cXML.dtd"><cXML payloadID="1539635340.9061692@example.com" timestamp="2018-04-15T20:29:00+00:00"><Response><Status code="401" text="Unauthorized">Message goes here</Status></Response></cXML>';
    }
}