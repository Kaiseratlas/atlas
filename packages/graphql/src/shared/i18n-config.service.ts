import { I18nOptionsFactory, I18nOptionsWithoutResolvers } from 'nestjs-i18n';
import path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class I18nConfig1Service implements I18nOptionsFactory {
  createI18nOptions(): I18nOptionsWithoutResolvers {
    return {
      fallbackLanguage: 'english',
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    };
  }
}
