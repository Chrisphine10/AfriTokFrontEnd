import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { theme } from '../core/theme';

export default StyleSheet.create({
    button: {
        borderRadius: 30,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});