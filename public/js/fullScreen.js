
var myiscroll ; 
var is_iscroll_init = 0  ;
function fullScreen(path,total,pageid)
{
	if( !is_iscroll_init )
	{
		var total_img = parseInt(total);
		is_iscroll_init = 1 ; 
		var html = "<div id='wrapper'><div id='scroller'><ul id='iscroll_list'>";
		for( var i = 1 ; i <= total ; ++i )
		{
			html += "<li><img src='"+path+"/"+i+".jpg' /></li>";
		}
		html += "</ul></div></div><span class='close' onClick='hideFullScreen();'>X</span>" ;
		//设置宽度
		$("#fullScreen").html(html);
		$("#wrapper > #scroller").css("width",total_img*100+"%");
		$("#iscroll_list > li").css("width",100/total_img+"%");
		
	}
	$("#fullScreen").fadeIn();
		
	myiscroll = new iScroll('wrapper', {
		  snap: true,
		  momentum: false,
		  hScrollbar: false,
		  vScrollbar: false,
		  onScrollEnd: function () {
			  
		  } 
	});
	myiscroll.scrollToPage(pageid-1,0,0);
}

function hideFullScreen()
{
	$("#fullScreen").fadeOut();
}


