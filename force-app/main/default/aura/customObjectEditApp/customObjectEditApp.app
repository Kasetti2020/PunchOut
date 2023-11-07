<aura:application extends="ltng:outApp" implements="lightning:isUrlAddressable" >
    <!--<aura:handler name="init" value="{!this}" action="{!c.doInit}"/>  -->
    <aura:attribute name="CurrentComponentToPass" type="String"/>   
    <aura:dependency resource="c:MyTest"/>
</aura:application>