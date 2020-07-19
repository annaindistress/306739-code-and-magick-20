'use strict';

(function () {
  var similarListContainer = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Функция создания DOM-элемента на основе JS-объекта

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Функция заполнения блока DOM-элементами на основе массива JS-объектов

  var renderWizardElements = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.const.wizardAmount; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  // Показывает блок со списком похожих персонажей

  similarListContainer.classList.remove('hidden');

  // Отрисовка похожих персонажей

  window.backend.load(renderWizardElements, window.dialog.onErrorOccurs);
})();
