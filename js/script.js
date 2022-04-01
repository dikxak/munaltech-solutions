'use strict';

const App = () => {
  const mainNav = document.querySelector('.main-nav-list');
  const tabBtnContainer = document.querySelector('.tab-btn-container');
  const tabBtns = Array.from(document.querySelectorAll('.btn-tab'));
  const tabContents = Array.from(document.querySelectorAll('.tab-content'));
  const navBtn = document.querySelector('.mobile-nav');
  const header = document.querySelector('.header');
  const testimonialBtnContainer = document.querySelector('.testimonial-btns');
  const testimonials = Array.from(document.querySelectorAll('.testimonial'));
  const btnLearnMore = document.querySelector('.btn--learn-more');
  const btnCta = document.querySelector('.btn--cta');
  const sectionHero = document.querySelector('.section-hero');
  const allLinksHash = document.querySelectorAll('[href="#"]');
  const yearEl = document.querySelector('.year');

  yearEl.textContent = `${new Date().getFullYear()}`;

  // all links with href  "#" will go to top.\
  allLinksHash.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Nav Btn
  const toggleMobileNav = function () {
    navBtn.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
  };

  const scrollHandler = function (e) {
    e.preventDefault();
    const className = e.target.getAttribute('href').slice(1);
    document
      .querySelector(`.${className}`)
      .scrollIntoView({ behavior: 'smooth' });
  };

  // Learn-More Scroll
  const handleLearnMore = function () {
    btnLearnMore.addEventListener('click', scrollHandler);
  };

  // Start Living Scroll
  const handleBtnCta = function () {
    btnCta.addEventListener('click', scrollHandler);
  };

  // Smooth Scrolling
  const handleSmoothScroll = function () {
    mainNav.addEventListener('click', function (e) {
      if (e.target.classList.contains('main-nav-link')) {
        e.preventDefault();
        const className = e.target.getAttribute('href').slice(1);

        document
          .querySelector(`.${className}`)
          .scrollIntoView({ behavior: 'smooth' });

        header.classList.remove('nav-open');
      }
    });
  };

  const handleStickyNav = function () {
    const observer = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];
        if (!ent.isIntersecting) document.body.classList.add('sticky');
        else document.body.classList.remove('sticky');
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-80px',
      }
    );
    observer.observe(sectionHero);
  };

  // Tab Content Change
  const handleTabChange = function () {
    tabBtnContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-tab')) {
        tabContents.forEach(tab => tab.classList.add('tab-hidden'));
        tabBtns.forEach(btn => btn.classList.remove('btn-tab--active'));

        e.target.classList.add('btn-tab--active');
        const { tab: tabId } = e.target.dataset;
        const tab = document.getElementById(`tab-content--${tabId}`);
        tab.classList.remove('tab-hidden');
      }
    });
  };

  // Testimonial
  const testimonial = function () {
    let curElem = 0;
    let testimonialBtns = [];

    const init = function () {
      testimonialBtnContainer.innerHTML = '';

      testimonials.forEach((_, i) => {
        const markup = `
    <button
      data-id="${i}"
      class="btn-testimonial">
    </button>`;
        testimonialBtnContainer.insertAdjacentHTML('beforeend', markup);
      });

      testimonialBtns = Array.from(
        document.querySelectorAll('.btn-testimonial')
      );

      document
        .querySelector(`[data-id ='${curElem}']`)
        .classList.add('btn-testimonial--active');

      testimonials.forEach((el, i) => {
        el.style.transform = `translateY(${-i * 100}%)`;
      });
    };

    init();

    const slider = function (id) {
      testimonialBtns.forEach(btn =>
        btn.classList.remove('btn-testimonial--active')
      );

      testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateY(${(id - i) * 100}%)`;
      });
    };

    testimonialBtnContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('btn-testimonial')) {
        const id = e.target.dataset.id;

        slider(id);
        e.target.classList.add('btn-testimonial--active');

        curElem = +id;
      }
    });

    window.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        if (curElem === testimonials.length - 1) curElem = 0;
        else curElem++;
      }

      if (e.key === 'ArrowUp') {
        if (curElem === 0) curElem = testimonials.length - 1;
        else curElem--;
      }

      slider(curElem);

      this.document
        .querySelector(`[data-id ='${curElem}']`)
        .classList.add('btn-testimonial--active');
    });
  };

  toggleMobileNav();
  handleSmoothScroll();
  handleTabChange();
  testimonial();
  handleLearnMore();
  handleBtnCta();
  handleStickyNav();
};

App();
