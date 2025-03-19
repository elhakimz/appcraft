
import React from 'react';

import {ToolbarSection, ToolbarItem, ToolbarTextInput} from '../components/editor';
import { ToolbarRadio } from '../components/editor/Toolbar/ToolbarRadio';
import { Data } from '../types/elementData';

function renderProps(data: Data) {
    return (
        <div>
            <ToolbarTextInput propKey="text" label="Text" />
        </div>
    );
}

function renderColorProp(propData: Data) {
    return(
        propData.color && (<ToolbarSection
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

function renderEventsProp(propData: Data) {
    return         (propData.onClick || propData.onChange) && (<ToolbarSection title="Events">

        { propData.onClick && (<ToolbarTextInput type={"text"}  label="onClick" value={propData.onClick.value}
                                                 onChange={(value) => {propData.onClick.value = value}}/>)}

        {propData.onChange && (<ToolbarTextInput type={"text"} label="onChange" value={propData.onChange.value}
                                             onChange={(value) => {propData.onChange.value = value}}/>)}

    </ToolbarSection>)

}

function renderMarginProp(propData: Data) {
    return propData.margin &&(
        <ToolbarSection
            title="Margin"
            props={['margin']}
            summary={({ margin }: any) => {
                return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
                    margin[3] || 0
                }px`;
            }}
        >
            <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
            <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
            <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
            <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
        </ToolbarSection>

    );
}

function renderPaddingProp(propData: Data) {
    return( propData.padding &&
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

export function renderContainerDecoration(propData:Data){
    return (
        propData.decoration && (<ToolbarSection title="Decoration" props={['radius', 'shadow']}>
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


function renderAlignmentProp(propData:Data){

    return propData.alignment &&(<ToolbarSection title="Alignment">
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

export function  renderButtonVariantProp(propData:Data){
    return propData.variant && (<ToolbarSection title="Variant">
        <ToolbarItem propKey="variant" type="radio" label="Variant">
            <ToolbarRadio value="text" label="Text" />
            <ToolbarRadio value="container" label="Container" />
            <ToolbarRadio value="outlined" label="Outlined" />
        </ToolbarItem>
    </ToolbarSection>)
}

export function  renderContainerVariantProp(propData:Data){
    return propData.variant && (<ToolbarSection title="Variant">
        <ToolbarItem propKey="variant" type="radio" label="Variant">
            <ToolbarRadio value="text" label="Text" />
            <ToolbarRadio value="contained" label="Container" />
            <ToolbarRadio value="outlined" label="Outlined" />
        </ToolbarItem>
    </ToolbarSection>)
}

export function renderButtonDecoration(propData:Data){
    return propData.decoration && (
        <ToolbarSection title="Decoration">
            <ToolbarItem propKey="buttonStyle" type="radio" label="Style">
                <ToolbarRadio value="full" label="Full" />
                <ToolbarRadio value="outline" label="Outline" />
            </ToolbarItem>
        </ToolbarSection>
    )
}


export function renderOrientation(propData:Data){
    return propData.orientation && (
        <ToolbarSection title="Orientation">
            <ToolbarItem propKey="orientation" type="radio" label="Orientation">
                <ToolbarRadio value="horizontal" label="Horizontal" />
                <ToolbarRadio value="vertical" label="Vertical" />
            </ToolbarItem>
        </ToolbarSection>
    )
}

export function renderColorsProp(propData:Data){
    const bg=propData.background;
    const color=propData.color;   
    
    return propData.colors && (<ToolbarSection
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
        <ToolbarItem
            full={true}
            propKey="background"
            type="bg"
            label="Background"
        />
        <ToolbarItem full={true} propKey="color" type="color" label="Text" />
    </ToolbarSection>)
}

export function renderSettings(data: Data) {
    return (
        <div>

            {data.type === 'control' && renderButtonVariantProp(data)}
            {data.type === 'container' && renderContainerVariantProp(data)}
            {data.type === 'container' && renderOrientation(data)}
            {renderColorProp(data)}
            {renderColorsProp(data)}
            {renderMarginProp(data)}
            {renderPaddingProp(data)}
            {renderAlignmentProp(data)}
            {data.type === 'control' && renderButtonDecoration(data)}
            {data.type === 'container' && renderContainerDecoration(data)}
            {renderEventsProp(data)}
        </div>
    );
}