// import { NgModule, ModuleWithProviders } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {
//   TranslateModule as NgxTranslateModule,
//   TranslateLoader,
//   TranslateCompiler
// } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';


// export function httpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

// @NgModule({
//   imports: [NgxTranslateModule],
//   exports: [NgxTranslateModule]
// })
// export class AppTranslateModule {

//   static forRoot(): ModuleWithProviders<AppTranslateModule> {
//     return {
//       ngModule: AppTranslateModule,
//       providers: [
//         {
//           provide: TranslateLoader,
//           useFactory: httpLoaderFactory,
//           deps: [HttpClient]
//         },
//         {
//           provide: TranslateCompiler,
//           useClass: TranslateMessageFormatCompiler
//         }
//       ]
//     };
//   }

//   static forChild(): ModuleWithProviders<AppTranslateModule> {
//     return {
//       ngModule: AppTranslateModule
//     };
//   }
// }
