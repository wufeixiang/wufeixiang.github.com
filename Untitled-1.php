<!--这是一个类似控制台的程序，通过ajax返回命令执行的结果-->

<!DOCTYPE html>
<html lang="en">
 <head> 
  <meta charset="utf-8" /> 
  <title>Command Center</title> 
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script> 
  <meta name="generator" content="http://switchtohtml5.com" /> 
 </head>
    <style type="text/css">
    *{margin:0;padding:0;}
	body{font-family:"Microsoft Yahei";}
	a:active,a:link,a:visited{text-decoration:none;color:#fff;}
	.wrapper{
		width:80%;height:100%;
		margin:0 auto;
		}
	
	.textarea-wrapper{
		width:100%;
		margin:10px 0;
		border:3px solid #eee;
		-webkit-box-shadow:2px 4px 10px 0 rgba(0,0,0,.5);
	}
	textarea,input
	{
		  font-family:Arial, Helvetica, sans-serif;
		  padding:20px;
		  font-size:14px;
   		  background: transparent;
   		  border: none;
	}
	.inputwrapper{
		-webkit-box-shadow:2px 4px 10px 0 rgba(0,0,0,.5);
		width:90%;
		float:left;border:3px solid #eee;
	}
	textarea{
		  height:600px;
		  width:96%;
	}
	input{width:96%;}
	.post{
		float:left;
		margin:0 12px;
		padding:20px;
		background:#2d89f0;
		-webkit-box-shadow:1px 1px 10px 0 rgba(0,0,0,.8);
		}
</style>
 <body>
    <div class="wrapper">
   <div class="textarea-wrapper">
	<textarea name="textfield" id="result" class="result"></textarea>
    </div>
    <div class="inputwrapper">
    <input name="cmd" type="text" class="cmd" />
    </div>
<a href="" class="post">提交</a>

    
 </body>
 <script type="text/javasrcipt">
    var url = "cmd.php";
    var cmd = "" ;
	
        
   $(document).ready(function(e) {
           
   });
});
    
 </script>
 
</html>
