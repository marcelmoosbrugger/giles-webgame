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
import Formula from 'Purs/Formula.purs';

/**
 * Represents the component which allows the users
 * to make a decision based on the current active formula.
 */
export default class GameStepper extends React.Component {

    /**
     * Handler which gets executed when a player clicks on a game step.
     *
     * @param gameStep
     */
    handleGameStepClick(gameStep) {
        this.props.onStepFinished(gameStep.value0.map(Formula.toString), gameStep.value1.map(Formula.toString));
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

        return (
            <div className="game-stepper">
                <span className="description">Current formula:</span>
                <span className="formula">{this.props.formula}</span>
                {this.renderRole()}
                <ul className="game-steps">
                    {this.choice.value0.map(this.renderGameStep.bind(this))}
                </ul>
            </div>
        );
    }
}
