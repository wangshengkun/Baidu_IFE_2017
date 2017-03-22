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

	var btn = document.getElementsByTagName("button")[0];

	EventUtil.addHandler(btn, "click", function(){
		var txt = document.getElementsByTagName("input")[0].value;
		if(txt != ""){
			defineDirection(txt);
		}else{
			alert("指令不能为空");
		}	
	});

	//确定方向指令
	function defineDirection(txt){
		var direction = txt.toUpperCase();
		if(direction == "GO"){
			moveBlock(data.position);
		}else if(direction == "TUN LEF"){
			turnLeft();
		}else if(direction == "TUN RIG"){
			turnRight();
		}else if(direction == "TUN BAC"){
			turnBack();
		}else{
			alert("指令有误，请重新输入");
		}
	}

	//存储方向的值
	var data = {
		// 0:上方	1:右转
		// 2:反向	3:左转
		position:0,
	}

	//左转函数
	function turnLeft(){
		//注意，是前置递减，不是后置递减
		var position = --data.position;
		changeColor(position);
	}

	//右转函数
	function turnRight(){
		//前置递增
		var position = ++data.position;
		changeColor(position);
	}

	//反向函数
	function turnBack(){
		var position = data.position + 2;
		changeColor(position);
	}

	//改变头部样式
	function changeColor(position){
		var span = document.getElementsByTagName("span")[0];
		var curr = position % 4 + (position % 4 > 0 ? 0 : 4 );
		switch(curr){
			case 0:
			//合并两种情况
			case 4:
				resetColor.call(span);
				span.style.top = "0";
				span.style.height = "10px";
				span.style.width = "50px";
				break;
			case 1:
				resetColor.call(span);
				//在left,right均存在的情况下，left优先级较高
				//所以无法使用right = 0;
				span.style.left = "80%";
				span.style.height = "50px";
				span.style.width = "10px";
				break;
			case 2:
				resetColor.call(span);
				//top,bottom均存在的情况下，top优先级较高
				//所以无法使用bottom = 0;
				span.style.top = "80%";
				span.style.height = "10px";
				span.style.width = "50px";
				break;
			case 3:
				resetColor.call(span);
				span.style.left = "0";
				span.style.height = "50px";
				span.style.width = "10px";
				break;
		}
		//须及时更新小方块的方向值
		return data.position = curr;
	}

	//重置样式
	function resetColor(){
		this.style.top = "0";
		this.style.left = "0";
		this.style.height = "0";
		this.style.width = "0";
	}

	//小方块移动函数
	function moveBlock(position){
		switch(position){
			case 0:
			case 4:
				var tbody = document.getElementsByTagName("tbody")[0];
				var block = document.getElementById("block");
				//获取小方块所在的单元格
				var father = block.parentNode;
				//获取当前所在行
				var grandFather = father.parentNode;
				//获取当前所在行的上一行
				var granduncle = grandFather.previousElementSibling;
				var index = null;
				//获取小方块所在列
				for(var i = 1; i <= 10; i++ ){
					if(grandFather.cells[i].childElementCount == 1){
						index = i;
					}
				}
				//判断是否是表单的第一行
				if(granduncle != tbody.rows[0]){
					//确定上一行的相同列
					var target = granduncle.cells[index];
					//移除所在行的小方块
					father.removeChild(block.parentNode.firstElementChild);
					//创建新的小方块
					var div = document.createElement("div");
					div.setAttribute("id","block");
					var span = document.createElement("span");
					div.appendChild(span);
					//将新的小方块置入上一行的目标列中
					target.appendChild(div);
					//更新小方块样式
					changeColor(4);
				}else{
					alert("已经到达边界");
				}
				break;
			case 1:
				var block = document.getElementById("block");
				var parent = block.parentNode;
				if(parent.nextElementSibling != null){
					parent.removeChild(block.parentNode.firstElementChild);
					//innerHTML属性无法应用写在该属性内部之外的CSS样式，
					//所以改用createElement()方法
					var div = document.createElement("div");
					div.setAttribute("id","block");
					var span = document.createElement("span");
					div.appendChild(span);
					parent.nextElementSibling.appendChild(div);
					//必须将div及span插入文档内后再调用changeColor()方法，
					//否则即为“文档碎片”，无法获取。
					changeColor(1);
				}else{
					alert("已经到达边界");
				}
				break;
			case 2:
				var block = document.getElementById("block");
				var father = block.parentNode;
				var grandFather = father.parentNode;
				var granduncle = grandFather.nextElementSibling;
				var index = null;
				for(var i = 1; i <= 10; i++ ){
					if(grandFather.cells[i].childElementCount ==1){
						index = i;
					}
				}
				if(granduncle != null){
					var target = granduncle.cells[index];
					father.removeChild(block.parentNode.firstElementChild);
					var div = document.createElement("div");
					div.setAttribute("id","block");
					var span = document.createElement("span");
					div.appendChild(span);
					target.appendChild(div);
					changeColor(2);
				}else{
					alert("已经到达边界");
				}
				break;				
			case 3:
				var block = document.getElementById("block");
				var parent = block.parentNode;
				if(parent.previousElementSibling != parent.parentNode.firstElementChild){
					parent.removeChild(block.parentNode.firstElementChild);
					var div = document.createElement("div");
					div.setAttribute("id","block");
					var span = document.createElement("span");
					div.appendChild(span);
					parent.previousElementSibling.appendChild(div);
					changeColor(3);
				}else{
					alert("已经到达边界");
				}
				break;
		}
	}
}