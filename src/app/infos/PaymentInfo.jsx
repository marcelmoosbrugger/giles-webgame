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
 * Renders some information about the payment after a game
 */
export default class PaymentInfo extends React.Component {
    render () {
        return (
            <div className="payment-info">
                <p>
                    If the binary experiments are actually executed, the outcome of the game may differ from
                    the expected outcome.
                </p>
                <p>
                    However, sooner or later the average payment converges to the risk.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
