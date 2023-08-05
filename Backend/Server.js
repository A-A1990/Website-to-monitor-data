
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const DB_URL = 'mongodb+srv://COE453:Coe453@cluster0.espq9dk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 1171;

const RoomSchema = new mongoose.Schema({
  room_number: Number,
  sensor_reading: Number,
  act: Boolean
});

const RoomModel = mongoose.model('Room', RoomSchema);

const app = express();

app.use(cors());

const publicDirectoryPath = path.join(__dirname, '../html-page/dist');
app.use(express.static(publicDirectoryPath));



mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Microservice 1 listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });