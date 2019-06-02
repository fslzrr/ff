const createElement = (tag, { props = {}, childs = [] }) => {
  return {
    tag,
    props,
    childs
  };
};

export default createElement;
