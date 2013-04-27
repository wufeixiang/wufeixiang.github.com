// 由于我们在移动平台上用，所以不兼容 ie
  
// 使用方法 
$(function() {
   //$('#xsl').xslt("data.xml", "view.xsl");
});

// xslt transform
$.fn.xslt = function(xml , xsl){
	var target = $(this);
	// Mozilla 0.9.4+, Opera 9+
	var xmlContent = xmlFromFile(xml);
	var xslContent = xmlFromFile(xsl);
	var html = xslTransform(xmlContent,xslContent);
	target.empty().append(html);
}


function xslTransform(xml , xslt)
{
	
	var html = "" ;
	try {
		if (window.DOMParser != undefined && window.XMLHttpRequest != undefined && window.XSLTProcessor != undefined) {
			//// Load XML 
			var xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
			//// Load XSL
			var processor = new XSLTProcessor();
			processor.importStylesheet(xslt);
			
			// Transform
			resultDocument = processor.transformToFragment(xml, document);
		    if (document.implementation && document.implementation.createDocument) {
				html =  new XMLSerializer().serializeToString( resultDocument ) ;
			}
		}
	} catch (exception) {
        if (typeof (exception) == "object") {
            if (exception.message) {
                alert(exception.message);
            }
        } else {
            alert(exception);
        }
    }
	//打印错误信息
	var errorMsg = null;
	if (xmlDoc.parseError && xmlDoc.parseError.errorCode != 0) {
		errorMsg = "XML Parsing Error: " + xmlDoc.parseError.reason
				  + " at line " + xmlDoc.parseError.line
				  + " at position " + xmlDoc.parseError.linepos;
	}
	else {
		if (xmlDoc.documentElement) {
			if (xmlDoc.documentElement.nodeName == "parsererror") {
				errorMsg = xmlDoc.documentElement.childNodes[0].nodeValue;
			}
		}
		else {
			errorMsg = "XML Parsing Error!";
		}
	}

	if (errorMsg) {
		//alert (errorMsg);
	}
	return html ; 
}
// 上面直接用 processor.transformToFragment 无法加载 xml文件， 我们需要用 XHR 先读进来 
// 这里通过 XHR 来获取 xml 内容 
function xmlFromFile(file)
{
	var xmlDoc = null ; 
	try
	{
		if (document.implementation && document.implementation.createDocument){
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open("GET",file,false);
			xmlhttp.send(null);
			// 返回 document树， 可以用document.getElementsByTagName()等方法
			xmlDoc = xmlhttp.responseXML ;
		}
		else
		{
			xmlDoc = null ; 
		}
	}
	catch(e)
	{
	    error=e.message;
	}
	return xmlDoc;
}






