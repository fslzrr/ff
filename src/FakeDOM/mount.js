const mount = (ffNode, ffTarget) => {
  ffTarget.replaceWith(ffNode);
  return ffNode;
};

export default mount;
