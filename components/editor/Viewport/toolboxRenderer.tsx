import { Element, useEditor } from '@craftjs/core';
import { Tooltip } from '@mui/material';
import React from 'react';
import { styled } from 'styled-components';
import { Button } from '../../selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
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




function controlToolRenderer(title:string,element:any, create:any){
  console.log('controlToolRenderer',element.name)
  const elem = element===Text? <Text fontSize="12" textAlign="left" text="Hi there" /> :
               element===Button? <Button text="Button" /> : 
               element===Checkbox? <Checkbox text="Checkbox" /> : 
               element===Select? <Select text="Select" /> :
               element
  return(
    <div
          ref={(ref) => {
            create(ref, elem);
          }}
          style={styles[elem.name]}>

          <Tooltip title={title} placement="right">
            <Item $move>
              <ButtonSvg viewBox="-4 -3 24 24" />
            </Item>
          </Tooltip>
        </div>
  ) 

}

function containerToolRenderer(title:string,element:any, create:any){
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
            <SquareSvg viewBox="-3 -3 24 24" />
          </Item>
        </Tooltip>
      </div>) 

}
export function toolboxRenderer(title: string,element: any, create:any) {
    return(
      element===Container || element===GroupButton ? containerToolRenderer(title,element,create)
      :controlToolRenderer(title,element,create)
    )
    
    
    
        
    
}