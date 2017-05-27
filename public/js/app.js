// $(document).ready(function () {
//     $("#scrape").on('submit', function (e) {
//         e.preventDefault();
//         $.getJSON("/articles", function (data) {
//             for (var i = 0; i < data.length; i++) {
//                 // display info
//                 $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//             }
//             $("#articlesAdded").text("Added " + data.length + " new Articles");
//             $("#myModal").modal();
//         });
//     });
// });

$(document).on("click", "#savedArticles", function() {
    location.reload();
});

// Modal trigger
$( document ).ready(function() {
    $("#myModal").modal();
});

