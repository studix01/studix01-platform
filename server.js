const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample Data
const subjects = [
  { id: 1, name: 'Mathematics', icon: '📐', lessons: 45, color: '#FF6B6B' },
  { id: 2, name: 'Physics', icon: '⚛️', lessons: 38, color: '#4ECDC4' },
  { id: 3, name: 'Chemistry', icon: '🧪', lessons: 42, color: '#FFE66D' },
  { id: 4, name: 'Biology', icon: '🧬', lessons: 35, color: '#95E1D3' },
  { id: 5, name: 'English', icon: '📚', lessons: 50, color: '#C7CEEA' },
  { id: 6, name: 'Kinyarwanda', icon: '🗣️', lessons: 30, color: '#FF8B94' },
  { id: 7, name: 'Geography', icon: '🌍', lessons: 28, color: '#B4E7FF' },
  { id: 8, name: 'History', icon: '📖', lessons: 40, color: '#D4A5A5' },
  { id: 9, name: 'ICT', icon: '💻', lessons: 55, color: '#9D84B7' },
  { id: 10, name: 'Entrepreneurship', icon: '💼', lessons: 25, color: '#FFDAB9' }
];

const lessons = [
  { id: 1, title: 'Algebra Basics', subject: 'Mathematics', class: 'S1', level: 'Beginner', likes: 234, views: 1200 },
  { id: 2, title: 'Quadratic Equations', subject: 'Mathematics', class: 'S2', level: 'Intermediate', likes: 156, views: 890 },
  { id: 3, title: 'Newton\'s Laws of Motion', subject: 'Physics', class: 'S2', level: 'Intermediate', likes: 189, views: 945 },
  { id: 4, title: 'Atomic Structure', subject: 'Chemistry', class: 'S1', level: 'Beginner', likes: 142, views: 756 },
  { id: 5, title: 'Cell Biology', subject: 'Biology', class: 'S1', level: 'Beginner', likes: 198, views: 1050 },
  { id: 6, title: 'English Grammar', subject: 'English', class: 'S1', level: 'Beginner', likes: 267, views: 1340 },
  { id: 7, title: 'Kinyarwanda Literature', subject: 'Kinyarwanda', class: 'S2', level: 'Intermediate', likes: 98, views: 520 },
  { id: 8, title: 'World Geography', subject: 'Geography', class: 'S3', level: 'Advanced', likes: 145, views: 780 },
  { id: 9, title: 'Rwanda History', subject: 'History', class: 'S2', level: 'Intermediate', likes: 176, views: 920 },
  { id: 10, title: 'Programming Basics', subject: 'ICT', class: 'S1', level: 'Beginner', likes: 312, views: 1560 }
];

const quizzes = [
  { id: 1, title: 'Math Quiz S1', subject: 'Mathematics', questions: 20, timeLimit: 45 },
  { id: 2, title: 'Physics Quiz S2', subject: 'Physics', questions: 15, timeLimit: 30 },
  { id: 3, title: 'Chemistry Basics', subject: 'Chemistry', questions: 25, timeLimit: 50 },
  { id: 4, title: 'Biology Quiz S1', subject: 'Biology', questions: 20, timeLimit: 40 },
  { id: 5, title: 'English Grammar Test', subject: 'English', questions: 30, timeLimit: 45 }
];

// Routes
app.get('/', (req, res) => {
  res.render('pages/index', { subjects, lessons, quizzes });
});

app.get('/subjects', (req, res) => {
  res.render('pages/subjects', { subjects });
});

app.get('/subject/:id', (req, res) => {
  const subject = subjects.find(s => s.id == req.params.id);
  const subjectLessons = lessons.filter(l => l.subject === subject.name);
  res.render('pages/subject-detail', { subject, lessons: subjectLessons });
});

app.get('/lessons', (req, res) => {
  const filter = req.query.class || 'S1';
  const filteredLessons = lessons.filter(l => l.class === filter);
  res.render('pages/lessons', { lessons: filteredLessons, filter });
});

app.get('/lesson/:id', (req, res) => {
  const lesson = lessons.find(l => l.id == req.params.id);
  res.render('pages/lesson-detail', { lesson });
});

app.get('/books', (req, res) => {
  res.render('pages/books');
});

app.get('/exercises', (req, res) => {
  res.render('pages/exercises', { subjects });
});

app.get('/quizzes', (req, res) => {
  res.render('pages/quizzes', { quizzes });
});

app.get('/quiz/:id', (req, res) => {
  const quiz = quizzes.find(q => q.id == req.params.id);
  res.render('pages/quiz-detail', { quiz });
});

app.get('/revision', (req, res) => {
  res.render('pages/revision', { subjects });
});

app.get('/ai-assistant', (req, res) => {
  res.render('pages/ai-assistant');
});

app.get('/dashboard', (req, res) => {
  res.render('pages/dashboard', { lessons });
});

app.get('/search', (req, res) => {
  const query = req.query.q || '';
  const results = lessons.filter(l => 
    l.title.toLowerCase().includes(query.toLowerCase()) ||
    l.subject.toLowerCase().includes(query.toLowerCase())
  );
  res.render('pages/search', { results, query });
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

app.post('/api/quiz-submit', (req, res) => {
  const { quizId, answers } = req.body;
  const score = Math.floor(Math.random() * 100) + 50;
  res.json({ success: true, score, message: 'Quiz submitted successfully!' });
});

app.post('/api/ai-chat', (req, res) => {
  const { message } = req.body;
  // Placeholder for AI integration
  const response = `I understand you're asking about: "${message}". This is where the AI assistant would provide detailed explanation.`;
  res.json({ success: true, response });
});

app.post('/api/save-lesson', (req, res) => {
  const { lessonId } = req.body;
  res.json({ success: true, message: 'Lesson saved successfully!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Studix01.net is running on http://localhost:${PORT}`);
});
