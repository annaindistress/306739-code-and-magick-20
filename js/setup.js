'use strict';

(function () {
  var similarListContainer = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Функция генерации случайных данных

  var getRandomWizards = function (amount) {
    var wizards = [];

    for (var i = 0; i < amount; i++) {
      wizards[i] = {
        name: Math.floor(Math.random() * 2) ? window.util.getRandomData(window.const.wizardNames) + ' ' + window.util.getRandomData(window.const.wizardSurnames) : window.util.getRandomData(window.const.wizardSurnames) + ' ' + window.util.getRandomData(window.const.wizardNames),
        coatColor: window.util.getRandomData(window.const.wizardCoatColors),
        eyesColor: window.util.getRandomData(window.const.wizardEyesColors)
      };
    }

    return wizards;
  };

  // Функция создания DOM-элемента на основе JS-объекта

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // Функция заполнения блока DOM-элементами на основе массива JS-объектов

  var renderWizardElements = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }

    similarListElement.appendChild(fragment);
  };

  // Показывает блок со списком похожих персонажей

  similarListContainer.classList.remove('hidden');

  // Отрисовка похожих персонажей

  renderWizardElements(getRandomWizards(window.const.wizardAmount));
})();
