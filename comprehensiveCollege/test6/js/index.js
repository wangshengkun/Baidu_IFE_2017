var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		}else{
			element["on" + type] = handler;
		}
	},

	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);
		}else if(element.detachEvent){
			element.detachEvent("on" + type, handler);
		}else{
			element["on" + type] = null;
		}
	}
};

//浮出层组件
function Popup(element, mask){
	this.element = element;
	if(arguments[1] == null){
		this.maskElement = null;
	}else {
		this.maskElement = mask;
	}

	this.init();
}

Popup.prototype = {
	constructor: Popup,
	
	show: function(){
		this.maskElement.style.display = "block";
		this.element.style.display = "block";
		//重置定位，主要是消除dragNode()的影响
		this.element.style.left = "50%";
		this.element.style.top = "50%";
	},

	hide: function(){
		//父元素设置为display:none时，子元素也不可见
		this.maskElement.style.display = "none";
	},

	init: function(){
		if(this.maskElement == null){
			this.maskElement = document.createElement("div");
		}
		this.maskElement.style.width = window.screen.width + "px";
		this.maskElement.style.height = window.screen.height + "px";
		this.maskElement.style.position = "fixed";
		this.maskElement.style.top = "50%";
		this.maskElement.style.left = "50%";
		this.maskElement.style.transform = "translate(-50%,-50%)";
		this.maskElement.style.backgroundColor = "rgba(108,108,108,0.7)";
		this.maskElement.style.display = "none";

		this.element.style.position = "absolute";
		this.element.style.left = "50%";
		this.element.style.top = "50%";
		this.element.style.transform = "translate(-50%,-50%)";
		this.element.style.display = "none";

		this.element.parentNode.removeChild(this.element);
		this.maskElement.appendChild(this.element);
		document.body.appendChild(this.maskElement);

		var self = this;
		EventUtil.addHandler(this.maskElement, "click", function(){
			self.hide();
		});

		//防止事件冒泡至遮罩层
		EventUtil.addHandler(this.element, "click", function(event){
			var event = event ? event : window.event;
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		});

		this.dragNode(this.element.children[0]);
	},

	//拖动节点函数
	dragNode: function(node){
		node.style.cursor = "move";
		var self = this;

		EventUtil.addHandler(node, "mousedown", function(event){
			var event = event ? event : window.event;
			var disX = event.clientX - self.element.offsetLeft;
			var disY = event.clientY - self.element.offsetTop;

			var move = function(event){
				var event = event ? event : window.event;
				self.element.style.left = event.clientX - disX + "px";
				self.element.style.top = event.clientY - disY + "px";
			}

			EventUtil.addHandler(document, "mousemove", move);
			EventUtil.addHandler(document, "mouseup", function(){
				EventUtil.removeHandler(document, "mousemove", move);
			});
		});
	}
}

var popup = document.getElementById("popup");
var mask = document.getElementById("mask");
var clickBtn = document.getElementsByTagName("button")[0];
var sureBtn = document.getElementsByTagName("input")[0];

var layer = new Popup(popup,mask);
EventUtil.addHandler(clickBtn, "click", function(){
	layer.show();
})
EventUtil.addHandler(sureBtn, "click", function(){
	layer.hide();
})