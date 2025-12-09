import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TechPartnersComponent } from './components/tech-partners/tech-partners.component';
import { TrustedPartnersComponent } from './components/trusted-partners/trusted-partners.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [
    // layouts
    LandingLayoutComponent,

    // pages
    HomeComponent,

    // components
    HeaderComponent,
    NavbarComponent,
    TechPartnersComponent,
    TrustedPartnersComponent,
    PricingComponent,
    FooterComponent,
  ]
})
export class LandingModule { }
