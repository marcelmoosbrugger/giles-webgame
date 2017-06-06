/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import DomainCreator from 'Presentationals/DomainCreator.jsx';
import { addDomainElement, removeDomainElement } from 'Actions';

/** Maps the redux state to props which will get passed down **/
const mapStateToProps = (state) => {
    return {
        domain: state.data.model.value0.domain
    }
};

/** Maps the redux dispatch function to props which will get passed to the FormulaCreator **/
const mapDispatchToProps = (dispatch) => {
    return {
        addElement: (element) => {
            dispatch(addDomainElement(element));
        },
        removeElement: (element) => {
            dispatch(removeDomainElement(element));
        },
    }
};

/** Connects the FormulaCreator with the redux store  **/
const DomainModifier = connect(
    mapStateToProps,
    mapDispatchToProps
)(DomainCreator);

export default DomainModifier;
