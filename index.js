// index.js
const { nextISSTimesForMyLocation} = require('./iss');

const printValue = function(passTimes) {
  for (let el of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(el.risetime);
    const duration = el.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printValue(passTimes);
});