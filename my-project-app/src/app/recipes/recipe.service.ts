import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeService{
  recipeChanged = new Subject
  


    private recipes: Recipe[] = []

    setRecipes(recipes:Recipe[]){
      this.recipes = recipes
      this.recipeChanged.next(this.recipes.slice())
     }

      getRecipes(){
       return this.recipes.slice();
      }

      getRecipe(index:number){
       return this.recipes[index]
      }

      constructor(private slService:ShoppingListService){}

     onAddToshoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients)
     }

     addRecipe(recipe:Recipe){
      this.recipes.push(recipe)
      this.recipeChanged.next(this.recipes.slice())
     }

     updateRecipe(index:number, newRecipe:Recipe){
      this.recipes[index] = newRecipe
      this.recipeChanged.next(this.recipes.slice())
     }

     deleteRecipe(index:number){
      this.recipes.splice(index,1)
      this.recipeChanged.next(this.recipes.slice())
     }

    
    
}