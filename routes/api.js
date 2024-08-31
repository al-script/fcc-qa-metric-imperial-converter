"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.route("/api/convert").get((req, res) => {
    let convertHandler = new ConvertHandler();
    let input = req.query.input;
    // console.log("input is", input, typeof input);
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      // console.log("invalid number and unit");
      res.json("invalid number and unit");
    } else if (initNum === "invalid number") {
      // console.log("invalid number");
      res.json("invalid number");
    } else if (initUnit === "invalid unit") {
      // console.log("invalid number");
      res.json("invalid unit");
    } else {
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      // console.log("*** returnNum:", returnNum);
      //do I need the output to be a number rounded before it is output here?
      let stringToReturn = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );
      let jsonToReturn = {
        initNum: initNum,
        initUnit: initUnit,
        returnNum: +returnNum.toFixed(5),
        returnUnit: returnUnit,
        string: stringToReturn,
      };
      //returnNum is a string here but supposed to be number
      //perhaps I need to make sure I am storing it as a number before here
      // console.log(jsonToReturn);
      res.json(jsonToReturn);
    }
  });
};
