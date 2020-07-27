function getXmlHttp() {
    var xmlhttp;
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
      xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
  }
  function post() {
    var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
    xmlhttp.open('POST', 'https://', true); // Открываем асинхронное соединение
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Отправляем кодировку
    xmlhttp.send("hash=" + encodeURIComponent(test) + "&key=" + encodeURIComponent(key)); // Отправляем POST-запрос
    xmlhttp.onreadystatechange = function() { // Ждём ответа от сервера
      if (xmlhttp.readyState == 4) { // Ответ пришёл
        if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)
          return xmlhttp.responseText; // Выводим ответ сервера
        }
      }
    };
  }