import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class ShoppingListService{
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>

  private  ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Banana', 10),
       ];
    
 
 getItem(index:number){
    return this.ingredients[index]

 }  

getIngredient(){
    return this.ingredients.slice();
}

addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice())
}

addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientChanged.next(this.ingredients.slice())
}

updateIngredient(index:number, newIngredient:Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice())
}

deletedItem(index:number){
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice())
}
}