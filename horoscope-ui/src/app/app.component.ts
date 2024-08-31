import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { TimePeriodComponent } from './components/time-period/time-period.component';
import { ZodiacSignComponent } from './components/zodiac-sign/zodiac-sign.component';
import { HoroscopeDisplayComponent } from './components/horoscope-display/horoscope-display.component';
import { I18nService } from './services/i18n.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    TimePeriodComponent,
    ZodiacSignComponent,
    HoroscopeDisplayComponent,
    TranslateModule,
    RouterModule,
    NgClass
  ]
})
export class AppComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    protected i18n: I18nService,
    private meta: Meta,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const lang = params.get('lang');
      this.i18n.updateLanguage(lang);
      this.updateMetaTags();
    });

    const initialLang = this.route.snapshot.queryParamMap.get('lang');
    this.i18n.updateLanguage(initialLang);
    this.updateMetaTags();
  }

  switchLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const language = target.value;

    if (language) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { lang: language },
        queryParamsHandling: 'merge'
      });
    }
  }

  updateMetaTags(): void {
    this.translate.get('META.TITLE').subscribe((title: string) => {
      this.titleService.setTitle(title);

      const tags = [
        { name: 'description', content: this.translate.instant('META.DESCRIPTION') },
        { name: 'keywords', content: this.translate.instant('META.KEYWORDS') },
        { property: 'og:title', content: this.translate.instant('META.OG_TITLE') },
        { property: 'og:description', content: this.translate.instant('META.OG_DESCRIPTION') },
        { property: 'og:type', content: this.translate.instant('META.OG_TYPE') },
        { property: 'og:url', content: this.translate.instant('META.OG_URL') },
        { property: 'og:image', content: this.translate.instant('META.OG_IMAGE') },
      ];

      tags.forEach(tag => {
        if (tag.name) {
          this.meta.updateTag({ name: tag.name, content: tag.content });
        } else if (tag.property) {
          this.meta.updateTag({ property: tag.property, content: tag.content });
        }
      });
    });
  }
}
