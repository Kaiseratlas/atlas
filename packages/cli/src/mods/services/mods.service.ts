import { Injectable, OnModuleInit } from '@nestjs/common';
import { Mod } from '../entities/mod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fg from 'fast-glob';
import path from 'path';
import { Jomini } from 'jomini';
import fs from 'fs';

const MOD_PATH = path.resolve('..', '..', '..', 'mod');

@Injectable()
export class ModsService implements OnModuleInit {
  private parser: Jomini;

  constructor(
    @InjectRepository(Mod)
    private modsRepository: Repository<Mod>,
  ) {}

  async onModuleInit() {
    this.parser = await Jomini.initialize();
  }

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

  async fetchInfo(filepath: string): Promise<Mod> {
    const buffer = await fs.promises.readFile(filepath);
    const data = this.parser.parseText(buffer.toString());
    console.log('data', data);

    const modPath = path.resolve(path.dirname(filepath), '..', data['path']);

    return this.modsRepository.create({
      name: data['name'],
      path: modPath,
      picture: data['picture'],
      supportedVersion: data['supported_version'],
      remoteFileId: data['remote_file_id'],
      version: data['version'],
    });
  }

  async refreshInfo(filepath: string): Promise<Mod> {
    const modInfo = await this.fetchInfo(filepath);
    const mod = await this.modsRepository.findOne({
      where: {
        version: modInfo.version,
        remoteFileId: modInfo.remoteFileId,
      },
    });
    if (!mod) {
      return this.modsRepository.save(modInfo);
    }

    return this.modsRepository.save({ ...mod, ...modInfo });
  }

  async refreshAll(): Promise<Mod[]> {
    const files = await fg('**/*.mod', { cwd: MOD_PATH });

    return Promise.all(
      files.map((file) => this.refreshInfo(path.resolve(MOD_PATH, file))),
    );
  }
}
