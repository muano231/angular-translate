import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService, defaultInterpolationFormat } from 'angular-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from '../assets/locales/en.translations.json'
import translationDE from '../assets/locales/de.translations.json'
import translationFR from '../assets/locales/fr.translations.json';
import { TranslateDirective } from './directives/translate.directive'

export function appInit(i18next: ITranslationService) {
  return () => i18next
      .use<any>(LanguageDetector)
      .init({
      supportedLngs: ['en', 'de', 'fr'],
      fallbackLng: 'en',
      debug: true,
      returnEmptyString: false,
      saveMissing: true,
      resources: {
        // vient associer translation avec le fichier de traduction importé par langue
        en: {
            translation: translationEN
        },
        de: {
            translation: translationDE
        },
        fr: {
            translation: translationFR
        }
      },
      ns: 'translation',
      interpolation: {
        format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
      }
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
    AppComponent,
    TranslateDirective
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
