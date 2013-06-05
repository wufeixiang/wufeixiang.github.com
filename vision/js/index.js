var config_xml = "config.xml";
$(document).ready(function(){
		init_albums();
		init_img_click();
	}
);

function init_albums()
{
	$(".album").click(function()
	{
		 var vision = $(this).attr("vision");
		 var vision_xml = "photos/"+vision+".xml";
		 
		 init_img(vision_xml);
	});
	$(".album").eq(0).click();
}
function showAhide(show,hide)
{
	$(show).show();
	$(hide).hide();
	$("footer").toggle("slow");
}
function show_album()
{
	showAhide(".hide_arrow",".show_arrow");
}
function hide_album()
{
	showAhide(".show_arrow",".hide_arrow");
}
var init_img = function(xml)
{
	$('#columns').html("");
	var html = ""  ;
	$.ajax(
	{
		url:xml,
		dataType:"xml",
		success:function(data){
			$(data).find("rs").each(function(index, element) {
                var img_src = $(this).children("filename").text() ;
				img_src = img_src.replace("vision/","");
				var pin = $('<div></div>',{'class':'pin','xml':"vision/"+xml,'pageid':index}) ;
				var img = $('<img />',{'src':'../public/images/loading.gif','data-original': img_src,'class':'lazy img'});
				pin.append(img);
				var img_info ="<div class='img_info'></div>" ;
				pin.append(img_info);
				$('#columns').append(pin);
            });
		    mylazy();
		},
	});
};
var mylazy = function()
{
	$("img.lazy").lazyload({
			effect : "fadeIn",
			load : function()
			{
				setPhoto_info(this);
			},
	});	
}
function setPhoto_info(ele)
{
	
	//获取图片的Exif信息
	var info = "" ;
	var model = "" ; 
	var fnumber = "" ;
	var time = "" ;
	var iso = "" ; 
	var mode = "" ; 
	var $this = $(ele).exifLoad(function()
	{
		//这里还可以获取更多的参数，参见exif的信息格式 
		model = $this.exif("Model");
		if(model == "") model = "无"; 
		fnumber = $this.exif("FNumber");
		if(fnumber == "") fnumber = "无"; 
		time = $this.exif("ExposureTime");
		if(time == "") time = "无";
		else
		{
			if( time<1 ) time = "1/" + Math. round(1/time) ;
			else time += "s" ;
		}
		iso = $this.exif("ISOSpeedRatings");
		if(iso == "") iso = "无"; 
		mode = $this.exif("MeteringMode");
		if(mode == "") mode = "无"; 
		
		
		var img_info = "<span>型号:<em class='model'>"+model+"</em></span>"+
		"<span>光圈:<em class='fNumber'>"+fnumber+"</em></span>"+
		"<br /><span>快门:<em class='ex_time'>"+time+"</em></span>"+
		"<span>ISO:<em class='iso'>"+iso+"</em></span>"+
		"<span>测光模式:<em class='mode'>"+mode+"</em></span>";
		$(ele).parent().find(".img_info").html(img_info);
	});
}

function init_img_click()
{
	$(".pin").live("click",function()
	{
		var path = $(this).attr("xml");
		var pageid = $(this).attr("pageid");
		parent.fullScreen(path,pageid);
		
	});
}
	
	