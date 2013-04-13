// JavaScript Document
var photo_dir = "public/photos/" ;
$(document).ready(function(e) {
	initRandomBg();
	initAClick();
});
function initAClick()
{
	$('.block,.tohref').live('click',function()
	{
		event.preventDefault();
		var href = $(this).attr("href");
		//alert(href);
		parent.slideTo(href);
	});
}



var currentBg = 1 ; 
var maxBg = 20 ;
var autoPlay = false ; 
var autoBg ; 
var timer = 20000 ; 
var initRandomBg = function()
{ 
	$(".currentBgIdx").html(currentBg+"/"+maxBg);
	
	var preload_bg =  photo_dir+(currentBg+1)+".jpg";
	$('.preloadImg').attr("src",preload_bg);
	
	$('.foreBg').click(function(){
		nextBg(-1);
	});
	$('.nextBg').click(function(){
		nextBg(1);
	});
	$('.bgStatus').click(function(){
		stopTimer();
	});
	
	stopTimer();
}

function stopTimer()
{
	if( autoPlay )
	{
		clearInterval(autoBg);
		autoPlay = false ; 
		$('.bgStatus').html("auto");
	}
	else
	{
		autoBg = setInterval("nextBg(1)",timer);
		autoPlay = true ; 
		$('.bgStatus').html("stop");
	}
}

var nextBg = function(idx)
{
	currentBg += idx ;  
    if(currentBg ==0 ) currentBg = maxBg ;
	else if(currentBg == (maxBg+1)) currentBg = 1 ;
				
	var bg = photo_dir+currentBg+".jpg";
	$("#largeBg").hide();
	$("#largeBg").css("background-image","url("+bg+")");
	
	//这里图片第一次加载会有点慢，用一个隐藏的标签预先加载第二张图片
	var preload_bg =  photo_dir+(currentBg+1)+".jpg";
	if( currentBg == maxBg ) preload_bg =  photo_dir+1+".jpg";
	$('.preloadImg').attr("src",preload_bg);
    
	
	$("#largeBg").fadeIn("slow");
	$(".currentBgIdx").html(currentBg+"/"+maxBg);
}
