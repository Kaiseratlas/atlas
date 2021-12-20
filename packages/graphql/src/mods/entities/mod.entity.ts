import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CountryTag } from '../../countries/entities/country-tag.entity';
import { Ideology } from '../../ideologies/entities/ideology.entity';
import { CountryFlag } from '../../countries/entities/country-flag.entity';
import { CountryHistory } from '../../countries/entities/country-history.entity';
import { State } from '../../states/models/state.model';

@Entity('mods')
export class Mod {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly path: string;

  @Column()
  readonly picture: string;

  @Column()
  readonly version: string;

  @Column()
  readonly supportedVersion: string;

  @Column('numeric')
  readonly remoteFileId: number;

  @OneToMany(() => CountryTag, (countryTag) => countryTag.mod)
  readonly countryTags: CountryTag[];

  @OneToMany(() => CountryFlag, (countryFlag) => countryFlag.mod)
  readonly countryFlags: CountryFlag[];

  @OneToMany(() => CountryHistory, (countryHistory) => countryHistory.mod)
  readonly countryHistory: CountryHistory[];

  @OneToMany(() => Ideology, (ideology) => ideology.mod)
  readonly ideologies: Ideology[];

  @OneToMany(() => State, (state) => state.mod)
  readonly states: State[];
}
