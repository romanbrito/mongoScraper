var express = require("express");
var router = express.Router();

// Requiring our Note and Article models
var Note = require("../models/Note.js");
var savedArticle = require("../models/savedArticle");


router.get("/savedArticles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    savedArticle.findOne({ "_id": req.params.id })
    // ..and populate all of the notes associated with it
        .populate("note")
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                var hbsObject = {
                    saveArticle: doc
                };
                res.render("modalNote", hbsObject);
                //res.json(hbsObject);
            }
        });
});

module.exports = router;