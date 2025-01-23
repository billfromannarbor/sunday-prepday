document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
});

async function loadRecipes() {
    try {
        const response = await fetch('recipes/index.json');
        const recipes = await response.json();
        
        // Sort recipes alphabetically by name
        recipes.sort((a, b) => a.name.localeCompare(b.name));
        
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error loading recipes:', error);
        document.getElementById('recipe-list').innerHTML = `
            <p>Error loading recipes</p>
            <p class="error-details">${error.message}</p>
        `;
    }
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    
    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found</p>';
        return;
    }

    recipeList.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <h2>${recipe.name}</h2>
            <a href="recipe.html?id=${recipe.id}" class="view-recipe-link">View Recipe →</a>
        </div>
    `).join('');
} 