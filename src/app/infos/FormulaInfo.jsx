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
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
