import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Tooltip from "react-native-walkthrough-tooltip";

interface ToolipInterface {
    content?: any;
    component: any;
}

const TooltipComponent: React.FC<ToolipInterface> = ({ content, component }) => {
    const [showTip, setTip] = useState(false);

  return (
    <Tooltip
    isVisible={showTip}
    content={
    content ||
      <View>
        <Text> Hello i am tooltip for below! I get shown on mount of second screen. </Text>
      </View>
    }
    placement="top"
    onClose={() => setTip(false)}
    useInteractionManager={true} // need this prop to wait for react navigation
    // below is for the status bar of react navigation bar
    // topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
  >
      {component}
    </Tooltip>
  );
}

export default TooltipComponent;
