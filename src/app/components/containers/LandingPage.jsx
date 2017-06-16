/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import LandingPageP from 'Presentationals/LandingPage.jsx';
import { emptyData, emptyGame } from 'Actions';

/** Maps the redux dispatch function to props which will get passed to the LandingPage **/
const mapDispatchToProps = (dispatch) => {
    return {
        beforeNewGame: () => {
            dispatch(emptyData());
            dispatch(emptyGame());
        }
    }
};

/** Connects the LandingPage with the redux store  **/
const LandingPage = connect(
    null,
    mapDispatchToProps,
)(LandingPageP);

export default LandingPage;
