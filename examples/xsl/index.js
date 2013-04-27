// JavaScript Document

//加载并解析 XML 字符串
function xmlDocFromString (text) {
	var xmlDoc = null;
	var message = "";
	//  DOMParser 对象解析 XML 文本并返回一个 XML Document 对象
	if (window.DOMParser) { // all browsers, except IE before version 9
		var parser = new DOMParser();
		try {
			xmlDoc = parser.parseFromString (text, "text/xml");
		} catch (e) {
				// if text is not well-formed, 
				// it raises an exception in IE from version 9
			alert ("XML parsing error.");
			return false;
		};
	}
	else {  // Internet Explorer before version 9
		xmlDoc = CreateMSXMLDocumentObject ();
		if (!xmlDoc) {
			alert ("Cannot create XMLDocument object");
			return false;
		}
        // 特定于 IE 的方法解析指定的 XML 文本串
		xmlDoc.loadXML (text);
	}
    
	// 进行解析错误的提示 具体行 位置，方便查找；通常错误是由于 xml结构不完整造成的 
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
		alert (errorMsg);
		return null;
	}

//	返回这个Document对象
	return xmlDoc;
}

// 加载并解析 XML 文件，这里通过  XMLHttpRequest 来解析 xml , 和上面的 Domparser 差不多
function xmlDocFromFile(filename){
	var xmlDoc=null;  
	/* 移动平台，对ie不进行兼容了
	if (window.ActiveXObject){  
		xmlDoc = new ActiveXObject('Msxml3.DOMDocument');  
		xmlDoc.async=false;  
		xmlDoc.load(filename);  
	}  
	else */
	if (document.implementation && document.implementation.createDocument){  
		var xmlhttp = new window.XMLHttpRequest();  
		xmlhttp.open("GET",filename,false);  
		xmlhttp.send(null);  
		xmlDoc = xmlhttp.responseXML;  
	}  
	else {
		xmlDoc=null;
	}  
	
	return xmlDoc;  	
}

function transformXml(xml, xsl) {
    try {
        // code for IE
		// IE 支持 XSLT 但没有实现 XSLTProcessor 对象，所以使用transformNode来转换
        if (window.ActiveXObject) {
            ex = xml.transformNode(xsl);
            return ex;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument) {
            xsltProcessor = new XSLTProcessor();
//			alert(xsltProcessor);
            xsltProcessor.importStylesheet(xsl);
			// 这里返回一个 Document 片断
            resultDocument = xsltProcessor.transformToFragment(xml, document);
            return resultDocument;
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
	
	return null;
}

function stringFromXml(xml)
{
    try {
        // code for IE
        if (window.ActiveXObject) {
            return xml.xml;
        }
        // code for Mozilla, Firefox, Opera, etc.
        else if (document.implementation && document.implementation.createDocument) {
            return (new XMLSerializer()).serializeToString(xml);
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
	
	return "";
}

function stringFromXml2(xml, tag){
	
	var s = "";
	var xml2 = xml.getElementsByTagName(tag);
	for (var i = 0; i < xml2.length; i++)
	{
		var xe = xml2[i];
		s += stringFromXml(xe);
	}	

	return s;	
}

function stringFromXmlByExpr(xml, expr){
	var xpe = new XPathEvaluator();
	var nsResolver = xpe.createNSResolver(xml.ownerDocument==null ? xml.documentElement : xml.ownerDocument.documentElement);
	var result = xpe.evaluate(expr,  xml , nsResolver,  XPathResult.ORDERED_NODE_ITERATOR_TYPE ,  null );
	
	var xs = '';
	var rs;
	while  (rs  =  result.iterateNext()){
		xs += stringFromXml(rs);
	}
	
	return xs;
}

function stringFromElements(elements)
{
	var s = "";
	
	var len = elements.length;
	for (var i = 0; i < len; i++){
		var ele = elements[i];
		s += ele.id;
		s += "=";
		s += ele.value
		s += "&";
	}

	return s;
}


function transformFileByXsl(rawFile, xslFile){

	var xdata = xmlDocFromFile(rawFile);	
	var xtrans = xmlDocFromFile(xslFile);
//	alert(transformXml);
	var xhtml = transformXml(xdata, xtrans); 
//	alert(xhtml);
	var shtml =  stringFromXml(xhtml);
//	alert(shtml);
	return shtml;
}


// 通过 xml 和 xsl 生成相应的html
function transformStringByXsl(rawString, xslFile){

	var xdata = xmlDocFromString(rawString);
	
//		alert(xdata);
	var xtrans = xmlDocFromFile(xslFile);
//	alert(transformXml);
	var xhtml = transformXml(xdata, xtrans); 
//	alert(xhtml);
	var shtml =  stringFromXml(xhtml);
//	alert(shtml);

	return shtml;
}





//这里进行XPath的搜索
function searchXdb(dictFile, expr){
	
	var xmlDict = xmlDocFromFile(dictFile);
	if (xmlDict == null){
		return { cnt: 0, x: '' };
	}
	
	var cnt = 0;
	
	var xpe = new XPathEvaluator();
//	var nsResolver = xpe.createNSResolver(dictFile.ownerDocument==null ? dictFile.documentElement : dictFile.ownerDocument.documentElement);
	var nsResolver = xpe.createNSResolver(xmlDict.ownerDocument==null ? xmlDict.documentElement : xmlDict.ownerDocument.documentElement);
	var result = xpe.evaluate(expr,  xmlDict , nsResolver,  XPathResult.ORDERED_NODE_ITERATOR_TYPE ,  null );
	
	var xs = '<xdb><xrs>';
	var rs;
	while  (rs  =  result.iterateNext()){
		xs += stringFromXml(rs);
//		found.push(res);
		cnt ++;
	}
	xs += '</xrs></xdb>'
//	alert(s);	
	
	return { cnt: cnt, x: xs };
}


