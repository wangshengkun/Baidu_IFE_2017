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

var btn = document.getElementsByTagName("button");

// var phoneNum = /^1(3\d|4[57]|5[^4]|7[01678]|8\d)\d{8}$/g;
// 注意区别全局模式下(g)在全局作用域与局部作用域中的区别
EventUtil.addHandler(btn[0], "click",function(){
	// 手机号码类型：13[0-9], 14[5,7], 15[0, 1, 2, 3, 5, 6, 7, 8, 9], 17[0, 1, 6, 7, 8], 18[0-9]
	var phoneNum = /^1(3\d|4[57]|5[^4]|7[01678]|8\d)\d{8}$/g;
	var txt = document.getElementsByTagName("input")[0].value;
	if(phoneNum.test(txt)){
		alert("true");
	}else{
		alert("false");
	}
});

EventUtil.addHandler(btn[1], "click", function(){
	// var string = /\b(\w+)\b\s+\1\b/g;
	var string = /(?:^|\s)\b([A-Za-z]+(?:-[A-Za-z]+)*)\s+\1\b(?=\s|$)/g;
	var txt = document.getElementsByTagName("input")[1].value;
	if(string.test(txt)){
		alert("true");
	}else{
		alert("false");
	}
});