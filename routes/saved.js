var express = require("express");
var router = express.Router();

// Requiring our Note and Article models
var Note = require("../models/Note.js");
var savedArticle = require("../models/savedArticle");

router.get("/saved", function (req, res) {
    savedArticle.find({}, function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            var hbsObject = {
                article: doc,
                showTitle: true
            };
            res.render("savedArticles", hbsObject);
            // res.json(hbsObject);
        }
    });
});

module.exports = router;