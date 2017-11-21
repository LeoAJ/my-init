import os from 'os';
import fs from 'fs-extra';
import writeJsonFile from 'write-json-file';
import readPkg from 'read-pkg';
import mi, { MIRC, defaultPackageJson } from '../mi';

describe('- mi CLI -', () => {
  const mockHomeDir = '/user/home/';
  beforeEach(() => {  
    os.homedir = jest.fn().mockImplementation(_ => mockHomeDir);
    writeJsonFile.sync = jest.fn();
  });

  test('if no mirc should create one', async () => {
    fs.pathExistsSync = jest.fn().mockImplementation(_ => false);
    await mi();
    expect(writeJsonFile.sync).toHaveBeenCalledWith(
      `${mockHomeDir}${MIRC}`,
      { ...defaultPackageJson },
      { indent: 2 }
    );
  });

  test('if mirc existed, should create package.json base on that', async () => {
    fs.pathExistsSync = jest.fn().mockImplementation(_ => true);
    readPkg.sync = jest.fn().mockImplementation(_ => {});
    await mi();
    expect(writeJsonFile.sync).toHaveBeenCalled();
  });
});
