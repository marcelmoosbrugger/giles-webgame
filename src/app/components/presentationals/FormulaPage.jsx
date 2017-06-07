/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import FormulaModifier from 'Containers/FormulaModifier.jsx';
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
        this.state = {error: null, success: false};
    }

    /**
     * Handles an invalid formula entered by the user.
     * @param formula - The unparsable string entered
     * @param errorAt - The indices where the mistake in the formula is
     */
    handleError(formula, errorAt) {
        this.setState({
            error: {
                formula: formula,
                at: errorAt
            }
        });
    }

    /**
     * Handles a valid formula entered by the user.
     */
    handleSuccess() {
        this.setState({error: null, success: true});
    }

    /**
     * Handles the edit event.
     */
    handleEdit() {
        this.setState({error: null, success: false});
    }

    /**
     * When the user hovers the next-button, the editing gets finished.
     */
    handleButtonMouseEnter() {
        this.formulaModifier.getWrappedInstance().finishEditing();
    }

    /**
     * Handles the click on the button
     */
    handleButtonClick() {
        if (!!this.state.error) return;

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

        return (
            <div className={'formula-page' + (error ? ' error' : '')}>
                <div>
                    <FormulaModifier
                        ref={r => { this.formulaModifier = r }}
                        formula={this.props.formula}
                        onError={this.handleError.bind(this)}
                        onSuccess={this.handleSuccess.bind(this)}
                        onEdit={this.handleEdit.bind(this)}
                    />
                    <div className="next-row">
                        <button
                            className={!this.state.success ? 'disabled' : ''}
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