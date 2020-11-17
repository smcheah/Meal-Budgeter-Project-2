const sequelize = require("sequelize");
const { Op } = require("sequelize");

// Requiring our models
var db = require("../models");

// Tip for you Tom
const { Recipe } = require("../models");

module.exports = function(app) {

    // get all the recipes
    app.get("/api/recipes", function(req, res) {
        Recipe.findAll().then(function(data) {
            res.json(data);
        })
    })

    // get a recipe using the recipe id
    app.get("api/recipes/:id", function(req, res) {
        Recipe.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.get("/api/recipes/less-than/:price", function(req, res) {
        let price = req.params.price;
        Recipe.findAll({
            include: [{
                model: db.Ingredients,
                through: "recipe_ingredients",
                as: "ingredients",
                required: true
            }],
            attributes: ["recipe.title", [sequelize.fn("sum", sequelize.col("ingredients.price")), "test"], ],
            group: ["recipe.title"],
            having: {
                "ingredients.price": sequelize.where(sequelize.fn("sum", sequelize.col("ingredients.price")), {
                    [Op.lt]: price
                })
            }
        }).then(function(data) {
            res.json(data);
        })
    })

    app.post("api/recipes", function(req, res) {
        Recipe.create(req.body).then(function(recipe) {
            res.json(recipe);
        })
    });

    app.delete("/api/recipes/:id", function(req, res) {
        Recipe.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(data) {
            res.json(data)
        })
    })

}