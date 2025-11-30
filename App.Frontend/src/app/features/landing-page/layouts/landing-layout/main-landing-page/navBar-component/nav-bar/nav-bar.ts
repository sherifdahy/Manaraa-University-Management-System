import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {

  isLoggedIn! : boolean;

  constructor(private authService : AuthService)
  {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(response=>{
      this.isLoggedIn = response;
    })
  }

  logout(){
    this.authService.logout();
  }
}
