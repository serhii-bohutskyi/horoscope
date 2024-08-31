import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { I18nService } from './i18n.service'; // Import your I18nService to get the current language

@Injectable({
  providedIn: 'root',
})
export class HoroscopeService {
  private readonly CACHE_KEY_PREFIX = 'horoscope_';
  private readonly apiBaseUrl = 'assets/data/horoscopes';  // Base path without language suffix

  private selectedPeriodSubject = new ReplaySubject<string | null>(1);
  private selectedSignSubject = new ReplaySubject<string | null>(1);

  constructor(private http: HttpClient, private i18nService: I18nService) {}

  /**
   * Sets the selected time period.
   * @param period - The time period to set (e.g., 'daily', 'weekly').
   */
  setSelectedPeriod(period: string): void {
    this.selectedPeriodSubject.next(period);
  }

  /**
   * Gets the currently selected time period as an Observable.
   * @returns An Observable containing the currently selected time period.
   */
  getSelectedPeriod(): Observable<string | null> {
    return this.selectedPeriodSubject.asObservable();
  }

  /**
   * Sets the selected zodiac sign.
   * @param sign - The zodiac sign to set (e.g., 'aries', 'taurus').
   */
  setSelectedSign(sign: string): void {
    this.selectedSignSubject.next(sign);
  }

  /**
   * Gets the currently selected zodiac sign as an Observable.
   * @returns An Observable containing the currently selected zodiac sign.
   */
  getSelectedSign(): Observable<string | null> {
    return this.selectedSignSubject.asObservable();
  }

  /**
   * Fetches the horoscope for the currently selected zodiac sign and time period.
   * Caches the result for the current period (day/week/month/year).
   * @returns An Observable containing the horoscope data.
   */
  getHoroscope(): Observable<string> {
    return this.getSelectedSign().pipe(
      switchMap((sign) =>
        this.getSelectedPeriod().pipe(
          switchMap((period) => {
            if (!sign || !period) {
              return of('');  // Handle the case where either sign or period is not set
            }

            const currentLang = this.i18nService.getCurrentLanguage() || 'en';
            const cacheKey = this.getCacheKey(period, sign, currentLang);
            const cachedData = this.getCachedHoroscope(cacheKey);

            if (cachedData) {
              return of(cachedData);  // Return cached data if available
            }

            return this.loadHoroscopeFile(currentLang).pipe(
              map((data) => {
                const horoscopes = data[period];
                const randomHoroscope = this.getRandomHoroscope(horoscopes);
                this.cacheHoroscope(cacheKey, randomHoroscope);
                return randomHoroscope;
              })
            );
          })
        )
      )
    );
  }

  /**
   * Loads the horoscope JSON file based on the current language.
   * @returns An Observable containing the JSON data.
   */
  private loadHoroscopeFile(lang: string): Observable<{ [key: string]: any }> {
    const filePath = `${this.apiBaseUrl}_${lang}.json`;
    return this.http.get<{ [key: string]: any }>(filePath);
  }

  /**
   * Generates a cache key for the given period, sign, and language.
   */
  private getCacheKey(period: string, sign: string, lang: string): string {
    const currentDate = new Date().toISOString().split('T')[0];  // Format: YYYY-MM-DD
    return `${this.CACHE_KEY_PREFIX}${period}_${sign}_${lang}_${currentDate}`;
  }

  /**
   * Retrieves a cached horoscope if it exists and is still valid.
   */
  private getCachedHoroscope(cacheKey: string): string | null {
    return localStorage.getItem(cacheKey);
  }

  /**
   * Caches the horoscope in localStorage.
   */
  private cacheHoroscope(cacheKey: string, horoscope: string): void {
    localStorage.setItem(cacheKey, horoscope);
  }

  /**
   * Returns a random horoscope from the given list.
   */
  private getRandomHoroscope(horoscopes: string[]): string {
    const randomIndex = Math.floor(Math.random() * horoscopes.length);
    return horoscopes[randomIndex];
  }
}
