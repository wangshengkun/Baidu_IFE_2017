window.onload=function(){
	// 获取文本内容
	function getNumber(){
		var source = document.getElementsByTagName("input")[0].value;
		if(source!=""){
			var num = Number(source);
			if(!isNaN(num)){
			addSpan();
			}else{
			alert("输入文本须为数字。");
			}
		}else{
			alert("输入文本不能为空。");
		}
	}
	// 小方块格式化
	function addSpan(){
	var span = document.createElement("span");
	span.style.display = "inline-block";
	span.style.height = "40px";
	span.style.width = "40px";
	span.style.backgroundColor = "#ff0000";
	span.style.color = "#fff";
	span.style.textAlign = "center";
	span.style.marginLeft = "4px";
	// span.text = num;
	var wrap = document.getElementById("wrap");
	wrap.appendChild(span);
	}

	function end(){
		getNumber();
	}

	var btn = document.getElementsByTagName("button");
	for(var i = 0, len = btn.length; i < len; i++){
		btn[i].onclick = end;
	}
	
}