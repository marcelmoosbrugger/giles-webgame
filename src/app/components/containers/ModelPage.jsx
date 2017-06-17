/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import ModelPageP from 'Presentationals/ModelPage.jsx';
import { addDomainElement, removeDomainElement,
         setConstantAssignment, setVariableAssignment, setPredicateAssignment,
         addToTenet, emptyGame } from 'Actions';

/** Maps the redux state to props which will get passed down **/
const mapStateToProps = (state) => {
    return {
        model: state.data.model,
        formula: state.data.formula
    }
};

/** Maps the redux dispatch function to props which will get passed to the ModelPage **/
const mapDispatchToProps = (dispatch) => {
    return {
        addDomainElement: (element) => {
            dispatch(addDomainElement(element));
        },
        removeDomainElement: (element) => {
            dispatch(removeDomainElement(element));
        },
        setVariableAssignment: (variable, element) => {
            dispatch(setVariableAssignment({variable, element}));
        },
        setPredicateAssignment: (predicate, args, value) => {
            dispatch(setPredicateAssignment(predicate, {args, value}));
        },
        beforeStartGame: (formula) => {
            dispatch(emptyGame());
            dispatch(addToTenet('1', formula));
        }
    }
};

/** Connects the ModelPage with the redux store  **/
const ModelPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelPageP);

export default ModelPage;
