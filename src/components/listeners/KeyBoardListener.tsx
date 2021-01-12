import { useEffect } from "react";
import { Keyboard } from "react-native";

const KeyBoardListener = ({ hide, show }) => {

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

    console.debug("SHOW")

    show()
  };
  
  const _keyboardDidHide = () => {

    hide()
  };

  return null;
}

export default KeyBoardListener;