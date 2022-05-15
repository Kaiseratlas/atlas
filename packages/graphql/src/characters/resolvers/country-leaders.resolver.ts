import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryLeader } from '../models/country-leader.model';
import { Ideology } from '../../ideologies/models/ideology.model';

@Resolver(() => CountryLeader)
export class CountryLeadersResolver {
  @ResolveField(() => Ideology, { name: 'ideology' })
  getIdeology(@Parent() countryLeader: CountryLeader) {
    return countryLeader.getIdeology();
  }

  @ResolveField(() => String, { name: 'description', nullable: true })
  async getDescription(@Parent() countryLeader: CountryLeader) {
    const l = await countryLeader.getDescription();
    return l?.value;
  }
}
