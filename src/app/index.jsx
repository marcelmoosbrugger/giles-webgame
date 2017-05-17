import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './state/reducers';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './components/containers/RootContainer.jsx';

let store = createStore(mainReducer);

const renderWrapped = Component => {
    render(
        <Provider store={store}>
            <AppContainer>
                <Component />
            </AppContainer>
        </Provider>,
        document.getElementById('root')
    );
};

renderWrapped(RootContainer);

if (module.hot) {
    module.hot.accept('./index.jsx', () => { renderWrapped(RootContainer) });
}
