function ConvertHandler() {
  this.getNum = function (input) {
    // console.log("input is in function", input, typeof input);
    // let splitter = input.split(/[a-z]/)
    let splitter = input.split(/[a-z]|[A-Z]/);

    // console.log("splitter is:", splitter);
    let splitNum = splitter[0];
    // console.log("splitNum:", splitNum);

    let fractionRegex = new RegExp(/\//g);
    let fractionTest = fractionRegex.test(splitNum);

    // console.log("fractionTest", fractionTest);

    if (fractionTest === true) {
      // console.log("splitNum.match(///g", splitNum.match(/\//g));
      // console.log("splitNum.match(///g).length", splitNum.match(/\//g).length);
      if (splitNum.match(/\//g).length == 1) {
        // console.log(
        //   "splitNum.split(///g)[0] / splitNum.split(///g)[1]",
        //   splitNum.split(/\//g)[0] / splitNum.split(/\//g)[1]
        // );
        return splitNum.split(/\//g)[0] / splitNum.split(/\//g)[1];
      } else {
        return "invalid number";
      }
    } else if (splitNum === "") {
      return 1;
    } else if (+splitNum != "NaN") {
      return +splitNum;
    } else {
      return "invalid number";
    }
  };

  this.getUnit = function (input) {
    let splitter = input.split(/\d|\./);
    let splitUnit = splitter[splitter.length - 1];
    if (splitUnit == "l") {
      splitUnit = "L";
    }
    if (splitUnit == "KM") {
      splitUnit = "km";
    }
    if (splitUnit == "MI") {
      splitUnit = "mi";
    }
    if (splitUnit == "LBS") {
      splitUnit = "lbs";
    }
    if (splitUnit == "KG") {
      splitUnit = "kg";
    }
    if (splitUnit == "GAL") {
      splitUnit = "gal";
    }
    return splitUnit !== "km" &&
      splitUnit !== "mi" &&
      splitUnit !== "lbs" &&
      splitUnit !== "kg" &&
      splitUnit !== "gal" &&
      splitUnit !== "L"
      ? "invalid unit"
      : splitUnit;
  };

  this.getReturnUnit = function (initUnit) {
    return initUnit == "mi"
      ? "km"
      : initUnit == "km"
      ? "mi"
      : initUnit == "gal"
      ? "L"
      : initUnit == "L"
      ? "gal"
      : initUnit == "lbs"
      ? "kg"
      : initUnit == "kg"
      ? "lbs"
      : "invalid unit";
  };

  this.spellOutUnit = function (unit) {
    return unit == "mi"
      ? "miles"
      : unit == "km"
      ? "kilometers"
      : unit == "gal"
      ? "gallons"
      : unit == "L"
      ? "liters" //litres or liters?
      : unit == "lbs"
      ? "pounds"
      : unit == "kg"
      ? "kilograms"
      : "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    // do I need to make sure this is output as a number rounded to 5 digits?
    return initUnit == "mi"
      ? initNum * miToKm //+initUnit
      : initUnit == "km"
      ? initNum / miToKm
      : initUnit == "gal"
      ? initNum * galToL
      : initUnit == "L"
      ? initNum / galToL
      : initUnit == "lbs"
      ? initNum * lbsToKg
      : initUnit == "kg"
      ? initNum / lbsToKg
      : "invalid conversion";
  };

  // this.convert = function(initNum, initUnit) {
  //   const galToL = 3.78541;
  //   const lbsToKg = 0.453592;
  //   const miToKm = 1.60934;
  //   // do I need to make sure this is output as a number rounded to 5 digits?
  //   return initUnit == 'mi' ? +(initNum * miToKm).toFixed(5)
  //         : initUnit == 'km' ? +(initNum / miToKm).toFixed(5)
  //         : initUnit == 'gal' ? +(initNum * galToL).toFixed(5)
  //         : initUnit == 'L' ? +(initNum / galToL).toFixed(5)
  //         : initUnit == 'lbs' ? +(initNum * lbsToKg).toFixed(5)
  //         : initUnit == 'kg' ? +(initNum / lbsToKg).toFixed(5)
  //         : 'invalid conversion';
  // };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);

    return (
      initNum +
      " " +
      initUnitString +
      " converts to " +
      returnNum.toFixed(5) +
      " " +
      returnUnitString
    );
  };
}

module.exports = ConvertHandler;
