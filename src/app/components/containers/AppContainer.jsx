/*
 * This file is part of Gile's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../presentationals/LandingPage.jsx';
import AboutPage from '../presentationals/AboutPage.jsx';
import SyntaxPage from '../presentationals/SyntaxPage.jsx';
import Header from "../presentationals/Header.jsx";
import '../../style/AppContainer.scss';

export default class AppContainer extends React.Component {
    render () {
        return (
            <div className="app">
                <Header/>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/syntax" component={SyntaxPage} />
                </Switch>
            </div>
        );
    }
}
