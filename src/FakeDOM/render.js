const renderElement = vNode => {
  const { tag, props, childs } = vNode;
  const ffElement = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    ffElement.setAttribute(key, value);
  }

  for (const child of childs) {
    const ffChild = render(child);
    ffElement.appendChild(ffChild);
  }

  return ffElement;
};

const render = vNode => {
  if (typeof vNode === "string") return document.createTextNode(vNode);
  return renderElement(vNode);
};

export default render;
