/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import FormulaPageP from 'Presentationals/FormulaPage.jsx';
import { emptyData, setFormula, setDomain } from 'Actions';

/** Maps the redux state to props which will get passed down **/
const mapStateToProps = (state) => {
    return {
        formula: state.data.formula
    }
};

/** Maps the redux dispatch function to props which will get passed to the FormulaPage **/
const mapDispatchToProps = (dispatch) => {
    return {
        onSuccess: (formula, constants) => {
            dispatch(emptyData());
            dispatch(setFormula(formula));
            dispatch(setDomain(constants));
        }
    }
};

/** Connects the FormulaPage with the redux store  **/
const FormulaPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormulaPageP);

export default FormulaPage;
