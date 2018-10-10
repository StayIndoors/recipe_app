import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
    new Recipe(
        'Tasty Schnitzel',
        'A super-tasty schnitzel - just awesome!',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Wiener-Schnitzel03.jpg/198px-Wiener-Schnitzel03.jpg',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
    new Recipe(
        'Big Fat Burger',
        'It is a dang burger!',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/218px-Cheeseburger.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
    ];

    getRecipes() {
        // This returns a copy of the recipes array rather than the original array.
        // This is for safety so this service is the single source of truth.
        return this.recipes.slice();
    }
}
