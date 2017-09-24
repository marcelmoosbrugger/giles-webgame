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
export default class DomainInfo extends React.Component {
    render () {
        return (
            <div className="domain-info">
                <p>
                    The domain is the set of semantic elements for the previously defined formula.
                    For every semantic element in the domain, there is a syntactic constant symbol.
                    The element is identified by its symbol.
                    Therefore the strings entered have to start with lower case letters a...t or with
                    the numbers 0...9.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
