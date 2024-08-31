import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HoroscopeService} from '../../services/horoscope.service';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-zodiac-sign',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './zodiac-sign.component.html',
  styleUrls: ['./zodiac-sign.component.css']
})
export class ZodiacSignComponent {
  zodiacSigns = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces'
  ];

  selectedSign: string | null = null;

  constructor(private horoscopeService: HoroscopeService) {
  }

  selectSign(sign: string): void {
    this.selectedSign = sign;
    this.horoscopeService.setSelectedSign(sign);
  }
}
