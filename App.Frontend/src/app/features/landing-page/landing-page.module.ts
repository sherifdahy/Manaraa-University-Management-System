import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { NavBar } from './layouts/landing-layout/main-landing-page/navBar-component/nav-bar/nav-bar';
import { Header } from './layouts/landing-layout/main-landing-page/header-component/header/header';
import { TrustedPartners } from './layouts/landing-layout/main-landing-page/trustedPartners-component/trusted-partners/trusted-partners';
import { TechPartners } from './layouts/landing-layout/main-landing-page/techPartners-component/tech-partners/tech-partners';
import { Pricing } from './layouts/landing-layout/main-landing-page/pricing-component/pricing/pricing';
import { Footer } from './layouts/landing-layout/main-landing-page/footer-component/footer/footer';


const routes : Routes = [
  {
    path : '',
    component : LandingLayoutComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
],
  declarations: [
    // layouts
    LandingLayoutComponent,
    NavBar,
    Header,
    TrustedPartners,
    TechPartners,
    Pricing,
    Footer,


    // components

    // pages
  ]
})
export class LandingPageModule { }
