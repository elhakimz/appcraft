
import React from 'react';

import {ToolbarSection, ToolbarItem, ToolbarTextInput} from '../components/editor';
import { ToolbarRadio } from '../components/editor/Toolbar/ToolbarRadio';
import { Data } from '../types/elementData';
import {ToolbarCheckbox} from "../components/editor/Toolbar/ToolbarCheckbox";
import {ToolbarOptionsDialog} from "../components/editor/Toolbar/ToolbarOptionsDialog";
import {Button} from "../components/selectors/Button";
import { GroupRadio } from 'components/selectors/GroupRadio';
import { Group } from 'next/dist/shared/lib/router/utils/route-regex';
import { ToolbarSelectItem } from 'components/editor/Toolbar/ToolbarSelectItem';
import MenuItem from '@mui/material/MenuItem';

function isControl(name){
    return ['Button', 'Checkbox', 'Select'].includes(name)
}

function isContainer(name){
    return['Container','GroupButton'].includes(name)
}

function renderColorProp(element) {
    let validProps = 'color' in element.craft.props
        && 'background' in element.craft.props;

    return(
        validProps && (<ToolbarSection
            title="Colors"
            props={['background', 'color']}
            summary={(data) => (
                <div className="flex flex-row-reverse">
                    <div
                        style={{
                            background: `rgba(${Object.values(data.background)})`,
                        }}
                        className="shadow-md flex-end w-6 h-6 text-center flex items-center rounded-full bg-black"
                    >
                        <p style={{color: `rgba(${Object.values(data.color)})`,}}
                           className="text-white w-full text-center"
                        >
                        </p>
                    </div>
                </div>
            )}
        >
            <ToolbarItem full={true} propKey="background" type="bg" label="Background" />
            <ToolbarItem full={true} propKey="color" type="color" label="Text"/>
        </ToolbarSection>)
    );

}

function renderEventsProp(element) {
    let propData = element.craft.props
    return         (propData.onClick || propData.onChange) && (<ToolbarSection title="Events">

        { propData.onClick && (<ToolbarTextInput type="text" multiline={true} label="onClick" value={propData.onClick}
                                                 onChange={(value) => {propData.onClick = value}}/>)}

        {propData.onChange && (<ToolbarTextInput type="text" multiline={true} label="onChange" value={propData.onChange}
                                             onChange={(value) => {propData.onChange = value}}/>)}

    </ToolbarSection>)

}

function renderLabelProp(element: any ) {
    return  element.craft.props.label && (<ToolbarSection title="Label" props={['label']} label={element.craft.props.label}>
        <ToolbarItem full={true} propKey="label" type="text" label="Label" />
    </ToolbarSection>)
}


