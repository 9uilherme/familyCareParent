import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { API_URL } from '../../ambiente/ambiente';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userServide: UserService
    ) {}

  authenticate(email:string, password:string){
    return this.http
    .post(
      API_URL + 'api/auth',
      {email,password},
      {observe:'response'}
    )
    .pipe(tap (res => {
      const current: any = res.body;
      this.userServide.setToken(current.token);
    }))
  }
}
