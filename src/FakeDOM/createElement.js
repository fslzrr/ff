import { TEXT_ELEMENT } from "./utils";

function createElement(type, propsParam, ...childrenParam) {
  const hasChildren = childrenParam.length > 0;
  const rawChildren = hasChildren ? [].concat(...childrenParam) : [];

  const children = rawChildren
    .filter(byExistingChild)
    .map(transformIfTextChild);

  const props = { ...propsParam, children };
  return { type, props };
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

function byExistingChild(child) {
  return child != null && child !== false;
}

function transformIfTextChild(child) {
  return child instanceof Object ? child : createTextElement(child);
}

export default createElement;
