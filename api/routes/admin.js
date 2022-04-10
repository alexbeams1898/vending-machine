var express = require("express");
var sodas = require("../data/sodas");
var router = express.Router();

router.post("/restock", function (req, res, next) {
  if (!req.body.numberOfSodas) {
    res.status(500).send("numberOfSodas is null", 500);
    return;
  }
  if (!sodas[Number(req.query.id - 1)]) {
    res.status(500).send("Cannot find soda with id: " + req.query.id, 500);
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
  if (!sodas[Number(req.query.id - 1)]) {
    res.status(500).send("Cannot find soda with id: " + req.query.id, 500);
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
  if (!sodas[Number(req.query.id - 1)]) {
    res.status(500).send("Cannot find soda with id: " + req.query.id, 500);
    return;
  }
  sodas[Number(req.query.id - 1)].maxQuantity = req.body.newMax;
  res.send(sodas);
});

router.post("/addSoda", function (req, res, next) {
  if (
    !req.body.id ||
    !req.body.productName ||
    !req.body.description ||
    !req.body.cost ||
    !req.body.quantity ||
    !req.body.maxQuantity
  ) {
    res
      .status(500)
      .send(
        "Your soda has incorrect json, please make sure your json matches the others in sodas.json",
        500
      );
    return;
  }

  let newSoda = req.body;
  for (let i = 0; i < sodas.length; i++) {
    if (sodas[i].id === newSoda.id) {
      res
        .status(500)
        .send("Soda with id: " + newSoda.id + "already exists", 500);
      return;
    }
  }

  sodas.push(newSoda);
  res.send(sodas);
});

module.exports = router;
