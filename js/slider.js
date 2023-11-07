"use strict";
const handleCarousel = (container) => {
  let arrowIcons = document.querySelectorAll(`${container} .arrowIcon`);
  const carousel = document.querySelector(`${container} .carousel`);

  let firstImg = carousel.querySelectorAll("img")[0];
  let isDragStart = false;
  let prevPageX;
  let prevScrollLeft;

  const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display =
      carousel.scrollLeft == scrollWidth ? "none" : "block";
  };

  arrowIcons.forEach((icon) => {
    let firstImgWidth = firstImg.clientWidth + 13;
    icon.addEventListener("click", () => {
      carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 40);
    });
  });

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
  };

  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
  };

  const dragging = (e) => {
    if (!isDragStart) {
      return;
    }
    e.preventDefault();
    carousel.classList.add("dragging");
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mouseup", dragStop);
  carousel.addEventListener("mouseleave", dragStop);
  carousel.addEventListener("mousemove", dragging);
};

handleCarousel("#carousel1");
handleCarousel("#carousel2");
handleCarousel("#carousel3");
handleCarousel("#carousel4");
handleCarousel("#carousel5");
handleCarousel("#carousel6");
handleCarousel("#carousel7");



