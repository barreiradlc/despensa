import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Tooltip from "react-native-walkthrough-tooltip";

interface ToolipInterface {
  content?: any;
  component?: any;
}

const TooltipComponent: React.FC<ToolipInterface> = ({ content, children }, ref) => {
  const [showTip, setTip] = useState(false);

  useImperativeHandle(ref, () => ({
    changeTooltip: (value: boolean) => {
      setTip(value)
    },
    toggleTooltip: (value?: boolean) => {
      setTip((prevData: boolean) => prevData !== undefined ? !prevData : false)
    }
  }));

  // if(!showTip) return null

  return (
    <Tooltip
      isVisible={showTip}
      content={
        content ||
        <View>
          <Text> Placeholder </Text>
        </View>
      }
      // contentStyle={{ position: 'absolute', top: 20 }}
      placement='bottom'
      onClose={() => setTip(false)}
    // useInteractionManager={true} // need this prop to wait for react navigation
    // below is for the status bar of react navigation bar
    // topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
    >
      {children}
    </Tooltip>
  );
}

export default forwardRef(TooltipComponent);
