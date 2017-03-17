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

	var root = document.getElementById("root");
	var btn = document.getElementsByTagName("button");
	var dftBtn = btn[0];
	var bftBtn = btn[1];
	var addBtn = btn[2];
	var deleteBtn = btn[3];
	var order = [];
	var timer = null;
	var targetNode = null;

	//深度优先遍历
	function traverseDF(node){
		if(node != null){
			order.push(node);
			for(var i = 0; i < node.children.length; i++){
				traverseDF(node.children[i]);
			}
		}
	}
	//广度优先遍历
	function traverseBF(node){
		if(node != null){
			order.push(node);
			traverseBF(node.nextElementSibling);
			node = order[index++];
			traverseBF(node.firstElementChild);
		}	
	}

	function changeColor(txt){
		//若第一次搜索就匹配成功，则不再查询。
		var i = 0;
		if(order[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == txt){
			order[i].style.backgroundColor = "#00f";
		}else{
			order[i].style.backgroundColor = "#f00";
			timer = setInterval(function(){
				i++;
				if(i < order.length){
					order[i-1].style.backgroundColor = "#fff";	
					if(order[i].firstChild.nodeValue.replace(/(^\s*)|(\s*$)/g, "") == txt){
						
						order[i].style.backgroundColor = "#00f";
						clearInterval(timer);
					}else{
						order[i].style.backgroundColor = "#f00";
					}
				}else{
					clearInterval(timer);
					order[order.length-1].style.backgroundColor = "#fff";
					if(txt != null){
						alert("未搜索到该字符。");
					}
				}
			},500);
		}
	}

	//初始化
	function initialize(){
		//每次调用广度优先遍历都要初始化index值，否则广度优先遍历只能执行一次，因为index是全局变量。
		index = 0;
		order = [];
		clearInterval(timer);
		var divList = document.getElementsByTagName("div");
		for(var i = 0; i < divList.length; i++){
			divList[i].style.backgroundColor = "#fff";
		}
	}

	//选中节点高亮显示
	function highlight(){
		var divList = document.getElementsByTagName("div");
		for(var cur = 0;cur < divList.length; cur++){
			EventUtil.addHandler(divList[cur], "click", function(event){
				initialize();
				this.style.backgroundColor = "#0f0";
				event.stopPropagation();
				targetNode = this;
			});
		}
	}

	//添加新节点
	function addNode(txt){
		var parent = this;
		var newNode = document.createElement("div");
		newNode.innerHTML = txt;
		newNode.className = "newNode";
		newNode.style.backgroundColor = "#fff";
		parent.appendChild(newNode);
	}

	//删除节点
	function deleteNode(){
		var parent = this.parentNode;
		parent.removeChild(this);
		//更新targetNode,否则targetNode不存在，即null,使之父节点不存在，浏览器报错。
		targetNode = null;
	}

	EventUtil.addHandler(dftBtn,"click", function(){
		initialize();
		traverseDF(root);
		changeColor();
		//为防止出现点击元素后直接遍历，最后再添加/删除节点的情况，
		//targetNode必须在每次遍历后重置为null。
		targetNode = null;
	});

	EventUtil.addHandler(bftBtn, "click", function(){
		initialize();
		traverseBF(root);
		changeColor();
		//同上，全局变量就是这点不好，但是目前没有想到合适的解决办法呀。
		targetNode = null;
	});

	//绑定添加节点函数
	EventUtil.addHandler(addBtn, "click", function(event){
		if(targetNode != null){
			var txt = document.getElementsByTagName("input")[0].value;
			if(txt !=""){
				var txtArray = [].concat(txt);
				addNode.apply(targetNode,txtArray);
				highlight();
				txt = "";
			}else{
				alert("请输入想要添加的内容。");
			}
		}else{
			alert("请先选中节点。");
		}	
	});

	//绑定删除节点函数
	EventUtil.addHandler(deleteBtn, "click", function(){
		if(targetNode != null){
			var divList = document.getElementsByTagName("div");
			if(divList.length >1){
				deleteNode.call(targetNode);
			}else{
				alert("节点数目已为1，请勿删除。");
			}
		}else{
			alert("请先选中节点。");
		}	
	});

	highlight();

}