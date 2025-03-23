import {UserComponent, useNode} from '@craftjs/core';
import cx from 'classnames';
import React from 'react';
import {styled} from 'styled-components';

import {ButtonSettings} from './ButtonSettings';

import {Text} from '../Text';
import { getIcon } from 'utils/iconUtils';
import { get } from 'http';
import { Icon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Button as MuiButton} from '@mui/material';

type ButtonProps = {
    id?: string;
    icon?: string;
    background?: Record<'r' | 'g' | 'b' | 'a', number>;
    color?: string;
    buttonStyle?: string;
    variant?: string;
    margin?: any[];
    text?: string;
    textComponent?: any;
    size?: string;
    onClick?: string;
};


export const Button = ({id,
                        text,
                        textComponent,
                        color='primary',
                        buttonStyle,
                        background,
                        margin,
                        variant,
                        icon,
                        onClick,
                        size,
                        }: ButtonProps) => {

    const {
        connectors: {connect},
    } = useNode((node) => ({
        selected: node.events.selected,
    }));

    const iconObject=icon ? getIcon(icon): getIcon('button');
    const faIcon = iconObject? <FontAwesomeIcon icon={iconObject} /> : null;
    const sColor = color || 'primary'
    return (
        <div
            ref={(dom) => connect(dom)}
            style={{
             margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
             backgroundColor: `rgba(${background?.r}, ${background?.g}, ${background?.b}, ${background?.a})`,
          }}
        >
        <MuiButton id={id} variant={variant} startIcon={faIcon}
          onClick={() => {
            try {
              if (onClick) {
                // Directly evaluate the string as a function
                new Function(onClick)();
              }
            } catch (error) {
              console.error('Error executing onClick:', error);
            }
          }}
          size={size}
          >
          <Text {...textComponent} text={text} color={color} />
        </MuiButton>
        </div>
    );
};

Button.craft = {
    displayName: 'Button',
    props: {
        id: `button_${Math.random().toString(36).substr(2, 9)}`,
        icon: 'button',
        background: {r: 255, g: 255, b: 255, a: 0.5},
        color: 'primary',
        buttonStyle: 'full',
        text: 'Button',
        margin: ['5', '0', '5', '0'],
        variant: 'text',
        textComponent: {
            ...Text.craft.props,
            textAlign: 'center',
        },
        onClick:"alert('Hello World')",
        size: 'medium',

    },
    related: {
        toolbar: ButtonSettings,
    },
};
