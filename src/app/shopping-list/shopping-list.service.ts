import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
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
            this.updateIngredients();
        }
    }

    addIngredients(ingredients: Ingredient[]) {
        // Using a For Loop would be inefficient due to so many event calls
        ingredients.forEach(ingredient => this.addIngredient(ingredient, false));
        this.updateIngredients();
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.updateIngredients();
    }

    updateIngredients() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.updateIngredients();
    }
}
