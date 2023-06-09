import { Component, ViewChild } from "@angular/core";
import { Form, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { AuthResponseData } from "./auth.service";




@Component({
    selector: 'auth-component',
    templateUrl: 'auth.component.html'
  })
  export class AuthComponent{
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    

    constructor(private authService:AuthService, private router:Router){
      
    }

    onSubmit(form : NgForm){
        const email = form.value.email
        const password = form.value.password

        let authObs: Observable<AuthResponseData>
        

        this.isLoading = true;

        if(this.isLoginMode){
            authObs = this.authService.login(email,password)
            
        } else{

        
        authObs = this.authService.signUp(email,password)}

        authObs.subscribe(
            resData =>{
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            },
            errorMessage =>{
                console.log(errorMessage);
                this.error = errorMessage
                this.isLoading = false;
            }
        
        )
        form.reset()
    
    }
    onHandleError(){
        this.error = null
    }


    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode
    }
  
    
}