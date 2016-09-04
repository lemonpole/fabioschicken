import React from 'react';
import MenuList from './MenuList';
import MenuItem from './MenuItem';

const GeneralMenuContainer = ( props ) => (
  <MenuList>
    {props.children.map(
      ( item, i ) => <MenuItem key={i} {...item} />
    )}
  </MenuList>
);

export default GeneralMenuContainer;