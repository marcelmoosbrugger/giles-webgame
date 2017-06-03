/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import FormulaInput from './FormulaInput.jsx';
import 'Styles/FormulaPage.scss';

/**
 * Represents the page where the formula is entered
 */
export default class FormulaPage extends React.Component {

    /**
     * @param props.onSuccess Gets called with the parsed formula when the user clicks "next"
     */
    constructor(props) {
        super(props);
        this.state = {parsedFormula: null, error: null};
        this.ignoreNextBlur = false;
    }

    /**
     * Handles an invalid formula entered by the user.
     * @param formula - The unparsable string entered
     * @param errorAt - The indices where the mistake in the formula is
     */
    handleError(formula, errorAt) {
        this.setState({
            parsedFormula: null,
            error: {
                formula: formula,
                at: errorAt
            }
        });
    }

    /**
     * Handles a valid formula entered by the user.
     * @param parsedFormula - The already parsed formula
     */
    handleSuccess(parsedFormula) {
        this.setState({parsedFormula: parsedFormula, error: null});
    }

    /**
     * Handles the edit event.
     */
    handleEdit() {
        this.setState({parsedFormula: null, error: null});
    }

    /**
     * When the user hovers the next-button, the editing gets finished.
     */
    handleButtonMouseEnter() {
        this.refs.formulaInput.finishEditing();
    }

    /**
     * Handles the click on the button
     */
    handleButtonClick() {
        if (!this.state.parsedFormula) return;

        this.props.onSuccess(this.state.parsedFormula);
        this.props.history.push('/model');
    }

    /**
     * Renders the dom element giving the user information about mistakes in the entered formula.
     * @param error The error object
     * @returns
     */
    renderMistakeInfo(error) {
        let errorMessage;
        if (error.formula.length === 0) {
            errorMessage = (<dd>No formula was entered</dd>);
        } else {
            error.formula = (error.at >= error.formula.length) ? error.formula + '_' : error.formula;
            errorMessage = (<dd>{error.formula.substr(0, error.at)}<span>{error.formula.substr(error.at)}</span></dd>);
        }

        return (
            <dl className="mistake">
                <dt>There seems to be a mistake:</dt>
                {errorMessage}
            </dl>
        );
    }

    render() {
        const error = !!this.state.error;
        const success = !!this.state.parsedFormula;

        return (
            <div className={'formula-page' + (error ? ' error' : '')}>
                <div>
                    <FormulaInput
                        ref="formulaInput"
                        onError={this.handleError.bind(this)}
                        onSuccess={this.handleSuccess.bind(this)}
                        onEdit={this.handleEdit.bind(this)}
                    />
                    <div className="next-row">
                        <button
                            className={(!success) ? 'disabled' : ''}
                            onClick={this.handleButtonClick.bind(this)}
                            onMouseEnter={this.handleButtonMouseEnter.bind(this)}>Next</button>
                        {error? this.renderMistakeInfo(this.state.error) : ''}
                    </div>
                    <div className="background"/>
                </div>
            </div>
        );
    }
}
