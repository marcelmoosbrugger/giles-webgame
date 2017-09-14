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
 * Renders some information about the roles
 */
export default class RoleInfo extends React.Component {
    render () {
        return (
            <div className="role-info">
                <p>
                    Players can have a role associated to them.
                    The either act as <em>proponent</em> or <em>opponent</em>, depending from who's
                    tenet the current formula was picked.
                </p>
                <Link to="/about">More information</Link>
            </div>
        );
    }
}
