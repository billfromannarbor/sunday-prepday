const fs = require('fs').promises;
const path = require('path');

async function buildRecipeIndex() {
    try {
        // Get all files in the recipes directory
        const recipesDir = path.join(__dirname, 'recipes');
        const files = await fs.readdir(recipesDir);
        
        // Filter for .json files and exclude index.json
        const recipeFiles = files.filter(file => 
            file.endsWith('.json') && file !== 'index.json'
        );

        // Read each recipe file and extract the needed information
        const recipes = await Promise.all(
            recipeFiles.map(async (file) => {
                const filePath = path.join(recipesDir, file);
                const content = await fs.readFile(filePath, 'utf8');
                const recipe = JSON.parse(content);
                
                // Generate id from filename by removing .json extension
                return {
                    id: file.replace('.json', ''),
                    name: recipe.name || 'Untitled Recipe'
                };
            })
        );

        // Sort recipes alphabetically by name
        recipes.sort((a, b) => a.name.localeCompare(b.name));

        // Write the index.json file
        const indexPath = path.join(recipesDir, 'index.json');
        await fs.writeFile(
            indexPath, 
            JSON.stringify(recipes, null, 4),
            'utf8'
        );

        console.log('Successfully generated index.json with', recipes.length, 'recipes');
    } catch (error) {
        console.error('Error building recipe index:', error);
        process.exit(1);
    }
}

buildRecipeIndex(); 