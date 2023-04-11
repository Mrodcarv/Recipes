import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingListEditComponent } from "../shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListRouting } from "./shopping-list.routing";


@NgModule({
    declarations:[
    ShoppingListComponent,
    ShoppingListEditComponent
    ],

    imports:[
        ShoppingListRouting, 
        FormsModule, 
        RouterModule, 
        SharedModule
        
    ]
    
    
})

export class ShoppingListModule{

}