$(document).ready(function () {
  initPlugins();
  initMobileMenu();
  initPhoneInput();
  initFormValidation();
  initPopups();
  initCartButtons();
});

/* ------------------------- Плагины ------------------------- */
function initPlugins() {
  new WOW().init();

  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    showImageNumberLabel: false,
    disableScrolling: true,
  });
}

/* ------------------------- Мобильное меню ------------------------- */
function initMobileMenu() {
  $(".mobile-menu-btn").click(function () {
    $(this).toggleClass("active");
    $(".header_nav").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });

  $(".nav_link").click(function () {
    $(".mobile-menu-btn").removeClass("active");
    $(".header_nav").removeClass("active");
    $("body").removeClass("no-scroll");
  });
}

/* ------------------------- Поле телефона ------------------------- */
function initPhoneInput() {
  const phoneInput = $("#phone");

  phoneInput.val("+7 ");

  phoneInput.on("input", function () {
    let input = $(this);
    let value = input.val();

    let numbers = value.replace(/\D/g, "");

    if (numbers.startsWith("8")) {
      numbers = "7" + numbers.slice(1);
    }

    numbers = numbers.substring(0, 11);

    let formattedNumber = "+7 ";

    if (numbers.length > 1) {
      formattedNumber += "(" + numbers.substring(1, 4);
    }
    if (numbers.length >= 4) {
      formattedNumber += ") " + numbers.substring(4, 7);
    }
    if (numbers.length >= 7) {
      formattedNumber += "-" + numbers.substring(7, 9);
    }
    if (numbers.length >= 9) {
      formattedNumber += "-" + numbers.substring(9, 11);
    }

    input.val(formattedNumber);
  });

  phoneInput.on("keydown", function (e) {
    const val = $(this).val();
    if (e.key === "Backspace" && val.length <= 4) {
      e.preventDefault();
    }
  });
}

/* ------------------------- Форма заказа ------------------------- */
function initFormValidation() {
  $("#orderForm").submit(function (e) {
    e.preventDefault();

    const nameInput = $("#name");
    const addressInput = $("#address");
    const phoneInput = $("#phone");

    $(".error-message").remove();
    $("input").removeClass("error");

    let isValid = true;

    if (!validateName(nameInput)) isValid = false;
    if (!validateAddress(addressInput)) isValid = false;
    if (!validatePhone(phoneInput)) isValid = false;

    if (isValid) {
      sendOrderForm(nameInput, addressInput, phoneInput);
    }
  });

  $("#name").on("keypress", function (e) {
    if (e.key === ".") {
      e.preventDefault();
      return false;
    }
  });
}

function validateName(input) {
  if (input.val().trim() === "") {
    input.addClass("error");
    input.after('<div class="error-message">Введите ваше имя</div>');
    return false;
  }
  return true;
}

function validateAddress(input) {
  if (input.val().trim() === "") {
    input.addClass("error");
    input.after('<div class="error-message">Введите адрес доставки</div>');
    return false;
  }
  return true;
}

function validatePhone(input) {
  const cleanedPhone = input.val().replace(/\D/g, "");

  if (cleanedPhone.length !== 11 || !cleanedPhone.startsWith("7")) {
    input.addClass("error");
    input.after(
      '<div class="error-message">Введите корректный номер телефона</div>'
    );
    return false;
  }
  return true;
}

function sendOrderForm(nameInput, addressInput, phoneInput) {
  $.ajax({
    url: "#",
    type: "POST",
    data: {
      name: nameInput.val(),
      address: addressInput.val(),
      phone: phoneInput.val(),
    },
    success: function () {
      $("#successPopup").fadeIn();
      $("#orderForm")[0].reset();
      $("#phone").val("+7 ");
    },
    error: function () {
      console.log(
        "На самом деле тут мы получаем ошибку, тк нет сервера для обработки запросов"
      );
      $("#successPopup").fadeIn();
      $("#orderForm")[0].reset();
      $("#phone").val("+7 ");
    },
  });
}

/* ------------------------- Попапы ------------------------- */
function initPopups() {
  $(".close-popup").click(function () {
    $("#successPopup").fadeOut();
  });

  $(window).click(function (e) {
    if ($(e.target).is(".popup")) {
      $(".popup").fadeOut();
    }
  });
}

/* ------------------------- Корзина ------------------------- */
function initCartButtons() {
  $(".pizza-card_button").click(function (e) {
    e.preventDefault();

    const pizzaName = $(this).siblings(".pizza-name").text();
    alert(`Пицца "${pizzaName}" добавлена в корзину`);
  });
}
