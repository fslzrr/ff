import createElement from "./FakeDOM/createElement";
import render from "./FakeDOM/render";
import mount from "./FakeDOM/mount";
import differences from "./FakeDOM/differences";

const vImage = () =>
  createElement("img", {
    props: {
      style: "max-width: 100px;",
      src:
        "https://cnet2.cbsistatic.com/img/pWj4SUxDX8tHsbH32qbv7JW2WSQ=/940x0/2019/05/22/5d095c91-5727-4651-9c33-938fe3c9f4a3/picard-meme-annoyed.jpg"
    }
  });

const vLi = () =>
  createElement("li", {
    props: {
      style: "margin: 16px;"
    },
    childs: [vImage()]
  });

const vOl = ({ number }) => {
  const listItems = [...Array(number).keys()].map(() => vLi());
  return createElement("ol", {
    props: {
      style: "display: flex; flex-wrap: wrap;"
    },
    childs: [...listItems]
  });
};

const createVApp = ({ count }) => {
  return createElement("div", {
    props: {
      id: "app"
    },
    childs: [String(count), vOl({ number: count })]
  });
};

let count = 0;
let vApp = createVApp({ count });

const ffApp = render(vApp);

let ffRoot = mount(ffApp, document.getElementById("app"));

setInterval(() => {
  count = Math.ceil(Math.random() * 10);
  const vNewApp = createVApp({ count });
  const patch = differences(vApp, vNewApp);
  ffRoot = patch(ffRoot);
  vApp = vNewApp;
}, 1000);
