

// File: assets/js/language_button.js

document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById('toggleLanguage');
    toggleButton.addEventListener('click', function() {
        var englishDivs = document.querySelectorAll('.english');
        var koreanDivs = document.querySelectorAll('.korean');
        englishDivs.forEach(div => div.classList.toggle('active'));
        koreanDivs.forEach(div => div.classList.toggle('active'));
    });
});
