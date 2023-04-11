import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    @Output() selectedFeature = new EventEmitter<string>();
    userSub: Subscription
    isAuthenticated = false


constructor(private dataStorageService:DataStorageService, private http:HttpClient, 
    private authService:AuthService){

}

ngOnInit(){
    this.userSub = this.authService.user.subscribe(user=>
        this.isAuthenticated = !user ? false : true)
}

onLogout(){
    this.authService.logout();
}

onSelect(feature:string){
    this.selectedFeature.emit(feature)
}

onSaveData(){
    this.dataStorageService.storeRecipes()
}

onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
}
ngOnDestroy(){
    this.userSub.unsubscribe()
}
}