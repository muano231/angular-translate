import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { I18NEXT_SERVICE, I18NextModule, I18NextTitle, ITranslationService, defaultInterpolationFormat } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import LocizeApi from 'i18next-locize-backend';

export function appInit(i18next: ITranslationService) {
  return () => i18next
      .use(LocizeApi)
      .use<any>(LanguageDetector)
      .init({
      supportedLngs: ['en', 'de', 'fr'],
      fallbackLng: 'en',
      debug: true,
      returnEmptyString: false,
      saveMissing: true,
      resources: {
        en: {
            translation: {
                "welcome": "Welcome to Your Angular App",
                "descr": "For a guide and recipes on how to configure / customize this project, check out {{-url}}."
            }
        },
        de: {
            translation: {
                "welcome": "Willkommen zu Deiner Angular App",
                "descr": "Eine Anleitung und Rezepte für das Konfigurieren / Anpassen dieses Projekts findest du in {{-url}}."
            }
        },
        fr: {
            translation: {
                "welcome": "Bienvenue sur votre application Angular",
                "descr": "Pour une aide et recette sur le fonctionnement de ce projet, veuillez consulter {{-url}}."
            }
        }
      },
      ns: [
        'translation',
        'validation',
        'error',
      ],
      interpolation: {
        format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
      },
      backend: {
        // loadPath: '../assets/locales/{{lng}}.{{ns}}.json',
        loadPath: '../assets/locales/{{lng}}.{{ns}}.json',
      },
    });
}

export function localeIdFactory(i18next: ITranslationService)  {
  return i18next.language;
}

export const I18N_PROVIDERS = [
{
  provide: APP_INITIALIZER,
  useFactory: appInit,
  deps: [I18NEXT_SERVICE],
  multi: true
},
{
  provide: LOCALE_ID,
  deps: [I18NEXT_SERVICE],
  useFactory: localeIdFactory
}];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    I18NextModule.forRoot()
  ],
  providers: [I18N_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
