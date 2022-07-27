import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CurdService } from './curd.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private curd: CurdService,
  ) { }
  uid: any;
  //Login method

  login(loginForm: any){
    var email = loginForm.email;
    var password = loginForm.password;
    console.log(email, password);
    this.afAuth.signInWithEmailAndPassword(email, password).then( res => {
      if (res.user?.emailVerified) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard']);
      }else{
        alert('Thư điện tử của bạn chưa được xác nhận, hãy kiểm tra email.');
        this.sendEmailVerification(res.user);
        this.afAuth.signOut();
      }
    }, (error) => {
      if (error.code == 400) {
        alert(error.message);
        this.router.navigate(['/login']);
      }
    }).catch( (error) => {
      alert(error.message);
    } );
    
  }

  //Register method

  register(registerForm: any){
    var email = registerForm.email;
    var password = registerForm.password;
    this.afAuth.createUserWithEmailAndPassword(email, password).then( res => {
      var user = {
        email: email,
      }
      this.curd.createNewRecord('Information', res.user?.uid, user);
      if(res.user?.emailVerified){
        this.router.navigate(['/dashboard']);
      }else{
        this.logout();
        this.sendEmailVerification(res.user);
      }
      
      
    }, (error) => {
        alert(error.message);
        this.router.navigate(['/register']);
      }
    );
  }

  // Logout method
  logout(){
    this.afAuth.signOut().then( () => {
      alert('You have been logged out');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }, (error) => {
      alert('Error logging out');
    });
   
  }
  

  sendEmailVerification(user: any){
    user.sendEmailVerification()
    .then( () => {
      alert('Check your email for the verification link.');
    }, (error: any) => {
      alert(error.message);
    });
    
  }

  
}
