const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  // #1
  test("convertHandler should correctly read a whole number input", function () {
    assert.equal(convertHandler.getNum("1"), 1);
  });

  // #2
  test("convertHandler should correctly read a decimal number input", function () {
    assert.equal(convertHandler.getNum("1.1"), 1.1);
  });

  // #3
  test("convertHandler should correctly read a fractional input", function () {
    assert.equal(convertHandler.getNum("1/2"), 0.5);
  });

  // #4
  test("convertHandler should correctly read a fractional input with a decimal", function () {
    assert.equal(convertHandler.getNum("1.5/2"), 0.75);
  });

  // #5
  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
    assert.equal(convertHandler.getNum("3/2/3"), "invalid number");
  });

  // #6
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
    assert.equal(convertHandler.getNum(""), 1);
  });

  // #7
  test("convertHandler should correctly read each valid input unit", function () {
    assert.equal(convertHandler.getUnit("l"), "L");
    assert.equal(convertHandler.getUnit("L"), "L");
    assert.equal(convertHandler.getUnit("mi"), "mi");
    assert.equal(convertHandler.getUnit("km"), "km");
    assert.equal(convertHandler.getUnit("lbs"), "lbs");
    assert.equal(convertHandler.getUnit("kg"), "kg");
    assert.equal(convertHandler.getUnit("gal"), "gal");
  });

  // #8
  test("convertHandler should correctly return an error for an invalid input unit", function () {
    assert.equal(convertHandler.getUnit("t"), "invalid unit");
  });

  // #9
  test("convertHandler should return the correct return unit for each valid input unit", function () {
    //  assert.equal('l', 'gal');
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
  });

  // #10
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function () {
    assert.equal(convertHandler.spellOutUnit("L"), "liters"); //or litres?
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
  });

  // #11
  test("convertHandler should correctly convert gal to L", function () {
    assert.equal(convertHandler.convert("3", "gal"), "3" * 3.78541);
  });

  // #12
  test("convertHandler should correctly convert L to gal", function () {
    assert.equal(convertHandler.convert("3", "L"), "3" / 3.78541);
  });

  // #13
  test("convertHandler should correctly convert mi to km", function () {
    assert.equal(convertHandler.convert("3", "mi"), "3" * 1.60934);
  });

  // #14
  test("convertHandler should correctly convert km to mi", function () {
    assert.equal(convertHandler.convert("3", "km"), "3" / 1.60934);
  });

  // #15
  test("convertHandler should correctly convert lbs to kg", function () {
    assert.equal(convertHandler.convert("3", "lbs"), "3" * 0.453592);
  });

  // #16
  test("convertHandler should correctly convert kg to lbs", function () {
    assert.equal(convertHandler.convert("3", "kg"), "3" / 0.453592);
  });
});
