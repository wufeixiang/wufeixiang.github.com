// JavaScript Document
$(document).ready(function(e) {
	
});


var slideTo = function(src)
{
	//弄点效果
	$('.loading').show();
	var currentSrc = $('#iframe').attr("src");
	saveGoBack(currentSrc);
	$('#iframe').get(0).contentWindow.location.replace(src);
	$('.loading').fadeOut();
	//
	$('.back').show();
	//这里再调用html5 history api
	//history.pushState(null, '', src);
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
	
	//弄点效果
	$('.loading').show();
	$('#iframe').get(0).contentWindow.location.replace(src);
	$('.loading').fadeOut();
	
	if( backArr.length == 0 )
	{
		$('.back').hide();
	}
}