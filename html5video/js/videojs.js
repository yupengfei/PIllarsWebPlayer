// JavaScript Document
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint;

window.onload = function(){
	var canvas = document.getElementById('canvas');
	var video=document.getElementById("video");
	var height = $("#video").height();
	var width = $("#video").width();
	canvas.setAttribute("height",height);
	canvas.setAttribute("width",width);
	var canvasnone = document.getElementById('canvasnone');
	canvasnone.setAttribute("height",height);
	canvasnone.setAttribute("width",width);
	var mleft = (1200-width)/2;
	$("#canvas").css("margin-left",mleft+"px");
	setTimeout('sx()',500);
}
//定时刷新，防止在视频加载之前定义得到视频文件属性失败
function sx(){
	var canvas = document.getElementById('canvas');
	var video=document.getElementById("video");
	var height = $("#video").height();
	var width = $("#video").width();
	canvas.setAttribute("height",height);
	canvas.setAttribute("width",width);
	var canvasnone = document.getElementById('canvasnone');
	canvasnone.setAttribute("height",height);
	canvasnone.setAttribute("width",width);
	var mleft = (1200-width)/2;
	$("#canvas").css("margin-left",mleft+"px");
}
var video=document.getElementById("video");
function slow(){
	if(video.playbackRate>0.25){
		video.playbackRate = video.playbackRate-0.25;
		$("#bf .bfsdd").html(video.playbackRate);
	}else if(video.playbackRate<=0.25){
		video.playbackRate = video.playbackRate-0.01;
	}
	$("#bf .bfsdd").html(video.playbackRate);
}
function fast(){
	if(video.playbackRate<5){
		video.playbackRate = video.playbackRate+0.25;
		$("#bf .bfsdd").html(Math.round(video.playbackRate));
	}
}
video.addEventListener("timeupdate", function(){
	$(".bfsjd").html(Math.round(video.duration)+"/"+Math.round(video.currentTime));
});
function play(){
	video.play();
}
function paused(){
	video.pause();
}
//截图
function s(){
	var bufferCanvas = document.getElementById("canvas");
	var buffer = bufferCanvas.getContext("2d");
	buffer.drawImage(video,0,0,bufferCanvas.width,bufferCanvas.height);
}

/*
var img = document.getElementById("img");
img.src = image;
*/
//保存
function keep(){
	var bufferCanvas = document.getElementById("canvasnone");
	var buffer = bufferCanvas.getContext("2d");
	buffer.drawImage(video,0,0,bufferCanvas.width,bufferCanvas.height);
	
	var mycanvas = document.getElementById("canvas");
	var ctx = mycanvas.getContext("2d");
	buffer.drawImage(mycanvas,0,0,mycanvas.width,mycanvas.height);
	
	var mycanvas = document.getElementById("canvasnone");
	var image = mycanvas.toDataURL("image/png");
	var imghtml = "<img src="+image+">";
	$(".imgs").append(imghtml);
	
	var mycanvas = document.getElementById("canvas");
	var ctx = mycanvas.getContext("2d");
	ctx.clearRect(0,0,mycanvas.width,mycanvas.height);	
	/*keepraw();
	var mycanvas = document.getElementById("canvas");
	var ctx = mycanvas.getContext("2d");
	var bufferCanvas = document.getElementById("canvasnone");
	buffer.drawImage(bufferCanvas,10,0,ctx.width,ctx.height);
	
	var image = mycanvas.toDataURL("image/png");
	var imghtml = "<img src="+image+">";
	$(".imgs").append(imghtml);
	var height = $("#video").height();
	var width = $("#video").width();
	ctx.clearRect(0,0,width,height);
	*/
}


var canvas = document.createElement('canvas');
canvas.setAttribute('width', 600);
canvas.setAttribute('height', 600);
canvas.setAttribute('id', 'canvas');
var point = {};
point.notFirst = false;

var context = canvas.getContext("2d");
$("#canvas").mousedown(function(e){//鼠标点击画布
	//获得当前在画布的坐标
	var mouseX = e.pageX - this.offsetLeft;//当前坐标＝鼠标距离窗口的坐标-画布距离窗口的坐标
	var mouseY = e.pageY - this.offsetTop;
	paint = true;
	addClick(mouseX,mouseY);
	redraw();
});
$("#canvas").mousemove(function(e){//鼠标点下去不放拖动
	if(paint){
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		redraw();
	}
});
$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});



