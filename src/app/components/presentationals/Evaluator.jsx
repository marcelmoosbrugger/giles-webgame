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
import Parser from 'Purs/Formula/Parser.purs';
import 'Styles/Evaluator.scss';

/**
 * Represents the component which allows the user
 * to evaluate the result of a game.
 */
export default class Evaluator extends React.Component {

    /**
     * @param props.tenet1 The final tenet (only atomic formulae) of player 1
     * @param props.tenet2 The final tenet (only atomic formulae) of player 1
     */
    constructor(props) {
        super(props);
        this.state = {
            tenet1: this.tenetToState(this.props.tenet1),
            tenet2: this.tenetToState(this.props.tenet2),
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

    executeExperiments() {
        const result = {
            tenet1: this.state.tenet1.map(Evaluator.executeExperimentForFormula),
            tenet2: this.state.tenet2.map(Evaluator.executeExperimentForFormula)
        };
        this.setState({
            evaluationResults: [result].concat(this.state.evaluationResults),
            activeIndex: 0
        });
    }

    static executeExperimentForFormula(f) {
        return {
            formula: f.formula,
            value: f.value,
            positive: Math.random() < f.value
        };
    }

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
                <label>Tenet Player {player}</label>
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

    renderResults() {
        if (this.state.evaluationResults.length > 0) {
            return (
                <ul className="table-list">
                    {this.state.evaluationResults.map((result, i) => {
                        const negatives1 = result.tenet1.filter(f => !f.positive).length;
                        const negatives2 = result.tenet2.filter(f => !f.positive).length;
                        const text1 = this.renderResultText("1", negatives2 - negatives1);
                        const text2 = this.renderResultText("2", negatives1 - negatives2);

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

    renderResultText(player, profit) {
        if (profit < 0) {
            return <span>Player {player} <em>lost {-profit} &euro;</em></span>
        } else {
            return <span>Player {player} <em>won {profit} &euro;</em></span>
        }
    }

    /**
     * Renderes the actual evaluation
     *
     * @returns A react-dom-object
     */
    renderEvaluation(tenets) {
        let expectedPaymentPlayer1 = tenets.tenet1.map(e => 1 - e.value).reduce((x, y) => x + y, 0);
        let expectedPaymentPlayer2 = tenets.tenet2.map(e => 1 - e.value).reduce((x, y) => x + y, 0);
        let riskPlayer1 = Math.round((expectedPaymentPlayer1 - expectedPaymentPlayer2) * 100000) / 100000;
        let riskPlayer2 = Math.round((expectedPaymentPlayer2 - expectedPaymentPlayer1) * 100000) / 100000;

        return (
            <div className="evaluation">
                <dl>
                    <dt>Risk:</dt>
                    <dd>Player 1: <em>{riskPlayer1}</em>, Player 2: <em>{riskPlayer2}</em></dd>
                </dl>
                <dl>
                    <dt>Average payoff:</dt>
                    <dd>Player 1: <em>todo</em>, Player 2: <em>todo</em></dd>
                </dl>
                <button onClick={this.executeExperiments.bind(this)}>Execute random experiments</button>
                {this.renderResults()}
            </div>
        );
    }

    render() {
        let tenets = (this.state.activeIndex >= 0) ? this.state.evaluationResults[this.state.activeIndex] : this.state;
        return (
            <div className="evaluator">
                {this.renderTenet('1', tenets.tenet1)}
                {this.renderEvaluation(tenets)}
                {this.renderTenet('2', tenets.tenet2)}
            </div>
        );
    }
}
