import React from 'react';

import { NewItemContainer, NewItemTabContainer, NewItemTabLabel } from '../../components/styles/pantry';

// import { Container } from './styles';
interface NewItemTabInterface {
    handleOpen(): void
}

const NewItemTab: React.FC<NewItemTabInterface> = ({ handleOpen }) => {
    return (
        <NewItemContainer
            onPress={handleOpen}
        >
            <NewItemTabContainer>
                <NewItemTabLabel>
                    Adicionar item
                </NewItemTabLabel>
            </NewItemTabContainer>

        </NewItemContainer>
    );
}

export default NewItemTab;