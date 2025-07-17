const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const staticPath = path.join(__dirname, 'public');    
app.use(express.static(staticPath));


app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});