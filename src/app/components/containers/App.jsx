/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppP from 'Presentationals/App.jsx';
import { setInfoIsVisible } from 'Actions';


/** Maps the redux state to props which will get passed down **/
const mapStateToProps = (state) => {
    return {
        infoContent: state.ui.infoContent,
        infoIsVisible: state.ui.infoIsVisible
    }
};

/** Maps the redux dispatch function to props which will get passed to the App **/
const mapDispatchToProps = (dispatch) => {
    return {
        hideInfoSidebar: () => {
            dispatch(setInfoIsVisible(false));
        }
    }
};


/** Connects the App with the redux store  **/
const App = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppP));

export default App;
