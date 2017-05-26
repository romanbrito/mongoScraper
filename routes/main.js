var express = require("express");
var router = express.Router();

// Requiring our Note and Article models
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get("/", function (req, res) {
    Article.find({}, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            var hbsObject = {
                article: doc
            };
            res.render("index", hbsObject);
            // res.json(hbsObject);
        }
    });
});

module.exports = router;
