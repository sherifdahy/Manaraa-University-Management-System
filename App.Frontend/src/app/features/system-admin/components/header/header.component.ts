import { Component, OnInit } from '@angular/core';
import { AppTranslateService } from '../../../../core/services/configuration/app-translate.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../core/services/configuration/error-handler.service';

@Component({
  selector: 'app-header',
  standalone : false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLanguage! : string;

  constructor(private errorHandlerService : ErrorHandlerService,private router : Router,private appTranslateService : AppTranslateService,private authService : AuthService) { }

  ngOnInit() {
    this.appTranslateService.language$.subscribe(response=>{
      this.currentLanguage = response;
    });
  }


  changeLanguage(lang :string)
  {
    this.appTranslateService.changeLanguage(lang);
  }

  logout()
  {
    this.authService.logout().subscribe({
      next : ()=>{
        this.router.navigateByUrl('/');
      },
      error : (errors)=>{
        this.errorHandlerService.handleError(errors,'');
      }
    });
  }
}
