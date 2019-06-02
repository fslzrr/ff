import FakeDOM from "./FakeDOM";

function randomNumber() {
  return Math.ceil(Math.random() * 1000);
}

const stories = [
  {
    name: "Didact introduction",
    url: "http://bit.ly/2pX7HNn",
    likes: randomNumber()
  },
  {
    name: "Rendering DOM elements ",
    url: "http://bit.ly/2qCOejH",
    likes: randomNumber()
  },
  {
    name: "Element creation and JSX",
    url: "http://bit.ly/2qGbw8S",
    likes: randomNumber()
  },
  {
    name: "Instances and reconciliation",
    url: "http://bit.ly/2q4A746",
    likes: randomNumber()
  },
  {
    name: "Components and state",
    url: "http://bit.ly/2rE16nh",
    likes: randomNumber()
  }
];

const appElement = () => (
  <div>
    <ul>{stories.map(s => Story(s))}</ul>
  </div>
);

function Story(story) {
  return (
    <li>
      <button onClick={e => handleLike(story)}>{story.likes} ❤️</button>
      <a href={story.url}>{story.name}</a>
    </li>
  );
}

function handleLike(story) {
  story.likes += 1;
  FakeDOM.render(appElement(), document.getElementById("app"));
}

FakeDOM.render(appElement(), document.getElementById("app"));
