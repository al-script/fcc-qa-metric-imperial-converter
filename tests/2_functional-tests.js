const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // #1
  test("Convert a valid input such as 10L: GET request to /api/convert", function () {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // console.log('res', res)
        // console.log(res.body)
        // console.log('res.body', res.body)
        assert.equal(
          res.text,
          '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}'
        );
      });
  });

  // #2
  test("Convert an invalid input such as 32g: GET request to /api/convert", function () {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        // console.log('res', res)
        assert.equal(res.body, "invalid unit");
      });
  });

  // #3
  test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", function () {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number");
      });
  });

  // #4
  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", function () {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, "invalid number and unit");
      });
  });

  // #5
  test("Convert with no number such as kg: GET request to /api/convert", function () {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}'
        );
      });
  });
});
