import { Component } from "./component";
import createElement from "./createElement";
import { render } from "./render";

const FakeDOM = {
  Component,
  createElement,
  render
};

export default FakeDOM;
