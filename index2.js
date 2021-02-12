const { nextISSTimesForMyLocation } = require('./iss_promised');


const printPassTimes = function(passTimes) {
  for (let el of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(el.risetime);
    const duration = el.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((data) => {
    printPassTimes(data);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });