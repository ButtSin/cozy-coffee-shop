const rootSelector = "[data-js-slider-gallery]";

class SliderGallery {
  selectors = {
    main: "[data-js-slider-gallery-main]",
    pagination: "[data-js-slider-gallery-pagination]",
    nextButton: "[data-js-slider-gallery-button-next]",
    prevButton: "[data-js-slider-gallery-button-prev]",
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.mainElement = this.rootElement.querySelector(this.selectors.main);
    this.nextButton = this.rootElement.querySelector(this.selectors.nextButton);
    this.prevButton = this.rootElement.querySelector(this.selectors.prevButton);

    this.init();
  }

  init() {
    // eslint-disable-next-line no-undef
    new Swiper(this.mainElement, {
      direction: "horizontal",
      simulateTouch: false,
      speed: 600,
      spaceBetween: 16,
      slidesPerView: 1,
      //Хоть зацикленность и не требуется, но с ней улучшает пользовательский опыт
      loop: true,

      pagination: {
        el: this.selectors.pagination,
        clickable: true,
      },

      navigation: {
        nextEl: this.nextButton,
        prevEl: this.prevButton,
        addIcons: false,
      },

      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },

      a11y: {
        enabled: true,
        paginationBulletMessage: "Перейти к слайду {{index}}",
        nextSlideMessage: "Следующий слайд",
        prevSlideMessage: "Предыдущий слайд",
        firstSlideMessage: "Это первый слайд",
        lastSlideMessage: "Это последний слайд",
      },

      breakpoints: {
        600.98: {
          slidesPerView: 2,
        },

        750.98: {
          spaceBetween: 16,
          slidesPerView: 3,
        },
      },
    });
  }
}

class SliderGalleryCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector).forEach((element) => {
      new SliderGallery(element);
    });
  }
}

export { SliderGalleryCollection };
