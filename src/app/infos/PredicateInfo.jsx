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
 * Renders some information about the predicates of a formula
 */
export default class PredicateInfo extends React.Component {
    render () {
        return (
            <div className="predicate-info">
                <p>
                    In Łukasiewicz logic the semantic of a predicate is a number between 0 and 1, depending
                    on the predicate's arguments.
                    Therefore, for every possible combination of arguments the semantic for the predicate has
                    to be given.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
