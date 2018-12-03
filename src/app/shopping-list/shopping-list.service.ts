import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5, 'count'),
    new Ingredient('Tomatoes', 10, 'count'),
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
            if (this.ingredients[index].measurement = ingredient.measurement) {
                this.ingredients[index].amount += ingredient.amount;
            } else {
                this.normalize(this.ingredients[index]);
                this.normalize(ingredient);
                this.ingredients[index].amount += ingredient.amount;
            }
            // this.ingredients[index].measurement = ingredient.measurement;
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

    normalize(ingredient: Ingredient) {
        // convert volumes to teaspoons 'tsp', 'tbsp', 'fl oz', 'cup', 'pt', 'qt', 'gal', 'oz', 'lbs', 'count'
        if (ingredient.measurement === 'gal') {
            ingredient.amount = ingredient.amount * 768;
            ingredient.measurement = 'tsp';
        } else if (ingredient.measurement === 'qt') {
            ingredient.amount = ingredient.amount * 192;
            ingredient.measurement = 'tsp';
        } else if (ingredient.measurement === 'pt') {
            ingredient.amount = ingredient.amount * 96;
            ingredient.measurement = 'tsp';
        } else if (ingredient.measurement === 'cups') {
            ingredient.amount = ingredient.amount * 48.6922;
            ingredient.measurement = 'tsp';
        } else if (ingredient.measurement === 'fl oz') {
            ingredient.amount = ingredient.amount * 6;
            ingredient.measurement = 'tsp';
        } else if (ingredient.measurement === 'tbsp') {
            ingredient.amount = ingredient.amount * 3;
            ingredient.measurement = 'tsp';
        }

        // convert weight to ounces
        if (ingredient.measurement === 'lbs') {
            ingredient.amount = ingredient.amount * 16;
            ingredient.measurement = 'oz';
        }
    }

    convert() {

    }
}
