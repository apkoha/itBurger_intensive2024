//по клику на кнопку "Смотреть меню" плавно скролит к секции products
document.getElementById("main-action-button").onclick = function () {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
};

let links = document.querySelectorAll(".menu-item > a");

//при клике по ссылке из меню навигации, плавно скролит до секции id которой совпадает с дата-атрибутом ссылки
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    document
      .getElementById(links[i].getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth" });
  };
}

let buttons = document.getElementsByClassName("product-button");

//при клике по любой кнопке "Заказать", плавно скролит до секции order
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  };
}

let burger = document.getElementById("burger");
let name = document.getElementById("name");
let phone = document.getElementById("phone");

//при клике на кнопку "Оформить заказ" проверяет перебором заполнение полей формы.
//если поле не заполнено, то подсвечивает его красным.
//если поля заполнены, после нажатия на кнопку, выводит сообщение в alert
document.getElementById("order-action").onclick = function () {
  let hasError = false;

  [burger, name, phone].forEach((item) => {
    if (!item.value) {
      item.parentElement.style.background = "red";
      hasError = true;
    } else {
      item.parentElement.style.background = "";
    }
  });

  if (!hasError) {
    [burger, name, phone].forEach((item) => {
      item.value = "";
    });

    alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
  }
};

let prices = document.getElementsByClassName("products-item-price");

//при клике по значку валюты меняет её на следующую по списку, изменяя коэффициент для пересчёта цены
document.getElementById("change-currency").onclick = function (e) {
  let currentCurrency = e.target.innerText;

  let newCurrency = "$";
  let coefficient = 1;

  if (currentCurrency === "$") {
    newCurrency = "₽";
    coefficient = 80;
  } else if (currentCurrency === "₽") {
    newCurrency = "BYN";
    coefficient = 3;
  } else if (currentCurrency === "BYN") {
    newCurrency = "€";
    coefficient = 0.9;
  } else if (currentCurrency === "€") {
    newCurrency = "¥";
    coefficient = 6.9;
  }

  e.target.innerText = newCurrency;

  //меняет цену в карточках товара согласно формуле: базовая цена (data-base-price) * коэффициент валюты.
  //далее происходит округление и конкатенация: пробел + значок валюты.
  for (let i = 0; i < prices.length; i++) {
    prices[i].innerText =
      +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) +
      " " +
      newCurrency;
  }
};
