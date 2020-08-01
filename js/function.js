var l = 'left';
var r = 'right';
var c = 'center';

var output = document.querySelector('.output');
var button = document.querySelector('.button');

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
	output.innerHTML += '<a href="' + link + '" target="_blank"> <p align="' + align + '"><button>' + output2 + text + '</button></p></a>';
}

function img(link,align,w,h)
{
	output.innerHTML += '<p align="' + align + '"><img src="' + link + '" width="' + w + '" height="' + h + '"></p>';
}

/*
h1('Добро пожаловать','center');
p('В самый не заблокированный интернет','left');
btn('text','','center','',500,100);
p('Тут тоже текст','right');
*/

//0x3e82085570eb527cb2c05e30454bf2fb488b9b7be64ddaec5bed6ee15473c3c5.minter

button.onclick = function() {
	var site = document.querySelector('#input').value;
	var hash;
if (site=='')
	{
		h1('Error. The site address was not found.','center');
		//hash = '0xf7a547eb9569f548911568c29812cf392fc2823ce7492c5ab10e605e61879d87';
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
				if (jsonSite == site) {
					hash = json[i]['hash'];
					blochain = json[i]['blochain'];
				}
			}
			
		if (hash == '') or (hash == null)
			{
				h1('Error. The site address was not found.','center');
				//hash = '0x077bcd7807935ccab5ec850abaf383496016f12d707f396d7c2be610fa034797'; //Error. The site address was not found.
			}
	}
else if (site.split('.')[1] == 'minter')
	{
		hash = site.split('.')[0];
	}
else
	{
		h1('Error. The site address was not found.','center');
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
		var payload =  json.result.payload;
		var a = Base64.decode(payload);
		var s = String(decodeURIComponent(a.split("").map(function(ch) { return "%"+ch.charCodeAt(0).toString(16); }).join("")));
		
		eval(s);
}
