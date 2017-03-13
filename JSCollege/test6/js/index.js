window.onload = function(){

	var EventUtil = {
		addHandler: function (element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent){
				element.attachEvent("on" + type, handler);
			}else{
				element["on" + type] = handler;
			}
		}
	}

	var src = document.getElementsByTagName("textarea")[0];
	var btn = document.getElementsByTagName("button")[0];
	var search = document.getElementsByTagName("input")[1];
	var wrap = document.getElementById("wrap");
	var arr = [];

	function getSrc(){
		var source = src.value.trim();
		if(source != ""){
			console.log(source.length);
			var txt = source.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(str){
			if(str != null){
				return true;
			}else{
				return false;
			}
		});
			arr = [];
			arr = arr.concat(txt);
			render();
		}else{
			alert("输入文本不能为空。");
		}
	}

	function render(str){
		wrap.innerHTML = arr.map(function(e){
			if(str != null && str.length > 0){
				e = e.replace(new RegExp(str,"g"),"<span>" + str + "</span>");
			}
			return "<div>" + e + "</div>";
			// join方法用以消除逗号，实现无间隔连接。
		}).join("");
	}

	EventUtil.addHandler(btn,"click",getSrc);

	EventUtil.addHandler(search,"click",function(){
		// 该变量若设为全局变量则只能获取第一次输入的文本，因为堆内存中存储的值不变。
		// 该变量若放置于调用它的函数内部，则每次点击事件都会调用该函数，从而每次更新堆内存中存储的值。
		var input = document.getElementsByTagName("input")[0].value;
		var pattern = /[0-9a-zA-Z\u4e00-\u9fa5]+/;
		if(wrap.childNodes.length != 0){
				if(pattern.test(input)){
					render(input);
				}else{
				alert("查询字符需为数字、中文或者英文。");
			}
		}else{
			alert("请先在文本框内输入字符后再输入要查询的字符。")
		}	
	});
		
}