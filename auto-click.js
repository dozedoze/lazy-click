const robotjs = require("robotjs");

exports.createAutoClick = (timeOut = 1000) => {
  let timer = null;
  return {
    start: () => {
      timer = setInterval(() => {
        robotjs.mouseClick();
        console.log("handleclick");
      }, timeOut);
    },
    end: () => {
      clearInterval(timer);
      timer = null;
    },
  };
};
