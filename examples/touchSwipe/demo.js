$(function() {
	  var swipeContent = $("#swipeContent");	
	  var currentContent = 0 ; 
	  var maxContent = 5 ; 
	  var speed = 500 ; 
	  var currentItem = null ;
	   
	  var contentWidth = 500;
	  var innerContentHeight = 200;
	  
	  var swipeOptions = {
		  triggerOnTouchEnd : true,
		  swipeStatus : swipeStatus,
		  allowPageScroll:"vertical",
		  
	  }
	  //Enable swiping...
	  swipeContent.swipe(swipeOptions);
	  function swipeStatus(event, phase, direction, distance, duration, fingerCount)
	  {
		  currentItem = $(this);
		  if( phase == "move" && direction!= null )
		  {
			  //alert(direction);
			  var duration = 0  ;
			  switch(direction)
			  {
				  case "left":
				     scrollHorizontal( contentWidth*currentContent+distance , speed );
				     break;
				  case "right":
				     scrollHorizontal( contentWidth*currentContent-distance , speed );	
					 break; 
				  case "up":
				     scrollVertical( innerContentHeight*currentContent+distance , speed );	
					 break; 
				  case "down":
				     scrollVertical( innerContentHeight*currentContent-distance , speed );
					 break;
				  default:
				     break ; 	 
			  }
		  }
		  else if ( phase == "cancel")
		  {
			  scrollHorizontal(contentWidth * currentContent, speed);
		  }

		  //Else end means the swipe was completed, so move to the next image
		  else if ( phase =="end" )
		  {
			  if (direction == "right")
				  preContent();
			  else if (direction == "left")
				  nextContent();
		  }
	  } ; 	
	  
	  function slideUp()
	  {
		  if( currentItem.find(".innerSwipe").length > 0 )
		  {
			  
		  }
	  }
	  
	   // 使用 css3 transform 移动滚动图片
	  function scrollHorizontal(distance, duration)
	  {
		  //$(".swipe:visible").text(distance);
		  swipeContent.css("-webkit-transition-duration",(duration/1000).toFixed(1)+"s");
		  var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
		  swipeContent.css("-webkit-transform","translate3d("+value+"px,0px,0px)");
		  
	  }
	  function scrollVertical(distance, duration)
	  {
		  var innerItem = $(".swipe:visible").find(".innerSwipe").length ;
		  //alert(innerItem);
		  if( innerItem > 0 )
		  {
				$(".innerSwipe:visible").text(distance);
				swipeContent.css("-webkit-transition-duration",(duration/1000).toFixed(1)+"s");
				var value = (distance < 0 ? "" : "-") + Math.abs(distance).toString();
				currentItem.css("-webkit-transform","translate3d(0px,"+value+"px,0px)");
		  }
	  }
	  
	  
	  function preContent()
	  {
		  currentContent = Math.max(currentContent-1,0);
		  scrollHorizontal( contentWidth*currentContent , speed );
	  }
	  function nextContent()
	  {
		  currentContent = Math.min(currentContent+1,maxContent-1);
		  scrollHorizontal( contentWidth*currentContent , speed );
	  }
	  

		
});