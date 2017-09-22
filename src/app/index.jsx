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
import { createStore, compose } from 'redux';
import persistState from 'redux-localstorage';
import reducer from './state/reducers';
import { AppContainer as HotLoaderContainer} from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import App from 'Containers/App.jsx';
import Favicon from '../assets/img/favicon.png';

// Create the redux state store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(persistState());
let store = createStore(reducer, enhancer);

// Renders the actual application wrapped in all necessary containers
const renderApp = () => {
    render(
        <HotLoaderContainer>
            <ReduxContainer store={store}>
                <HashRouter>
                    <App/>
                </HashRouter>
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
