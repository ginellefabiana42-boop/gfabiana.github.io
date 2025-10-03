// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Get all the elements we'll be interacting with
const customCursor = document.querySelector('.custom-cursor');
const sections = document.querySelectorAll('.section');
const projectFolders = gsap.utils.toArray('.project-folder');

// Animate the custom cursor to follow the mouse
document.addEventListener('mousemove', (e) => {
    gsap.to(customCursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// ---------------------------------------------------------------- //

// Scroll-triggered background color change for sections
sections.forEach(section => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: "top center",
            onEnter: () => {
                const newColor = section.getAttribute('data-bg-color');
                gsap.to(document.body, { backgroundColor: newColor, duration: 0.5 });
                if (newColor === '#0B2027') {
                    document.body.style.color = '#40798C';
                    customCursor.style.borderColor = '#40798C';
                } else {
                    document.body.style.color = '#0B2027';
                    customCursor.style.borderColor = '#0B2027';
                }
            },
            onLeaveBack: () => {
                const newColor = section.previousElementSibling ? section.previousElementSibling.getAttribute('data-bg-color') : '#40798C';
                gsap.to(document.body, { backgroundColor: newColor, duration: 0.5 });
                if (newColor === '#0B2027') {
                    document.body.style.color = '#40798C';
                    customCursor.style.borderColor = '#40798C';
                } else {
                    document.body.style.color = '#0B2027';
                    customCursor.style.borderColor = '#0B2027';
                }
            }
        }
    });
});

// Staggered fade-in for project folders
projectFolders.forEach((folder, i) => {
    gsap.to(folder, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
            trigger: folder,
            start: "top 80%", // When the top of the folder is 80% down the viewport
            toggleActions: "play none none reverse" // Play on enter, reverse on leave back
        }
    });
});

// ---------------------------------------------------------------- //

// Carousel functionality for each project folder
document.querySelectorAll('.carousel-container').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const prevButton = carousel.querySelector('.carousel-button.prev');
    const nextButton = carousel.querySelector('.carousel-button.next');
    let currentIndex = 0;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });

    // Event listener for image enlarge
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightbox.classList.add('show');
        });
    });

    updateCarousel();
});

// Event listener for lightbox close button
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('show');
});

// Close lightbox when clicking outside of the image
lightbox.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox')) {
        lightbox.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const imageShowcase = document.querySelector('.image-showcase');
  const showcaseReel = document.querySelector('.showcase-reel');

  // This simple JS adds and removes a class for the pause effect
  imageShowcase.addEventListener('mouseenter', () => {
    showcaseReel.style.animationPlayState = 'paused';
  });

  imageShowcase.addEventListener('mouseleave', () => {
    showcaseReel.style.animationPlayState = 'running';
  });
});
