window.onload = function(){
	var EventUtil = {
		addHandler:function(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		}
	};

	//创建表格
	var tbody = document.getElementsByTagName("tbody")[0];
	for(var i = 0; i <= 10; i++){
		tbody.insertRow(i);
		for(var j = 0; j <=10; j++){
			tbody.rows[i].insertCell(j);
			if(i == 0 && j != 0){
				tbody.rows[0].cells[j].appendChild(document.createTextNode(j));
			}else if( i != 0 && j == 0){
				tbody.rows[i].cells[0].appendChild(document.createTextNode(i));
			}
		}
	}

	//限制偏移函数
	function limit(top, left){
		return (top >= 50 && top <=500) && (left >= 50 && left <= 500);
	}

	function Block(block){
		this.block = block;
		//定义头部方向
		//上方： 0	右方： 1
		//下方：
		this.direction = 0;
		//定义旋转角度
		this.deg = 0;
	}

	//小方块位置初始化
	Block.prototype.initialize = function (){
		this.block.style.top = "300px";
		this.block.style.left = "300px";
	}
	
	//存取每次移动后的top、left值
	Block.prototype.position = function(top, left){
		this.block.style.top = top + "px";
		this.block.style.left = left + "px";
	}

	Block.prototype.traLef = function(){
		var top = parseInt(this.block.style.top.split("px")[0]);
		var left = parseInt(this.block.style.left.split("px")[0]);
		if(limit(top, left-50)){
			left -= 50;
			this.position(top, left);
		}else{
			alert("已经到达边界");
		}
	}

	Block.prototype.traTop = function(){
		var top = parseInt(this.block.style.top.split("px")[0]);
		var left = parseInt(this.block.style.left.split("px")[0]);
		if(limit(top-50, left)){
			top -= 50;
			this.position(top, left);
		}else{
			alert("已经到达边界");
		}
	}

	Block.prototype.traRig = function(){
		var top = parseInt(this.block.style.top.split("px")[0]);
		var left = parseInt(this.block.style.left.split("px")[0]);
		if(limit(top, left+50)){
			left += 50;
			this.position(top, left);
		}else{
			alert("已经到达边界");
		}
	}

	Block.prototype.traBot = function(){
		var top = parseInt(this.block.style.top.split("px")[0]);
		var left = parseInt(this.block.style.left.split("px")[0]);
		if(limit(top+50, left)){
			top += 50;
			this.position(top, left);
		}else{
			alert("已经到达边界");
		}
	}

	//定义过渡动画
	Block.prototype.rotate = function(txt){
		switch(txt){
			case "left":
				this.deg = -90;
				break;
			case "top":
				this.deg = 0;
				break;
			case "right":
				this.deg = 90;
				break;
			case "bottom":
				this.deg = 180;
				break;
		}
		this.block.style.transform = "rotate(" + this.deg + "deg)";
		this.direction = (this.deg / 90) % 4;
	}

	Block.prototype.move = function(txt){
		var txt = txt.toUpperCase();
		if(txt == "TRA LEF"){
			this.traLef();
		}else if(txt == "TRA TOP"){
			this.traTop();
		}else if(txt == "TRA RIG"){
			this.traRig();
		}else if(txt == "TRA BOT"){
			this.traBot();
		}else if(txt == "MOV LEF"){
			if(this.direction != -1 ){
				this.rotate("left");
			}
			this.traLef();
		}else if(txt == "MOV TOP"){
			if(this.direction != 0){
				this.rotate("top");
			}
			this.traTop();
		}else if(txt == "MOV RIG"){
			if(this.direction != 1){
				this.rotate("right");
			}
			this.traRig();
		}else if(txt == "MOV BOT"){
			if(this.direction != 2){
				this.rotate("bottom");
			}
			this.traBot();
		}else{
			alert("指令不符合要求");
		}
	}

	var block = document.getElementById("block");
	var btn = document.getElementsByTagName("button")[0];
	var target = new Block(block);
	target.initialize();
	EventUtil.addHandler(btn, "click", function(){
		var txt = document.getElementsByTagName("input")[0].value;
		target.move(txt);
	})

}