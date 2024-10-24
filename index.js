const counters = document.querySelectorAll('.num');
const section = document.querySelector('.counter-section');

let interval = 2000;

// Options for the Intersection Observer
const options = {
  threshold: 1 // Trigger when 100% of the section is in view
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Start the counters when the section is in view
      startCounters();
      // Unobserve the section to stop unnecessary callbacks
      observer.unobserve(entry.target);
    }
  });
}, options);

// Observe the section
observer.observe(section);

function startCounters() {
  counters.forEach((valuedisplay) => {
    let startvalue = 0;
    let endvalue = parseInt(valuedisplay.getAttribute('data-val'));
    let duration = Math.floor(interval / endvalue);

    let counter = setInterval(() => {
      startvalue += 1;
      valuedisplay.textContent = startvalue;
      if (startvalue === endvalue) {
        clearInterval(counter);
      }
    }, duration);
  });
}




// ======================================================owlCarousel================




$(' #carasoul-for-larger-devices .owl-carousel').owlCarousel({
  loop:true,
  margin:40,
  nav:true,
  stagePadding:100,
  responsive:{
    0:{
      items:1
  },
      600:{
          items:1
      },
      1000:{
          items:2
      }
  }
})


$(' #carasoul-for-mobile-devices .owl-carousel').owlCarousel({
  loop:true,
  margin:40,
  nav:true,
  // stagePadding:20,
  responsive:{
    0:{
      items:1
  },
      600:{
          items:1
      },
      1000:{
          items:2
      }
  }
})


// ================================= Pre-Loader

window.addEventListener("load", function() {

  const preloader = document.getElementById("preloader");

  const content = document.getElementById("content");

  const minLoadingTime = 2000;

  const startTime = new Date().getTime();

  const loadTime = new Date().getTime() - startTime;

 if (loadTime < minLoadingTime) {
    setTimeout(() => {
      preloader.style.display = "none";
      content.style.display = "block";
    }, minLoadingTime - loadTime);
  } else {
    preloader.style.display = "none";
    content.style.display = "block";
  }
  
});