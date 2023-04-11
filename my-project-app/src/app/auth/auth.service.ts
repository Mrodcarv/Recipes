import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, throwError, tap, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService{
user = new BehaviorSubject<User>(null)
private tokenExpirationTimer:any

    constructor(private http:HttpClient, private router:Router){
    }

signUp(email: string, password: string){
   return this.http.post<AuthResponseData>
   ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOqvUtuByQF4waP_E2_aXE0dc0efJjT2A',
    {
        email: email,
        password: password,
        returnSecureToken: true

    }
    ).pipe(catchError(this.handleError)
    ,tap(resData=>{
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }
        ))
        
    
}


private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error occured'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage)
        }
    switch(errorRes.error.error.message){
        case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!'
        break;
        
        case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist!'
        break;

        case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct!'
        break;

}
        return throwError(errorMessage)
}


private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
    const expirationDate = new Date(
        new Date().getTime() + expiresIn * 1000
    )
    const user = new User(
        email,
        userId,
        token,
        expirationDate

    )
    this.user.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
}
logout(){
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
        clearTimeout (this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
}

autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
        this.logout();}
        ,expirationDuration)
}

autologin(){
    const userData = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
        return
    }
    
    const loadedUser = new User(
        userData.email, 
        userData.id, 
        userData._token, 
        new Date(userData._tokenExpirationDate))

    if(loadedUser.token){
        this.user.next(loadedUser)
        const expirationDuration = 
        new Date(userData._tokenExpirationDate).getTime() - 
        new Date().getTime();
        this.autoLogout(expirationDuration);
    }

    
}


login(email:string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOqvUtuByQF4waP_E2_aXE0dc0efJjT2A',
    {
        email: email,
        password: password,
        returnSecureToken: true

    }).pipe(catchError(this.handleError),tap(resData=>{
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
    }
        ))
}
}