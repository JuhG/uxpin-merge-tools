import { using } from '../../../../../../test/utils/using';
import { isBuiltInWrapper } from '../isBuiltInWrapper';
import { BuiltInWrappers } from '../ComponentWrapper';

describe('isBuiltInWrapper', () => {
  using(Object.values(BuiltInWrappers))
    .describe('when built in wrapper name is provided', (name:string) => {
      it(`should return true for "${name}"`, () => {
        expect(isBuiltInWrapper(name)).toBe(true);
      });
    });

  describe('when not built in wrapper name is provided', () => {
    it('should return false', () => {
      // having
      const name:string = 'fancyWrapperName';

      // when
      // then
      expect(isBuiltInWrapper(name)).toBe(false);
    });
  });
});
