var swiper = new Swiper('.blog-slider', {
      effect: 'cards',
      cardsEffect: {
        slideShadows: false,
      },
      direction: 'vertical',
      loop: true,
      // autoHeight: true,
      speed: 3000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        stopOnLastSlide: false,
      },
      mousewheel: true,
      // autoHeight: true,
      pagination: {
        el: '.blog-slider__pagination',
        clickable: true,
      },
});