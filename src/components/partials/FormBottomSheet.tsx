import * as React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  forwardRef,
  LegacyRef,
  MutableRefObject,
  useImperativeHandle,
} from 'react';
import BottomSheetBehavior from 'reanimated-bottom-sheet';

interface IToggleBottomSheetRef extends LegacyRef<BottomSheetBehavior> {
  snapTo(value: number): void;
}

function FormBottomSheet({content}, ref) {
  const sheetRef = React.useRef<IToggleBottomSheetRef>(
    {} as IToggleBottomSheetRef,
  );

  useImperativeHandle(ref, () => ({
    toggle: (action: number) => {
      console.log(action);
      sheetRef.current.snapTo(action);
    },
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

export default forwardRef(FormBottomSheet);
