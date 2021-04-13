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
    toggleTooltip: () => {
      setTip((prevData: boolean) => !prevData)
    }
  }));

  // if(!showTip) return null

  return (
    <Tooltip
      isVisible={showTip}
      content={
        content ||
        <View>
          <Text> Editar </Text>
          <Text> Deletar </Text>
          <Text> Cancelar </Text>
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

export default  forwardRef(TooltipComponent);
