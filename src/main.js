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

class Story extends FakeDOM.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: randomNumber()
    };
  }

  like() {
    this.setState({ likes: this.state.likes + 1 });
  }

  render() {
    const { name, url } = this.props;
    const { likes } = this.state;
    return (
      <li>
        <button onClick={() => this.like()}>
          {likes}
          <b>❤️</b>
        </button>
        <a href={url}>{name}</a>
      </li>
    );
  }
}

class App extends FakeDOM.Component {
  render() {
    return (
      <div>
        <h1>Stories</h1>
        <ul>
          {this.props.stories.map(story => (
            <Story name={story.name} url={story.url} />
          ))}
        </ul>
      </div>
    );
  }
}

FakeDOM.render(<App stories={stories} />, document.getElementById("app"));
