(function($) {
  'use strict';
  
  var app = (function () {
    return {
      init: function init () {
        console.log('funfo');
        this.companyInfo();
        this.initEvents();
        this.getCars();
      },

      initEvents: function initEvents () {
        new $('[data-js="form-register"]').on('submit', this.hardleSubmit);
      },

      hardleSubmit: function hardleSubmit (e) {
        e.preventDefault();
        app.savenewCar();
        app.clearForm();
        app.getCars();
      },

      clearForm: function clearForm () {
        $('[data-js="image"]').get().value = '';
        $('[data-js="model"]').get().value = '';
        $('[data-js="year"]').get().value = '';
        $('[data-js="plate"]').get().value = '';
        $('[data-js="color"]').get().value = '';
      },
      
      savenewCar: function saveNewCar() {
        var $image = $('[data-js="image"]').get().value;
        var $model = $('[data-js="model"]').get().value.toUpperCase();
        var $year  = $('[data-js="year"]').get().value.toUpperCase();
        var $plate = $('[data-js="plate"]').get().value.toUpperCase();
        var $color = $('[data-js="color"]').get().value.toUpperCase();

        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://127.0.0.1:3000/car');
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.send(`image=${$image}&brandModel=${$model}&year=${$year}&plate=${$plate}&color=${$color}`);

        ajax.onreadystatechange = function () {
          if (ajax.readyState === 4) 
            alert('carro cadastrado!');
        }
      },

      getCars: function getCars() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://127.0.0.1:3000/car');
        ajax.send();
        ajax.addEventListener('readystatechange', this.createNewCar, false);
      },

      createNewCar: function createNewCar () {
        
        app.clearTable();

        if (!app.isReady.call(this))
          return;
        var data = JSON.parse(this.responseText);
        data.forEach( function (element) {
          var $tdImage = document.createElement('td');
          var $tdModel = document.createElement('td');
          var $tdYear = document.createElement('td');
          var $tdPlate = document.createElement('td');
          var $tdColor = document.createElement('td');
          var $image = document.createElement('img');

          var $tdbtn = document.createElement('td');
          $tdbtn.innerHTML = '<button class="delete" type="submit" data-js="btn-delete">delete</button>';

          $tdModel.textContent = element.brandModel;
          $tdYear.textContent  = element.year;
          $tdPlate.textContent = element.plate;
          $tdColor.textContent = element.color;

          $image.setAttribute('src', element.image);
          $tdImage.appendChild($image);

          var $tr = document.createElement('tr');
          $tr.appendChild($tdImage);
          $tr.appendChild($tdModel);
          $tr.appendChild($tdYear);
          $tr.appendChild($tdPlate);
          $tr.appendChild($tdColor);
          $tr.appendChild($tdbtn);

          var $fragment = document.createDocumentFragment();
          var $tableCar = $('[data-js="table-car"]').get();
          $tableCar.appendChild($fragment.appendChild($tr));
        });
        app.deleteCar();
      },

      deleteCar: function deleteCar () {
        $('[data-js="btn-delete"]').on('click', function (e) {
          var $button = e.target;
          var $td = $button.parenode;
          var $tr = $td.parentNode;
          console.log($tr)
          $tr.remove();
        });
      },

      companyInfo: function companyInfo () {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', '/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
       },

      getCompanyInfo: function getCompanyInfo () {
        if ( !app.isReady.call(this) )
          return;
        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
        var $header = $('header').get();
        $header.insertAdjacentHTML('afterbegin', `<img src="${data.img}">` )
      },

      isReady: function isReady () {
        return this.readyState === 4 && this.status === 200;
      },

      clearTable: function clearTable () {
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.innerHTML = '';
      }

    };

  })();

  app.init();

})(window.DOM);
