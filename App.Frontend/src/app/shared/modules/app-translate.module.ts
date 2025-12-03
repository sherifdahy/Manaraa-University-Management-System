import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateCompiler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { forkJoin, map } from 'rxjs';

// =======================================
// CUSTOM MULTI LOADER
// =======================================
class CustomMultiTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private resources: { prefix: string; suffix: string }[]
  ) {}

  getTranslation(lang: string) {
    const loaders = this.resources.map((res) =>
      this.http.get(`${res.prefix}${lang}${res.suffix}`)
    );

    return forkJoin(loaders).pipe(
      map((responses) => responses.reduce((acc, obj) => ({ ...acc, ...obj }), {}))
    );
  }
}

// =======================================
// ROOT LOADER FACTORY
// =======================================
const httpLoaderFactory = (http: HttpClient) => {
  return new CustomMultiTranslateLoader(http, [
    { prefix: './assets/i18n/validations/', suffix: '.json' },
    { prefix: './assets/i18n/auth/login/', suffix: '.json' },

  ]);
};

// =======================================
// COMPILER FACTORY
// =======================================
const translateCompilerFactory = () => {
  return new TranslateMessageFormatCompiler();
};


@NgModule()
export class AppTranslateModule {
  static forRoot(): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useFactory: translateCompilerFactory
      }
    });
  }

  static forChild(path: string): ModuleWithProviders<TranslateModule> {
    return TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      compiler: {
        provide: TranslateCompiler,
        useFactory: translateCompilerFactory
      },
      isolate: false, 
      extend: true 
    });
  }
}