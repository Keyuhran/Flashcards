const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require (supabase)
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});