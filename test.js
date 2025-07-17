const {uploadFlashcard} = require('./controllers/flashcardController');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');
