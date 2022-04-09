var express = require("express");
var sodas = require("../data/sodas");
var router = express.Router();

let funds = { funds: 0 };

router.get("/", function (req, res, next) {
  res.send(sodas);
});

router.get("/funds", function (req, res, next) {
  res.send(funds);
});

router.post("/funds", function (req, res, next) {
  funds = req.body;
  res.send(funds);
});

router.post("/dispense", function (req, res, next) {
  let soda = sodas[Number(req.query.id - 1)];
  --soda.quantity;
  res.send(soda);
});

module.exports = router;
