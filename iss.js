
const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }

      fetchISSFlyOverTimes(coordinates, (error, response) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
          
        callback(error, response);
      });
    });
  });
};

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    } else {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      } else {
        const data = JSON.parse(body);
        callback(error, data.ip);
      }
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    } else {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      } else {
        const { latitude, longitude } = JSON.parse(body);
        callback(error, { latitude, longitude });
      }
    }
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    } else {
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      } else {
        const data = JSON.parse(body);
        callback(error, data.response);
      }
    }
  });

};

module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes,nextISSTimesForMyLocation};