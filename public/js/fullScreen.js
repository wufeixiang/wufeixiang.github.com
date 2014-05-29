
var myiscroll ; 
var is_iscroll_init = 0  ;
function fullScreen(xml,pageid)
{
	var html = "<div id='wrapper'><div id='scroller'><ul id='iscroll_list'>";
	$.ajax(
		{
			url:xml,
			dataType:"xml",
			async:false, //如果要ajax返回内部变量，需要设置成同步
			success:function(data){
				var total_img = $(data).find("rs").length;
				$(data).find("rs").each(function(index, element) {
					var img_src = $(this).children("filename").text() ;
					html += "<li><img src='"+img_src+"' /></li>";
				})
				html += "</ul></div></div><span class='close' onClick='hideFullScreen();'>X</span>" ;
				//设置宽度
				$("#fullScreen").html(html);
				$("#wrapper > #scroller").css("width",parseInt(total_img)*100+"%");
				$("#iscroll_list > li").css("width",100/parseInt(total_img)+"%");
			}
	});
	
	$("#fullScreen").fadeIn();	
	myiscroll = new iScroll('wrapper', {
					  snap: true,
					  momentum: false,
					  hScrollbar: false,
					  vScrollbar: false,
					  onScrollEnd: function () {
						  
					  } 
				});				
	myiscroll.scrollToPage(pageid,0,0);
}

function hideFullScreen()
{
	$("#fullScreen").fadeOut();
}


