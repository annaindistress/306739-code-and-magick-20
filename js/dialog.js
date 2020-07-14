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

  // Функция-обработчик нажатия на Esc

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && popupName !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  // Функция, открывающая окно настроек

  var openPopup = function () {
    popup.classList.remove('hidden');

    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция, закрывающая окно настроек

  var closePopup = function () {
    popup.classList.add('hidden');

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
})();
