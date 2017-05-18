import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../presentationals/LandingPage.jsx';
import AboutPage from '../presentationals/AboutPage.jsx';

export default class RootContainer extends React.Component {
    render () {
        return (
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/about" component={AboutPage} />
            </Switch>
        );
    }
}
