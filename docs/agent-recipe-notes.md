# Recipe site — notes for assistants

Static site: `index.html` lists recipes from `recipes/index.json`; `recipe.html?id=<id>` loads `recipes/<id>.json`.

## Add or change a recipe

1. **Add** `recipes/<Your_Id>.json` (or edit an existing file). The **basename without `.json` is the URL id** (e.g. `Bills_Salsa.json` → `recipe.html?id=Bills_Salsa`).

2. **JSON shape** (all keys required for the UI as written):

```json
{
    "name": "Display Title",
    "ingredients": [
        { "quantity": "2 cups", "item": "flour" },
        { "quantity": "1 batch", "item": "Bill's Salsa", "notes": "optional free text" }
    ],
    "instructions": [
        "First step as a string.",
        "Second step."
    ]
}
```

- **`ingredients[].quantity`** and **`ingredients[].item`** are concatenated for display (`quantity` + space + `item`).
- **`ingredients[].notes`** is optional; when present it is shown in parentheses after the item.

3. **Regenerate the index** from the repo root:

```bash
node build-index.js
```

This rescans every `recipes/*.json` except `index.json`, writes **`name`** and derived **`id`** (from filename), and sorts by **`name`**.

4. Recipe **rename**: change **`name`** inside the JSON; if you **rename the file**, the **id / URLs change** — update any bookmarks or external links.

## Cross-recipe links (sub-recipes)

`recipe.js` links an ingredient to another recipe when **`ingredient.item` exactly equals** another recipe’s **`name`** field (string match via the index).

- Use the **full display name** from the target recipe’s `"name"` key, character-for-character.
- If names do not match, the ingredient renders as plain text (no link).

## Serving locally

Fetching JSON needs a **local HTTP server** (not `file://`). See README for `http-server` or equivalent.

## File conventions in this repo

- Filenames use underscores and PascalCase/snake hybrids (e.g. `Bills_Vegan_Chili.json`); **`name`** in JSON is human-facing and may differ.
- Unicode in strings can use `\uXXXX` escapes in JSON (see existing recipes for accented characters).
