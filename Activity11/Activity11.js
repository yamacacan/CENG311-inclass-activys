$(document).ready(function() {
    // Handle click events for speaker links
    $("#nav_list a").click(function(evt) {
        evt.preventDefault();
        
        // Get the speaker's JSON file name from the title attribute
        var speakerFile = $(this).attr("title");
        
        // Clear the main element
        $("main").empty();
        
        // Load the JSON file
        $.ajax({
            type: "GET",
            url: "json_files/" + speakerFile + ".json",
            dataType: "json",
            success: function(data) {
                var speaker = data.speakers[0];
                var html = "<h1>" + speaker.title + "</h1>" +
                          "<img src='" + speaker.image + "'>" +
                          "<h2>" + speaker.month + "<br>" + speaker.speaker + "</h2>" +
                          "<p>" + speaker.text + "</p>";
                
                $("main").html(html);
            },
            error: function(xhr, status, error) {
                console.log("Error loading JSON:", error);
                $("main").html("<p>Error loading speaker data. Please try again later.</p>");
            }
        });
    });
}); // end ready