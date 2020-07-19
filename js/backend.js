'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_SAVE = 'https://javascript.pages.academy/code-and-magick';
  var TIMEOUT_IN_MS = 10000;

  var statusCode = {
    OK: 200
  };

  var loadData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var saveData = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === statusCode.OK) {
        onLoad(xhr.responce);
      } else {
        onError('Произошла ошибка ' + xhr.status + ' ' + xhr.responce);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: saveData
  };
})();
