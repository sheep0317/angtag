import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }
  currentUser: any;
  ngOnInit(): void {
  }
  logout(){
    this.authService.logout();
  }
  getCurrentUser(){
    this.currentUser = getAuth().currentUser;
  }
}
