$(document).ready(function() {
	// preload images
	$("#image_list a").each(function() {
		var swappedImage = new Image();
		swappedImage.src = $(this).attr("href");
	});
	
	// set up event handlers for links    
	$("#image_list a").click(function(evt) {
		// Store the clicked link for use in the callback
		var clickedLink = $(this);
		
		// fade out the image and caption
		$("#image, #caption").fadeOut(1000, function() {
			
			var imageURL = clickedLink.attr("href");
			
			var caption = clickedLink.attr("title");
			
			$("#image").attr("src", imageURL).fadeIn(1000);;
			
			$("#caption").text(caption).fadeIn(1000);;
			
			
			
		});
				
		
	    evt.preventDefault();
	}); // end click
	
	// move focus to first thumbnail
	$("li:first-child a").focus();
}); // end ready