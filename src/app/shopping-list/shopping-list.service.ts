import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient, publishChanges = true) {
        // FindIndex will return -1 if ingredient name does not exist
        const index = this.ingredients.findIndex(ingredientToFind => ingredientToFind.name === ingredient.name);

        if (index === -1) {
            this.ingredients.push(ingredient);
        } else {
            this.ingredients[index].amount += ingredient.amount;
        }
        if (publishChanges) {
            this.ingredientsChanged.emit(this.ingredients.slice());
        }
    }

    addIngredients(ingredients: Ingredient[]) {
        // Using a For Loop would be inefficient due to so many event calls
        ingredients.forEach(ingredient => this.addIngredient(ingredient, false));
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}
