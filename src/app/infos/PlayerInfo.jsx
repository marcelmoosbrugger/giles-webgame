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
 * Renders some information about the player assignment
 */
export default class PlayerInfo extends React.Component {
    render () {
        return (
            <div className="player-info">
                <p>
                    For both players it is possible to play them manually or to let them be played
                    by the computer.
                </p>
                <p>
                    All players handled by the computer are rational and play the best possible strategy for them.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
