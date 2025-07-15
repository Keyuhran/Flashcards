const {uploadFlashcard} = require('./controllers/dataController');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');
