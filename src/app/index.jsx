import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './state/reducers';
import { AppContainer as HotLoader} from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import RootContainer from './components/containers/RootContainer.jsx';

let store = createStore(mainReducer);

const renderRoot = () => {
    render(
        <HotLoader>
            <Provider store={store}>
                <BrowserRouter>
                    <RootContainer/>
                </BrowserRouter>
            </Provider>
        </HotLoader>,
    document.getElementById('root')
    );
};

renderRoot();

if (module.hot) {
    module.hot.accept('./index.jsx', renderRoot);
}
