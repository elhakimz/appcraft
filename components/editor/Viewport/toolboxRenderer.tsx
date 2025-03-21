import { Element } from '@craftjs/core';
import { Tooltip } from '@mui/material';
import React from 'react';
import { Button } from '../../selectors/Button';
import { Container, Rating, Slider, Switch, ToggleButtonGroup, TransferList, Card } from '../../selectors';
import { Text } from '../../selectors';
import { Video } from '../../selectors/Video';
import { GroupButton } from '../../selectors/GroupButton';
import { Item } from './Toolbox';
import ButtonSvg from '../../../public/icons/toolbox/button.svg';
import SquareSvg from '../../../public/icons/toolbox/rectangle.svg';
import TypeSvg from '../../../public/icons/toolbox/text.svg';
import YoutubeSvg from '../../../public/icons/toolbox/video-line.svg';
import { Toolbox } from './Toolbox';
import { Checkbox } from '../../selectors/Checkbox';
import { Select } from 'components/selectors/Select';
// Add import
import { GroupRadio } from '../../selectors/GroupRadio';
import { getIcon } from 'utils/iconUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles={
 'GroupButton':{

 },
'Container': {
    background: { r: 78, g: 78, b: 78, a: 1 },
    color: { r: 0, g: 0, b: 0, a: 1 },
    height: "300px",
    width: "300px"
},
 'Text':{

 },
}



// Update the icons object
const icons = {
  "Text": "Type",
  "Button": "faStop",
  "Checkbox": "faSquareCheck",
  "Select": "faSquareCaretDown",
  "GroupRadio": "faCircleDot",
  "Rating": "faStar",
  "Container": "faSquare",
  "ToggleButtonGroup": "faSquare",
  "Slider": "faSliders", 
  "Switch": "faToggleOn" ,
  "TransferList": "faListAlt", 
  "Card": "faAddressCard" // Add this line
};

// Update the controlToolRenderer function
function controlToolRenderer(title:string, element:any, create:any) {
  const elem = element === Text ? <Text fontSize="12" textAlign="left" text="Hi there" /> :
               element === Button ? <Button text="Button" /> :
               element === Checkbox ? <Checkbox label="Checkbox" /> :
               element === Select ? <Select label="Select" /> :
               element === GroupRadio ? <GroupRadio label="Radio Group" /> : 
               element === Rating ? <Rating /> : 
               element === ToggleButtonGroup ? <ToggleButtonGroup /> :
               element === Slider ? <Slider /> :
               element === Switch ? <Switch /> :
               element;
  
  const iconObject=  getIcon(icons[element.craft.displayName])
  return(
    <div 
          ref={(ref) => {
            create(ref, elem);
          }}
          style={styles[element.craft.displayName]}>
          <Tooltip title={title} placement="right">
            <Item $move>              
              <FontAwesomeIcon icon={iconObject} style={{ fontSize: '8px',stroke: 'currentColor', strokeWidth: 1  }}/>
            </Item>
          </Tooltip>
        </div>
  ) 

}

function containerToolRenderer(title:string,element:any, create:any){
  const iconObject=  getIcon(icons[element.craft.displayName])

  return(<div
        ref={(ref) => {
          create(
            ref,
            <Element
              canvas
              is={element}
              background={{ r: 128, g: 128, b: 12, a: 1 }}
              color={{ r: 0, g: 0, b: 0, a: 1 }}
              height="300px"
              width="300px"
            
            ></Element>
          );
        }}
        style={{
          borderBottom: '1px solid #ccc', // Add bottom border
          borderRight: '1px solid #ccc', // Add right border
        }}
      >
        <Tooltip title={title} placement="right">
          <Item $move>
          <FontAwesomeIcon icon={iconObject}  style={{ fontSize: '8px', stroke: 'currentColor', strokeWidth: 1  }} />
          </Item>
        </Tooltip>
      </div>) 

}
export function toolboxRenderer(title: string,element: any, create:any) {
    return(
      element===Container || element===GroupButton || element === Card || element ===TransferList ? containerToolRenderer(title,element,create)
      :controlToolRenderer(title,element,create)
    )

    
}