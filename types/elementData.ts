export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}


export  interface Padding {
    top: number;
    right: number;
    bottom: number;
    left: number;
}


export interface ButtonStyle {
    value: 'full' | 'outline';
    label: string;
}


export interface ToolbarSectionData {
    title: string;
    props: string[];
    summary: (data: any) => JSX.Element;
}

export  interface ToolbarItemData {
    propKey: string;
    type: 'bg' | 'color' | 'slider' | 'radio';
    label: string;
    index?: number;
    value?: string;
}
export interface  Typography {
    fontSize: number;
    fontWeight: string;
    textAlign: string;
}

export interface Decoration {
    radius: number;
    shadow: number;
}
export interface Dimensions {
    width: number;
    height: number;
}
export interface EventData {
    value: string;
    label: string;
}

export interface Colors {
    background: Color;
    color: Color;
}

interface Alignment {
    flexDirection: 'row' | 'column';
    fillSpace: 'yes' | 'no';
    alignItems: 'flex-start' | 'center' | 'flex-end';
    justifyContent: 'flex-start' | 'center' | 'flex-end';
}


export  interface Data {
    alignment: Alignment | null
    background: Color;
    buttonStyle: ButtonStyle;
    color: Color | null;
    colors: Colors | null;
    decoration: Decoration | null;
    dimensions: Dimensions | null;
    margin: [number,number,number,number];
    onChange: EventData | null;
    onClick: EventData | null;
    padding: [number,number,number,number];
    type: 'control' | 'container';
    typography: Typography | null;
    variant: string | null;
    orientation: string | null;
}
