import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { ButtonLabel, Button, ButtonClose, ButtonFixed } from '../styles/form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { forwardRef, useImperativeHandle } from 'react';

function FormBottomSheet({ content }, ref) {
  const sheetRef = React.useRef(null);

  useImperativeHandle(ref, () => ({
    toggle: (action: number) => {
      sheetRef?.current?.snapTo(action)
    }
  }));

  return (
    <BottomSheet
      ref={sheetRef}
      initialSnap={1}
      snapPoints={[450, 0]}
      borderRadius={10}
      renderContent={content}
    />
  );
}


export default forwardRef(FormBottomSheet)