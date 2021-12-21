import { Injectable } from '@nestjs/common';
import { Mod } from '../models/mod.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ModsService {
  constructor(
    @InjectRepository(Mod)
    private modsRepository: Repository<Mod>,
  ) {}

  async findAll() {
    return this.modsRepository.find({
      order: {
        version: 'DESC',
      },
    });
  }

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
