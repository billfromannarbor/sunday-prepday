document.addEventListener('DOMContentLoaded', () => {
    loadRecipeDetails();
});

async function loadRecipeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    
    if (!recipeId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Load both the recipe index and the specific recipe
        const [indexResponse, recipeResponse] = await Promise.all([
            fetch('recipes/index.json'),
            fetch(`recipes/${recipeId}.json`)
        ]);
        
        const recipeIndex = await indexResponse.json();
        const recipe = await recipeResponse.json();
        
        displayRecipeDetails(recipe, recipeIndex);
    } catch (error) {
        console.error('Error loading recipe:', error);
        document.getElementById('recipe-details').innerHTML = '<p>Error loading recipe</p>';
    }
}

function displayRecipeDetails(recipe, recipeIndex) {
    document.getElementById('recipe-title').textContent = recipe.name;
    
    // Create a map of recipe names to their IDs for easy lookup
    const recipeMap = new Map(
        recipeIndex.map(r => [r.name, r.id])
    );
    
    const recipeDetails = document.getElementById('recipe-details');
    recipeDetails.innerHTML = `
        <div class="recipe-details">
            <h2>Ingredients</h2>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ingredient => {
                    let text = ingredient.quantity;
                    const recipeId = recipeMap.get(ingredient.item);
                    
                    // If the ingredient matches a recipe name, make it a link
                    if (recipeId) {
                        text += ` <a href="recipe.html?id=${recipeId}">${ingredient.item}</a>`;
                    } else {
                        text += ` ${ingredient.item}`;
                    }
                    
                    if (ingredient.notes) {
                        text += ` (${ingredient.notes})`;
                    }
                    return `<li>${text}</li>`;
                }).join('')}
            </ul>

            <h2>Instructions</h2>
            <ol class="instructions-list">
                ${recipe.instructions.map(instruction => `
                    <li>${instruction}</li>
                `).join('')}
            </ol>
        </div>
    `;
} 