import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Product } from '../products/models/product.model';
import { Game } from '../games/models/game.model';
import { ProductVersion } from '../products/models/product-version.model';

export default class KrNsbSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const [nsb, kr] = await Promise.all([
      connection.getRepository(Game).save({
        id: '6183951a-055c-4773-80b2-017f596e714d',
        version: '1.11.5',
        path: '/srv/sftp/sftp-user/Hearts of Iron IV No Step Back',
        customModPath: '/srv/sftp/sftp-user/mod_nsb',
      }),
      connection.getRepository(Product).save({
        id: 'a3175b8b-197e-4a11-a417-f5cb30a80ba6',
        alias: 'kaiserreich',
        title: 'Kaiserreich',
        description: 'TODO',
        logoUrl:
          'https://styles.redditmedia.com/t5_2wgr5/styles/communityIcon_ilffqpdo6z741.png?width=256&s=0075b6bbdbac97b7e2004511057c987923e8c1a7',
      }),
    ]);
    await connection.getRepository(ProductVersion).save({
      id: 'a94fc6dd-708c-4781-95ae-4cefa594c5ce',
      version: '0.20.1',
      dependencies: ['Kaiserreich: Русская Локализация [Beta]', 'Kaiserreich'],
      game: nsb,
      product: kr,
    });
  }
}
