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
 * Renders some information about the current formula of a game
 */
export default class CurrentformulaInfo extends React.Component {
    render () {
        return (
            <div className="current-formula-info">
                <p>
                    The current formula is a formula which was just picked from either the tenet of player 1
                    or the tenet of player 2.
                    The player from who's tenet the formula was taken acts as the proponent.
                    The other player acts as the opponent.
                    Depending on the outer connective of the formula a choice has the be made and
                    the game continues in the resulting state.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
