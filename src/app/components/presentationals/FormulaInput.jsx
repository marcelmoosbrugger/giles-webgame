/*
 * This file is part of Gile's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import '../../style/FormulaInput.scss';

export default class FormulaInput extends React.Component {
    render() {
        return (
            <div className="formula-input">
                <label htmlFor="formula-input">Enter formula:</label>
                <input id="formula-input" type="text"/>
                <div className="symbols">
                    <span>&forall;</span>
                    <span>&exist;</span>
                    <span>&and;</span>
                    <span>&amp;</span>
                    <span>&or;</span>
                    <span>&rarr;</span>
                    <span>&not;</span>
                </div>
            </div>
        );
    }
}
