/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/FormulaInput.scss';
import Test from 'Purs/Test';

/**
 * A class for inserting a first order formula.
 */
export default class FormulaInput extends React.Component {
    constructor(props) {
        console.log(Test);
        super(props);
        this.state = {value: ''};
        this.insertPosition = 0;
    }

    handleBlur() {
        this.insertPosition = this.refs.input.selectionStart;
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    /**
     * Inserts a given symbol at the position saved at the last blur.
     * After that the cursor is positioned right after the inserted symbol.
     * @param symbol
     */
    insertSymbol(symbol) {
        const value = this.state.value.slice(0, this.insertPosition) + symbol + this.state.value.slice(this.insertPosition);
        this.setState({value});
        this.refs.input.focus();
        setTimeout(function () {
            this.refs.input.setSelectionRange(this.insertPosition + 1, this.insertPosition + 1);
        }.bind(this), 0)
    }

    /**
     * @returns {string} The formula of of the input
     */
    getFormula() {
        return this.state.value;
    }

    render() {
        return (
            <div className="formula-input">
                <label htmlFor="formula-input">Enter formula:</label>
                <input ref="input"
                       type="text"
                       id="formula-input"
                       value={this.state.value}
                       onChange={this.handleChange.bind(this)}
                       onBlur={this.handleBlur.bind(this)}
                       autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"/>
                <div className="symbols">
                    <span onClick={this.insertSymbol.bind(this, '\u2200')}>&forall;</span>
                    <span onClick={this.insertSymbol.bind(this, '\u2203')}>&exist;</span>
                    <span onClick={this.insertSymbol.bind(this, '\u2227')}>&and;</span>
                    <span onClick={this.insertSymbol.bind(this, '\u0026')}>&amp;</span>
                    <span onClick={this.insertSymbol.bind(this, '\u2228')}>&or;</span>
                    <span onClick={this.insertSymbol.bind(this, '\u2192')}>&rarr;</span>
                    <span onClick={this.insertSymbol.bind(this, '\u00AC')}>&not;</span>
                </div>
                <dl>
                    <dt>Conventions:</dt>
                    <dd>A...Z for predicates/propositions, a...t for constants, u...z for variables</dd>
                </dl>
            </div>
        );
    }
}
