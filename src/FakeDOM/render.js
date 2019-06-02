import { TEXT_ELEMENT } from "./utils";

function render(nodeFAKE, parentDOM) {
  const { tagName, props } = nodeFAKE;

  // Create DOM element
  const isTextElement = tagName === TEXT_ELEMENT;
  const nodeDOM = isTextElement
    ? document.createTextNode("")
    : document.createElement(tagName);

  // Add event listeners
  const isListener = name => name.startsWith("on");
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      nodeDOM.addEventListener(eventType, props[name]);
    });

  // Set properties
  const isAttribute = name => !isListener(name) && name !== "children";
  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      nodeDOM[name] = props[name];
    });

  // Render children
  const childElements = props.children || [];
  childElements.forEach(childElement => render(childElement, nodeDOM));

  // Append to parent
  parentDOM.appendChild(nodeDOM);
}

export default render;
