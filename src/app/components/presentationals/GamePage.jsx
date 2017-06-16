/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import Tenet from 'Presentationals/Tenet.jsx';
import 'Styles/GamePage.scss';

/**
 * Represents the page where the actual game is played
 */
export default class GamePage extends React.Component {

    onTenetSelectFormula(player, formula) {
        this.props.activateFormula(player, formula);
    }

    renderDecision() {
        if (!this.props.activeFormula) {
            return <span className="no-formula">Select a formula from the tenets</span>
        }
    }

    render() {
        return (
            <div className="game-page">
                <Tenet
                    player="1"
                    formulae={this.props.tenet1}
                    selectable={!this.props.activeFormula}
                    onSelect={this.onTenetSelectFormula.bind(this, '1')}
                />
                <div className="decision">
                    {this.renderDecision()}
                </div>
                <Tenet
                    player="2"
                    formulae={this.props.tenet2}
                    selectable={!this.props.activeFormula}
                    onSelect={this.onTenetSelectFormula.bind(this, '2')}
                />
            </div>
        );
    }
}
