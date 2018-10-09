import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
    // tslint:disable-next-line:max-line-length
    new Recipe('A Test Recipe', 'This is simply a test', 'https://www.maxpixel.net/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg'),
    // tslint:disable-next-line:max-line-length
    new Recipe('Another Test Recipe', 'This is another test', 'https://www.maxpixel.net/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg')
    ];

    getRecipes() {
        // This returns a copy of the recipes array rather than the original array.
        // This is for safety so this service is the single source of truth.
        return this.recipes.slice();
    }
}
