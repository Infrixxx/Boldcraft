// Scroll reveal for badges
const scrollElements = document.querySelectorAll(".scroll-reveal");

const elementInView = (el, percentageScroll = 100) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= 
    ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100));
};

const displayScrollElement = (element) => {
  element.style.opacity = 1;
  element.style.transform = "scale(1)";
};

const hideScrollElement = (element) => {
  element.style.opacity = 0;
  element.style.transform = "scale(0.9)";
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 90)) {
      displayScrollElement(el);
    } else {
      hideScrollElement(el);
    }
  })
}

window.addEventListener("scroll", () => { 
  handleScrollAnimation();
});

// Initial hide
scrollElements.forEach(hideScrollElement);
