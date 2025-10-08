let currentSlide = 1;
const totalSlides = 10; // Updated to 10 slides

function showSlide(slideNumber) {
    // Hide all slides
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show target slide
    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
    
    // Update slide counter
    document.getElementById('current-slide').textContent = slideNumber;
    document.getElementById('total-slides').textContent = totalSlides;
    
    // Update navigation buttons
    updateNavigationButtons(slideNumber);
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

function goToSlide(slideNumber) {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
        currentSlide = slideNumber;
        showSlide(currentSlide);
    }
}

function updateNavigationButtons(slideNumber) {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Disable/enable previous button
    if (slideNumber === 1) {
        prevBtn.classList.add('disabled');
        prevBtn.disabled = true;
    } else {
        prevBtn.classList.remove('disabled');
        prevBtn.disabled = false;
    }
    
    // Disable/enable next button
    if (slideNumber === totalSlides) {
        nextBtn.classList.add('disabled');
        nextBtn.disabled = true;
    } else {
        nextBtn.classList.remove('disabled');
        nextBtn.disabled = false;
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            previousSlide();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Space bar
            nextSlide();
            break;
        case 'Home':
            goToSlide(1);
            break;
        case 'End':
            goToSlide(totalSlides);
            break;
    }
});

// Touch/swipe support
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe right - go to previous slide
            previousSlide();
        } else {
            // Swipe left - go to next slide
            nextSlide();
        }
    }
}

// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
    showSlide(1);
    updateNavigationButtons(1);
});