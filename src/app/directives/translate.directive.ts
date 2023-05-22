import { Directive, ElementRef, Input, OnInit, Inject } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective implements OnInit {
  @Input('translation') key: string;
  value: any;

  constructor(
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.value = this.i18NextService.getDataByLanguage(this.i18NextService.language)
    this.elementRef.nativeElement.innerHTML = this.value['translation'][this.key]
  }

}
