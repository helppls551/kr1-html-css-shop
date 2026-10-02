// Получаем модальное окно
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки "Заказать"
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку "Закрыть"
const closeDialogButton =
    document.getElementById('close-order-dialog');

// Получаем скрытое поле выбранного товара
const selectedProductInput =
    document.getElementById('selected-product');

// Получаем форму
const orderForm =
    document.getElementById('order-form');

// Получаем сообщение об успешной отправке
const successMessage =
    document.getElementById('success-message');


// Открываем окно при нажатии на "Заказать"
orderButtons.forEach((button) => {

    button.addEventListener('click', () => {

        const productName = button.dataset.product;

        selectedProductInput.value = productName;

        orderDialog.showModal();

    });

});


// Закрываем окно
closeDialogButton.addEventListener('click', () => {

    orderDialog.close();

});


// Обработка отправки формы
orderForm.addEventListener('submit', (event) => {

    event.preventDefault();


    // Убираем старые ошибки
    const formElements = Array.from(orderForm.elements);

    formElements.forEach((element) => {

        if (element.willValidate) {
            element.removeAttribute('aria-invalid');
        }

    });


    // Проверяем форму
    if (!orderForm.checkValidity()) {

        formElements.forEach((element) => {

            if (
                element.willValidate &&
                !element.checkValidity()
            ) {
                element.setAttribute(
                    'aria-invalid',
                    'true'
                );
            }

        });

        orderForm.reportValidity();

        return;
    }


    // Показываем сообщение
    successMessage.hidden = false;


    // Очищаем форму
    orderForm.reset();


    // Закрываем модальное окно
    orderDialog.close();

});