function renderMarginProp(element:any) {
    return element.craft.props.margin &&(
        <ToolbarSection
            title="Margin"
            props={['margin']}
            summary={({ margin }: any) => {
                return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
                    margin[3] || 0
                }px`;
            }}>
            <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
            <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
            <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
            <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
        </ToolbarSection>
    );
}

function renderPaddingProp(element:any) {
    return( element.craft.props.padding &&
        (<ToolbarSection
            title="Padding"
            props={['padding']}
            summary={({padding}: any) => {
                return `${padding[0] || 0}px ${padding[1] || 0}px ${
                    padding[2] || 0
                }px ${padding[3] || 0}px`;
            }}
        >
            <ToolbarItem propKey="padding" index={0} type="slider" label="Top"/>
            <ToolbarItem propKey="padding" index={1} type="slider" label="Right"/>
            <ToolbarItem propKey="padding" index={2} type="slider" label="Bottom"/>
            <ToolbarItem propKey="padding" index={3} type="slider" label="Left"/>
        </ToolbarSection>)
    )
}

export function renderContainerDecoration(element){
    return (
        element.craft.props.decoration && (<ToolbarSection title="Decoration" props={['radius', 'shadow']}>
            <ToolbarItem
                full={true}
                propKey="radius"
                type="slider"
                label="Radius"
            />
            <ToolbarItem
                full={true}
                propKey="shadow"
                type="slider"
                label="Shadow"
            />
        </ToolbarSection>)
    )
}


function renderAlignmentProp(element){

    return element.craft.props.alignment &&(<ToolbarSection title="Alignment">
        <ToolbarItem
            propKey="flexDirection"
            type="radio"
            label="Flex Direction"
        >
            <ToolbarRadio value="row" label="Row" />
            <ToolbarRadio value="column" label="Column" />
        </ToolbarItem>
        <ToolbarItem propKey="fillSpace" type="radio" label="Fill space">
            <ToolbarRadio value="yes" label="Yes" />
            <ToolbarRadio value="no" label="No" />
        </ToolbarItem>
        <ToolbarItem propKey="alignItems" type="radio" label="Align Items">
            <ToolbarRadio value="flex-start" label="Flex start" />
            <ToolbarRadio value="center" label="Center" />
            <ToolbarRadio value="flex-end" label="Flex end" />
        </ToolbarItem>
        <ToolbarItem
            propKey="justifyContent"
            type="radio"
            label="Justify Content"
        >
            <ToolbarRadio value="flex-start" label="Flex start" />
            <ToolbarRadio value="center" label="Center" />
            <ToolbarRadio value="flex-end" label="Flex end" />
        </ToolbarItem>
    </ToolbarSection>)
}

export function  renderButtonVariantProp(element:any){
    return element.craft.props.variant && (<ToolbarSection title="Variant" props={['variant']}>
        <ToolbarItem propKey="variant" type="radio" label="Variant" >
            <ToolbarRadio value="text" label="Text" />
            <ToolbarRadio value="container" label="Container" />
            <ToolbarRadio value="outlined" label="Outlined" />
        </ToolbarItem>
    </ToolbarSection>)
}

export function  renderColorThemeProp(element:any){
    return (element.craft.props.color && typeof element.craft.props.color==="string") &&
        (<ToolbarSection title="Color" props={['color']}>
        <ToolbarItem propKey="color" type="radio" label="Color" >
            <ToolbarRadio value="primary" label="Primary" />
            <ToolbarRadio value="secondary" label="Secondary" />
            <ToolbarRadio value="error" label="Error" />
            <ToolbarRadio value="success" label="Success" />
            <ToolbarRadio value="warning" label="Warning" />
        </ToolbarItem>
    </ToolbarSection>)
}

export function renderSizeThemeProp(element: any) {
    return (element.craft.props.size && typeof element.craft.props.size === "string") && (
      <ToolbarSection title="Size" props={['size']}>
        <ToolbarItem propKey="size" type="select" label="size">
           <MenuItem key={0} value={"small"}> {"Small"} </MenuItem>
           <MenuItem key={0} value={"medium"}> {"Medium"} </MenuItem>
           <MenuItem key={0} value={"large"}> {"Large"} </MenuItem>
        </ToolbarItem>
      </ToolbarSection>
    );
  }


export function  renderContainerVariantProp(element:any){
    return element.craft.props.variant && (<ToolbarSection title="Variant">
        <ToolbarItem propKey="variant" type="radio" label="Variant">
            <ToolbarRadio value="text" label="Text" />
            <ToolbarRadio value="contained" label="Container" />
            <ToolbarRadio value="outlined" label="Outlined" />
        </ToolbarItem>
    </ToolbarSection>)
}

export function renderButtonDecoration(element){
    return element.craft.props.decoration && (
        <ToolbarSection title="Decoration">
            <ToolbarItem propKey="buttonStyle" type="radio" label="Style">
                <ToolbarRadio value="full" label="Full" />
                <ToolbarRadio value="outline" label="Outline" />
            </ToolbarItem>
        </ToolbarSection>
    )
}

export function renderOrientation(element:any){
    console.log("element props",element.craft.props)
    return element.craft.props.orientation && (
        <ToolbarSection title="Orientation">
            <ToolbarItem propKey="orientation" type="radio" label="Orientation">
                <ToolbarRadio value="horizontal" label="Horizontal" />
                <ToolbarRadio value="vertical" label="Vertical" />
            </ToolbarItem>
        </ToolbarSection>
    )
}
function renderChecked(element:any){
    return ( element.craft.props['checked'] &&
        <ToolbarSection title="Checked">
            <ToolbarItem propKey="checked" type="checkbox" label="Checked">
                <ToolbarCheckbox value="checked" label="Checked" />
            </ToolbarItem>
        </ToolbarSection>
    )
}

function renderIsRow(element:any){
    return ( element.craft.props['row'] &&
        <ToolbarSection title="Row" props={['row']}>
          <ToolbarItem propKey="row" type="checkbox" label="Row"/>
        </ToolbarSection>
    )
}



function renderColorsProp(element){

    return element.craft.props.colors && (<ToolbarSection
        title="Colors"
        props={['background', 'color']}
        summary={({ bg, color }: any) => {
            return (
                <div className="flex flex-row-reverse">
                    <div
                        style={{
                            background:
                                bg && `rgba(${Object.values(bg)})`,
                        }}
                        className="shadow-md flex-end w-6 h-6 text-center flex items-center rounded-full bg-black"
                    >
                        <p
                            style={{
                                color: color && `rgba(${Object.values(color)})`,
                            }}
                            className="text-white w-full text-center"
                        >
                            T
                        </p>
                    </div>
                </div>
            );
        }}
    >
        <ToolbarItem full={true}propKey="background" type="bg" label="Background"   />
        <ToolbarItem full={true} propKey="color" type="color" label="Text" />
    </ToolbarSection>)
}

function renderOptionsProp(element) {
    const options = element.craft.props.options;
    const value = element.craft.props.value;
  
    return (
      options && (
        <ToolbarSection
          title="Value"
          props={['value']}
          summary={({ value }: any) => {
            return `${value}`;
          }}
        >
          <ToolbarItem
            propKey="value"
            type="select"
            label="Value"
            optionsData={options}
            hasOptions={true}
          >

          </ToolbarItem>
          
          <ToolbarOptionsDialog
                label="Options"
                propKey="options"
                optionsData={options}
                onChange={(newOptions) => {
                    console.log('Options changed:', newOptions);
                } } 
                value={value}                
            />        
        </ToolbarSection>
      )
    );
  }
function renderHWProps(element){
    let propHeight=element.craft.props.height
    let propWidth=element.craft.props.width
    return (propHeight || propWidth) && <ToolbarSection
        title="Height & Width"
        props={['height','width']}
        summary={({height, width}: any) => {
            return `${height}  ${width}`;
        }}
    >
        <ToolbarItem propKey="height"  type="text" label="Height"/>
        <ToolbarItem propKey="width"  type="text" label="Width"/>

    </ToolbarSection>
}

export function renderSettings(element: any = Button) {
    console.log('element ',element.craft.displayName);
    return (
        <div>
            {element.craft.displayName ==='Checkbox' && renderChecked(element)}
            {renderLabelProp(element)}
            {isControl(element.craft.displayName) && renderButtonVariantProp(element)}
            {isContainer(element.craft.displayName) && renderContainerVariantProp(element)}
            {isContainer(element.craft.displayName) && renderOrientation(element)}
            {renderColorProp(element)}
            {renderColorsProp(element)}
            {renderColorThemeProp(element)}
            {renderMarginProp(element)}
            {renderPaddingProp(element)}
            {renderAlignmentProp(element)}
            {renderSizeThemeProp(element)}
            {renderHWProps(element)}
            {renderIsRow(element)}
            {isControl(element.craft.displayName) && renderButtonDecoration(element)}
            {isContainer(element.craft.displayName) && renderContainerDecoration(element)}
            {renderEventsProp(element)}
            {renderOptionsProp(element)}
        </div>
    );
}