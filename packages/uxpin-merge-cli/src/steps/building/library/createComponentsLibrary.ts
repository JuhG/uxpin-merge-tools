import { writeFile } from 'fs';
import { ensureDir } from 'fs-extra';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { LIBRARY_INPUT_PATH, TEMP_DIR_PATH } from '../config/getConfig';
import { getFileString } from './getFileString';

export function createComponentsLibrary(componentInfos:ComponentDefinition[], wrapperPath?:string):Promise<string> {
  return new Promise((resolve, reject) => {
    ensureDir(TEMP_DIR_PATH)
      .then(() => writeFile(LIBRARY_INPUT_PATH, getFileString(componentInfos, wrapperPath), 'utf8', (error) => {
        if (error) {
          return reject(error.message);
        }

        resolve(LIBRARY_INPUT_PATH);
      }));
  });
}