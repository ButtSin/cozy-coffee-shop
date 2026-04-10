class ReservationModal {
  selectors = {
    root: "[data-js-reservation-modal]",
    closeButton: "[data-js-reservation-modal-close-button]",
    focusableElements:
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
  };

  stateClasses = {
    isLock: "is-lock",
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.closeButton = this.rootElement.querySelector(
      this.selectors.closeButton,
    );
    this.focusableElements = this.rootElement.querySelectorAll(
      this.selectors.focusableElements,
    );

    this.bindEvents();
  }

  show() {
    document.documentElement.classList.add(this.stateClasses.isLock);
    this.rootElement.showModal();

    document.addEventListener("keydown", this.onModalKeyDown);

    this.closeButton.focus();
  }

  hide() {
    document.documentElement.classList.remove(this.stateClasses.isLock);

    this.rootElement.close();

    document.removeEventListener("keydown", this.onModalKeyDown);
  }

  onModalKeyDown = (event) => {
    switch (event.key) {
      case "Tab":
        if (this.focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        if (
          event.shiftKey &&
          document.activeElement === this.focusableElements[0]
        ) {
          event.preventDefault();
          this.focusableElements[this.focusableElements.length - 1].focus();
        } else if (
          !event.shiftKey &&
          document.activeElement ===
            this.focusableElements[this.focusableElements.length - 1]
        ) {
          event.preventDefault();
          this.focusableElements[0].focus();
        }

        break;

      case "Escape":
        this.hide();

        break;
    }
  };

  bindEvents() {
    this.closeButton.addEventListener("click", () => this.hide());

    this.rootElement.addEventListener("click", (event) => {
      if (event.target === this.rootElement) this.hide();
    });
  }
}

export const modal = new ReservationModal();
