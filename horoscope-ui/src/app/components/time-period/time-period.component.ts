import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HoroscopeService} from '../../services/horoscope.service';
import {I18nService} from '../../services/i18n.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-time-period',
  standalone: true,
  imports: [CommonModule, TranslateModule],  // Import CommonModule to use *ngFor
  templateUrl: './time-period.component.html',
  styleUrls: ['./time-period.component.css']
})
export class TimePeriodComponent implements OnInit {
  timePeriods = [
    'daily',
    'weekly',
    'monthly',
    'yearly'
  ];

  selectedPeriod: string = 'daily';  // Default selection
  currentDate: string = ''; // To hold the formatted date

  constructor(
    private horoscopeService: HoroscopeService,
    private i18nService: I18nService,
    private translate: TranslateService
  ) {
    this.horoscopeService.setSelectedPeriod(this.selectedPeriod);
  }

  ngOnInit(): void {
    this.updateCurrentDate();

    // Subscribe to language changes
    this.i18nService.onLanguageChange().subscribe(() => {
      this.updateCurrentDate(); // Update date format when language changes
    });
  }

  selectPeriod(period: string): void {
    this.selectedPeriod = period;
    this.horoscopeService.setSelectedPeriod(period);
  }

  private updateCurrentDate(): void {
    const locale = this.i18nService.getCurrentLanguage() || 'en';
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };

    this.currentDate = new Intl.DateTimeFormat(locale, dateOptions).format(new Date());
  }
}
