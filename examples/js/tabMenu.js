
/*一个简单的Tab ，需要先引入Jquery库
 *这里使用了div作为容器，当然，可以使用 li 之类的作列表
 *使用方法:
 *       对选项菜单加上 class="menu" ,然后将第一个菜单用div包住
 *       对 tab内容 使用tabContent包含 
 */
$(function(){
			tabInit('menu','pages');
			
	});

//通用方法，传入菜单类名与tab内容类名即可
function tabInit(menu , content)
{
	var menuName = "."+menu ; 
	var contentName = "."+content ; 
	
	var w = $(window).width();
	var h = $(window).height();
			//注册li的点击事件
   			$(menuName+" li").each(function(index){
      		 $(this).click(
	   			  function(){
					  //先设置菜单current
					  $(contentName).animate({left:-index*w+"px"},1200);
	 			 });
  		 	});
}