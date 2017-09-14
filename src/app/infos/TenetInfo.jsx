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
 * Renders some information about the tenets
 */
export default class TenetInfo extends React.Component {
    render () {
        return (
            <div className="tenet-info">
                <p>
                    Each player has an associated tenet, which is just a multiset of formulas.
                    In a sense, the formulas in a player's tenet are the ones asserted by the player.
                    When a formula is picked, the player from who's tenet the formula was taken acts
                    as the proponent of the formula.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
