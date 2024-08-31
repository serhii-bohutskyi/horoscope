import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {HoroscopeService} from '../../services/horoscope.service';
import {combineLatest} from 'rxjs';
import {ModalComponent} from '../../shared/modal/modal.component';
import {TranslateModule} from "@ngx-translate/core";
import {I18nService} from "../../services/i18n.service";

@Component({
  selector: 'app-horoscope-display',
  templateUrl: './horoscope-display.component.html',
  standalone: true,
  imports: [CommonModule, ModalComponent, TranslateModule],
  styleUrls: ['./horoscope-display.component.css']
})
export class HoroscopeDisplayComponent {
  horoscope: string = '';
  loading: boolean = false;
  error: string = '';

  selectedSign: string | null = null;
  selectedPeriod: string | null = null;

  showModal: boolean = false;

  constructor(private horoscopeService: HoroscopeService,
              protected i18nService: I18nService) {
  }


  ngOnInit(): void {
    combineLatest([
      this.horoscopeService.getSelectedPeriod(),
      this.horoscopeService.getSelectedSign()
    ]).subscribe(([period, sign]) => {
      if (period && sign) {
        this.selectedPeriod = period;
        this.selectedSign = sign;
        this.fetchHoroscope(period, sign);
      }
    });
  }

  private fetchHoroscope(period: string, sign: string): void {
    this.loading = true;
    this.horoscopeService.getHoroscope().subscribe({
      next: (data) => {
        this.horoscope = data;
        this.loading = false;
        this.showModal = true; // Show the modal when data is fetched
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period;
    if (this.selectedSign) {
      this.fetchHoroscope(period, this.selectedSign);
    }
  }

  onSignChange(sign: string): void {
    this.selectedSign = sign;
    if (this.selectedPeriod) {
      this.fetchHoroscope(this.selectedPeriod, sign);
    }
  }

  closeModal(): void {
    this.showModal = false; // Close the modal
  }
}
