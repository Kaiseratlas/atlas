import { Column, Entity, OneToMany } from 'typeorm';
import { CountryTag } from '../../countries/models/country-tag.model';
import { Ideology } from '../../ideologies/models/ideology.model';
import { CountryFlag } from '../../countries/models/country-flag.model';
import { CountryHistory } from '../../countries/models/country-history.model';
import { State } from '../../states/models/state.model';
import { Idea } from '../../ideas/models/idea.model';
import { Event } from '../../events/models';
import { Sprite } from '../../sprites/models/sprite.model';
import { FocusTree } from '../../focuses/models/focus-tree.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('mods')
export class Mod extends BaseEntity {
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

  @OneToMany(() => Idea, (idea) => idea.mod)
  readonly ideas: Idea[];

  @OneToMany(() => Event, (event) => event.mod)
  readonly events: Event[];

  @OneToMany(() => Sprite, (sprite) => sprite.mod)
  readonly sprites: Sprite[];

  @OneToMany(() => FocusTree, (focusTree) => focusTree.mod)
  readonly focusTrees: FocusTree[];
}
