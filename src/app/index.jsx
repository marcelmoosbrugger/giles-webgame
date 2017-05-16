import React from 'react';
import {render} from 'react-dom';

import {AppContainer} from 'react-hot-loader';
import RootContainer from './containers/RootContainer.jsx';

const renderWrapped = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

renderWrapped(RootContainer);

if (module.hot) {
    module.hot.accept('./index.jsx', () => { renderWrapped(RootContainer) });
}
