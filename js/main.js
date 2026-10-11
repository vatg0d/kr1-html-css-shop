/* =========================================================
   js/main.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('order-dialog');
  const closeBtn = document.getElementById('close-order-dialog');
  const form = document.getElementById('order-form');
  const selectedProductInput = document.getElementById('selected-product');
  const successMessage = document.getElementById('success-message');
  const toTopBtn = document.getElementById('to-top');

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

  /* ---------- 3. Валидация формы в модальном окне ---------- */
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

  /* ---------- 3.1. Форма на странице order.html ---------- */
  const pageForm = document.getElementById('order-form-page');
  const pageSuccess = document.getElementById('success-message-page');

  if (pageForm) {
    pageForm.addEventListener('submit', (event) => {
      event.preventDefault();

      pageForm.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
        el.removeAttribute('aria-invalid');
      });

      let isValid = true;

      pageForm.querySelectorAll('[required]').forEach((field) => {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          isValid = false;
        }
      });

      if (!isValid) {
        const firstInvalid = pageForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      pageForm.reset();

      if (pageSuccess) {
        pageSuccess.hidden = false;
        setTimeout(() => {
          pageSuccess.hidden = true;
        }, 4000);
      }
    });
  }

  /* ---------- 4. Кнопка «Наверх» ---------- */
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        toTopBtn.classList.add('to-top--visible');
      } else {
        toTopBtn.classList.remove('to-top--visible');
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});