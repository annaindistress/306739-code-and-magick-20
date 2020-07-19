'use strict';

(function () {
  var popup = document.querySelector('.setup');
  var popupOpen = document.querySelector('.setup-open');
  var popupClose = popup.querySelector('.setup-close');
  var popupName = popup.querySelector('.setup-user-name');
  var popupCoat = popup.querySelector('.wizard-coat');
  var popupCoatInput = popup.querySelector('input[name="coat-color"]');
  var popupEyes = popup.querySelector('.wizard-eyes');
  var popupEyesInput = popup.querySelector('input[name="eyes-color"]');
  var popupFireball = popup.querySelector('.setup-fireball-wrap');
  var popupFireballInput = popup.querySelector('input[name="fireball-color"]');
  var popupHandle = popup.querySelector('.upload');
  var popupForm = popup.querySelector('.setup-wizard-form');

  // Функция-обработчик нажатия на Esc

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && popupName !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  // Функция-обработчик ошибки

  var onErrorOccurs = function (errorMessage) {
    var element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.zIndex = 100;
    element.style.margin = '0 auto';
    element.style.padding = '15px';
    element.style.fontSize = '30px';
    element.style.textAlign = 'center';
    element.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';

    element.textContent = errorMessage;
    var body = document.querySelector('body');
    body.insertAdjacentElement('afterbegin', element);

    setTimeout(hideElement, 5000, element);
  };

  // Функция скрытия элемента по таймеру

  var hideElement = function (element) {
    element.remove();
  };

  // Функция, открывающая окно настроек

  var openPopup = function () {
    popup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция, закрывающая окно настроек

  var closePopup = function () {
    popup.classList.add('hidden');
    popup.removeAttribute('style');

    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Функция, изменяющая цвет элемента

  var changeElementColor = function (element, input, color, isBackgroundColor) {
    if (isBackgroundColor) {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    input.value = color;
  };

  // Открывает окно настройки

  popupOpen.addEventListener('click', function () {
    openPopup();
  });

  popupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  // Закрывает окно настройки

  popupClose.addEventListener('click', function () {
    closePopup();
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });

  // Меняет цвет пальто мага по клику

  popupCoat.addEventListener('click', function () {
    changeElementColor(popupCoat, popupCoatInput, window.util.getRandomData(window.const.wizardCoatColors));
  });

  popupCoat.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      changeElementColor(popupCoat, popupCoatInput, window.util.getRandomData(window.const.wizardCoatColors));
    }
  });

  // Меняет цвет глаз мага по клику

  popupEyes.addEventListener('click', function () {
    changeElementColor(popupEyes, popupEyesInput, window.util.getRandomData(window.const.wizardEyesColors));
  });

  popupEyes.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      changeElementColor(popupEyes, popupEyesInput, window.util.getRandomData(window.const.wizardEyesColors));
    }
  });

  // Меняет цвет фаербола по клику

  popupFireball.addEventListener('click', function () {
    changeElementColor(popupFireball, popupFireballInput, window.util.getRandomData(window.const.wizardFireballColors), true);
  });

  popupFireball.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      changeElementColor(popupFireball, popupFireballInput, window.util.getRandomData(window.const.wizardFireballColors), true);
    }
  });

  // Перемещение поп-апа с настройками пользователя

  popupHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      popup.style.top = (popup.offsetTop - shift.y) + 'px';
      popup.style.left = (popup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          popupHandle.removeEventListener('click', onClickPreventDefault);
        };
        popupHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Обработчик отправки формы

  popupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(popupForm), closePopup, onErrorOccurs);
    evt.preventDefault();
  });

  window.dialog = {
    onErrorOccurs: onErrorOccurs
  };
})();
