import { Command } from 'nest-commander';
import { bitmap2vector } from 'bitmap2vector';
import fs from 'fs';

@Command({ name: 'map' })
export class MapCommand {
  async run() {
    const out = await bitmap2vector({
      colorsampling: 0,
      //numberofcolors: 9999999,
      qtres: 0,
      rightangleenhance: false,
      blurradius: 0,
      blurdelta: 20,
      pathomit: 0,
      input: fs.readFileSync(
        '../../../mod/0.19.2/mod/1521695605_kaiserreich/map/provinces.bmp',
      ),
    });
    fs.writeFileSync('output.svg', out.content);
  }
}
