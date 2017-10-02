import { relative, resolve } from 'path';

import { LIBRARY_OUTPUT_PATH } from '../../../../../src/config/webpack.config';
import { runUXPinCodeCommand } from '../../../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Building repos/polaris design system', () => {
  it('contains Button component', () => {
    const options:string = [
      '--target "commonjs"',
      '--webpack-config "../../configs/polaris-webpack.config.js"',
    ].join(' ');

    // when
    return runUXPinCodeCommand('resources/repos/polaris', options)
      .then(() => {
        const path:string = relative(__dirname, resolve('test/resources/repos/polaris', LIBRARY_OUTPUT_PATH));
        const components:any = require(path);
        const { Button } = components;

        // then
        expect(Button).toBeInstanceOf(Function);
      });
  });
});
