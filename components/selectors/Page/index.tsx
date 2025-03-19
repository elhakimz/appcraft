import React from 'react';
import { Element } from '@craftjs/core';
import { PageSettings } from './PageSettings';

export type PageVariables = {
  name: string;
  value: any;
};

export type PageEvent = {
  name: string;
  handler: (e: any) => void;
};

export type PageProps = {
  background: Record<'r' | 'g' | 'b' | 'a', number>;
  color: Record<'r' | 'g' | 'b' | 'a', number>;
  width: string;
  height: string;
  padding: string[];
  margin: string[];
  variables: PageVariables[];
  events: PageEvent[];
  children: React.ReactNode;
};

const defaultProps = {
  padding: ['0', '0', '0', '0'],
  margin: ['0', '0', '0', '0'],
  background: { r: 255, g: 255, b: 255, a: 1 },
  color: { r: 0, g: 0, b: 0, a: 1 },
  width: '100%',
  height: 'auto',
  variables: [],
  events: [],
};

export const Page = (props: Partial<PageProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const {
    background,
    color,
    padding,
    margin,
    variables,
    events,
    children,
  } = props;

  // Handle page events
  React.useEffect(() => {
    events?.forEach(event => {
      window.addEventListener(event.name, event.handler);
    });

    return () => {
      events?.forEach(event => {
        window.removeEventListener(event.name, event.handler);
      });
    };
  }, [events]);

  return (
    <div
      style={{
        background: `rgba(${Object.values(background)})`,
        color: `rgba(${Object.values(color)})`,
        padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
        margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
        width: props.width,
        height: props.height,
      }}
    >
      {/* Render variables if needed */}
      {variables?.map((variable, index) => (
        <input
          key={index}
          type="hidden"
          name={variable.name}
          value={variable.value}
        />
      ))}
      {children}
    </div>
  );
};

Page.craft = {
  displayName: 'Page',
  props: defaultProps,
  rules: {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
  },
  related: {
    toolbar: PageSettings,
  },
};