import { relative, resolve } from 'path';

import { LIBRARY_OUTPUT_PATH } from '../../../../../src/steps/building/config/getConfig';
import { runUXPinMergeCommand } from '../../../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

xdescribe('Building repos/nordnet-ui-kit design system', () => {
  describe('with required user webpack config', () => {
    let components:any;
    let consoleOutput:string;

    beforeAll(() => {
      const params:string[] = [
        'push',
        '--webpack-config "../../configs/nordnet-ui-kit-webpack.config.js"',
        '--config="../../configs/nordnet-ui-kit-uxpin.config.js"',
        '--wrapper "./documentation/wrapper.jsx"',
      ];

      return runUXPinMergeCommand({ cwd: 'resources/repos/nordnet-ui-kit', params })
        .then((output) => {
          const path:string = relative(__dirname, resolve('test/resources/repos/nordnet-ui-kit', LIBRARY_OUTPUT_PATH));
          components = require(path);
          consoleOutput = output;
        });
    });

    it('contains Button component', () => {
      // when
      const { Button } = components;
      // then
      expect(Button).toBeInstanceOf(Function);
    });

    it('contains custom wrapper', () => {
      // when
      const { Wrapper } = components;
      // then
      expect(Wrapper).toBeInstanceOf(Function);
    });

    it('prints warnings without stack traces to the console', () => {
      // then
      expect(consoleOutput).toMatchSnapshot();
    });
  });

  describe('without required user webpack config', () => {
    it('throws an error', () => {
      return runUXPinMergeCommand({ cwd: 'resources/repos/nordnet-ui-kit', params: ['push'] })
        .then((output) => {
          expect(output).toContain('ERROR:');
          expect(output).toContain('Module parse failed');
        });
    });
  });
});