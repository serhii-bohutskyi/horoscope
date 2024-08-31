import {Injectable, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private defaultLanguage = 'en';
  private currentLanguageSubject = new BehaviorSubject<string>(this.defaultLanguage);

  fontClass = '';

  private languageFontMap: Record<string, string> = {
    'ru': 'font-plexmono',
    'en': 'font-cinzel-serif',
    'es': 'font-cinzel-serif',
  };

  constructor(private translate: TranslateService) {
    this.translate.use(this.defaultLanguage);
    this.fontClass = this.languageFontMap[this.defaultLanguage];
  }

  updateLanguage(lang: string | null): void {
    if (lang && this.currentLanguageSubject.value !== lang) {
      this.currentLanguageSubject.next(lang);
      this.translate.use(lang);
      console.log('Language selected:', lang);
      this.fontClass = this.languageFontMap[lang];
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  onLanguageChange() {
    return this.currentLanguageSubject.asObservable();
  }

  getDefaultLanguage(): string {
    return this.defaultLanguage;
  }

}
