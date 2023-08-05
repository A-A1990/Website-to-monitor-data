const express = require('express');
const cors = require('cors');
const http = require('http');
const { URL } = require('url');
const path = require('path');

const MICROSERVICE1_URL = 'http://localhost:4000';
const MICROSERVICE2_URL = 'http://localhost:5000';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'html-page')));

app.get('/rooms/:roomNumber', async (req, res) => {
  request.get(GET, (error, response, body) => {
      
    if (response.statusCode==200) {
      const data = JSON.parse(body);
      res.status(200).json(data);

    } else {
      const data = JSON.parse(body);
      res.status(404).json(data);
    }
  });
  /*
  try {
    const microservice1Url = new URL('/rooms/' + roomNumber, MICROSERVICE1_URL);
    const response = await new Promise((resolve, reject) => {
      http.get(microservice1Url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
        let error;
        if (statusCode !== 200) {
          error = new Error(`Request failed. Status code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
        }
        if (error) {
          console.error(error);
          res.resume();
          reject(error);
        } else {
          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              resolve(parsedData);
            } catch (error) {
              console.error(error);
              reject(error);
            }
          });
        }
      }).on('error', (error) => {
        console.error(error);
        reject(error);
      });
    });
    res.json(response);
  } 
  */
});

app.put('/rooms/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const { sensorReading, act } = req.body;
  request.put(PUT, {
    json: {roomNumber,sensorReading,act}
  },
  /*
  try{
    const microservice2Url = new URL('/rooms/' + roomNumber, MICROSERVICE2_URL);
    const putData = JSON.stringify({ sensorReading, act });
    const response = await new Promise((resolve, reject) => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': putData.length
        }
      };
      const req = http.request(microservice2Url, requestOptions, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
        let error;
        if (statusCode !== 200) {
          error = new Error(`Request failed. Status code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(`Invalid content-type. Expected application/json but received ${contentType}`);
        }
        if (error) {
          console.error(error);
          res.resume();
          reject(error);
        } else {
          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => { rawData += chunk; });
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              resolve(parsedData);
            } catch (error) {
              console.error(error);
              reject(error);
            }
          });
        }
      }).on('error', (error) => {
        console.error(error);
        reject(error);
      });
      req.write(putData);
      req.end();
    });
    res.json(response);
  } */ 
  (error, response, body) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(body);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});