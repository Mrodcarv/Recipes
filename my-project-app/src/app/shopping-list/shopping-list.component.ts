import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from "../shared/ingredient.model";

import { ShoppingListService } from './shoppinglist.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 ingredients : Ingredient[];
 private subscription : Subscription

 

 constructor(private slService:ShoppingListService){}

 ngOnInit(){
  this.ingredients = this.slService.getIngredient();
  this.subscription = this.slService.ingredientChanged.subscribe(
    (ingredients:Ingredient[])=>{this.ingredients = ingredients}
  )
 }

 onEditItem(index:number){
  this.slService.startedEditing.next(index)
 }

 ngOnDestroy(): void {
   this.subscription.unsubscribe() 
 }
  
}
