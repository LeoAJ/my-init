import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import readPkg from 'read-pkg';
import log from 'npmlog';
import writeJsonFile from 'write-json-file';

export const defaultPackageJson = {
  version: "1.0.0",
  main: "index.js",
  license: "MIT"
};

export const MIRC = '.mirc';

export default async function mi() {
  try {

    const mircPath = path.resolve(os.homedir(), MIRC);
    const hasMirc = await fs.pathExistsSync(mircPath);
    let json;

    if (hasMirc) {
      log.info('mi', 'load your .mirc file');
      json = await readPkg.sync(mircPath, { normalize: false });
    } else {
      log.info('mi', 'create .mirc file in your home directory');
      json = { ...defaultPackageJson };
      await writeJsonFile.sync(mircPath, json, { indent: 2 });
    }
      
    log.info('mi', 'create package.json');
    await writeJsonFile.sync(path.resolve(process.cwd(), 'package.json'), json, { indent: 2 });
  } catch (err) {
    log.error('mi', 'Error: ', err);
  }
}
