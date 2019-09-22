
// VANILLA JS WAY
// document.addEventListener("DOMContentLoaded", () => {
//   let lazyImages = document.querySelectorAll("img");
//   let active = false;

//   const lazyLoad = () => {
//     if (active === false) {
//       active = true;

//       setTimeout(() => {
//         // console.log("code ran");
//         lazyImages.forEach(lazyImage => {
//           if (
//             lazyImage.getBoundingClientRect().top <= window.innerHeight &&
//             lazyImage.getBoundingClientRect().bottom >= 0
//           ) {
//             lazyImage.parentElement.classList.remove("loading");
//             lazyImage.src = lazyImage.dataset.src;

//             lazyImages = [...lazyImages].filter(function(image) {
//               return image !== lazyImage;
//             });

//             if (lazyImages.length === 0) {
//               document.removeEventListener("scroll", lazyLoad);
//               window.removeEventListener("resize", lazyLoad);
//               window.removeEventListener("orientationchange", lazyLoad);
//             }
//           }
//         });

//         active = false;
//       }, 200);
//     }
//   };

//   document.addEventListener("scroll", lazyLoad);
//   window.addEventListener("resize", lazyLoad);
//   window.addEventListener("orientationchange", lazyLoad);
// });

// INTERSECTION OBSERVER WAY

document.addEventListener("DOMContentLoaded", () => {
   // select all img tags
    let images = document.querySelectorAll("img");
    
    const options = {
        rootMargin: '0px 0px 250px 0px'
    }

    // create new intersectionObserver instance
  let lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let image = entry.target;
        image.parentElement.classList.remove("loading"); // remove loading class from parent div
        image.src = image.dataset.src;   // set image src from attr data-src
        observer.unobserve(image);     // stop observing the image
      }
    });
  }, options);

  images.forEach(image => {
    lazyImageObserver.observe(image);  // start observing each image
  });
});
