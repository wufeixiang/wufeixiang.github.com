// JavaScript Document
$(document).ready(function(e) {
});


var slideTo = function(src)
{
	//弄点效果
	$('.loading').show();
	
	
	var currentSrc = $('#iframe').get(0).contentWindow.location.href ;
	//alert("window.location  :"+currentSrc);
	saveGoBack(currentSrc);
	
	$('#iframe').get(0).contentWindow.location.replace(src);
	$('.back').show();
	//这里再调用html5 history api
	//history.pushState(null, '标题', src);
	
	$('.loading').fadeOut();
}

function toHome()
{
	var src = "main.html";
	var currentSrc = $('#iframe').attr("src");
	if( currentSrc == src ) return ; 
	$('#iframe').get(0).contentWindow.location.replace(src);
}

//这里模拟一下返回操作
var backArr = [] ; 
function saveGoBack(src)
{
	backArr.push(src);
}

function goBack()
{
	var src = backArr.pop(); 
	//alert("back:"+src);
	//弄点效果
	$('.loading').show();
	$('#iframe').get(0).contentWindow.location.replace(src);
	$('.loading').fadeOut();
	
	if( backArr.length == 0 )
	{
		$('.back').hide();
	}
}