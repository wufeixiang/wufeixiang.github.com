<?xml version='1.0' encoding="utf-8"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:stylesheet>
  <xsl:template match="swipes">
       <div id="wrapper1" class="wrapper">
            <div id="scroller1" class="scroller">
                <ul>
                    <li><img src="images/1.jpg" /></li>
                    <li><img src="images/1.jpg" /></li>
                    <li><img src="images/1.jpg" /></li>
                    <li><img src="images/1.jpg" /></li>
                </ul>
            </div>
            <div class="pre" onclick="myScroll1.scrollToPage('prev', 0);return false">&larr; prev</div>
            <div class="next" onclick="myScroll1.scrollToPage('next', 0);return false">next &rarr;</div>
            <div class="nav">
                <div class="indicator-wrapper">
                    <ul class="indicator" id="indicator1">
                        <li class="active">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </div>
             </div>
        </div>
  </xsl:template>
</xsl:stylesheet>