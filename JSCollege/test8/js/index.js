window.onload = function(){
	var EventUtil = {
		addHandler:function(element, type, handler){
			if(element.addElementListener){
				element.addElementListener(type, handler, false);
			}else if(element.attatchElement){
				element.attatchElement("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		}
	};

	var root = document.getElementById("root");
	var btn = document.getElementsByTagName("button");
	var dftBtn = btn[0];
	var bftBtn = btn[1];
	var dftSearch = btn[2];
	var bftSearch = btn[3]
	var order = [];
	var timer = null;

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

	EventUtil.addHandler(dftBtn,"click", function(){
		initialize();
		traverseDF(root);
		changeColor();
	});

	EventUtil.addHandler(bftBtn, "click", function(){
		initialize();
		traverseBF(root);
		changeColor();
	});

	EventUtil.addHandler(dftSearch, "click", function(){
		var txt = document.getElementsByTagName("input")[0].value;
		initialize();
		traverseDF(root);
		if(txt != ""){
			changeColor(txt);
		}else{
			alert("请输入要查询的字符。");
		}	
	});

	EventUtil.addHandler(bftSearch, "click", function(){
		var txt = document.getElementsByTagName("input")[0].value;
		initialize();
		traverseBF(root);
		if(txt != ""){
			changeColor(txt);
		}else{
			alert("请输入要查询的字符。");
		}
	});
}