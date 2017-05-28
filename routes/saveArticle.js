var express = require("express");
var router = express.Router();
// Requiring Article model
var Article = require("../models/Article");
var savedArticle = require("../models/savedArticle");
//var Note = require("../models/Note.js");

// Grab an article by it's ObjectId
router.get("/articles/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    Article.findOne({ "_id": req.params.id })
        // now, execute our query
        .exec(function(error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise, send the doc to the browser as a json object
            else {
                var result = {};
                result.title = doc.title;
                result.link = doc.link;

                var entry = new savedArticle(result);
                entry.save(function (err, savedArt) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(savedArt);
                    }
                });
            }
        });
});


module.exports = router;

// // Create a new note or replace an existing note
// app.post("/articles/:id", function(req, res) {
//     // Create a new note and pass the req.body to the entry
//     var newNote = new Note(req.body);
//
//     // And save the new note the db
//     newNote.save(function(error, doc) {
//         // Log any errors
//         if (error) {
//             console.log(error);
//         }
//         // Otherwise
//         else {
//             // Use the article id to find and update it's note
//             Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
//             // Execute the above query
//                 .exec(function(err, doc) {
//                     // Log any errors
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         // Or send the document to the browser
//                         res.send(doc);
//                     }
//                 });
//         }
//     });
// });


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