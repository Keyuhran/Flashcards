// app.js
const express       = require('express');
const cors          = require('cors');
const path          = require('path');
const dotenv        = require('dotenv');
const session       = require('express-session');
const ensureLoggedIn = require('./public/scripts/login.js')

const FlashcardController = require('./controllers/flashcardController');
const DeckController      = require('./controllers/deckController');

dotenv.config();
const app  = express();
const port = process.env.PORT || 3000;

// ———————————————————————————————————————————————————
// Middleware
// ———————————————————————————————————————————————————
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-this-secret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,    // true if you serve over HTTPS
      httpOnly: true
    }
  })
);

// ———————————————————————————————————————————————————
// API Routes
// ———————————————————————————————————————————————————
app.get('/get-decks', ensureLoggedIn, DeckController.getDecks);
app.post('/add-deck',      DeckController.addDeck);

app.post('/upload',        FlashcardController.uploadFlashcard);
app.get('/get-flashcards', ensureLoggedIn, FlashcardController.getFlashcards);
app.delete('/delete-flashcard', ensureLoggedIn, FlashcardController.deleteFlashcard);

// Login endpoint
app.post('/user-login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await require('./models/user').login(email, password);

    // mark them as logged in
    req.session.userId = user.id;
    req.session.userEmail = user.email;

    if (rememberMe) {
      // persistent for 7 days
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
    } else {
      // allow exactly one protected-page visit
      req.session.oneTime = true;
    }

    res.status(200).json({
      message: 'Login successful',
      role:    user.role 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});



// protect every .html except the login page
app.get('/*.html', (req, res, next) => {
  if (req.path === '/index.html') return next();
  ensureLoggedIn(req, res, next);
});

// ———————————————————————————————————————————————————
// Static + SPA fallback
// ———————————————————————————————————————————————————
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

// any other route (e.g. for client-side routing)
app.get('*', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/index.html');
  }
  res.sendFile(path.join(staticPath, 'index.html'));
});

// ———————————————————————————————————————————————————
// Start server
// ———————————————————————————————————————————————————
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
