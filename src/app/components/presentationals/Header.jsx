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
import 'Styles/Header.scss';

export default class Header extends React.Component {
    render () {
        return (
            <div className="header">
                <Link to="/" className="logo">
                    <span className="icon">&forall;</span>
                    <span className="fa-heart icon"/>
                    <span className="icon">&exist;</span>
                    <span className="text">Giles's Game</span>
                </Link>
                <div className="author">Made with love by <a target="_blank" href="https://github.com/mmsbrggr">@mmsbrggr</a></div>
            </div>
        );
    }
}
