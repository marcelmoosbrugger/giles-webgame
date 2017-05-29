/*
 * This file is part of Gile's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import FormulaInput from './FormulaInput.jsx';
import '../../style/SyntaxPage.scss';

export default class SyntaxPage extends React.Component {
    render() {
        return (
            <div className="syntax-page">
                <FormulaInput/>
                <button>Next</button>
            </div>
        );
    }
}
