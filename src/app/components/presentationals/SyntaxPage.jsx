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
import 'Styles/SyntaxPage.scss';
import Formula from 'Purs/Formula/Info.purs';

export default class SyntaxPage extends React.Component {

    onError(f) {
        console.log('Failure', f);
    }

    onSuccess(f) {
        console.log('Success', f);
        console.log('Free variables', Formula.freeVariables(f));
        console.log('Constants', Formula.constants(f));
        console.log('Predicates', Formula.predicates(f));
    }

    render() {
        return (
            <div className="syntax-page">
                <div>
                    <FormulaInput
                        onError={this.onError.bind(this)}
                        onSuccess={this.onSuccess.bind(this)}
                    />
                    <button>Next</button>
                    <div className="background"/>
                </div>
            </div>
        );
    }
}
