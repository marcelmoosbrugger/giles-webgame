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
import GameStepper from 'Presentationals/GameStepper.jsx';
import 'Styles/GamePage.scss';

/**
 * Represents the page where the actual game is played
 */
export default class GamePage extends React.Component {

    /**
     * Returns the role of a given player.
     *
     * @param player
     * @returns {String}
     */
    getRoleForPlayer(player) {
        if (!this.props.activeFormula) return '';

        if (this.props.activeFormula.fromPlayer === player) {
            return 'Proponent';
        } else {
            return 'Opponent';
        }
    }

    /**
     * Handles the selection of a formula in one of the tenets.
     *
     * @param player The player to which the tenet belongs
     * @param formula The selected formula
     */
    onTenetSelectFormula(player, formula) {
        this.props.activateFormula(player, formula);
    }

    /**
     * Handler which gets executed after the user has decided on a game step.
     *
     * @param formulasProponent The formulas which need to be added to the proponents tenet
     * @param formulasOpponent The formulas which need to be added to the opponents tenet
     */
    onGameStep(formulasProponent, formulasOpponent) {
        if (this.props.activeFormula.fromPlayer === '1') {
            this.props.applyStep(formulasProponent, formulasOpponent);
        } else {
            this.props.applyStep(formulasOpponent, formulasProponent);
        }
    }

    /**
     * Renders the elements which allow the player to decide on the next game step.
     *
     * @returns A react dom object
     */
    renderDecision() {
        if (!this.props.activeFormula) {
            return <span className="no-formula">Select a formula from the tenets</span>
        } else {
            return (
                <GameStepper
                    formula={this.props.activeFormula.formula}
                    proponent={this.props.activeFormula.fromPlayer}
                    domain={this.props.domain}
                    onStepFinished={this.onGameStep.bind(this)}
                />
            );
        }
    }

    render() {
        return (
            <div className="game-page">
                <Tenet
                    player="1"
                    formulae={this.props.tenet1}
                    selectable={!this.props.activeFormula}
                    role={this.getRoleForPlayer('1')}
                    onSelect={this.onTenetSelectFormula.bind(this, '1')}
                />
                <div className="decision">{this.renderDecision()}</div>
                <Tenet
                    player="2"
                    formulae={this.props.tenet2}
                    selectable={!this.props.activeFormula}
                    role={this.getRoleForPlayer('2')}
                    onSelect={this.onTenetSelectFormula.bind(this, '2')}
                />
            </div>
        );
    }
}
