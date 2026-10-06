/* =========================================================
   js/main.js
   1. Открытие модального окна по кнопке «Заказать»
   2. Подстановка товара в скрытое поле
   3. Закрытие модального окна
   4. Валидация формы
   5. Сообщение об успехе
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('order-dialog');
  const closeBtn = document.getElementById('close-order-dialog');
  const form = document.getElementById('order-form');
  const selectedProductInput = document.getElementById('selected-product');
  const successMessage = document.getElementById('success-message');

  /* ---------- 1. Открытие модального окна ---------- */
  const orderButtons = document.querySelectorAll('.product-card__button');
  orderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productName = btn.dataset.product || 'Товар';

      if (selectedProductInput) {
        selectedProductInput.value = productName;
      }
      if (dialog && typeof dialog.showModal === 'function') {
        dialog.showModal();
      }
    });
  });

  /* ---------- 2. Закрытие модального окна ---------- */
  if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => {
      dialog.close();
    });
  }

  /* ---------- 3. Валидация и отправка формы ---------- */
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      form.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
        el.removeAttribute('aria-invalid');
      });

      let isValid = true;

      form.querySelectorAll('[required]').forEach((field) => {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          isValid = false;
        }
      });

      if (!isValid) {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (dialog && dialog.open) {
        dialog.close();
      }

      form.reset();

      if (successMessage) {
        successMessage.hidden = false;
        setTimeout(() => {
          successMessage.hidden = true;
        }, 4000);
      }
    });
  }
});