import React, { Component } from "react";
import { View } from "react-native";

export default class Renderer extends Component {
  render() {
    const width = this.props.dimensions[0];
    const height = this.props.dimensions[1];

    return (
      <View
        style={{
          position: "absolute",
          top: this.props.body.position.y - height / 2,
          left: this.props.body.position.x - width / 2,
          width: width,
          height: height,
          backgroundColor: this.props.color,
        }}
      />
    );
  }
}
