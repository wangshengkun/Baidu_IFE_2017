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
	var input = document.getElementsByTagName("input")[0];
	var search = document.getElementsByTagName("input")[1];
	var wrap = document.getElementById("wrap");

	function getSrc(){
		var source = src.value.trim();
		
	}
}