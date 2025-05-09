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

    // Function to fetch and display blog posts
    function fetchBlogPosts() {
        $.ajax({
            url: 'blog-posts.json',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                const blogContainer = $('#blog-posts-container');
                blogContainer.empty();
                
                data.posts.forEach(post => {
                    const postElement = `
                        <div class="blog-post">
                            <h3>${post.title}</h3>
                            <p class="post-date">${post.date}</p>
                            <p class="post-excerpt">${post.excerpt}</p>
                            <a href="${post.link}" class="read-more">Read More</a>
                        </div>
                    `;
                    blogContainer.append(postElement);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error fetching blog posts:', error);
                $('#blog-posts-container').html('<p class="error-message">Failed to load blog posts. Please try again later.</p>');
            }
        });
    }

    // Function to fetch weather data
    function fetchWeatherData() {
        // Using OpenWeatherMap API (you'll need to replace with your API key)
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const city = 'Istanbul'; // Default city
        
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
            method: 'GET',
            success: function(data) {
                const weatherContainer = $('#weather-container');
                const weatherHTML = `
                    <div class="weather-widget">
                        <h3>Weather in ${data.name}</h3>
                        <div class="weather-info">
                            <p>Temperature: ${Math.round(data.main.temp)}°C</p>
                            <p>Weather: ${data.weather[0].description}</p>
                            <p>Humidity: ${data.main.humidity}%</p>
                        </div>
                    </div>
                `;
                weatherContainer.html(weatherHTML);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching weather data:', error);
                $('#weather-container').html('<p class="error-message">Weather information unavailable</p>');
            }
        });
    }

    // Call the AJAX functions when document is ready
    fetchBlogPosts();
    fetchWeatherData();

    // Add refresh button for weather data
    $('#refresh-weather').on('click', function(e) {
        e.preventDefault();
        fetchWeatherData();
    });
}); 