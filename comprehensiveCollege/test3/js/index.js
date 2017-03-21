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

	var student = document.getElementById("student");
	var graduate = document.getElementById("graduate");
	var classify = document.getElementById("classify");
	var city = document.getElementById("city");
	var school = document.getElementById("school");
	var inSchool = document.getElementsByClassName("inSchool")[0];
	var outSchool = document.getElementsByClassName("outSchool")[0];
	var data = {
		bj:["北京大学","清华大学","北京邮电大学"],
		sh:["上海交通大学","复旦大学","同济大学"],
		fj:["福州大学","厦门大学","厦门一高校"]
	};

	function selectClassify(){
		if(student.checked){
			inSchool.classList.remove("hide");
			outSchool.classList.add("hide");
		}else{
			inSchool.classList.add("hide");
			outSchool.classList.remove("hide");
		}
	}

	function selectCollege(){
		var cityValue = city.options[city.selectedIndex].value;
		school.innerHTML ="";
		for(var i = 0; i < data[cityValue].length; i++){
			var option = document.createElement("option");
			option.value = data[cityValue][i];
			option.innerHTML = data[cityValue][i];
			school.appendChild(option);
		}
	}

	EventUtil.addHandler(classify, "change", function(){
		selectClassify();
		//因为city设置的是click事件，未点击的话学校名称那一行为空
		//只能依赖classify的change事件来自动调用，暂时没找到更优解。
		selectCollege();
	});
	EventUtil.addHandler(city, "click", selectCollege);
}