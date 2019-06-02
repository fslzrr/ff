import { TEXT_ELEMENT } from "./utils";

let rootInstance = null;

function render(element, container) {
  const prevInstance = rootInstance;
  const nextInstance = reconcile(container, prevInstance, element);
  rootInstance = nextInstance;
}

function reconcile(parentDom, instance, element) {
  if (instance == null) {
    // create instance
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }
  if (element == null) {
    // remove instance
    parentDom.removeChild(instance.dom);
    return null;
  }
  if (instance.element.tagName === element.tagName) {
    // update instance
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childrenInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  }
  // replace instance
  const newInstance = instantiate(element);
  parentDom.replaceChild(newInstance.dom, instance.dom);
  return newInstance;
}

function reconcileChildren(instance, element) {
  const { dom, childrenInstances } = instance;
  const nextChildrenElements = element.props.children || [];
  const newChildrenInstances = [];

  const count = Math.max(childrenInstances.length, nextChildrenElements.length);
  for (let i = 0; i < count; i++) {
    const childInstance = childrenInstances[i];
    const nextChildElement = nextChildrenElements[i];
    const newChildInstance = reconcile(dom, childInstance, nextChildElement);
    newChildrenInstances.push(newChildInstance);
  }

  return newChildrenInstances.filter(childInstance => childInstance != null);
}

function instantiate(element) {
  const { tagName, props } = element;

  const isTextElement = tagName === TEXT_ELEMENT;
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(tagName);

  updateDomProperties(dom, [], props);

  const childrenElements = props.children || [];
  const childrenInstances = childrenElements.map(instantiate);
  const childrenDoms = childrenInstances.map(
    childInstance => childInstance.dom
  );
  childrenDoms.forEach(childDom => dom.appendChild(childDom));

  const instance = { element, dom, childrenInstances };
  return instance;
}

function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = name => name.startsWith("on");
  const isAttribute = name => !isEvent(name) && name !== "children";

  // remove events and attributes
  const prevPropsKeys = Object.keys(prevProps);
  prevPropsKeys.filter(isEvent).forEach(event => {
    const eventName = event.toLowerCase().substring(2);
    dom.removeEventListener(eventName, prevProps[event]);
  });
  prevPropsKeys.filter(isAttribute).forEach(attribute => {
    dom[attribute] = null;
  });

  // add events and attributes
  const nextPropsKeys = Object.keys(nextProps);
  nextPropsKeys.filter(isEvent).forEach(event => {
    const eventName = event.toLowerCase().substring(2);
    dom.addEventListener(eventName, nextProps[event]);
  });
  nextPropsKeys.filter(isAttribute).forEach(attribute => {
    dom[attribute] = nextProps[attribute];
  });
}

export default render;
