import { Element, useEditor } from '@craftjs/core';
import { Tooltip } from '@mui/material';
import React from 'react';
import { styled } from 'styled-components';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import ButtonSvg from '../../../public/icons/toolbox/button.svg';
import SquareSvg from '../../../public/icons/toolbox/rectangle.svg';
import TypeSvg from '../../../public/icons/toolbox/text.svg';
import YoutubeSvg from '../../../public/icons/toolbox/video-line.svg';
import { Button } from '../../selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';
import { GroupButton } from '../../selectors/GroupButton';
import { toolboxRenderer } from './toolboxRenderer';
import { Checkbox } from '../../selectors/Checkbox';
import { Select } from 'components/selectors/Select';
import { GroupRadio } from 'components/selectors/GroupRadio';
import { Avatar, Card, Rating, Slider, Switch, ToggleButtonGroup, TransferList } from 'components/selectors';
import { GroupButtonSettings } from 'components/selectors/GroupButton/GroupButtonSettings';

const ToolboxDiv = styled.div<{ $enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.$enabled ? `width: 0;` : '')}
  ${(props) => (!props.$enabled ? `opacity: 0;` : '')}
`;

export const Item = styled.a<{ $move?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    width: 28px;
    height: 28px;
    fill: #707070;
  }
  ${(props) =>
    props.$move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      $enabled={enabled && enabled}
      className="toolbox transition w-28 h-full flex flex-col bg-white"
    >
      <div 
       style={{
        alignItems: 'center',
        borderBottom: '1px solid #ccc', // Add bottom border
        backgroundColor: 'lightblue',
        fontWeight: 'bold',
        padding: '10px', // Add padding for spacing
      }}> 
       <span>AppCraft</span>
      </div>
      <Accordion sx={{
    margin: 0,
    padding: 0,
    '&:before': {
      display: 'none', // Remove the default divider line
    },
  }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}
          >
             Components
          </AccordionSummary>
         <AccordionDetails   sx={{
      padding: '8px', // Reduce padding
    }}>
      <div className=" grid grid-cols-2">
        <div
          ref={(ref) => {
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
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
          <Tooltip title="Container" placement="right">
            <Item $move>
              <SquareSvg viewBox="-3 -3 24 24" />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) => {
            create(
              ref,
              <Text fontSize="12" textAlign="left" text="Hi there" />
            );
          }}
          style={{
            borderBottom: '1px solid #ccc', // Add bottom border
            borderRight: '1px solid #ccc', // Add right border
          }}
        >
          <Tooltip title="Text" placement="right">
            <Item $move>
              <TypeSvg viewBox="-3 -3 28 28" />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) => {
            create(ref, <Button />);
          }}
          style={{
            borderBottom: '1px solid #ccc', // Add bottom border
            borderRight: '1px solid #ccc', // Add right border
          }}
          >
          <Tooltip title="Button" placement="right">
            <Item $move>
              <ButtonSvg viewBox="-4 -3 24 24" />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) => {
            create(
              ref,
              <Element
                canvas
                is={GroupButton}
                background={{ r: 255, g: 255, b: 255, a: 0 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="64px"
                width="100%"
              ></Element>
            );
          }}
          style={{
            borderBottom: '1px solid #ccc', // Add bottom border
            borderRight: '1px solid #ccc', // Add right border
          }}
        >
          <Tooltip title="Group Button" placement="right">
            <Item $move>
            <SquareSvg viewBox="-3 -3 24 24" />
            </Item>
          </Tooltip>
        </div>

        <div
          ref={(ref) => {
            create(ref, <Video />);
          }}
          style={{
            borderBottom: '1px solid #ccc', // Add bottom border
            borderRight: '1px solid #ccc', // Add right border
          }}
        >
          <Tooltip title="Video" placement="right">
            <Item $move>
              <YoutubeSvg viewBox="-3 -3 28 28" />
            </Item>
          </Tooltip>
        </div>
        {toolboxRenderer('Control', Button, create)}
        {toolboxRenderer('Checkbox', Checkbox, create)}
        {toolboxRenderer('Select', Select, create)}
        {toolboxRenderer('Container', Container, create)}
        {toolboxRenderer('Card', Card, create)}
        {toolboxRenderer('Group Button', GroupButton, create)}
        {toolboxRenderer('Group Radio', GroupRadio, create)}
        {toolboxRenderer('Rating', Rating, create)}
        {toolboxRenderer('Toggle Buttons', ToggleButtonGroup, create)}
        {toolboxRenderer('Slider', Slider, create)}
        {toolboxRenderer('Switch', Switch, create)}
        {toolboxRenderer('Transfer List', TransferList, create)}
      </div>
          
        
       </AccordionDetails>
      </Accordion>
      <Accordion sx={{ margin: 0,padding: 0, '&:before': {
              display: 'none', // Remove the default divider line
            },
          }}>
          <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}
          > Inputs
          </AccordionSummary>
          <AccordionDetails>
          <div className=" grid grid-cols-2">
           {toolboxRenderer('Avatar', Avatar, create)}
        
          </div>  
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ margin: 0,padding: 0, '&:before': {
              display: 'none', // Remove the default divider line
            },
          }}>
          <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}
          >Data Display
          </AccordionSummary>
          <AccordionDetails>
          <div>

          </div>  
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ margin: 0,padding: 0, '&:before': {
              display: 'none', // Remove the default divider line
            },
          }}>
          <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}
          > Feedback
          </AccordionSummary>
          <AccordionDetails>
          <div>

          </div>  
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ margin: 0,padding: 0, '&:before': {
              display: 'none', // Remove the default divider line
            },
          }}>
          <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}
          > Surfaces
          </AccordionSummary>
          <AccordionDetails>
          <div>

          </div>  
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ margin: 0,padding: 0, '&:before': {
              display: 'none', // Remove the default divider line
            },
          }}>
          <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}
          > Navigation
          </AccordionSummary>
          <AccordionDetails>
          <div>

          </div>  
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ margin: 0,padding: 0, '&:before': {
              display: 'none', // Remove the default divider line
            },
          }}>
          <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}> Layout
          </AccordionSummary>
          <AccordionDetails>
          <div>

          </div>  
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ margin: 0,padding: 0, '&:before': {
              display: 'none', // Remove the default divider line
            },
          }}>
          <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1a-content"
          id="panel-header" 
          sx={{
            minHeight: '30px', // Reduce the minimum height
            '& .MuiAccordionSummary-content': {
              margin: 0,
            }, fontSize: '10pt', // Reduce font size
          }}
          > X
          </AccordionSummary>
          <AccordionDetails>
          <div>

          </div>  
          </AccordionDetails>
        </Accordion>

    </ToolboxDiv>
  );
};
