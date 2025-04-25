$(document).ready(function() {
    // Initialize datepicker for birthday field
    $("#birthday").datepicker({
        dateFormat: 'mm/dd/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:+0'
    });

    // Programming languages array for autocomplete
    var programmingLanguages = [
        "JavaScript",
       
        "ASP.NET",
        "Python",
        "Java",
        "C++",
        "C#",
        "Ruby",
        "PHP",
        "Swift",
        "Go",
        "TypeScript"
    ];

    // Initialize autocomplete for programming languages
    $("#programming").autocomplete({
        source: programmingLanguages
    });

    // Form validation
    $("#userForm").on("submit", function(event) {
        if (!this.checkValidity()) {
            event.preventDefault();
            alert("Please fill all required fields with valid information.");
        }
    });
}); 