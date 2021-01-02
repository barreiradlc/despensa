import React, { useEffect } from "react";
import { Keyboard, TextInput, StyleSheet } from "react-native";

const KeyBoardListener = ({ hide }) => {

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
  };

  const _keyboardDidHide = () => {
    hide()
  };

  return null;
}

export default KeyBoardListener;