function addClick(x,y,dragging){
	var sx = clickX.push(x);
	var sy = clickY.push(y);
	clickDrag.push(dragging);
}
function redraw(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");
	context.lineJoin = "round";
	context.strokeStyle = "#df4b26";
	context.lineWidth = 5;
	while(clickX.length > 0){
		context.beginPath();
		point.tx = point.x;
		point.ty = point.y;
		point.x = clickX.pop();
		point.y = clickY.pop();
		point.drag = clickDrag.pop();
		if(point.drag && point.notFirst){
			context.moveTo(point.tx, point.ty);
		}else{
			point.notFirst = true;
			context.moveTo(point.x-1, point.y);
		}
		context.lineTo(point.x, point.y);
		context.stroke();
		context.closePath();
		console.log(point);
	}
}
function keepraw(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");
	context.beginPath();
	context.lineJoin = "round";
	context.strokeStyle = "#df4b26";
	context.lineWidth = 6;
	point.tx = point.x;
	point.ty = point.y;
	point.x = clickX.pop();
	point.y = clickY.pop();
	point.drag = clickDrag.pop();
	point.notFirst = true;
	context.moveTo(point.x-1, point.y);
	context.lineTo(point.x, point.y);
	context.stroke();
	context.closePath();
}
function cTime(the){
	video.pause();
	if(the=='top'){
		document.getElementById('video').currentTime = document.getElementById('video').currentTime-0.02;
	}else{
		document.getElementById('video').currentTime = document.getElementById('video').currentTime+0.02;
	}
}
function loop(){
	if(video.loop==true){
		video.loop = false;
	}else{
		video.loop = true;
		if(video.currentTime==video.duration){
			video.currentTime = 0;
			video.play();
		}
	}
}
function loops(){
	var schtml = $(".sc").html();
	if(schtml==null){
		$("body").append("<div class='sc'><div class='kaiguan'></div><div class='s'></div><div class='c'></div></div><div class='outer'></div>");
	}
	var height = $(window).height();
		var width = $(window).width();
		$(".outer").css({"height":height+"px","width":width+"px"});
		$(".formdiv").css({"left":(width/2)-200+"px","top":(height/2)-200+"px"});
		$(".outer").show(500);
		$(".formdiv").show(500);
	if(video.loop==true){
		video.loop = false;
	}else{
		video.loop = true;
		if(video.currentTime==video.duration){
			video.currentTime = 0;
			video.play();
		}
	}
}
$(".submit").click(function(){
	var value = $("input[type=radio]:checked").val();
	if(value=="开启"){
		var rudian = $(".inprd").val();
		var chudian = $(".inpcd").val();
		if(rudian != ""){
			var result = rudian.match(/^[0-9]*$/);
			if(result==null){
				alert("请输入整数");
				return false;
			}
			if(rudian>video.duration){
				alert("大于视频长度");
				return false;
			}
		}else{
			alert("请输入入点时间");
			return false;
		}
		if(chudian != ""){
			var result = chudian.match(/^[0-9]*$/);
			if(result==null){
				alert("请输入整数");
				return false;
			}
			if(chudian>video.duration){
				alert("大于视频长度");
				return false;
			}
			if(chudian<=rudian){
				alert("大于出点秒数");
				return false;
			}
		}else{
			alert("请输入出点时间");
			return false;
		}
		$(".sc .kaiguan").html(value);
		$(".sc .s").html(rudian);
		$(".sc .c").html(chudian);
		$(".outer").hide(500);
		$(".formdiv").hide(500);
		
	}else{
		$(".sc .kaiguan").html(value);
		$(".sc .s").html("");
		$(".sc .c").html("");
		$(".outer").hide(500);
		$(".formdiv").hide(500);
	}
});
$(".quit").click(function(){
	$(".outer").hide(500);
	$(".formdiv").hide(500);
});
$(".fullscr").click(function(){
	var element = video;
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
});