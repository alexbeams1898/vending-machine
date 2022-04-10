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
  if (!req.body) {
    res.status(500).send("Request body is null", 500);
    return;
  }
  funds = req.body;
  res.send(funds);
});

router.post("/dispense", function (req, res, next) {
  if (!sodas[Number(req.query.id - 1)]) {
    res.status(500).send("Cannot find soda with id: " + req.query.id, 500);
    return;
  }
  let soda = sodas[Number(req.query.id - 1)];
  --soda.quantity;
  res.send(soda);
});

module.exports = router;
