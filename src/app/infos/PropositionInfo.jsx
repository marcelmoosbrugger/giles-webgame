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
 * Renders some information about the propositions of a formula
 */
export default class PropositionInfo extends React.Component {
    render () {
        return (
            <div className="proposition-info">
                <p>
                    A proposition is just a special case of a predicate, namely one with zero arguments.
                    Therefore, the semantic of the proposition is also a number between 0 and 1.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
