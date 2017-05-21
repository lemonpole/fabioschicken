import React from 'react';
import { MenuList, MenuItem } from './menu';

const GeneralMenuContainer = props => (
  <MenuList>
    {props.children.map(
      ( item, i ) => <MenuItem key={i} {...item} />
    )}
  </MenuList>
);

export default GeneralMenuContainer;
