import { CommandRunner, Option, Command } from 'nest-commander';
import { Mod } from '../../mods/models/mod.model';
import { ContinentsService } from '../services/continents.service';
import { ModsService } from '../../mods/services/mods.service';
import { ProvincesService } from '../services/provinces.service';
import { MapsService } from '../services/maps.service';
import { SvgService } from '../services/svg.service';

interface IdeologiesCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@Command({ name: 'map' })
export class MapCommand implements CommandRunner {
  constructor(
    private continentsService: ContinentsService,
    private provincesService: ProvincesService,
    private svgService: SvgService,
    private mapsService: MapsService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: IdeologiesCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    //await this.continentsService.refresh(mod);
    await this.provincesService.refresh(mod);
    //await this.mapsService.test(mod);
  }

  async runWithAll() {}

  @Option({
    flags: '-r, --remote-file-id [remoteFileId]',
    description: 'Remote file id',
  })
  parseRemoteFileId(val: string) {
    return val;
  }

  @Option({
    flags: '-v, --version [version]',
    description: 'Mod version',
  })
  parseVersion(val: string) {
    return val;
  }

  @Option({
    flags: '-a, --all',
    description: '',
  })
  parseAll() {
    return true;
  }
}
