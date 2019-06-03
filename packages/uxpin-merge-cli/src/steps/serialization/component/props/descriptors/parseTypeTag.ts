import { ComponentPropertyCustomDescriptors, CustomControlTypeName } from '../../implementation/ComponentPropertyDefinition';

type ParseResult = Pick<ComponentPropertyCustomDescriptors, 'customType'> | undefined;

export function parseTypeTag(value:string):ParseResult {
  if (!value) {
    return;
  }

  const typeMatch:RegExpMatchArray | null = value.match(/[a-z]+/);
  if (!typeMatch) {
    return;
  }

  switch (typeMatch[0]) {
    case CustomControlTypeName.CodeEditor:
    case CustomControlTypeName.Input:
    case CustomControlTypeName.Interactions:
    case CustomControlTypeName.Number:
    case CustomControlTypeName.Select:
    case CustomControlTypeName.Switcher: {
      return parseCustomType(typeMatch[0] as CustomControlTypeName);
    }

    case CustomControlTypeName.Textfield: {
      return parseTextfieldType(value);
    }

    default: {
      return;
    }
  }
}

const TEXTFIELD_REGEX:RegExp = /(^textfield$|^textfield(\(([\d])?\)))/;
const TEXTFIELD_DEFAULT_ROWS:number = 3;
const ROWS_MATCH_ID:number = 3;

function parseTextfieldType(value:string):ParseResult {
  const match:RegExpMatchArray | null = value.match(TEXTFIELD_REGEX);
  if (!match) {
    return;
  }

  const rows:number = isNaN(parseInt(match[ROWS_MATCH_ID], 10))
    ? TEXTFIELD_DEFAULT_ROWS
    : parseInt(match[ROWS_MATCH_ID], 10);

  return {
    customType: {
      name: CustomControlTypeName.Textfield,
      structure: {
        rows: Math.max(rows, 1),
      },
    },
  };
}

function parseCustomType(name:CustomControlTypeName):ParseResult {
  return {
    customType: {
      name,
      structure: {},
    },
  };
}
