import * as React from 'react';
import {useContext, useEffect} from 'react';
import {
  BottomSheetLocalPantryProvider,
  useLocalPantry,
} from '../../components/context/BottomSheetLocalPantryProvider';

import {LocalDataContext} from '../../components/context/LocalDataProvider';
import {PantriesContainer} from '../../components/styles/pantry';
import PantriesComponent from './PantriesComponent';

function List() {
  const {handleOpen} = useLocalPantry();
  const {pantries, refreshPantries} = useContext(LocalDataContext);

  async function init() {
    refreshPantries();
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BottomSheetLocalPantryProvider>
      <PantriesContainer>
        <PantriesComponent editPantry={handleOpen} pantries={pantries} />
      </PantriesContainer>
    </BottomSheetLocalPantryProvider>
  );
}

export default List;
