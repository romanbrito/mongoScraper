var express = require("express");
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
// Requiring Article model
var Article = require("../models/Article");

// A GET request to scrape the echojs website
router.get("/scrape", function (req, res) {
    var accepted = 0;
    var rejected = 0;
    var total = 0;
    var entries = 0;

    // First, we grab the body of the html with request
    request("https://news.ycombinator.com/", function (error, response, html) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(html);
        // Now, we grab every desired element within a class
        var articleElement = ".title";

        $(articleElement).each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");

            // Using our Article model, create a new entry
            // This effectively passes the result object to the entry (and the title and link)
            var entry = new Article(result);

            // Now, save that entry to the db
            entry.save(function (err, doc) {
                entries++;
                // Log any errors
                if (err) {
                    console.log(err);
                    rejected++;
                    total = accepted + rejected;
                    if (total === $(articleElement).length) {
                        var hbsObject = {
                            numberArticles: accepted
                        };
                        res.render("modal", hbsObject);
                        //res.json(accepted);
                    }
                }
                // Or log the doc
                else {
                    //console.log(doc);
                    accepted++;
                    total = accepted + rejected;
                    if (total === $(articleElement).length) {
                        var hbsObject = {
                            numberArticles: accepted
                        };
                        res.render("modal", hbsObject);
                        //res.json(accepted);
                    }
                }
            });
        });
    });
    // Tell the browser that we finished scraping the text
    //res.render("modal");
    //res.json(counter);
});


module.exports = router;