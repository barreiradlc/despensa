import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import {View, Text} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import {TipRefInterface} from '../../screens/pantry/PantriesComponent';

interface ToolipInterface
  extends ForwardRefRenderFunction<unknown, ToolipInterface> {
  content?: any;
  component?: any;
  children: any;
}

const TooltipComponent: React.FC<ToolipInterface> = (
  {content, children},
  ref: TipRefInterface,
) => {
  const [showTip, setTip] = useState(false);

  useImperativeHandle(ref, () => ({
    changeTooltip: (value: boolean) => {
      setTip(value);
    },
    toggleTooltip: () => {
      setTip((prevData: boolean) =>
        prevData !== undefined ? !prevData : false,
      );
    },
  }));

  // if(!showTip) return null

  return (
    <Tooltip
      isVisible={showTip}
      content={
        content || (
          <View>
            <Text> Placeholder </Text>
          </View>
        )
      }
      // contentStyle={{ position: 'absolute', top: 20 }}
      placement="bottom"
      onClose={() => setTip(false)}
      // useInteractionManager={true} // need this prop to wait for react navigation
      // below is for the status bar of react navigation bar
      // topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
    >
      {children}
    </Tooltip>
  );
};

export default forwardRef(TooltipComponent);
