var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, hanlder, false);
		}else if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		}else {
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
}

function CreateTable(row, cloumn){
	this.row = row;
	this.cloumn = cloumn;

	this.create();
}

CreateTable.prototype = {
	constructor: CreateTable,

	//创建表格
	create: function(){
		var table = document.createElement("table");
		var tbody = document.createElement("tbody");
		for(var i = 0; i < this.row; i++){
			tbody.insertRow(i);
			for(var j = 0; j < this.cloumn; j++){
				tbody.rows[i].insertCell(j);
			}
		}

		table.appendChild(tbody);
		document.body.appendChild(table);
	},

	//添加头行内容
	addThead:function(theadArr){
		if(Array.isArray(theadArr)){
			var tbody = document.getElementsByTagName("tbody")[0];
			if(theadArr.length == this.cloumn){
				for(var i = 0; i < this.cloumn; i++){
					tbody.rows[0].cells[i].innerHTML = theadArr[i];
				}
			}else{
				alert("标题个数与列数不匹配");
			}
		}else{
			alert("表格标题的数据类型不符合要求");
		}
	},

	//填充单行数据
	addRow: function(data){
		//限制当行数据填充多行
		var flag = false;
		if(Array.isArray(data)){
			var tbody = document.getElementsByTagName("tbody")[0];
			if(data.length == this.cloumn){
				for(var i = 0; i < this.row; i++){
					//若该行第一个单元格的childNodes.length为0，则该行未填充数据
					if(tbody.rows[i].cells[0].childNodes.length == 0 && flag == false){
						for(var j = 0; j < data.length; j++){
							tbody.rows[i].cells[j].innerHTML = data[j];
							if(j == data.length-1){flag = true;}
						}
					}
				}
			}else{
				alert("数据个数与列数不匹配");
			}
		}else{
			alert("该行数据的数据类型不符合要求");
		}
	},

	//一次添加所有数据
	addAllRows: function(allData){
		if(Array.isArray(allData)){
			var tbody = document.getElementsByTagName("tbody")[0];
			for(var i = 0; i < allData.length; i++){
				for(var j = 0; j < this.cloumn; j++){
					tbody.rows[i+1].cells[j].innerHTML = allData[i][j];
				}
			}
		}else{
			alert("数据的数据类型不符合要求");
		}	
	}
}

var table = new CreateTable(4,5);
var theadArr = ["姓名","语文","数学","英语","总分"];
table.addThead(theadArr);

// var one = ["小明",80,90,70,240];
// var two = ["小红",90,60,90,240];
// var three = ["小亮",60,100,70,230];
// table.addRow(one);
// table.addRow(two);
// table.addRow(three);
 
var data =[
	["小明",80,90,70,240],
	["小红",90,60,90,240],
	["小亮",60,100,70,230]	
		];
table.addAllRows(data);