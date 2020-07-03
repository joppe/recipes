import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { EnsureLoggedInContainer } from './container/EnsureLoggedInContainer';
import { FirebaseProvider } from './context/firebase/FirebaseProvider';
import { LocaleContext } from './context/locale/LocaleContext';
import { WeekPlanner } from './page/WeekPlanner';

const theme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />

        <LocaleContext.Provider value={{ locale: 'nl-NL' }}>
            <FirebaseProvider>
                <EnsureLoggedInContainer>
                    <WeekPlanner />
                </EnsureLoggedInContainer>
            </FirebaseProvider>
        </LocaleContext.Provider>
    </ThemeProvider>,
    document.querySelector('#app'),
);
