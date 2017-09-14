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
 * Renders some information about the risk
 */
export default class RiskInfo extends React.Component {
    render () {
        return (
            <div className="risk-info">
                <p>
                    The risk for a player, is the expected amount of money she or he has to pay to the other player,
                    based on the probabilities of the associated binary experiments.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
