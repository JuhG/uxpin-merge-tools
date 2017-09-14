import { ComponentPropsList } from '../../../../../src/serialization/props/ComponentPropsList';
import { serializeTSComponentProps } from '../../../../../src/serialization/props/typescript/serializeTSComponentProps';
import { getTypeScriptComponentPath } from '../../../../utils/resources/getExampleComponentPath';

describe('serializeTSComponentProps', () => {
  describe('providing array of objects describing all properties of the TypeScript component', () => {
    it('serializes functional component with primitive property types', () => {
      // given
      const componentPath:string = getTypeScriptComponentPath('FunctionPrimitivesOnly');
      const expectedProps:ComponentPropsList = [
        {
          description: '',
          isRequired: false,
          name: 'children',
          type: { name: 'string', structure: {} },
        },
        {
          description: '',
          isRequired: true,
          name: 'id',
          type: { name: 'string', structure: {} },
        },
        {
          description: '',
          isRequired: false,
          name: 'action',
          type: { name: 'number', structure: {} },
        },
        {
          description: '',
          isRequired: false,
          name: 'hidden',
          type: { name: 'boolean', structure: {} },
        },
      ];

      // when
      return serializeTSComponentProps(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps).toEqual(expectedProps);
      });
    });

    it('serializes class component with enum property types', () => {
      // given
      const componentPath:string = getTypeScriptComponentPath('ClassEnumTypes');
      const expectedProps:ComponentPropsList = [
        {
          description: '',
          isRequired: false,
          name: 'children',
          type: { name: 'node', structure: {} },
        },
        {
          description: '',
          isRequired: true,
          name: 'appearance',
          type: {
            name: 'union',
            structure: {
              elements: [
                { name: 'literal', structure: { value: 'secondary' } },
                { name: 'literal', structure: { value: 'primary' } },
                { name: 'literal', structure: { value: 'link' } },
              ],
            },
          },
        },
      ];

      // when
      return serializeTSComponentProps(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps).toEqual(expectedProps);
      });
    });

    it('serializes class component with default property values', () => {
      // given
      const componentPath:string = getTypeScriptComponentPath('ClassWithDefaults');
      const expectedProps:ComponentPropsList = [
        {
          defaultValue: { value: 'Submit' },
          description: '',
          isRequired: false,
          name: 'value',
          type: { name: 'string', structure: {} },
        },
        {
          defaultValue: { value: 'secondary' },
          description: '',
          isRequired: true,
          name: 'appearance',
          type: {
            name: 'union',
            structure: {
              elements: [
                { name: 'literal', structure: { value: 'secondary' } },
                { name: 'literal', structure: { value: 'primary' } },
                { name: 'literal', structure: { value: 'link' } },
              ],
            },
          },
        },
      ];

      // when
      return serializeTSComponentProps(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps).toEqual(expectedProps);
      });
    });

    it('component with interface property type', () => {
      // given
      const componentPath:string = getTypeScriptComponentPath('ClassInterfaceTypes');
      const expectedProps:ComponentPropsList = [
        {
          description: '',
          isRequired: true,
          name: 'item',
          type: {
            name: 'shape',
            structure: {
              param1: { name: 'string', structure: {} },
              param2: { name: 'string', structure: {} },
              param3: {
                name: 'shape',
                structure: {
                  name: { name: 'string', structure: {} },
                },
              },
            },
          },
        },
      ];

      // when
      return serializeTSComponentProps(componentPath).then((serializedProps) => {
        // then
        expect(serializedProps).toEqual(expectedProps);
      });
    });
  });
});
