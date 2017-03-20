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

	var input = document.getElementsByTagName("input");
	var info = document.getElementsByClassName("info");
	var btn = document.getElementsByTagName("button")[0];
	var tip = ["必填，长度为4~16位字符","长度为8~16，包含英文、数字","须与密码一致","example:XXXX@XX.com","1XXXXXXXXXX"];
	var classify = ["名称","密码","确认密码","邮箱","手机号"];

	for(var i = 0; i <  input.length; i++){
		(function(i){
			EventUtil.addHandler(input[i],"focus",function(event){
				if(event.target.value == "" || event.target.value == " "){
					resetStyle.call(info[i]);
					info[i].classList.add("tip");
					info[i].innerHTML = tip[i];
					event.target.style.borderColor = "#ddd";
					event.target.classList.remove("warningBorder");
				}
			});

			EventUtil.addHandler(input[i],"blur",function(event){
				if(event.target.value != ""){
					var txt = event.target.value;
					checkValue(i,txt);
				}else{
					event.target.setAttribute("class","warningBorder");
					resetStyle.call(info[i]);
					info[i].classList.add("warning");
					info[i].innerHTML = classify[i] + "不能为空";
				}
			});
			
		})(i);
	}

	function checkValue(curr,txt){
		switch (curr){
			case 0:
                flag = /^[a-zA-Z0-9_]{4,16}$/.test(txt.replace(/[\u0391-\uFFE5]/g,"aa"));
                break;
            case 1:
                flag = /^\S{8,16}$/.test(txt);
                break;
            case 2:
                flag = ((input[1].value==txt) && (txt != ""));
                break;
            case 3:
                flag = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(txt);
                break;
            case 4:
                flag = /^[1][0-9]{10}$/.test(txt);
                break;
		}
		if(flag){
			input[curr].style.borderColor = "#0f0";
			info[curr].innerHTML = classify[curr] + "正确";
			resetStyle.call(info[curr]);
			info[curr].classList.add("right");
		}else{
			input[curr].style.borderColor = "#f00";
			info[curr].innerHTML = classify[curr] + "不符合格式";
			resetStyle.call(info[curr]);
			info[curr].classList.add("warning");
		}
	}

	function resetStyle(){
		this.classList.remove("tip");
		this.classList.remove("warning");
		this.classList.remove("right");
	}

	EventUtil.addHandler(btn, "click", function(){
		var flag = [];
		[0,1,2,3,4].map(function(i){
			var input = document.getElementsByTagName("input");
			var txt = input[i].value;
			input[i].onblur = checkValue(i,txt);
			if(input[i].parentNode.parentNode.nextElementSibling.lastElementChild.classList.contains("right")){
				flag.push(true);
			}
		}) 
		if(flag.length == 5){
			alert("提交成功");
		}else{
			alert("提交失败");
		}
	});
}