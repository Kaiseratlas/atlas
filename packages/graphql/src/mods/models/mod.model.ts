import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CountryTag } from '../../countries/models/country-tag.model';
import { Ideology } from '../../ideologies/models/ideology.model';
import { CountryFlag } from '../../countries/models/country-flag.model';
import { CountryHistory } from '../../countries/models/country-history.model';
import { State } from '../../states/models/state.model';
import { Idea } from '../../ideas/models/idea.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from '../../events/models/event.model';

@Entity('mods')
@ObjectType()
export class Mod {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  @Field()
  readonly name: string;

  @Column()
  readonly path: string;

  @Column()
  readonly picture: string;

  @Column()
  @Field()
  readonly version: string;

  @Column()
  @Field()
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

  @OneToMany(() => Idea, (idea) => idea.mod)
  readonly ideas: Idea[];

  @OneToMany(() => Event, (event) => event.mod)
  readonly events: Event[];
}
