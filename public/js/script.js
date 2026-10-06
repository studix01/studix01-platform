// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark-mode');
  updateThemeIcon();
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    const isDark = html.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });
}

function updateThemeIcon() {
  const isDark = html.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

// Search Functionality
const searchForm = document.getElementById('search-form');
if (searchForm) {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  });
}

// Like Lesson
function likeLessom(lessonId) {
  const btn = event.target;
  btn.classList.toggle('liked');
  const isLiked = btn.classList.contains('liked');
  localStorage.setItem(`lesson-like-${lessonId}`, isLiked);
  alert(isLiked ? '✅ Lesson liked!' : '❌ Like removed');
}

// Save/Bookmark Lesson
function saveLessom(lessonId) {
  const btn = event.target;
  const isSaved = localStorage.getItem(`lesson-save-${lessonId}`);
  if (isSaved) {
    localStorage.removeItem(`lesson-save-${lessonId}`);
    alert('❌ Bookmark removed');
  } else {
    localStorage.setItem(`lesson-save-${lessonId}`, 'true');
    alert('✅ Lesson saved!');
  }
}

// Share Lesson
function shareLessom(title) {
  if (navigator.share) {
    navigator.share({
      title: 'Studix01.net',
      text: `Check out this lesson: ${title}`,
      url: window.location.href
    }).catch(err => console.log('Error sharing:', err));
  } else {
    alert('📤 Share: ' + title + '\n' + window.location.href);
  }
}

// Quiz Functions
function submitQuiz() {
  const answers = document.querySelectorAll('input[type="radio"]:checked');
  if (answers.length === 0) {
    alert('⚠️ Please answer all questions!');
    return;
  }

  const quizId = document.getElementById('quiz-id').value;
  const formData = new FormData();
  formData.append('quizId', quizId);
  formData.append('answers', answers.length);

  fetch('/api/quiz-submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizId, answers: answers.length })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(`✅ Quiz Submitted!\nYour Score: ${data.score}%`);
      setTimeout(() => window.location.href = '/dashboard', 1500);
    }
  })
  .catch(err => alert('❌ Error submitting quiz'));
}

// AI Assistant Chat
function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  const chatMessages = document.getElementById('chat-messages');
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = message;
  chatMessages.appendChild(userMsg);

  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Send to AI
  fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  .then(res => res.json())
  .then(data => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'message ai';
    aiMsg.textContent = data.response;
    chatMessages.appendChild(aiMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  })
  .catch(err => {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'message ai';
    errorMsg.textContent = '❌ Error connecting to AI. Please try again.';
    chatMessages.appendChild(errorMsg);
  });
}

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.focus();
  }
});

// Initialize
console.log('🚀 Studix01.net loaded successfully!');
