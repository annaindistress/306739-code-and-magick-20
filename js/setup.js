'use strict';

(function () {
  var wizards = [];

  var onSuccessOccurs = function (data) {
    wizards = data;
    window.render(wizards);
  };

  var hideElement = function (element) {
    element.remove();
  };

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

  var similarListContainer = document.querySelector('.setup-similar');
  similarListContainer.classList.remove('hidden');

  window.backend.load(onSuccessOccurs, onErrorOccurs);

  var popupForm = window.dialog.popup.querySelector('.setup-wizard-form');

  popupForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(popupForm), window.dialog.close, onErrorOccurs);
    evt.preventDefault();
  });
})();
