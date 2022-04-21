import { Routes } from '@nestjs/core';
import { CountryFlagsModule } from '../country-flags/country-flags.module';
import { SpritesModule } from '../sprites/sprites.module';
import { CharacterPortraitsModule } from '../character-portraits/character-portraits.module';

export const ROUTES: Routes = [
  {
    path: ':product_name/:product_version/gfx',
    children: [
      {
        path: '/',
        module: CharacterPortraitsModule,
      },
      {
        path: '/',
        module: CountryFlagsModule,
      },
      {
        path: '/',
        module: SpritesModule,
      },
    ],
  },
];
