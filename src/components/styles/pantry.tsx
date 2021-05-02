import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import {cor1, cor2, cor3, cor4, cor5, cor6} from '../../constants/CORES';

export const PantriesContainer = styled.View`
  flex: 1;
  flex-direction: column;
  margin-top: ${getStatusBarHeight() + 12}px;
`;
// OPTIONS
export const ItemContainer = styled.TouchableOpacity`
  margin: 0px 16px;
  padding: 8px 4px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (!props.invert ? cor1 : 'transparent')};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const ItemTab = styled.View``;

export const ItemTabLabel = styled.Text`
  color: ${cor5};
`;
export const NewItemContainer = styled.TouchableOpacity`
  margin-horizontal: 32px;
  margin-bottom: 4px;
  padding: 12px 8px;
  align-items: center;
  justify-content: center;
  background-color: ${cor3};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const NewItemTabContainer = styled.View``;

export const NewItemTabLabel = styled.Text`
  color: ${cor5};
`;

export const ProvisionListContainer = styled.View``;

export const ProvisionContainer = styled.TouchableOpacity`
  margin-horizontal: 32px;
  margin-bottom: 4px;
  padding: 12px 8px;
  align-items: center;
  justify-content: center;
  background-color: ${cor3};
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const ProvisionTabLabel = styled.Text`
  color: ${cor5};
`;
