window.onload = function(){
	//跨浏览器事件处理程序
	var EventUtil = {
		addHandler:function(element, type, handler){
			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			} else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		}
	}	

	var txt = document.getElementsByTagName("input")[0];
	var btn = document.getElementsByTagName("button");
	var wrap =document.getElementById("wrap");
	var pattern =/^[0-9]+$/;

	var queue = {
		//整段代码的关键，需理解this关键字。
		arr:[],	

		addLeft:function(num){
			this.arr.unshift(num);
			if(this.arr.length <= 60){
				this.draw();
				txt.value = "";
			}else{
				alert("该队列最多容纳60个元素，您已超出。");
			}		
		},

		addRight:function(num){
			this.arr.push(num);
			if(this.arr.length <= 60){
				this.draw();
				txt.value = "";
			}else{
				alert("该队列最多容纳60个元素，您已超出。");
			}	
		},

		isEmpty:function(){
			if(this.arr.length == 0){
				return true;
			}
		},

		removeLeft:function(num){
			if(!this.isEmpty()){
				alert(Number(this.arr.shift()));
				this.draw();
			}else{
				alert("该队列已为空。");
			}
		},

		removeRight:function(num){
			if(!this.isEmpty()){
				alert(Number(this.arr.pop()));
				this.draw();
			}else{
				alert("该队列已为空。");
			}
		},

		draw:function(){
			var canvas = "";
			every(this.arr,function(num){
				canvas += "<div style=\"height:"+Number(num)+"px\"></div>";
			});
			//每次调用queue的方法时都要重新渲染wrap的内容，所以效率上可能有缺陷，但暂时没找到更好的替代方案。
			wrap.innerHTML = canvas;
			autoDelete();
		},

		deleteNum:function(index){
			this.arr.splice(index,1);
			this.draw();
		},

		bubbleSort:function(arr){
			var i = 0,
				j = 0,
				temp,
				end = setInterval(painting,100);
			function painting(){
				if(i < arr.length){
					if(j < arr.length-1-i){
						if(Number(queue.arr[j]) > Number(queue.arr[j+1])){
							temp = queue.arr[j];
							queue.arr[j] = queue.arr[j+1];
							queue.arr[j+1] = temp;
							queue.draw();
						}
						j++;
						return;
					}else{
						j = 0;
					}
						i++;
				}else{
					clearInterval(end);
				}
			}
		}
	}

	//遍历函数，与Array类型的map()方法类似。
	function every(arr,fn){
		for(var cur = 0; cur < arr.length; cur++){
			fn(arr[cur]);
		}
	}

	function autoDelete(){
		for(var cur = 0; cur < wrap.childNodes.length; cur++){
			//利用IIFE与闭包来消除作用域链的副作用。
            EventUtil.addHandler(wrap.childNodes[cur], "click", (function(cur){
            	return function(){queue.deleteNum(cur);}
            })(cur));
		}
	}

	EventUtil.addHandler(btn[0], "click", function(){
		var number = txt.value;
		if(pattern.test(number) && (10 <= Number(number)) && (Number(number) <= 100)){
			queue.addLeft(number);
		} else {
			alert("请输入10到100间的整数。");
		}
		
	});

	EventUtil.addHandler(btn[1], "click", function(){
		var number = txt.value;
		if(pattern.test(number) && (10 <= Number(number)) && (Number(number) <= 100)){
			queue.addRight(number);
		} else {
			alert("请输入10到100间的整数。");
		}
		
	});

	EventUtil.addHandler(btn[2], "click", function(){
		queue.removeLeft();
	});

	EventUtil.addHandler(btn[3], "click", function(){
		queue.removeRight();
	});

	EventUtil.addHandler(btn[4], "click", function(){
		var divList = wrap.getElementsByTagName("div");
		queue.bubbleSort(divList);
	});
}