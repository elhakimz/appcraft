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

type ButtonProps = {
    icon?: string;
    background?: Record<'r' | 'g' | 'b' | 'a', number>;
    color?: string;
    buttonStyle?: string;
    variant?: string;
    margin?: any[];
    text?: string;
    textComponent?: any;
    onClick?: string;
};

// N.B: Alias required StyledComponent props for Transient Props; https://styled-components.com/docs/api#transient-props
type StyledButtonProps = {
    $background?: Record<'r' | 'g' | 'b' | 'a', number>;
    $buttonStyle?: string;
    $margin?: any[];
    $variant?: string;
};


const StyledButton = styled.button<StyledButtonProps>`
    
    margin: ${({$margin}) =>
            `${$margin[0]}px ${$margin[1]}px ${$margin[2]}px ${$margin[3]}px`};
    
    variant: $variant;
`;

export const Button = ({
                            text,
                            textComponent,
                            color,
                            buttonStyle,
                            background,
                            margin,
                            variant,
                            icon
                        }: ButtonProps) => {

    const {
        connectors: {connect},
    } = useNode((node) => ({
        selected: node.events.selected,
    }));

    const iconObject=icon ? getIcon(icon): getIcon('button');
    return (
        <StyledButton
            ref={(dom) => {
                connect(dom);
            }}
            className={cx([
                'rounded w-full px-4 py-2',
                {
                    'shadow-lg': buttonStyle === 'full',
                },
            ])}
            $buttonStyle={buttonStyle}
            $background={background}
            $margin={margin}
            $variant={variant}
        >
            <FontAwesomeIcon icon={iconObject} />
            <Text {...textComponent} text={text} color={color}/>
        </StyledButton>
    );
};

Button.craft = {
    displayName: 'Button',
    props: {
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
        onClick:"{}"

    },
    related: {
        toolbar: ButtonSettings,
    },
};
