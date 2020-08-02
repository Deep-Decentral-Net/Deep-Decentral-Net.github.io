var l = 'left';
var r = 'right';
var c = 'center';

function getUrlVar(){
    var urlVar = window.location.search; // получаем параметры из урла
    var arrayVar = []; // массив для хранения переменных
    var valueAndKey = []; // массив для временного хранения значения и имени переменной
    var resultArray = []; // массив для хранения переменных
    arrayVar = (urlVar.substr(1)).split('&'); // разбираем урл на параметры
    if(arrayVar[0]=="") return false; // если нет переменных в урле
    for (i = 0; i < arrayVar.length; i ++) { // перебираем все переменные из урла
        valueAndKey = arrayVar[i].split('='); // пишем в массив имя переменной и ее значение
        resultArray[valueAndKey[0]] = valueAndKey[1]; // пишем в итоговый массив имя переменной и ее значение
    }
	var result = resultArray['q'];
	if (result == '') { result = false;}
    return result; // возвращаем результат
}

var output = document.querySelector('.output');
var hash;

var q = getUrlVar();

if ( q == false ) 
	{	
		var button = document.querySelector('.button');
		button.onclick = function() { output.innerHTML = ''; getDDN(); }
	} 
else 
	{
		getDDN();
	}

function h1(text,align) {
  output.innerHTML += '<h1 align="'+ align +'">' + text + '</h1>';
}

function p(text,align) {
  output.innerHTML += '<p align="'+ align +'">' + text + '</p>';
}

function btn(text,link,align,img,w,h) {
	if (img != '') 
		{output2 = "<img src='" + img + "' style='vertical-align: middle' width='" + w + "' height='" + h + "'>";}
	else
		{output2 = '';}
	output.innerHTML += '<a href="' + link + '" target="_blank"> <p align="' + align + '"><button class="button">' + output2 + text + '</button></p></a>';
}

function img(link,align,w,h)
{
	output.innerHTML += '<p align="' + align + '"><img src="' + link + '" width="' + w + '" height="' + h + '"></p>';
}

/*
h1('Добро пожаловать',c);
p('В самый не заблокированный интернет',l);
btn('text','',c,'',500,100);
p('Тут тоже текст',r);
*/

//0x3e82085570eb527cb2c05e30454bf2fb488b9b7be64ddaec5bed6ee15473c3c5.minter

function getDDN() {
	if ( q == false ) {	
		var site = document.querySelector('#input').value;
	} else {
		var site = q;
	}
	
if (site=='')
	{
		h1('Error 001. The site address was not found.','center');
	}
else if (site.split('.')[1] == 'ddn')
	{
		url = 'https://deep-decentral-net.github.io/nodelist.json';
		var req = null;
		try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
			try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
				try { req = new XMLHttpRequest(); } catch(e) {}
			}
		}
		if (req == null) throw new Error('XMLHttpRequest not supported');

		req.open("GET", url, false);
		req.send(null);
		
		var json = JSON.parse(JSON.stringify(JSON.parse(req.responseText)));
		
		for (var i = 0; i <= json.length-1; i++)
			{
				jsonSite = json[i]['site'];
				if (jsonSite == site) 
					{
						hash = json[i]['hash'];
						blochain = json[i]['blochain'];
					}
				else
					{
							h1('Error 002. The site address was not found.','center');
					}
			}
	}
else if (site.split('.')[1] == 'minter')
	{
		hash = site.split('.')[0];
	}
else
	{
		h1('Error 003. The site address was not found.','center');
		//hash = '0x077bcd7807935ccab5ec850abaf383496016f12d707f396d7c2be610fa034797'; //Error. The site address was not found.
	}
	//-------------------------------
	var api = 'https://api.minter.one';
	url = api + '/transaction?hash=' + hash;
	var req = null;
		try { req = new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {
			try { req = new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {
				try { req = new XMLHttpRequest(); } catch(e) {}
			}
		}
		if (req == null) throw new Error('XMLHttpRequest not supported');

		req.open("GET", url, false);
		req.send(null);
		var json = JSON.parse(JSON.stringify(JSON.parse(req.responseText)));
		var payload = json.result.payload;
		var a = Base64.decode(payload);
		var t = String(decodeURIComponent(a.split("").map(function(ch) { return "%"+ch.charCodeAt(0).toString(16); }).join("")));
		var b = Base64.decode(t);
		eval(String(decodeURIComponent(b.split("").map(function(ch) { return "%"+ch.charCodeAt(0).toString(16); }).join(""))));
}
//0x9f4c71d83a9a9890dcd4e71847d7f78d744a9167ffa36d7ee9875718efb9ec4e.minter