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
            //res.json(hbsObject);
        }
    });
});

// app.get("/articles/:id", function(req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     Article.findOne({ "_id": req.params.id })
//     // ..and populate all of the notes associated with it
//         .populate("note")
//         // now, execute our query
//         .exec(function(error, doc) {
//             // Log any errors
//             if (error) {
//                 console.log(error);
//             }
//             // Otherwise, send the doc to the browser as a json object
//             else {
//                 res.json(doc);
//             }
//         });
// });
module.exports = router;