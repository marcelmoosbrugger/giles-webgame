/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import QuorumValidateable from 'Abstracts/QuorumValidatable';
import 'Styles/PredicateAssigner.scss';
import InfoLink from 'Containers/InfoLink.jsx';
import Model from 'Purs/Model.purs';

/**
 * A class which allows to assign truth values to a predicate for all
 * different combinations of possible arguments.
 */
export default class PredicateAssigner extends QuorumValidateable {

    /**
     * Overrides the method from QuorumValidateable. It considers the component valid
     * iff all possible combinations of arguments have been assigned with a truth value.
     *
     * @param props
     */
    validate(props = this.props) {
        const isValid = props.values.length === Math.pow(props.elements.length, props.predicate.arity);
        if (isValid) {
            this.voteValidity(true);
        } else {
            this.voteValidity(false, 'an assignment for the predicate ' + props.predicate.name + ' is missing');
        }
    }

    /**
     * Handles the the onChange event of a single input for one combination of arguments.
     *
     * @param args The arguments combination
     * @param event
     * @returns {boolean} True iff the value has been correctly changed
     */
    onChange(args, event) {
        const value = Number(event.target.value);

        if (!isNaN(value) && value >= 0 && value <= 1) {
            this.validate();
            this.props.onChange(args, value);
            return true;
        }

        return false;
    }

    /**
     * @param args The combination of arguments for which the truth value should be returned
     * @returns {string|number} The truth value which has been assigned the the given combination of arguments
     */
    getValueForArgs(args) {
        const a = this.props.values.filter((v) => {
            return JSON.stringify(v.args) === JSON.stringify(args);
        });

        return (a.length > 0) ? a[0].value : '';
    }

    /**
     * Renderes the description and number input field for a given combination of arguments.
     *
     * @param args The combination of arguments for which to render the elements
     * @param index
     * @returns The react dom element
     */
    renderForArguments(args, index) {
        const argsString = args.length > 0 ? '(' + args.join(',') + ')' : '';
        return (
            <li key={index}>
                <span>|{this.props.predicate.name}{argsString}|</span>
                <span>=</span>
                <input
                    type="number"
                    min="0" max="1" step="0.01"
                    value={this.getValueForArgs(args)}
                    onChange={this.onChange.bind(this, args)}
                />
            </li>
        );
    }

    /**
     * Renders the body of the component. Either inputs and descriptions for every combination of arguments
     * or a hint that there are not combinations to assign truth values for.
     *
     * @param combinations
     * @returns The react dom element
     */
    renderBody(combinations) {
        if (combinations.length > 0) {
            return <ul>{combinations.map((args, i) => this.renderForArguments(args, i))}</ul>
        }

        return <span className="no-elements">Add domain elements</span>
    }

    render() {
        const combinations = Model.getAllArgsCombinations(this.props.elements)(this.props.predicate.arity);
        const label = this.props.predicate.arity > 0 ? 'Predicate' : 'Proposition';
        const infoKey = this.props.predicate.arity > 0 ? 'predicate' : 'proposition';
        return (
            <div className="predicate-assigner box">
                <InfoLink infoKey={infoKey}>
                    <label>{label} {this.props.predicate.name}</label>
                </InfoLink>
                {this.renderBody(combinations)}
            </div>
        );
    }
}
