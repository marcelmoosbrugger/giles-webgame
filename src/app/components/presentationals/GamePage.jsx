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
import GilesGame from 'Purs/GilesGame.purs';
import Evaluator from 'Presentationals/Evaluator.jsx';
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

        if (this.props.activeFormula.proponent === player) {
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
     * @param gameStep The game step to apply
     */
    onGameStep(gameStep) {
        this.props.executeGameStep(this.props.activeFormula.proponent, gameStep);
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
                    proponent={this.props.activeFormula.proponent}
                    domain={this.props.model.domain}
                    onStepFinished={this.onGameStep.bind(this)}
                />
            );
        }
    }

    render() {
        // Render components which lets the user evaluate the result, if the game is over
        if (!this.props.activeFormula) {
            if (GilesGame.tenetIsAtomic(this.props.gameState.tenet1) && GilesGame.tenetIsAtomic(this.props.gameState.tenet2)) {
                return (
                    <div className="game-page">
                        <Evaluator
                            model={this.props.model}
                            finalGameState={this.props.gameState}
                        />
                    </div>
                );
            }
        }

        // Render components which lets the two players play, if the game is not over
        return (
            <div className="game-page">
                <Tenet
                    player="1"
                    formulae={this.props.gameState.tenet1}
                    selectable={!this.props.activeFormula}
                    role={this.getRoleForPlayer('1')}
                    onSelect={this.onTenetSelectFormula.bind(this, '1')}
                />
                <div className="decision">{this.renderDecision()}</div>
                <Tenet
                    player="2"
                    formulae={this.props.gameState.tenet2}
                    selectable={!this.props.activeFormula}
                    role={this.getRoleForPlayer('2')}
                    onSelect={this.onTenetSelectFormula.bind(this, '2')}
                />
            </div>
        );
    }
}
