const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let interval = setInterval(showNextSlide, 5000); // Change slide every 3 seconds

// Function to show the next slide
function showNextSlide() {
    updateSlide(currentIndex + 1);
}

// Function to show the previous slide
function showPrevSlide() {
    updateSlide(currentIndex - 1);
}

// Function to update the slide
function updateSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = (index + slides.length) % slides.length;
    
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Initialize the slider
slides[currentIndex].classList.add('active');
dots[currentIndex].classList.add('active');

// Event Listeners
nextBtn.addEventListener('click', () => {
    clearInterval(interval);
    showNextSlide();
    interval = setInterval(showNextSlide, 3000); // Restart the interval
});

prevBtn.addEventListener('click', () => {
    clearInterval(interval);
    showPrevSlide();
    interval = setInterval(showNextSlide, 3000); // Restart the interval
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(interval);
        updateSlide(parseInt(dot.getAttribute('data-index')));
        interval = setInterval(showNextSlide, 3000); // Restart the interval
    });
});

// Pause the slider when hovered
document.getElementById('slider').addEventListener('mouseenter', () => {
    clearInterval(interval);
});

// Resume the slider when mouse leaves
document.getElementById('slider').addEventListener('mouseleave', () => {
    interval = setInterval(showNextSlide, 3000);
});

// Swipe Functionality
let startX = 0;
const sliderElement = document.getElementById('slider');

sliderElement.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

sliderElement.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        clearInterval(interval);
        showNextSlide();
        interval = setInterval(showNextSlide, 3000); // Restart the interval
    } else if (startX < endX - 50) {
        clearInterval(interval);
        showPrevSlide();
        interval = setInterval(showNextSlide, 3000); // Restart the interval
    }
});
