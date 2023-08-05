import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function RoomData() {
  const [roomNumber, setRoomNumber] = useState('');
  const [sensorReading, setSensorReading] = useState('');
  const [act, setAct] = useState(false);
  const [roomData, setRoomData] = useState(null);
  

  useEffect(() => {
    async function fetchRoomData() {
      if (roomNumber) {
        const response = await fetch(`http://localhost:3000/rooms/${roomNumber}`);
        const data = await response.json();
        setRoomData(data);
      }
    }

    fetchRoomData();
  }, [roomNumber]);

  async function updateRoomData() {
    const response = await fetch(`http://localhost:3000/rooms/${roomNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sensorReading, act })
    });
    const data = await response.json();
    setRoomData(data);
  }

  return (
    <div>
      <h1>Room FF Data</h1>
      <form>
        <label htmlFor="room-number">Room Number:</label>
        <input type="text" id="room-number" name="room-number" value={roomNumber} onChange={(event) => setRoomNumber(event.target.value)} /><br />
        <label htmlFor="sensor-reading">Sensor Reading:</label>
        <input type="text" id="sensor-reading" name="sensor-reading" value={sensorReading} onChange={(event) => setSensorReading(event.target.value)} /><br />
        <label htmlFor="act">Act:</label>
        <input type="checkbox" id="act" name="act" checked={act} onChange={(event) => setAct(event.target.checked)} /><br />
        <button type="button" onClick={updateRoomData}>Update Room Data</button>
      </form>
      {roomData ? (
        <div>
          <p>Room Number: {roomData.room_number}</p>
          <p>Sensor Reading: {roomData.sensor_reading}</p>
          <p>Act: {roomData.act ? 'Yes' : 'No'}</p>
        </div>
      ) : null}
    </div>
  );
}

export default RoomData;




