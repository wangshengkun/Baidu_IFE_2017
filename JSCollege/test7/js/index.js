window.onload = function(){
	var EventUtil = {
			addHandler: function(element, type, handler){
				if(element.addEventListener){
					element.addEventListener(type, handler, false);
				}else if(element.attachEvent){
					element.attachEvent("on" + type, handler);
				}else{
					element["on" + type] = handler;
				}
			}
		};

	var preOrder = document.getElementsByTagName("button")[0];
	var inOrder = document.getElementsByTagName("button")[1];
	var postOrder = document.getElementsByTagName("button")[2];
	var root = document.getElementById("root");
	var order = [];
	var timer = null;
	//先序遍历
	function preOrderTraverse(node){
		if(node !=null){
			order.push(node);
			// 若该节点下无子节点，重新调用该函数时参数node的值便默认为null，
			// 浏览器报错，所以需在头部添加一个参数非null判断。下同。
			preOrderTraverse(node.firstElementChild);
			preOrderTraverse(node.lastElementChild);
		}
	}
	//中序遍历
	function inOrderTraverse(node){
		if(node != null){
			inOrderTraverse(node.firstElementChild);
			order.push(node);
			inOrderTraverse(node.lastElementChild);
		}
	}
	//后序遍历
	function postOrderTraverse(node){
		if(node != null){
			postOrderTraverse(node.firstElementChild);
			postOrderTraverse(node.lastElementChild);
			order.push(node);
		}
	}
	//颜色改变函数
	function changeColor(){
		var i = 0;
		order[i].style.backgroundColor = "#f00";
		timer = setInterval(function(){
			i++;
			if(i < order.length){
				order[i-1].style.backgroundColor = "#fff";
				order[i].style.backgroundColor = "#f00";
			}else{
				clearInterval(timer);
				order[order.length-1].style.backgroundColor = "#fff";
			}
		},500);
	}
	//初始化函数
	function initialize(){
		//在执行当前遍历时可以取消上一遍历，使得不会出现多重遍历的情况。
		order = [];
		clearInterval(timer);
		//background-color属性的默认值是transparent，缺少下列循环会导致背景色透明可见。
		var divList = document.getElementsByTagName("div");
		for(var i = 0; i < divList.length; i++){
			divList[i].style.backgroundColor = "#fff";
		}
	}

	EventUtil.addHandler(preOrder, "click", function(){
		initialize();
		preOrderTraverse(root);
		changeColor();
	});

	EventUtil.addHandler(inOrder, "click", function(){
		initialize();
		inOrderTraverse(root);
		changeColor();
	});

	EventUtil.addHandler(postOrder, "click", function(){
		initialize();
		postOrderTraverse(root);
		changeColor();
	})

}