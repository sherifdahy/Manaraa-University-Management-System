import { Component, OnInit } from '@angular/core';
import { AppTranslateService } from '../../../../core/services/configuration/app-translate.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLang : string = 'en';

  constructor(private router : Router,private authService : AuthService,private appTranslateService: AppTranslateService) { }

  ngOnInit() {
    this.appTranslateService.language$.subscribe((result)=>{
      this.currentLang = result;
    });
  }

  changeLang(lang:string)
  {
    this.appTranslateService.changeLanguage(lang);
  }


  logout()
  {
    this.authService.logout().subscribe(()=>{
      this.router.navigateByUrl('/')
    })
  }
}
