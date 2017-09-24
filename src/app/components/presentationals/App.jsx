/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from 'Containers/LandingPage.jsx';
import AboutPage from 'Presentationals/AboutPage.jsx';
import FormulaPage from 'Containers/FormulaPage.jsx';
import ModelPage from 'Containers/ModelPage.jsx';
import GamePage from 'Containers/GamePage.jsx';
import Header from "Presentationals/Header.jsx";
import 'Styles/App.scss';

/**
 * Renders the complete app. This is the root component
 */
export default class App extends React.Component {

    constructor() {
        super();
        this.handleGlobalKeyDown = this.handleGlobalKeyDown.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleGlobalKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleGlobalKeyDown);
    }

    handleGlobalKeyDown(event) {
        if (event.keyCode === 27) {
            this.props.hideInfoSidebar();
        }
    }

    static getInfoComponentName(content) {
        let name = content.charAt(0).toUpperCase() + content.slice(1);
        name += 'Info.jsx';

        return name;
    }

    render () {
        let InfoComponent = null;
        if (!!this.props.infoContent) {
            InfoComponent = require('Infos/' + App.getInfoComponentName(this.props.infoContent)).default;
        }

        return (
            <div className="app">
                <aside className={this.props.infoIsVisible ? 'visible' : 'hidden'}>
                    <div onClick={this.props.hideInfoSidebar} className="close"/>
                    {!!InfoComponent? <InfoComponent/> : null}
                </aside>
                <main>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/formula" component={FormulaPage} />
                        <Route path="/model" component={ModelPage} />
                        <Route path="/game" component={GamePage} />
                    </Switch>
                </main>
            </div>
        );
    }
}
