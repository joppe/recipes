# Recipes

I use this project to learn new technologies/frameworks. It's just for fun.

## Routes

- home -> weekmenu (CRUD)
- recipes (CRUD)
- units (CRUD)
- ingredients (CRUD)

## Data Structure

### Ingredients

```json
{
    "name": "Rode ui",
    "type": "Groente",
    "images": []
}
```

### Unit

```json
{
    "name": "Theelepel",
    "abreviation": "tl"
}
```

### Recipe

```json
{
    "name": "Chili sin carne",
    "description": "De vegetarische variant op de Mexicaanse chili con carne: chili sin carne. Het bekende recept voor chili, maar dan zonder vlees! Een lekker en snel gerecht voor doordeweeks. Eet smakelijk!",
    "source": "https://www.boodschappen.nl/recept/chili-sin-carne/",
    "images": [
        "https://www.boodschappen.nl/app/uploads/recipe_images/4by3_header/7179.jpg"
    ],
    "vegetarian": true,
    "vegan": true,
    "difficulty": 3, // 0 - 5
    "course": "hoofdgerecht",
    "servings" 4,
    "preparation-time": 30,
    "ingredients": [
        {
            "name": "zonnebloemolie",
            "unit": "el",
            "amount" 3
        },
        {
            "name": "rode uien",
            "unit": "unit",
            "amount" 2,
            "shape": "gesnipperd"
        }
    ],
    "preparation": [
        "Verhit de olie in een grote pan. Voeg de helft van de ui, de wortel en de bleekselderij toe en bak de groenten een paar minuten op een hoge stand tot ze zachter zijn. Voeg de paprika, knoflook en kruidenmix toe en bak circa 2 minuten.",
    ]
}
```

## Todo

- ~~use material ui~~
- ~~use mongoose~~
- ~~create middleware for api routes~~
- users (authentication/authorization)
- use environment variables for mongo user/pwd
