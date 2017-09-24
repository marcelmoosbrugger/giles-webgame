/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import Lukasiewicz from 'Purs/Lukasiewicz.purs';
import GilesGame from 'Purs/GilesGame.purs';
import Parser from 'Purs/Formula/Parser.purs';
import InfoLink from 'Containers/InfoLink.jsx';
import 'Styles/Evaluator.scss';


/**
 * Represents the component which allows the user
 * to evaluate the result of a game.
 */
export default class Evaluator extends React.Component {

    /**
     * @param props.model The model in which the final game state gets evaluated
     * @param props.finalGameState The final state of the game to evaluate (only atomic formulae)
     */
    constructor(props) {
        super(props);
        this.state = {
            tenet1: this.tenetToState(this.props.finalGameState.tenet1),
            tenet2: this.tenetToState(this.props.finalGameState.tenet2),
            activeIndex: undefined,
            evaluationResults: []
        };
    }

    /**
     * Converts a tenet to a representation needed to render this component
     *
     * @param tenet
     */
    tenetToState(tenet) {
        return tenet.map(f => {return {
            formula: f,
            value: Lukasiewicz.evaluate(this.props.model)(Parser.parse(f).value0),
        }});
    }

    /**
     * Calculates the average total payment made by a given player over all evaluation results.
     *
     * @param player The player to calculate the avg payment for
     * @returns {String|Number} The average or "-" if no evaluation results exist
     */
    getAvgPayment(player) {
        if (this.state.evaluationResults.length === 0) return '-';

        const paymentKey = 'payment' + player;
        let avgPayment = this.state.evaluationResults.map(r => r[paymentKey]).reduce((x,y) => x+y, 0);
        avgPayment /= this.state.evaluationResults.length;

        return Math.round(avgPayment * 100) / 100;
    }

    /**
     * Executes the random experiments for all atomic formula in the tenets a given number of times.
     *
     * @param times
     */
    executeExperiments(times) {
        let results = this.state.evaluationResults;
        for (let i = 0; i < times; i++) {
            const result = {
                tenet1: this.state.tenet1.map(Evaluator.executeExperimentForFormula),
                tenet2: this.state.tenet2.map(Evaluator.executeExperimentForFormula)
            };
            const negatives1 = result.tenet1.filter(f => !f.positive).length;
            const negatives2 = result.tenet2.filter(f => !f.positive).length;
            result.payment1 = negatives1 - negatives2;
            result.payment2 = negatives2 - negatives1;

            results = results.concat([result]);
        }
        this.setState({ evaluationResults: results, activeIndex: results.length - 1 });
    }

    /**
     * For a given formula the method performs tha actual experiment and
     * returns an object representing the result.
     *
     * @param f
     * @returns {{formula, value, positive: boolean}}
     */
    static executeExperimentForFormula(f) {
        return {
            formula: f.formula,
            value: f.value,
            positive: Math.random() < f.value
        };
    }

    /**
     * Handles the click on a result item with a given index
     *
     * @param index
     */
    onResultClick(index) {
        this.setState({
            activeIndex: index
        });
    }

    /**
     * Renders a given tenet
     *
     * @param player The player to which the tenet belongs
     * @param tenet The tenet to render
     * @returns A react dom-object
     */
    renderTenet(player, tenet) {
        return (
            <div className="box tenet">
                <InfoLink infoKey="finaltenet">
                    <label>Tenet Player {player}</label>
                </InfoLink>
                {(() => {
                   if (tenet.length === 0) {
                       return <span className="no-formulae">The tenet is empty</span>
                   } else {
                       return (
                           <ul>
                               {tenet.map((tenetEntry, i) => {
                                   return (
                                       <li
                                           key={i}
                                           className={
                                               tenetEntry.positive === true ? 'positive' :
                                               tenetEntry.positive === false ? 'negative' : ''
                                           }
                                       >
                                           <span>{tenetEntry.formula}</span>
                                           <span><span className="thin">value:</span> {tenetEntry.value}</span>
                                       </li>
                                   )
                               })}
                           </ul>
                       );
                   }
                })()}
            </div>
        );
    }

    /**
     * Renders the list showing all evaluation results
     *
     * @returns A react-dom-object
     */
    renderResults() {
        if (this.state.evaluationResults.length > 0) {
            return (
                <ul className="table-list">
                    {this.state.evaluationResults.map((result, i) => {
                        const text1 = this.renderResultText("1", result.payment1);
                        const text2 = this.renderResultText("2", result.payment2);

                        return (
                            <li
                                key={i}
                                onClick={this.onResultClick.bind(this, i)}
                                className={i === this.state.activeIndex ? 'active' : ''}
                            >{text1} {text2}</li>
                        );
                    })}
                </ul>
            );
        }
    }

    /**
     * Renders the text displayed in a evaluation result item for a given player
     * and the total payment made by this player in that evaluation.
     *
     * @param player
     * @param payment
     * @returns {XML}
     */
    renderResultText(player, payment) {
        if (payment <= 0) {
            return <span>Player {player} <em>won {-payment} &euro;</em></span>
        } else {
            return <span>Player {player} <em>lost {payment} &euro;</em></span>
        }
    }

    /**
     * Renders the evaluation container containing the buttons and the evaluation results.
     *
     * @returns A react-dom-object
     */
    renderEvaluation() {
        const riskPlayer1 = GilesGame.riskForGameState(this.props.model)(this.props.finalGameState);
        const riskPlayer2 = riskPlayer1 * (-1);
        const avgPayment1 = this.getAvgPayment('1');
        const avgPayment2 = this.getAvgPayment('2');

        return (
            <div className="evaluation">
                <InfoLink infoKey="risk">
                    <dl>
                        <dt>Risk:</dt>
                        <dd>Player 1: <em>{riskPlayer1}</em>, Player 2: <em>{riskPlayer2}</em></dd>
                    </dl>
                </InfoLink>
                <InfoLink infoKey="payment">
                    <dl>
                        <dt>Average Payment:</dt>
                        <dd>Player 1: <em>{avgPayment1}</em>, Player 2: <em>{avgPayment2}</em></dd>
                    </dl>
                </InfoLink>
                <div className="buttons">
                    <div className="overlay">Execute random experiments</div>
                    <button onClick={this.executeExperiments.bind(this, 1)}>1 time</button>
                    <button onClick={this.executeExperiments.bind(this, 10)}>10 times</button>
                </div>
                <p className="hint">
                    The individual outcomes of the game can be clicked on.
                    The colors of the atomic formulas in the tenets illustrate whether or not
                    the associated experiment was successful (green) or failed (red).
                </p>
                {this.renderResults()}
            </div>
        );
    }

    render() {
        let tenets = (this.state.activeIndex >= 0) ? this.state.evaluationResults[this.state.activeIndex] : this.state;
        return (
            <div className="evaluator">
                {this.renderTenet('1', tenets.tenet1)}
                {this.renderEvaluation()}
                {this.renderTenet('2', tenets.tenet2)}
            </div>
        );
    }
}
