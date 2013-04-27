<?xml version='1.0' encoding="utf-8"?>
<xsl:stylesheet version="1.0"
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="xrs">
    <xsl:for-each select="rs">
        <div>
           <ul>
               <li> <xsl:value-of select="name" /> </li>
           </ul>
        </div>
    </xsl:for-each>

</xsl:template>
</xsl:stylesheet>