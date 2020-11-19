// Requiring our models
var db = require("../models");

module.exports = function (app) {

    // get the ingredients
    app.get("/api/ingredients", function (req, res) {
        db.Ingredients.findAll().then(function (data) {
            res.json(data);
        })
    })

    // get measures
    app.get("/api/measures", function (req, res) {
        db.Measure.findAll().then(function (data) {
            res.json(data);
        })
    })

    // get measure id from measure name
    app.get("/api/measures/:measure_metric", function(req, res) {
        db.Measure.findOne({
            where: {
                measure_metric: req.params.measure_metric
            }
        }).then(function (data) {
            res.json(data);
        })
    })
    

    // search ingredients by id
    app.get("/api/ingredients/:id", function (req, res) {
        db.Ingredients.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    })

    // get ingredient from item name
    app.get("/api/ingredients/:item", function(req, res) {
        db.Ingredients.findAll({
            where: {
                item: req.params.item
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    // get ingredient from item name
    app.get("/api/ingredients/:item/:price", function(req, res) {
        db.Ingredients.findOne({
            where: {
                item: req.params.item,
                price: req.params.price,
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    // add new ingredients
    app.post("/api/ingredients", function (req, res) {
        db.Ingredients.create(req.body).then(function (ingredients) {
            res.json(ingredients);
        })
    });

    app.delete("/api/ingredients/:id", function (req, res) {
        db.Ingredients.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data)
        })
    });

}

