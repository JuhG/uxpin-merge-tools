import { isArray } from 'lodash';
import { ComponentPresetElement, PresetElementReference } from './ComponentPreset';
import { AnySerializedElement, JSXSerializedElement } from './jsx/JSXSerializationResult';

interface MapChildrenResult {
  children?:PresetElementReference[] | string;
}

interface ParsePresetDataResult {
  [id:string]:ComponentPresetElement;
}

export function parsePresetData(element:AnySerializedElement, elements:ParsePresetDataResult):ParsePresetDataResult {
  if (!isJSXSerializedElement(element)) {
    return elements;
  }

  const { key, ...props } = element.props;
  elements[key] = {
    name: element.name,
    props: {
      ...props,
      ...mapChildren(element),
    },
  };

  if (isArray(element.children)) {
    element.children.forEach((child) => parsePresetData(child, elements));
  }

  return elements;
}

function mapChildren(element:AnySerializedElement):MapChildrenResult {
  if (!isJSXSerializedElement(element) || !isArray(element.children)) {
    return {};
  }

  const { children } = element;
  if (children.length === 1 && typeof children[0] === 'string') {
    return { children: children[0] as string };
  }
  return {
    children: children.filter(isJSXSerializedElement).map(getPresetElementReference),
  };
}

function getPresetElementReference({ props: { key } }:JSXSerializedElement):PresetElementReference {
  return { uxpinPresetElementId: key };
}

function isJSXSerializedElement(element:AnySerializedElement):element is JSXSerializedElement {
  return !!element && typeof element !== 'string';
}
