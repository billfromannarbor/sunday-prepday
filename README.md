# Bill's Recipe Collection

A mobile-friendly recipe website designed for easy access while cooking. Built with HTML, CSS, and JavaScript, this static site displays recipes stored in JSON format.

## Features

- Clean, responsive design optimized for mobile devices
- Beautiful purple theme with artwork by Dayna A. Rupert
- Recipe linking (recipes can reference other recipes as ingredients)
- Alphabetically sorted recipe list
- Easy-to-read recipe format with ingredients and instructions clearly separated
- No backend required - runs entirely in the browser

## Project Structure

## Description
This project is a collection of recipes with a web interface to view and manage them.

## Files
- **index.html**: The main page displaying the list of recipes.
- **recipe.html**: The page displaying the details of a specific recipe.
- **styles.css**: The stylesheet for the project.
- **app.js**: The main JavaScript file for handling the recipe list.
- **recipe.js**: The JavaScript file for handling the recipe details.
- **recipes/**: A directory containing JSON files for each recipe.

## Building the Recipe Index

The `build-index.js` script automatically creates an index of all recipes. Run it whenever you:
- Add a new recipe
- Remove a recipe
- Rename a recipe
- Update a recipe name

To use the build script:

1. Make sure Node.js is installed on your system
2. Open a terminal in the project directory
3. Run:
   ```
   node build-index.js
   ```

The script will:
- Scan the recipes directory
- Read all .json files (except index.json)
- Create a new index.json file with all recipe metadata
- Sort recipes alphabetically by name

## Running the Site

The site requires a web server to function (due to JSON loading). You can use any static file server:

1. Install http-server globally (one time only):
   ```
   npm install -g http-server
   ```

2. Start the server:
   ```
   http-server
   ```

3. Open your browser to the displayed URL (typically `http://localhost:8080`)

## Mobile Usage

The site is designed for use while cooking:
- Large, readable text
- Clear ingredient lists
- Step-by-step instructions
- Easy navigation between recipes
- Works offline once loaded

## Credits

- Background artwork: Dayna A. Rupert
- Recipes: Bill's personal collection
