var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		}else {
			element["on" + type] = handler;
		}
	},

	getEvent: function(event){
		return event ? event : window.event;
	},

	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}

};

//自定义菜单栏
function customContextmenu(event){
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event);

	//获取鼠标在页面中的横纵坐标
	var mouseX = event.pageX,
		mouseY = event.pageY;
	
	var wisdom = document.getElementsByTagName("p")[0];
	//获取名言的宽高
	var wisdomWidth = wisdom.offsetWidth,
		wisdomHeight = wisdom.offsetHeight;

	var menu = document.getElementsByTagName("ul")[0];
	menu.style.display = "block";
	menu.style.position ="absolute";
	//获取菜单栏的宽高
	var menuWidth = menu.offsetWidth,
		menuHeight = menu.offsetHeight;

	//获取浏览器窗口大小
	var pageWidth = window.innerWidth,
		pageHeight = window.innerHeight;
	if(typeof pageWidth != "number"){
		if(document.compatMod == "CSS1Compat"){
			pageWidth = document.documentElement.clientWidth;
			pageHeight = document.documentElement.clientHeight;
		}else{
			pageWidth = document.body.clientWidth;
			pageHeight = document.body.clientHeight;
		}
	}

	if(pageWidth >= (mouseX + menuWidth)){
		menu.style.left = mouseX + "px";
	}else{
		// menu.style.cssText = "display:block;position:absolute;right:0px;";
		menu.style.left = (mouseX - menuWidth) + "px"; 
	}

	if(pageHeight >= mouseY + menuHeight){
		menu.style.top = mouseY + "px";
	}else{
		menu.style.top = (mouseY - menuHeight) + "px";
	}

	EventUtil.addHandler(menu, "click",function(){
		menu.style.display = "none";
	});

	EventUtil.addHandler(document, "click", function(){
		menu.style.display = "none";
	});

}

var p = document.getElementsByTagName("p");
for(var i = 0; i < p.length; i++){
	EventUtil.addHandler(p[i], "contextmenu", customContextmenu);
}
