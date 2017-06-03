/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { connect } from 'react-redux';
import FormulaPage from 'Presentationals/FormulaPage.jsx';
import { setFormula } from 'Actions';

/** Maps the redux state to props which will get passed to the FormulaPage **/
const mapStateToProps = (_) => {return {}};

/** Maps the redux dispatch function to props which will get passed to the Formula Page **/
const mapDispatchToProps = (dispatch) => {
    return {
        onSuccess: (formula) => {
            dispatch(setFormula(formula));
        }
    }
};

/** Connects the FormulaPage with the redux store  **/
const SetFormulaPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(FormulaPage);

export default SetFormulaPage;
