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
 * Renders some information about the domain of a formula
 */
export default class FinaltenetInfo extends React.Component {
    render () {
        return (
            <div className="final-tenet-info">
                <p>
                    The tenets in a final state of the game only contain atomic formulas.
                    For each formula &alpha; in a player's tenet a dispersive binary experiment is executed.
                    The experiment succeeds with probability <em>e(&alpha;)</em> and fails with <em>1 - e(&alpha;)</em>.
                </p>
                <p>
                    For every failed experiment the player has o pay 1 &euro; to the other player.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
