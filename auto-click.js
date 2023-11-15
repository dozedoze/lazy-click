const robotjs = require("robotjs");

exports.createAutoClick = (timeOut = 1000) => {
  let timer = null;
  let nowTimeOut = timeOut;
  return {
    start: () => {
      timer = setInterval(() => {
        robotjs.mouseClick();
        console.log("handleclick");
      }, nowTimeOut);
    },
    end: () => {
      clearInterval(timer);
      timer = null;
    },
    changeTimeOut: (v) => {
      nowTimeOut = v;
    },
  };
};
