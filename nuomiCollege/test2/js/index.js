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

	getTarget: function(event){
		return event.target || event.srcElement;
	},

	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},

	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancleBubble = true;
		}
	}
};

function customContextmenu(event){
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event);
	var flag =false;
	//获取鼠标在页面中的横纵坐标
	var mouseX = event.pageX,
		mouseY = event.pageY;
	// console.log(mouseX,mouseY);
	
	var wisdom = document.getElementsByTagName("p")[0];
	//获取名言尺寸
	var wisdomWidth = wisdom.offsetWidth,
		wisdomHeight = wisdom.offsetHeight;
	// console.log(wisdomWidth,wisdomHeight);
	//获取名言的偏移量
	var wisdomLeft = wisdom.offsetLeft,
		wisdomTop = wisdom.offsetTop;
	// console.log(wisdomLeft,wisdomTop);

	var menu = document.getElementsByTagName("ul")[0];
	menu.style.display = "block";
	menu.style.position ="absolute";
	//获取菜单栏的大小
	var menuWidth = menu.offsetWidth,
		menuHeight = menu.offsetHeight;
	// console.log("菜单框"+menuWidth,menuHeight);

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
	// console.log(pageWidth,pageHeight);

	if(pageWidth >= (mouseX + menuWidth)){
		menu.style.left = mouseX + "px";
	}else{
		// menu.style.cssText = "display:block;position:absolute;right:0px;";
		menu.style.left = mouseX - menuWidth + "px"; 
	}

	if(pageHeight >= mouseY + menuHeight){
		menu.style.top = mouseY + "px";
	}else{
		menu.style.bottom = pageHeight - mouseY + "px";
	}

	EventUtil.addHandler(menu, "click",function(){
		menu.style.display = "none";
	})

	EventUtil.addHandler(document, "click", function(){
		menu.style.display = "none";
	})

}

var p = document.getElementsByTagName("p")[0];
EventUtil.addHandler(p, "contextmenu", customContextmenu);