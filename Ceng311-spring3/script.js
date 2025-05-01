// Wait for the document to be ready
$(document).ready(function() {
    // Initialize Project Carousel
    $('.project-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: true
                }
            }
        ]
    });

    // Initialize jQuery UI Datepicker for any date inputs
    $(".date-input").datepicker({
        dateFormat: "yy-mm-dd",
        minDate: 0,
        changeMonth: true,
        changeYear: true
    });

    // Initialize jQuery UI Tabs
    $("#tabs").tabs();

    // Initialize jQuery UI Accordion with modern options
    $("#career-accordion").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false,
        header: "> .accordion-item > .accordion-header",
        animate: {
            duration: 300,
            easing: "easeInOutQuart"
        },
        beforeActivate: function(event, ui) {
            // Add smooth transition
            if (ui.newHeader) {
                ui.newHeader.addClass('transitioning');
            }
            if (ui.oldHeader) {
                ui.oldHeader.addClass('transitioning');
            }
        },
        activate: function(event, ui) {
            // Remove transition class after animation
            setTimeout(function() {
                if (ui.newHeader) {
                    ui.newHeader.removeClass('transitioning');
                }
                if (ui.oldHeader) {
                    ui.oldHeader.removeClass('transitioning');
                }
            }, 300);

            // Adjust content height for Skills section
            if ($(event.currentTarget).find('.skills-container').length) {
                setTimeout(function() {
                    $(event.currentTarget).find('.accordion-content').css('height', 'auto');
                }, 300);
            }
        }
    });

    // Add click animation for accordion headers
    $('.accordion-header').on('click', function() {
        $(this).toggleClass('active');
        
        // Toggle plus/minus icon
        if ($(this).hasClass('active')) {
            $(this).find('.accordion-icon').html('−');
        } else {
            $(this).find('.accordion-icon').html('+');
        }
    });

    // Initialize jQuery UI Dialog for form submission
    $("#form-success").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Close": function() {
                $(this).dialog("close");
            }
        }
    });

    // Form validation using jQuery Validate plugin
    $("#contact-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must be at least 2 characters long"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            message: {
                required: "Please enter your message",
                minlength: "Your message must be at least 10 characters long"
            }
        },
        submitHandler: function(form) {
            // Show success message using jQuery UI Dialog
            $("#form-success").dialog("open");
            
            // Reset form
            form.reset();
            
            // Prevent default form submission
            return false;
        }
    });

    // Add smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // Add hover effect for social icons
    $('.social-icon').hover(
        function() {
            $(this).animate({
                opacity: 0.7
            }, 200);
        },
        function() {
            $(this).animate({
                opacity: 1
            }, 200);
        }
    );

    // Project filtering functionality
    $('.project-item').hover(
        function() {
            $(this).find('.project-details').slideDown(300);
        },
        function() {
            $(this).find('.project-details').slideUp(300);
        }
    );

    // Blog post animations
    $('.blog-post').hover(
        function() {
            $(this).find('.blog-post-content').animate({
                opacity: 1
            }, 300);
        },
        function() {
            $(this).find('.blog-post-content').animate({
                opacity: 0.9
            }, 300);
        }
    );

    // Initialize tooltips for project tech tags
    $('.tech-tag').tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });

    // Add animation to CTA buttons
    $('.cta-buttons .btn').hover(
        function() {
            $(this).animate({
                paddingLeft: '30px',
                paddingRight: '30px'
            }, 200);
        },
        function() {
            $(this).animate({
                paddingLeft: '20px',
                paddingRight: '20px'
            }, 200);
        }
    );

    // Add animation to blog pagination
    $('.pagination-number').click(function(e) {
        e.preventDefault();
        $('.pagination-number').removeClass('active');
        $(this).addClass('active');
    });
}); 