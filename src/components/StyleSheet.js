/**
 * Created by SJQ on 04/07/2017.
 */

import {StyleSheet, Platform} from 'react-native';

export function create(styles: Object): {[name: string]: number} {
    const platformStyles = {};
    Object.keys(styles).forEach((name) => {
        let {ios, android, ...style} = {...styles[name]};
        if (ios && Platform.OS === 'ios') {
            style = {...style, ...ios};
        }
        if (android && Platform.OS === 'android') {
            style = {...style, ...android};
        }
        platformStyles[name] = style;
    });
    return StyleSheet.create(platformStyles);
}
