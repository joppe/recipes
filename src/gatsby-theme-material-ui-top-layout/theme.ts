import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import { color } from '../styles/color';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: color.green.cuttySark,
        },
    },
});

export default theme;
