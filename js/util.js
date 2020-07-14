'use strict';

(function () {

  window.util = {
    getRandomData: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }
  };
})();
