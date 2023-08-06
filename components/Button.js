import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import COLORS from "../constants/colors";

const Button = (props) => {
  const filledBgColor = props.color || COLORS.primary;
  const outlinedColor = COLORS.white;
  const borderColor = props.filled ? COLORS.secondary : COLORS.white;

  const [bgColor, setBgColor] = useState(
    props.filled ? filledBgColor : outlinedColor
  );
  const [textColor, setTextColor] = useState(
    props.filled ? COLORS.white : COLORS.primary
  );

  const handlePressIn = () => {
   setBgColor(props.filled ? outlinedColor : filledBgColor);
   setTextColor( props.filled ? COLORS.secondary : COLORS.white);
  };

  const handlePressOut = () => {
   setBgColor(props.filled ? filledBgColor : outlinedColor);
   setTextColor( props.filled ? COLORS.white : COLORS.secondary);
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
        ...{ borderColor: borderColor},
      }}
      onPress={props.onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={{ fontSize: 18, ...{ color: textColor } }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,    
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Button;
