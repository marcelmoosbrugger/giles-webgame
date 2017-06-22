/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/GameStepper.scss';
import Parser from 'Purs/Formula/Parser.purs';
import GilesGame from 'Purs/GilesGame.purs';
import Player from 'Purs/GilesGame/Player.purs';

/**
 * Represents the component which allows the users
 * to make a decision based on the current active formula.
 */
export default class GameStepper extends React.Component {

    /**
     * Executes all passed functions with an increasing delay.
     * The first function gets executed after 5 seconds, the second function after 10 seconds and so on.
     */
    static computerPlayerActivity() {
        for (let i = 0; i < arguments.length; i++) {
            setTimeout(arguments[i], 5000 * (i + 1));
        }
    }

    /**
     * Takes an action of a computer player and executes it.
     *
     * @param action
     */
    loadComputerAction(action) {
        if (action.actionType.constructor.name === 'DoNothing') return;

        this.computerWillChoose = true;
        GameStepper.computerPlayerActivity(
            () => this.domChoices[action.gameStepIndex].classList.add('computer-will-select'),
            () => this.props.onStepFinished(action.gameStep)
        );
    }

    /**
     * For a given player it returns the current role of the player.
     *
     * @param player
     * @returns {Object} The curren trole of the player
     */
    getRoleForPlayer(player) {
        if (this.props.proponent === player) {
            return new GilesGame.Proponent();
        }

        return new GilesGame.Opponent();
    }

    /**
     * Handler which gets executed when a player clicks on a game step.
     *
     * @param gameStep
     */
    handleGameStepClick(gameStep) {
        if (this.computerWillChoose === true) return false;

        this.props.onStepFinished(gameStep);
    }

    /**
     * Renders the role of the player who is allowed to choose the next game step.
     *
     * @returns A react dom-object
     */
    renderRole() {
        const role = this.choice.value1.constructor.name.toLowerCase();
        return (
            <span className="role">
                The <span className={role}>{role}</span> has to choose how to continue the game:
            </span>
        );
    }

    /**
     * Renders a single game step on which the user can click.
     *
     * @param gameStep
     * @param i
     * @returns A react dom-object
     */
    renderGameStep(gameStep, i) {
        return (
            <li
                ref={step => {this.domChoices[i] = step}}
                key={i}
                onClick={this.handleGameStepClick.bind(this, gameStep)}
            >
                {GilesGame.stepToString(gameStep)}
            </li>
        );
    }

    render() {
        this.formula = Parser.parse(this.props.formula).value0;
        this.choice = GilesGame.getChoice(this.props.domain)(this.formula);
        this.domChoices = [];
        this.computerWillChoose = false;
        this.decideOnAction = player => Player.decideOnAction
            (this.props.model)
            (this.props.gameState)
            (this.props.proponent)
            (player)
            (this.getRoleForPlayer(player))
            (this.choice);

        // If either of the player is a computer, we decide
        // on an action and laod the action up
        if (this.props.players.player1 === 'COMPUTER') {
            const action = this.decideOnAction('1');
            this.loadComputerAction(action);
        }
        if (this.props.players.player2 === 'COMPUTER') {
            const action = this.decideOnAction('2');
            this.loadComputerAction(action);
        }

        return (
            <div className="game-stepper">
                <span className="description">Current formula:</span>
                <span className="formula">{this.props.formula}</span>
                {this.renderRole()}
                <ul className="table-list">
                    {this.choice.value0.map(this.renderGameStep.bind(this))}
                </ul>
            </div>
        );
    }
}
