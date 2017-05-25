/*
 * This file is part of Gile's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/Header.scss';

export default class Header extends React.Component {
    render () {
        return (
            <div className="header">
                <Link to="/" className="logo">Gile's Game</Link>
                <div className="author">Made with love by <a href="https://github.com/mmsbrggr">@mmsbrggr</a></div>
            </div>
        );
    }
}
