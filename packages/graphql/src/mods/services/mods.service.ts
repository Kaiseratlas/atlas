import { Injectable } from '@nestjs/common';
import { Mod } from '../entities/mod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModsService {
  constructor(
    @InjectRepository(Mod)
    private modsRepository: Repository<Mod>,
  ) {}

  async findByRemoteId(
    remoteFileId: Mod['remoteFileId'],
    version?: Mod['version'],
  ): Promise<Mod> {
    return this.modsRepository.findOneOrFail({
      order: {
        version: 'DESC',
      },
      where: version
        ? {
            remoteFileId,
            version,
          }
        : {
            remoteFileId,
          },
    });
  }
}
