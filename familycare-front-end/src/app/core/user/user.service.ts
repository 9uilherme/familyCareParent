import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({providedIn:'root'})
export class UserService {

    private behaviorSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(private tokenService: TokenService){
        this.tokenService.hasToken() && this.decodeAndNotify();
    }

    setToken(token:string){
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser(){
        return this.behaviorSubject.asObservable();
    }

    private decodeAndNotify(){
        const token = this.tokenService.getToken();
        const user = jwt_decode(token) as User;
        this.userName = user.sub;
        this.behaviorSubject.next(user);
    }

    logout(){
        this.tokenService.removeToken();
        this.behaviorSubject.next(null);
    }

    isLogged(){
        return this.tokenService.hasToken();
    }

    getUserName(){
        return this.userName;
    }

}