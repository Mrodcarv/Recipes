import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Alert } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";

@NgModule({
    declarations:[
        LoadingSpinnerComponent,
        Alert,
        DropdownDirective
    ],

    imports:[
        CommonModule
    ],
    
    exports:[
       
        LoadingSpinnerComponent,
        Alert,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{}