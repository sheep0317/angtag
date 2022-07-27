import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    
   }
  ngOnInit(): void {
    this.rememberMe = localStorage.getItem('rememberMe') === 'true' ||false ;
    var checkbox = document.getElementById("rememberLogin") as HTMLInputElement;
    checkbox.checked = this.rememberMe;
  }
  rememberMe?: boolean;
  rememberLogin(){
    var checkbox = document.getElementById("rememberLogin") as HTMLInputElement;
    localStorage.setItem('rememberMe', checkbox.checked.toString());

  }
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })
  
  login(){
    this.authService.login(this.loginForm.value);
    console.log(this.loginForm.value);
  }
}
