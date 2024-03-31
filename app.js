const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000;
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const imgModel = require('./model/img.model');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'image')); // Corrected destination path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }); // Removed dest option

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const data = await imgModel.insertMany({ img: 'http://localhost:3000/image/' + req.file.originalname }); // Corrected image URL
    console.log(data);
    res.json({ message: "done", img: data[0].img });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' }); // Send error response
  }
});

mongoose.connect('mongodb://localhost:27017/goStart').then(() => {
  console.log('connected');
});

app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`));
