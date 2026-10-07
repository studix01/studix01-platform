// Handle subject button clicks
function openSubject(subject) {
  alert(`Opening ${subject}...\nFeature coming soon!`);
  console.log(`User clicked on ${subject}`);
}

// Handle AI tutor button click
function aiMessage() {
  alert('🤖 Studix AI Tutor\n\nAsk me anything about your studies!\n\nFeature coming soon!');
  console.log('User clicked AI Tutor');
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add animation to cards on scroll
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.5s ease forwards';
      }
    });
  });

  cards.forEach(card => {
    observer.observe(card);
  });
});

// Console greeting
console.log('Welcome to Studix01.net! 📚');
console.log('Making learning better for students worldwide.');
