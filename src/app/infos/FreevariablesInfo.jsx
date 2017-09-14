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
 * Renders some information about the free variables of a formula
 */
export default class FreevariablesInfo extends React.Component {
    render () {
        return (
            <div className="free-variables-info">
                <p>
                    All variables which are not bound by a quantifier (&forall;, &exist;) have
                    to be assigned with a single domain element.
                    Another possibility is to quantify the variable in the original formula.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
