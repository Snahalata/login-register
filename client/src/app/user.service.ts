import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL= "http://localhost:3000/user";

  constructor(private http:HttpClient ) { }

  getUser(){

  }
  addUser(user:User){
    return this.http.post(this.URL,user);
  }
  authUser(user:User){
    return this.http.post(this.URL+'/login',user);
  }
}
