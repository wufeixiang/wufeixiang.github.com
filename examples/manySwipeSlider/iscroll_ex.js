// JavaScript Document


//iscroll数组
var myscroll = [] ;
function initIscrolls()
{
	var html = "<div id=\"wrapper\"><div></div>" ; 
	$.ajax(
		{
			url:'swipe.xml',
			dataType:'xml',
			success:function(data)
			{
				var swipes = $("swipes")[0];
				var direction = $(data).find(swipes).attr("direction");
				direction == "0" ? build_iscroll_vertical(data) : build_iscroll_horizontal(data)  ;
			}
		}
	);
}


//这里是内部的滑动内容
function build_iscroll_vertical(data)
{
	
	//先写html
	$(data).find("item").each(function(index, element) {
        var html = "<div id=\"wrapper"+index+"\" class=\"wrapper\"><div id=\"scroller"+index+"\" class=\"scroller\"><ul>" ; 
		$(this).find("img").each(function(index, element) {
            var src = $(this).text();
			html += "<li><img src='"+src+"' /></li>" ;
        });
		html += "</ul></div>" ;
		// 导航条
		var nav = "" ; 
		
    });
}