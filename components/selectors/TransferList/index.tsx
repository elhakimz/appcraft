import {useNode} from '@craftjs/core';
import {
    Grid,
    List,
    Card,
    CardHeader,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    Button,
    CardContent
} from '@mui/material';
import React from 'react';
import {TransferListSettings} from './TransferListSettings';
import {Resizer} from '../Resizer';
import {Padding} from '@mui/icons-material';

type TransferListProps = {
    leftTitle?: string;
    rightTitle?: string;
    items?: string[];
    margin?: any[];
    padding?: any[];
    width?: string;
    height?: string;


};

function not(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly string[], b: readonly string[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export const TransferList = ({
                                 leftTitle = 'Choices',
                                 rightTitle = 'Chosen',
                                 items = ['List item 1', 'List item 2', 'List item 3', 'List item 4'],
                                 margin = ['0', '0', '0', '0'],
                                 padding = ['0', '0', '0', '0'],
                             }: TransferListProps) => {
    const {
        connectors: {connect},
    } = useNode((node) => ({
        selected: node.events.selected,
    }));

    const [checked, setChecked] = React.useState<readonly string[]>([]);
    const [left, setLeft] = React.useState<readonly string[]>(items);
    const [right, setRight] = React.useState<readonly string[]>([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (title: string, items: readonly string[]) => (
        <Card>
            <CardHeader title={title} subheader="Select choices to transfer"/>
            <CardContent>
                <List dense component="div" role="list">
                    {items.map((value: string) => {
                        const labelId = `transfer-list-item-${value}-label`;
                        return (
                            <ListItem
                                key={value}
                                role="listitem"
                                button
                                onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value}/>
                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        </Card>
    );

    return (
        <Resizer
            propKey={{width: 'width', height: 'height'}}
            style={{
                padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
                margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
            }}
        >
            <div
                ref={(dom) => connect(dom)}
                style={{
                    margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
                    width: '100%', height: '100%'
                }}
            >

                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>{customList(leftTitle, left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleAllRight}
                                disabled={left.length === 0}
                            >
                                ≫
                            </Button>
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                            >
                                &lt;
                            </Button>
                            <Button
                                sx={{my: 0.5}}
                                variant="outlined"
                                size="small"
                                onClick={handleAllLeft}
                                disabled={right.length === 0}
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList(rightTitle, right)}</Grid>
                </Grid>

            </div>
        </Resizer>
    );
};

TransferList.craft = {
    displayName: 'TransferList',
    props: {
        leftTitle: 'Choices',
        rightTitle: 'Chosen',
        items: ['List item 1', 'List item 2', 'List item 3', 'List item 4'],
        margin: ['0', '0', '0', '0'],
        padding: ['0', '0', '0', '0'],
    },
    rules: {
        canDrag: () => true,
    },
    related: {
        toolbar: TransferListSettings,
    },
};