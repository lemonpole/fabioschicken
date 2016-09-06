import React from 'react';
import { MenuList, MenuItem } from './menu';

const AppetizersDrinksContainer = ( props ) => (
  <div>
    {Object.keys( props.children ).map(
      ( category, i ) => (
        <MenuList title={category} key={i}>
          {props.children[ category ].map(
            ( item, j ) => <MenuItem key={j} {...item} />
          )}
        </MenuList>
      )
    )}
  </div>
);

export default AppetizersDrinksContainer;