/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxContainer} from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './state/reducers';
import { AppContainer as HotLoaderContainer} from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './components/containers/AppContainer.jsx';

// Create the redux state store
let store = createStore(mainReducer);

// Renders the actual application wrapped in all necessary containers
const renderApp = () => {
    render(
        <HotLoaderContainer>
            <ReduxContainer store={store}>
                <BrowserRouter>
                    <AppContainer/>
                </BrowserRouter>
            </ReduxContainer>
        </HotLoaderContainer>,
        document.getElementById('root')
    );
};

// render the the application upfront
renderApp();

// initialize the hot loading
if (module.hot) {
    module.hot.accept('./index.jsx', renderApp);
}
