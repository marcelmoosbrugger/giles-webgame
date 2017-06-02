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
import Parser from 'Purs/Formula/Parser.purs';

/**
 * A class for inserting a first order formula.
 */
export default class FormulaInput extends React.Component {

    /**
     * @param props.onError The callback gets called if the user enters a not parsable formula
     * @param props.onSuccess The callback gets called if the user enters a valid formula
     */
    constructor(props) {
        super(props);
        this.state = {value: '', error: undefined, errorAt: 0};
        this.ignoreNextBlur = false;
    }

    handleBlur() {
        if (this.ignoreNextBlur) return;

        const formula = Parser.parse(this.state.value);
        this.setState({error: formula.constructor.name === 'Left'});

        if (formula.constructor.name === 'Left') {
            this.setState({errorAt: formula.value0.value1.column - 1})
            this.props.onError(this.state.value);
        } else {
            this.props.onSuccess(formula.value0);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleFocus() {
        this.ignoreNextBlur = false;
        this.setState({error: undefined});
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
        }.bind(this), 0)
    }

    render() {
        return (
            <div className={'formula-input' + (this.state.error === true ? " error" : (this.state.error === false) ? ' success' : '')}>
                <label htmlFor="formula-input">Enter formula:</label>
                <div className="input-container">
                    <input ref="input"
                           type="text"
                           id="formula-input"
                           value={this.state.value}
                           onChange={this.handleChange.bind(this)}
                           onFocus={this.handleFocus.bind(this)}
                           onBlur={this.handleBlur.bind(this)}
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
                <dl className="mistake">
                    <dt>There seems to be a mistake:</dt>
                    <dd>{this.state.value.substr(0, this.state.errorAt)}<span>{this.state.value.substr(this.state.errorAt)}</span></dd>
                </dl>
            </div>
        );
    }
}
