import { modal } from "./ReservationModal.js";

const rootSelector = "[data-js-form]";

class FormValidator {
  selectors = {
    text: "[data-js-form-input-text]",
    email: "[data-js-form-input-email]",
    phone: "[data-js-form-input-phone]",
    submitButton: "[data-js-form-button-submit]",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.textElements = this.rootElement.querySelectorAll(this.selectors.text);
    this.emailElements = this.rootElement.querySelectorAll(
      this.selectors.email,
    );
    this.phoneElements = this.rootElement.querySelectorAll(
      this.selectors.phone,
    );
    this.submitButtonElements = this.rootElement.querySelectorAll(
      this.selectors.submitButton,
    );
    modal.show();
    this.bindEvents();
  }

  validateForm() {
    return this.validateText() && this.validateEmail() && this.validatePhones();
  }

  validateText() {
    let isValid = true;

    this.textElements.forEach((input) => {
      if (!input) return;
      if (!input.value.trim()) {
        input.classList.add("is-error");
        isValid = false;
      } else {
        input.classList.remove("is-error");
      }
    });

    return isValid;
  }

  validateEmail() {
    let isValid = true;

    this.emailElements.forEach((input) => {
      if (!input) return;
      const value = input.value.trim();
      if (!value || !value.includes("@")) {
        input.classList.add("is-error");
        isValid = false;
      } else {
        input.classList.remove("is-error");
      }
    });

    return isValid;
  }

  validatePhones() {
    let isValid = true;

    this.phoneElements.forEach((input) => {
      const value = input.value.trim();
      let digitCount = 0;

      for (let i = 0; i < value.length; i++) {
        if (value[i] >= "0" && value[i] <= "9") digitCount++;
      }

      if (!value || digitCount < 5) {
        input.classList.add("is-error");
        isValid = false;
      } else {
        input.classList.remove("is-error");
      }
    });

    return isValid;
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validateForm()) {
      this.sendForm();

      modal.show();

      this.rootElement.reset();
    } else {
      console.log("Ошибка!");
    }
  }

  sendForm() {
    console.log("Форма валидна, отправляем");
  }

  bindEvents() {
    this.rootElement.addEventListener("submit", this.onSubmit.bind(this));
  }
}

class FormValidatorCollection {
  constructor() {
    this.init();
  }
  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new FormValidator(element);
    });
  }
}

export { FormValidatorCollection };
