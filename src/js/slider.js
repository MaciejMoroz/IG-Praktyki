const Slider = function (elemSelector, opts) {
  const defaultOpts = {
    pauseTime: 0,
    prevText: "Poprzedni slide",
    nextText: "Następny slide",
    generateDots: true,
    generatePrevNext: true
  };
  this.options = Object.assign({}, defaultOpts, opts);
  this.sliderSelector = elemSelector;
  this.currentSlide = 0;
  this.time = null; //t setTimeout
  this.slider = null;
  this.elem = null;
  this.slides = null;

  this.prev = null; //button prev
  this.next = null; //button next
  this.dots = [];

  this.generateSlider();
  this.changeSlide(this.currentSlide);
};

Slider.prototype.generateSlider = function () {
  this.slider = document.querySelector(this.sliderSelector);
  this.slider.classList.add("slider");

  //contener for slides
  const slidesCnt = document.createElement("div");
  slidesCnt.classList.add("slider-slides-cnt");

  //slide element
  this.slides = this.slider.children;

  while (this.slides.length) {
    this.slides[0].classList.add("slider-slide");
    slidesCnt.appendChild(this.slides[0]);
  }
  this.slides = slidesCnt.querySelectorAll(".slider-slide");
  this.slider.appendChild(slidesCnt);

  if (this.options.generatePrevNext) this.createPrevNext();
  if (this.options.generateDots) this.createDots();
};

Slider.prototype.slidePrev = function () {
  this.currentSlide--;
  if (this.currentSlide < 0) {
    this.currentSlide = this.slides.length - 1;
  }
  this.changeSlide(this.currentSlide);
};

Slider.prototype.slideNext = function () {
  this.currentSlide++;
  if (this.currentSlide > this.slides.length - 1) {
    this.currentSlide = 0;
  }
  this.changeSlide(this.currentSlide);
};

Slider.prototype.changeSlide = function (index) {
  [].forEach.call(this.slides, function (slide) {
    slide.classList.remove("slider-slide-active");
    slide.setAttribute("aria-hidden", true);
  });

  this.slides[index].classList.add("slider-slide-active");
  this.slides[index].setAttribute("aria-hidden", false);

  if (this.options.generateDots) {
    this.dots.forEach(function (dot) {
      dot.classList.remove("slider-dots-element-active");
    });
    this.dots[index].classList.add("slider-dots-element-active");
  }

  this.currentSlide = index;

  if (this.options.pauseTime !== 0) {
    clearInterval(this.time);
    this.time = setTimeout(
      function () {
        this.slideNext();
      }.bind(this),
      this.options.pauseTime
    );
  }
};

Slider.prototype.createPrevNext = function () {
  this.prev = document.createElement("button");
  this.prev.type = "button";
  this.prev.innerText = this.options.prevText;
  this.prev.classList.add("slider-button");
  this.prev.classList.add("slider-button-prev");
  this.prev.addEventListener("click", this.slidePrev.bind(this));

  this.next = document.createElement("button");
  this.next.type = "button";
  this.next.innerText = this.options.nextText;
  this.next.classList.add("slider-button");
  this.next.classList.add("slider-button-next");
  this.next.addEventListener("click", this.slideNext.bind(this));

  const nav = document.createElement("div");
  nav.classList.add("slider-nav");
  nav.setAttribute("aria-label", "Slider prev next");
  nav.appendChild(this.prev);
  nav.appendChild(this.next);
  this.slider.appendChild(nav);
};

Slider.prototype.createDots = function () {
  const ulDots = document.createElement("ul");
  ulDots.classList.add("slider-dots");
  ulDots.setAttribute("aria-label", "Slider pagination");

  for (let i = 0; i < this.slides.length; i++) {

    const li = document.createElement("li");
    li.classList.add("slider-dots-element");

    const btn = document.createElement("button");
    btn.classList.add("slider-dots-button");
    btn.type = "button";
    btn.innerText = i + 1;
    btn.setAttribute("aria-label", "Set slide " + (i + 1));

    btn.addEventListener(
      "click",
      function () {
        this.changeSlide(i);
      }.bind(this)
    );

    li.appendChild(btn);

    ulDots.appendChild(li);
    this.dots.push(li);
  }

  this.slider.appendChild(ulDots);
};



//slider options
const slide = new Slider("#slider1", {
  pauseTime: 5000,
  generateDots: true,
  generatePrevNext: false,
  prevText: "Poprzedni",
  nextText: "Następny"
});
