import { Component, Inject } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // langue par défaut
  language: string = 'fr';
  // liste des langues supportées
  languages: string[] = ['en', 'de', 'fr'];

  constructor(
    // injecte I18NEXT_SERVICE et ITranslationService dans le constructeur
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {}

  ngOnInit() {
    // detecte et set la langue actuelle
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });
  }

  changeLanguage(lang: string){
    // change la langue avec celle selctionnée
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    // update la langue
    this.language = lang;
  }
}
