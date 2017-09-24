/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import { Link } from 'react-router-dom';


/**
 * Renders some information about the syntax of the formulae
 */
export default class FormulaInfo extends React.Component {
    render () {
        return (
            <div className="formula-info">
                <p>
                    In a Giles's game there are always two players.
                    Each player has a tenet which contains zero or more formulas.
                    The game begins with a single formula - either propositional or first-order - in the
                    tenet of the first player and no formulas in the tenet of the second player.
                    The formula entered here is the one added to the tenet of the first player.
                </p>
                <p>
                    The set F of allowed formulas is defined as follows:
                    <ul>
                        <li>&#8868;&isin;F and &perp;&isin;F</li>
                        <li>P&isin;F. P can be any uppercase character.</li>
                        <li>P(v<sub>1</sub>,...,v<sub>n</sub>)&isin;F. P can be any uppercase character,
                            v<sub>1</sub> to v<sub>n</sub> have to variable or constant symbols (see conventions).</li>
                        <li>&not;&alpha;&isin;F if &alpha;&isin;F</li>
                        <li>(&alpha;&loz;&beta;) if &alpha;,&beta;&isin;F and &loz; is one of: &amp;, &and;, &or;, &rarr;</li>
                        <li>&forall;x&alpha;&isin;F and &exist;x&alpha;&isin;F if &alpha;&isin;F and x is a variable symbol (see conventions).</li>
                    </ul>
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
