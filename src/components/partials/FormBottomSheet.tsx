import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import { ButtonLabel, Button, ButtonClose, ButtonFixed } from '../styles/form';
import Icon from 'react-native-vector-icons/FontAwesome';

function FormBottomSheet() {
    const renderContent = () => (
      <View
        style={{
          backgroundColor: 'white',
          padding: 16,
          height: 450,
        }}
      >      
      <View 
        style={{
            bottom: 20,
            flexDirection:'row',
            alignContent:'center',
            justifyContent: 'center'
        }}
      >
        <ButtonClose
            title="Close Bottom Sheet"
            onPress={() => sheetRef?.current?.snapTo(1)}
          >
              <Icon name='times'/>
          </ButtonClose>
      </View>
      </View>
    );
  
    const sheetRef = React.useRef(null);
  
    return (
      <>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingVertical: 10
          }}
        >

            <ButtonFixed
                onPress={() => sheetRef?.current?.snapTo(0)}    
            >
                <ButtonLabel>Criar nova despensa</ButtonLabel>
            </ButtonFixed>
  
        </View>
        <BottomSheet        
          ref={sheetRef}
          initialSnap={1}
          snapPoints={[450, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
      </>
    );
  }


  export default FormBottomSheet