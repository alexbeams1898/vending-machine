var express = require("express");
var sodas = require("../data/sodas");
var router = express.Router();

router.post("/restock", function (req, res, next) {
  if (!req.body.numberOfSodas) {
    res.status(500).send("numberOfSodas is null", 500);
    return;
  }
  let soda = sodas[Number(req.query.id - 1)];
  let numOfSodas = req.body.numberOfSodas + soda.quantity;
  if (numOfSodas > soda.maxQuantity)
    res
      .status(500)
      .send(
        "The addition of numberOfSodas exceeds the max quantity, please enter a valid quantity"
      );
  else {
    soda.quantity += req.body.numberOfSodas;
    res.send(sodas);
  }
});

router.post("/updatePrice", function (req, res, next) {
  if (!req.body.newPrice) {
    res.status(500).send("newPrice is null", 500);
    return;
  }
  sodas[Number(req.query.id - 1)].cost = req.body.newPrice;
  res.send(sodas);
});

router.post("/updateMax", function (req, res, next) {
  if (!req.body.newMax) {
    res.status(500).send("newMax is null", 500);
    return;
  }
  sodas[Number(req.query.id - 1)].maxQuantity = req.body.newMax;
  res.send(sodas);
});

router.post("/addSoda", function (req, res, next) {
  if (!req.body) {
    res.status(500).send("Response body is null", 500);
    return;
  }
  let newSoda = req.body;
  sodas.push(newSoda);
  res.send(sodas);
});

module.exports = router;
