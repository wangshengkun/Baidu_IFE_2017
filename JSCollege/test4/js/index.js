window.onload=function(){
	// 获取文本数字
	function getNumber(){
		var source = document.getElementsByTagName("input")[0].value;
		if(source!=""){
			var num = Number(source);
			if(!isNaN(num)){
				return num;
			}else{
			alert("输入文本须为数字。");
			}
		}else{
			alert("输入文本不能为空。");
		}
	}
	// 小方块格式化
	function addSpan(number){
	var span = document.createElement("span");
	span.style.display = "inline-block";
	span.style.height = "40px";
	span.style.width = "40px";
	span.style.backgroundColor = "#ff0000";
	span.style.color = "#fff";
	span.style.textAlign = "center";
	span.style.marginLeft = "4px";
	span.style.fontSize = "12px";
	span.style.lineHeight = "40px";
	span.innerHTML = number;
	// var wrap = document.getElementById("wrap");
	// wrap.appendChild(span);
	return span;
	}
	//
	function render(numData){
		for(var i = 0,len = numData.length; i < len; i++){
			var number = numData[i];
			var span = addSpan(number);
			var wrap = document.getElementById("wrap");
			wrap.appendChild(span);
		}
	}
	//左侧插入
	var data = [];
	function addLeft(){
		var numberTxt = getNumber();
		data.push(numberTxt);
		render(data);

	}
	function addRight(num){
		data.unshift(num);
	}
	function removeLeft(num){
		data.pop();
	}
	function removeRight(num){
		data.shift();
	}
	
	
	function init(){
		var btn = document.getElementsByTagName("button");
		btn[0].onclick = addLeft;
		btn[1].onclick = addRight;
		btn[2].onclick = removeLeft;
		btn[3].onclick = removeRight;
	}
	init();
}