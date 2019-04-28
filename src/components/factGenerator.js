import React from "react";
import axios from "axios";
import Fact from "./fact";

export default class FactGenerator extends React.Component {
  state = {
    fact: null,
    loading: false,
    message: "No facts loaded yet"
  };

  onClick = async () => {
    this.setState({
      loading: true,
      message: "Loading fact..."
    });

    const fact = await axios
      .get("https://api.icndb.com/jokes/random")
      .then(response => response.data.value.joke);

    this.setState({
      loading: false,
      fact
    });
  };

  render() {
    const { fact, message } = this.state;

    return (
      <React.Fragment>
        {!fact ? <div>{message}</div> : <Fact text={fact} />}
        <button onClick={this.onClick}>Load Fact</button>
      </React.Fragment>
    );
  }
}
