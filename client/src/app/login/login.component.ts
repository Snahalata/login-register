import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { Token } from '../token.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user:User;
  private ticket:Token;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.user = { email:"",password:""};
  }
  checkUser(){
    this.userService.authUser(this.user).subscribe((data)=>{
      this.ticket = data as Token;
      console.log(this.ticket);
      this.router.navigate(['/home']);
    },(error)=>{});
  }

}
