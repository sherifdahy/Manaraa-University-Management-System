import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../../core/models/auth/requests/login-request';

@Component({
  selector: 'app-login-form',
  standalone : false,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    let request : LoginRequest ={
      email: "shrifm2017@gmail.com",
      password: "333Sherif%"
    };

    this.authService.login(request).subscribe(response => {
      console.log("Login successful:", response);
    }, error => {
      console.error("Login failed:", error);
    });
  }

}
