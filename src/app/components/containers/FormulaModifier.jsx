/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import FormulaCreator from 'Presentationals/FormulaCreator.jsx';
import { setFormula } from 'Actions';

/** Maps the redux state to props which will get passed to the FormulaCreator **/
const mapStateToProps = (state) => {
    return {
        formula: state.data.formula
    }
};

/** Maps the redux dispatch function to props which will get passed to the FormulaCreator **/
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSuccess: (formula) => {
            dispatch(setFormula(formula));
            ownProps.onSuccess(formula);
        }
    }
};

/** Connects the FormulaCreator with the redux store  **/
const FormulaModifier = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)(FormulaCreator);

export default FormulaModifier;
