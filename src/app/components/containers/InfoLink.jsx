/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import InfoLinkP from 'Presentationals/InfoLink.jsx';
import { setInfoIsVisible, setInfoContent } from 'Actions';

/** Maps the redux dispatch function to props which will get passed to the InfoLink **/
const mapDispatchToProps = (dispatch) => {
    return {
        showInfoSidebar: (content) => {
            dispatch(setInfoContent(content));
            dispatch(setInfoIsVisible(true));
        }
    }
};

/** Connects the InfoLink with the redux store  **/
const InfoLink = connect(null, mapDispatchToProps)(InfoLinkP);

export default InfoLink;
