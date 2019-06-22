var express = require("express");
var router = express.Router();
var Game = require('../../../models').Game;

router.get("/", function (req, res, next) {
  Game.findAll()
    .then(games => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(JSON.stringify(games));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({error})
    });
});

router.post("/", function (req, res, next) {
  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

// Update Route

router.post("/", function (req, res, next) {
  Game.update({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(([rowsUpdate, [updatedGame]]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(202).send(JSON.stringify(updatedGame));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
    { returning: true,
      where: {
        id: parseInt(req.params.id)
      }
    }
});

//create route

router.post("/", function (req, res, next) {
  Game.create({
          title: req.body.title,
          price: req.body.price,
          releaseYear: req.body.releaseYear,
          active: req.body.active
    })
    .then(game => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify(game));
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

// delete Route

router.post("/", function (req, res, next) {
  Game.destroy({
          where: { req.params.id }
    })
    .then(([rowsUpdate, [updatedGame]]) => {
      res.setHeader("Content-Type", "application/json");
      res.status(204);
    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
    });
});

module.exports = router;
