
/*һ���򵥵�Tab ����Ҫ������Jquery��
 *����ʹ����div��Ϊ��������Ȼ������ʹ�� li ֮������б�
 *ʹ�÷���:
 *       ��ѡ��˵����� class="menu" ,Ȼ�󽫵�һ���˵���div��ס
 *       �� tab���� ʹ��tabContent���� 
 */
$(function(){
			tabInit('menu','pages');
			
	});

//ͨ�÷���������˵�������tab������������
function tabInit(menu , content)
{
	var menuName = "."+menu ; 
	var contentName = "."+content ; 
	
	var w = $(window).width();
	var h = $(window).height();
			//ע��li�ĵ���¼�
   			$(menuName+" li").each(function(index){
      		 $(this).click(
	   			  function(){
					  //�����ò˵�current
					  $(contentName).animate({left:-index*w+"px"},1200);
	 			 });
  		 	});
}