import React, { Component } from "react";
import "./App.css";
import Title from "../Title";
import Input from "../Input";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title />
        <Input />
      </div>
    );
  }
}

export default App;
