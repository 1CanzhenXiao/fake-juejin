$(function () {
    $("#toc").tocify({
        context: "#content",
        selectors: $( "#content" ).has( "h1" ).size() > 0 ? "h1,h2,h3,h4,h5" : "h2,h3,h4,h5",
    });
});