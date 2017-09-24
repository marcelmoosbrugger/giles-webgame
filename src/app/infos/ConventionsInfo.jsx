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
 * Renders some information about the conventions of the syntax for formulae
 */
export default class ConventionsInfo extends React.Component {
    render () {
        return (
            <div className="convention-info">
                <p>
                    The syntax used for the formulas follows the one used in the main literature.
                    For predicate and proposition symbols uppercase letters are allowed.
                    The lowercase letters <em>a</em> to <em>t</em> as well as numbers are reserved for constants.
                    There are no functions, as it's assumed that every element in the domain has
                    a corresponding constant symbol.
                    For variables, letters <em>u</em> to <em>z</em> can be used.
                    All symbols can be followed by arbitrary primes <em>'</em>.
                </p>
                <p>
                    At has to be mentioned that the bracketing is strict and no brackets can be omitted.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
