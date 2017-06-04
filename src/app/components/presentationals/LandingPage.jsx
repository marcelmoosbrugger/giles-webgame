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
import 'Styles/LandingPage.scss';

export default class LandingPage extends React.Component {

    handleNewGameClick() {
        this.props.beforeNewGame();
    }

    render() {
        return (
            <div className="landing-page">
                <nav>
                    <ul>
                        <li><Link onClick={this.handleNewGameClick.bind(this)} to="/formula" >New game</Link></li>
                        <li><Link to="/about" >About</Link></li>
                    </ul>
                </nav>
                <div className="background"/>
            </div>
        );
    }
}
