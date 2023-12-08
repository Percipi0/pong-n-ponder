import React, { Component } from "react";
import { View, Text } from "react-native";
import { fonts } from "../assets/Themes/fonts";
import { colors } from "../assets/Themes/colors";

export default class Renderer extends Component {
  render() {
    const width = this.props.dimensions[0];
    const height = this.props.dimensions[1];
    const text = this.props.text;

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
      >
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{
            color: colors.background,
            fontFamily: fonts.primary,
            fontSize: 25,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      </View>
    );
  }
}
