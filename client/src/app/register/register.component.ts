import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: User;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.user = { email:"",password:"",retypePassword:""};
  }
  registerUser(){
    if(this.user.password == this.user.retypePassword){
      this.userService.addUser(this.user).subscribe((data)=>{
        this.router.navigate(['/login']);
      },(error)=>{});
      
    }
    else{
      alert("password did not match");
    }
  }
}
