import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import { store } from "@store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import Spinner from "@components/Spinner";
import reportWebVitals from '@app/reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';

const IbludayApp = lazy(() => import("@app/App"));

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<Spinner />}>
            <SnackbarProvider maxSnack={5}>
                <CssBaseline />
                <IbludayApp />
            </SnackbarProvider>
        </Suspense>
    </Provider>,
    document.getElementById('root')
);
reportWebVitals();