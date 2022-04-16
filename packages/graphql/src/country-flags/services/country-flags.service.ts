import { Injectable } from '@nestjs/common';
import { CountryFlag } from '../models/country-flag.model';

@Injectable()
export class CountryFlagsService {
  getUrl(countryFlag: CountryFlag): string {
    const flagUrl = new URL(
      `/flags/${countryFlag['country']['tag']}`,
      'http://localhost:3000',
    );
    if (countryFlag.variant) {
      flagUrl.searchParams.append('variant', countryFlag.variant);
    }

    return flagUrl.toString();
  }
}
