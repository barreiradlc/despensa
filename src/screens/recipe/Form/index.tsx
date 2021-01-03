import * as React from 'react';
import { Keyboard } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Details from './Details';
import Ingredients from './Ingredients';
import Steps from './Steps';
import { RecipeFormContext, RecipeFormProvider } from '../../../context/RecipeFormContext';
import { FAB } from 'react-native-paper';
import { Dimensions } from 'react-native'
import { cor2 } from '../../../styles/components';
import { useCallback, useContext, useMemo, useState } from 'react';
import KeyBoardListener from '../../../components/listeners/KeyBoardListener';
import { LoadingOverlayContext } from '../../../context/LoadingOverlayContext';

const screenWidth = Math.round(Dimensions.get('window').width);

function Form() {
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation()
    
    navigation.setOptions({
        title: "Nova Receita"
    })
    
    function SendUtils() {
        const { toggleOverlay } = useContext(LoadingOverlayContext)
        const { recipe, sendRecipe, loading } = useContext(RecipeFormContext)
        const [ keyboardShow, setKeyboardShow ] = useState(false)

        const renderSend = useMemo(() => { 
            if(keyboardShow){
                return false
            }
            return true
        },[recipe, keyboardShow])        

        const hideKeyboard = useCallback(() => {
            setKeyboardShow(false)
        }, [])
        
        const showKeyboard = useCallback(() => {
            setKeyboardShow(true)
        }, [])

        React.useEffect(() => {
            toggleOverlay(loading)
        },[loading])

        return(
            <>            
                <FAB
                    label="Enviar receita"
                    visible
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        // margin: 16,
                        // right: screenWidth / 2,
                        backgroundColor: cor2,
                        bottom: renderSend ? 15 : -50,
                    }}
                    color='#fff'
                    icon="food"
                    onPress={sendRecipe}
                />            
                <KeyBoardListener hide={hideKeyboard} show={showKeyboard} />
            </>
        )
    }

    return (
        <RecipeFormProvider>
            
            <Tab.Navigator>
                <Tab.Screen name="Details" component={Details} options={{ title: 'Detalhes' }} />
                <Tab.Screen name="Ingredients" component={Ingredients} options={{ title: 'Ingredientes' }} />
                <Tab.Screen name="Steps" component={Steps} options={{ title: 'Passo a passo' }} />
            </Tab.Navigator>

            <SendUtils />
        </RecipeFormProvider>
    );
}

export default Form