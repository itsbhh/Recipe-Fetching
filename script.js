$(document).ready(function() {
    const APP_ID = '77fb84f9';
    const API_KEY = '82c13347593f6f3d80c8b8b9379fe337';
    const API_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=random&app_id=${APP_ID}&app_key=${API_KEY}&to=20`;

    function fetchRecipes() {
        $.get(API_URL, function(data) {
            const recipes = data.hits.map(hit => hit.recipe);
            let html = '';
            recipes.forEach(recipe => {
                html += `<div class="col-md-4 mb-4">
                            <div class="card">
                                <img src="${recipe.image}" class="card-img-top" alt="${recipe.label}">
                                <div class="card-body">
                                    <h5 class="card-title">${recipe.label}</h5>
                                    <a href="${recipe.url}" target="_blank" class="btn btn-primary view-recipe">View Recipe</a>
                                </div>
                            </div>
                         </div>`;
            });
            $('#recipes-container').html(html);
            $('#recipe-count').text(recipes.length);
        });
    }

    function handleSearch() {
        const query = $('#searchInput').val();
        if (query) {
            const searchURL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${API_KEY}&q=${query}`;
            $.get(searchURL, function(data) {
                const recipes = data.hits.map(hit => hit.recipe);
                let html = '';
                recipes.forEach(recipe => {
                    html += `<div class="col-md-4 mb-4">
                                <div class="card">
                                    <img src="${recipe.image}" class="card-img-top" alt="${recipe.label}">
                                    <div class="card-body">
                                        <h5 class="card-title">${recipe.label}</h5>
                                        <a href="${recipe.url}" target="_blank" class="btn btn-primary view-recipe">View Recipe</a>
                                    </div>
                                </div>
                             </div>`;
                });
                $('#recipes-container').html(html);
                $('#recipe-count').text(recipes.length);
            });
        }
    }

    function updateTheme(theme) {
        if (theme === 'dark') {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === null) {
        localStorage.setItem('theme', 'light'); // Set default theme to light if no theme is saved
        updateTheme('light');
    } else {
        updateTheme(savedTheme);
    }

    $('#theme-toggler').click(function() {
        const currentTheme = $('body').hasClass('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        $('body').toggleClass('dark-mode');
        localStorage.setItem('theme', newTheme);
    });

    $('#searchButton').click(handleSearch);

    $('#searchInput').keypress(function(event) {
        if (event.keyCode === 13) {
            handleSearch();
        }
    });

    fetchRecipes();
});
