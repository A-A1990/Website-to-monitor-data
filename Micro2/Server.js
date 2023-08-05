const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://COE453:Coe453@cluster0.espq9dk.mongodb.net/?retryWrites=true&w=majority';
const PORT = 5000;

const RoomSchema = new mongoose.Schema({
  room_number: Number,
  sensor_reading: Number,
  act: Boolean
});

const RoomModel = mongoose.model('Room', RoomSchema);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/rooms/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const roomData = await RoomModel.findOne({ room_number: roomNumber });
    res.json(roomData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching room data' });
  }
});

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Microservice 2 listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });