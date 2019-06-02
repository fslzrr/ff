import render from "./render";

const differences = (vCurrNode, vNewNode) => {
  // GENERAL
  // replace nodes
  const replaceNode = ffNode => {
    const ffNewNode = render(vNewNode);
    ffNode.replaceWith(ffNewNode);
    return ffNewNode;
  };

  // remove nodes
  const removeNode = ffNode => {
    ffNode.remove();
    return undefined;
  };

  // do nothing
  const doNothing = ffNode => undefined;

  // STRING NODE
  // node is string
  if (typeof vCurrNode === "string" || typeof vNewNode === "string") {
    if (vCurrNode !== vNewNode) {
      const patch = replaceNode;
      return patch;
    }

    const patch = doNothing;
    return patch;
  }

  // ELEMENT NODE
  // removed
  if (vNewNode === undefined) {
    const patch = removeNode;
    return patch;
  }

  // changed
  if (vCurrNode.tag !== vNewNode.tag) {
    const patch = replaceNode;
    return patch;
  }

  const patchProps = differencesProps(vCurrNode.props, vNewNode.props);
  const patchChilds = differencesChilds(vCurrNode.childs, vNewNode.childs);

  const patch = ffNode => {
    patchProps(ffNode);
    patchChilds(ffNode);
    return ffNode;
  };

  return patch;
};

const differencesProps = (currProps, newProps) => {
  let patches = [];

  // set new props
  for (const [key, value] of Object.entries(newProps)) {
    patches.push(ffNode => {
      ffNode.setAttribute(key, value);
      return ffNode;
    });
  }

  // remove deleted props
  for (const key in currProps) {
    if (!(key in newProps)) {
      patches.push(ffNode => {
        ffNode.removeAttribute(key);
        return ffNode;
      });
    }
  }

  const patchProps = ffNode => {
    for (const patch of patches) {
      patch(ffNode);
    }
  };

  return patchProps;
};

const differencesChilds = (vCurrChilds, vNewChilds) => {
  const zip = (xs, ys) => {
    let zipped = [];
    for (let i = 0; i < Math.min(xs.length, ys.length); i += 1) {
      zipped.push([xs[i], ys[i]]);
    }
    return zipped;
  };

  let childPatches = [];
  for (const [vCurrChild, vNewChild] of zip(vCurrChilds, vNewChilds)) {
    childPatches.push(differences(vCurrChild, vNewChild));
  }

  const additionalPatches = [];
  const additionalVNewChilds = vNewChilds.slice(vCurrChilds.length);
  debugger;
  for (const vNewChild of additionalVNewChilds) {
    const appendChild = ffNode => {
      const ffNewChild = render(vNewChild);
      ffNode.appendChild(ffNewChild);
      return ffNode;
    };
    additionalPatches.push(appendChild);
  }

  const patchChilds = ffParent => {
    for (const [patch, ffChild] of zip(childPatches, ffParent.childNodes)) {
      patch(ffChild);
    }
    for (const patch of additionalPatches) {
      patch(ffParent);
    }
    return ffParent;
  };

  return patchChilds;
};

export default differences;
