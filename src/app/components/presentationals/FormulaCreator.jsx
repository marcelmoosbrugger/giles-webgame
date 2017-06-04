/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/FormulaCreator.scss';
import Parser from 'Purs/Formula/Parser.purs';
import Formula from 'Purs/Formula.purs';

/**
 * A class for inserting a first order formula.
 */
export default class FormulaCreator extends React.Component {

    /**
     * @param props.onError The callback gets called if the user enters a not parsable formula
     * @param props.onSuccess The callback gets called if the user enters a valid formula
     * @param props.onEdit The callback gets called if the user edits the formula
     */
    constructor(props) {
        super(props);
        this.state = {value: '', error: undefined};
        if (!!props.formula) {
            this.state = {value: Formula.toString(props.formula), error: false};
        }
        this.ignoreNextBlur = false;
    }

    handleBlur() {
        if (this.ignoreNextBlur) return;

        const formula = Parser.parse(this.state.value);
        this.setState({error: formula.constructor.name === 'Left'});

        if (formula.constructor.name === 'Left') {
            this.props.onError(this.state.value, formula.value0.value1.column - 1);
        } else {
            this.props.onSuccess(formula.value0);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onEdit();
    }

    handleFocus() {
        this.ignoreNextBlur = false;
        this.setState({error: undefined});
    }

    handleKeyDown(event) {
        if (event.keyCode=== 13) {
            this.finishEditing();
        }
    }

    finishEditing() {
        this.refs.input.blur();
    }

    /**
     * Inserts a given symbol at the position saved at the last blur.
     * After that the cursor is positioned right after the inserted symbol.
     * @param symbol
     */
    insertSymbol(symbol) {
        this.ignoreNextBlur = true;
        const insertPosition = this.refs.input.selectionStart;
        const value = this.state.value.slice(0, insertPosition) + symbol + this.state.value.slice(insertPosition);
        this.setState({value});
        setTimeout(function () {
            this.refs.input.focus();
            this.refs.input.setSelectionRange(insertPosition + 1, insertPosition + 1);
        }.bind(this), 0);
        this.props.onEdit();
    }

    render() {
        return (
            <div className={'formula-creator' + (this.state.error === true ? " error" : (this.state.error === false) ? ' success' : '')}>
                <label htmlFor="formula-input">Enter formula:</label>
                <div className="input-container">
                    <input ref="input"
                           type="text"
                           id="formula-input"
                           value={this.state.value}
                           onChange={this.handleChange.bind(this)}
                           onFocus={this.handleFocus.bind(this)}
                           onBlur={this.handleBlur.bind(this)}
                           onKeyDown={this.handleKeyDown.bind(this)}
                           autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
                </div>
                <div className="symbols">
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2200')}>&forall;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2203')}>&exist;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2227')}>&and;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u0026')}>&amp;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2228')}>&or;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u2192')}>&rarr;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u00AC')}>&not;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u22A4')}>&#8868;</span>
                    <span onMouseDown={this.insertSymbol.bind(this, '\u22A5')}>&#8869;</span>
                </div>
                <dl>
                    <dt>Conventions:</dt>
                    <dd>A...Z for predicates/propositions, a...t for constants, u...z for variables, strict bracketing</dd>
                </dl>
            </div>
        );
    }
}
