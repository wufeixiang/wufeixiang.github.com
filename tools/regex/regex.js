// JavaScript Document

//正则查找，并得到找到的字符串 ， 如$1 , $2 
//js里面用了的显示的一个数组来保存匹配的结果
function regex_search()
{
	//  这个正则获得 $1 = 网址 , $2 = 中间的路径 ， $3 = 全文件名， $4 = 文件的标题 ，
	var regex = new RegExp("http://(.+)/(.+)/((.+)\.(.+))");
	var perl_regex = /http:\/\/(.+)\/(.+)\/((.+)\.(.+))/ ; //perl的写法，有点不方便，需要很多转义 
	//这里我们匹配一下这个字符串
	var str = "http://www.baidu.com/dir/test.jpg";
	var matches = str.match(regex); 
	
	// 匹配数组同样从 1 开始表示匹配的数据， matches[0]是原字符串
	var www = matches[1];
	var dirs = matches[2];
	var filename = matches[3];
	var label = matches[4];
	
	alert( www + "  " +dirs + "  "+filename + "  " + label  );
	
}

