import FakeDOM from "./FakeDOM";

function Story({ name, url }) {
  const likes = Math.ceil(Math.random() * 1000);
  return (
    <li>
      <button>{likes} ❤️</button>
      <a href={url}>{name}</a>
    </li>
  );
}

const stories = [
  { name: "Didact introduction", url: "http://bit.ly/2pX7HNn" },
  { name: "Rendering DOM elements ", url: "http://bit.ly/2qCOejH" },
  { name: "Element creation and JSX", url: "http://bit.ly/2qGbw8S" },
  { name: "Instances and reconciliation", url: "http://bit.ly/2q4A746" },
  { name: "Components and state", url: "http://bit.ly/2rE16nh" }
];

const appElement = (
  <div>
    <ul>{stories.map(s => Story(s))}</ul>
  </div>
);

console.log(appElement);

FakeDOM.render(appElement, document.getElementById("app"));
