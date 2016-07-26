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
      adaptiveHeight: true
    });
  });

});