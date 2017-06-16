/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/ModelPage.scss';
import { Link } from 'react-router-dom';
import DomainCreator from 'Presentationals/DomainCreator.jsx';
import VariableAssigner from 'Presentationals/VariableAssigner.jsx';
import PredicateAssigner from 'Presentationals/PredicateAssigner.jsx';
import Parser from 'Purs/Formula/Parser.purs';
import Formula from 'Purs/Formula/Info.purs';
import Model from 'Purs/Model.purs';
import Quorum from 'Validation/Quorum';

/**
 * Represents the page in which the user can enter a logical model for a formula
 */
export default class ModelPage extends React.Component {

    /**
     * @param props.formula The formula for which the model should be created
     * @param props.model The existing state of the model
     * @param props.addDomainElement The callback for adding a domain element
     * @param props.removeDomainElement The callback for removing a domain element
     * @param props.setVariableAssignment The callback for setting a variable assignment
     * @param props.setPredicateAssignment The callback for setting a predicate assignment
     * @param props.beforeStartGame Callback gets called before the game is actually started
     */
    constructor(props) {
        super(props);

        // Parse the the formula right away, so it does not need to be done on every render
        this.formula = Parser.parse(this.props.formula).value0;
        this.freeVariables = Formula.freeVariables(this.formula);
        this.predicates = Formula.predicates(this.formula);
        this.isPropositional = Formula.isPropositional(this.formula);
        this.modelNeeded = Formula.needsModel(this.formula);

        this.state = {
            valid: !this.modelNeeded,
            errorMessage: '',
            errorMessageVisible: false
        };

        // The model page is considered valid iff all boxes on the page are valid
        // For this purpose we create a validation quorum in which all boxes can vote for validity
        this.validationQuorum = new Quorum(this.getTotalBoxes(), b => this.setState({valid: b}));
    }

    /**
     * @returns {number} The total number of boxes which will be rendered
     */
    getTotalBoxes() {
        let total = 0;
        if (!this.isPropositional) total += 1;
        if (this.freeVariables.length > 0) total += 1;
        total += this.predicates.length;

        return total;
    }

    /**
     * Parses and shows the error message when the start-game-button is hovered.
     */
    handleButtonMouseEnter() {
        let errorMessage = this.validationQuorum.getNegativeMessages().join(', ');
        this.setState({
            errorMessage: errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1),
            errorMessageVisible: true
        });
    }

    /**
     * Hides the error message when the start-game-button is not hovered anymore.
     */
    handleButtonMouseLeave() {
        this.setState({
            errorMessageVisible: false
        });
    }

    /**
     * Starts the game when the start-the-game button is clicked.
     */
    handleButtonClick() {
        if (!this.state.valid) return;

        this.props.beforeStartGame(this.props.formula);
        this.props.history.push('/game');
    }

    /**
     * Renders the domain creator, if the current formula is not just propositional.
     *
     * @returns Possibly the react dom object
     */
    renderDomainCreator() {
        if (!this.isPropositional) {
            return (
                <div className="domain">
                    <DomainCreator
                        validationQuorum={this.validationQuorum}
                        unremovables={Formula.constants(this.formula)}
                        domain={this.props.model.domain}
                        addElement={this.props.addDomainElement}
                        removeElement={this.props.removeDomainElement}
                    />
                </div>
            )
        }
    }

    /**
     * Renders the free variable assigner, if there are free variables.
     *
     * @returns Possibly the react dom object
     */
    renderVariableAssigner() {
        if (this.freeVariables.length > 0) {
            return (
                <div className="free-variables">
                    <VariableAssigner
                        validationQuorum={this.validationQuorum}
                        variables={this.freeVariables}
                        elements={this.props.model.domain}
                        assignments={this.props.model.variables}
                        onChange={this.props.setVariableAssignment}
                    />
                </div>
            )
        }
    }

    /**
     * Renders information on what to do, if a model is needed
     *
     * @returns Possibly the react dom object
     */
    renderModelInfo() {
        if (this.modelNeeded) {
            return (
                <span>Enter a model for <Link to="/formula">{ this.props.formula }</Link>:</span>
            );
        }
    }

    /**
     * Renders the info that no model is needed, if that's the case
     *
     * @returns Possibly the react dom object
     */
    renderNoModelNeededInfo() {
        if (!this.modelNeeded) {
            return (
                <span className="no-model">No model needed for the formula <Link to="/formula">{ this.props.formula }</Link>.</span>
            );
        }
    }

    render() {
        return (
            <div className="model-page">
                {this.renderModelInfo()}
                <div className="model">
                    {this.renderNoModelNeededInfo()}
                    {this.renderDomainCreator()}
                    {this.renderVariableAssigner()}
                    {this.predicates.map((predicate, i) => {
                        return (
                            <div key={i} className="predicate">
                                <PredicateAssigner
                                    validationQuorum={this.validationQuorum}
                                    predicate={predicate}
                                    values={Model.getPredicateAssignment(predicate.name)(this.props.model).values}
                                    elements={this.props.model.domain}
                                    onChange={this.props.setPredicateAssignment.bind(this, predicate.name)}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="next-row">
                    <button
                        className={!this.state.valid ? 'disabled' : ''}
                        onMouseEnter={this.handleButtonMouseEnter.bind(this)}
                        onMouseLeave={this.handleButtonMouseLeave.bind(this)}
                        onClick={this.handleButtonClick.bind(this)}
                    >Start Game</button>
                    <span className={this.state.errorMessageVisible ? 'visible' : ''}>{ this.state.errorMessage }</span>
                </div>
                <div className="background"/>
            </div>
        );
    }
}
