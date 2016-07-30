/**
 * Created by ke1evra on 18.07.2016.
 */
$(document).ready(function () {

  //плавный якорь
  $('a[href^="#"]').click(function () {
    var el = $(this).attr('href');
    $('html,body').animate({
      scrollTop: $(el).offset().top
    }, 800);
    return false;
  });

  //листалка в машине
  //добавление инфо
  //пиздец
  function carPagination() {
    var carInfoBlock = document.getElementById('car-info-block');
    var buttonBlock = carInfoBlock.querySelector('.button-block');
    var buttons = carInfoBlock.querySelectorAll('button');
    var pageBlock = carInfoBlock.querySelector('.car-info');
    var pages = carInfoBlock.querySelectorAll('.car-page');

    for(var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', changePage);
    }

    //пиздец
    function changePage() {
      if(!this.classList.contains('active')) {
        var activeBtn = buttonBlock.querySelector('button.active');
        activeBtn.classList.remove('active');

        this.classList.add('active');

        var activePage = pageBlock.querySelector('.active');
        activePage.classList.remove('active');

        var targetPage = pageBlock.querySelector('[data-page="' + this.dataset.pageNum + '"]');
        targetPage.classList.add('active');
      }
    }

    //пиздец
    function addCarInfo() {
      var carInfoButtons = document.querySelectorAll('[data-remodal-target="modal-car"]');

      //пиздец
      for(var i = 0; i < carInfoButtons.length; i++) {
        carInfoButtons[i].addEventListener('click', function() {
          var innovations = carInfoBlock.querySelector('[data-headline="innovations"]');
          innovations.innerText = this.dataset.innovations;
          var overall = carInfoBlock.querySelector('[data-headline="overall"]');
          overall.innerText = this.dataset.overall;
          var exterior = carInfoBlock.querySelector('[data-headline="exterior"]');
          exterior.innerText = this.dataset.exterior;
          var construct = carInfoBlock.querySelector('[data-headline="construct"]');
          construct.innerText = this.dataset.construct;
          var carName = carInfoBlock.querySelector('h3');
          carName.innerText = this.dataset.car;
          var price = carInfoBlock.querySelector('.price');
          price.innerText = this.dataset.price;
        })
      }
    }

    addCarInfo();
  }

  carPagination();

  function modalHeadline() {
    var formButtons = document.querySelectorAll('[data-remodal-target="modal-form"]');
    var form = document.getElementById('modal-form');

    for(var i = 0; i < formButtons.length; i++) {
      formButtons[i].addEventListener('click', function() {

        var headline = form.querySelector('.modal-form-headline');

        if(this.dataset.headline) {
          headline.innerText = this.dataset.headline;
          headline.classList.add('active');
        } else {
          headline.classList.remove('active');
        }
      });
    }
  }

  modalHeadline();

  $(document).ready(function(){
    $('#bxslider').bxSlider({
        auto: true
    });
  });

});

// Send mail - general
$(".generalSubmitMail").click(function (e) {

  var idForm = $(this).closest("form").attr("id"); //$("form").attr("id");

  //console.log( $(this).closest("form").attr("id") );


  var fieldsMalName = new Array();
  var fieldsMalVal = new Array();
  var fieldsMalStop = false;

  $('#' + idForm + " input[type='text']:visible").each(function () {

    // $(this).attr('field-name')

    fieldsMalName.push($(this).attr('field-name')); // placeholder
    fieldsMalVal.push($(this).val());

    //text_required
    if ($(this).hasClass('text_required')) {

      //console.log('click');

      if ($(this).val().length >= 6) {

        fieldsMalStop = true;

        $(this).css("border", "");

      } else if ($(this).val().length <= 5) {

        fieldsMalStop = false;

        $(this).css("border", "1px solid red");

        alert('Обязательное поле: ' + $(this).attr('placeholder'));

      }


    }
  });

  // Radio
  $('#' + idForm + " input[type='radio']:checked").each(function () {

    // $(this).attr('field-name') + ':' +
    //console.log( 'radio: ' + $('form#' + idForm + " input[type='radio']:checked", this).attr('value')  );

    //console.log(this);

    if ($(this).is(':checked')) {

      //console.log($(this).attr('field-name') + ':' + $(this).attr('value'));

      fieldsMalName.push($(this).attr('field-name'));
      fieldsMalVal.push($(this).attr('value'));
    }


  });

  // CheckBox
  $('#' + idForm + " input[type='checkbox']:checked").each(function () {

    if ($(this).is(':checked')) {

      fieldsMalName.push($(this).attr('field-name'));
      fieldsMalVal.push($(this).attr('value'));
    }


  });

  // TextArea
  $('#' + idForm + " textarea:visible").each(function () {

    fieldsMalName.push($(this).attr('field-name')); // $(this).attr('placeholder') +
    fieldsMalVal.push($(this).val());


  });

  // Select
  $('#' + idForm + ' select:visible').each(function () {


    //console.log($(this).attr('field-name') + ':' + $('option:selected', this).text());

    fieldsMalName.push($(this).attr('field-name'));
    fieldsMalVal.push($('option:selected', this).text());

  });

  // Check & Send
  if (fieldsMalStop == true) {

    $.post('/mailspo.php', {
      'FormKeyVal': fieldsMalVal,
      'FormKeyName': fieldsMalName,
      'Name': $('form#' + idForm).attr('form-name'),
      //'Page': window.location.href,
      'num_order': uniqq()
    });
    $('#' + idForm).trigger("reset");

    alert('Дорогой клиент, Ваш запрос принят. В ближайшее время наши менеджеры обязательно свяжутся с Вами! ');

    //$.modal().close();
  }

  e.preventDefault();

});


/////////////////


function uniqq() {

  var result = "";

  $.ajax({
    url: "/uniq.php",
    async: false,
    success: function (data) {
      result = data;
    }
  });
  return result;
}
