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
import 'Styles/VariableAssigner.scss';

/**
 * A class which allows the user to assign given elements to given variables
 */
export default class VariableAssigner extends QuorumValidateable {

    /**
     * Overrides the method from QuorumValidateable. It consideres the component
     * valid if every variable has been assigned with an element.
     *
     * @param props
     */
    validate(props = this.props) {
        const isValid = props.variables.length === props.assignments.length;
        if (isValid) {
            this.voteValidity(true);
        } else {
            this.voteValidity(false, 'a variable assignment is missing');
        }
    }

    /**
     * @param variable The variable for which the currently assigned element should be returned
     * @returns {string} The element assigned to a given variable
     */
    getAssignedElement(variable) {
        let assignment = this.props.assignments.filter((a) => a.variable === variable);
        assignment = assignment[0] || {element: ''};
        return assignment.element;
    }

    /**
     * Handles the change event of the select component for a given variable.
     *
     * @param variable The variable to handle the change event for
     * @param event
     */
    handleSelectChange(variable, event) {
        this.props.onChange(variable, event.target.value);
        this.validate();
    }

    /**
     * Renders the description and select for a single variable.
     *
     * @param variable The variable to render the description an select for
     * @param index
     * @returns The react dom element
     */
    renderVariable(variable, index) {
        const value = this.getAssignedElement(variable);

        return (
            <li key={index}>
                <span>{variable}</span>
                <span>&#x21a6;</span>
                <label className="select">
                    <select
                        value={value}
                        onChange={this.handleSelectChange.bind(this, variable)}
                    >
                        <option value="" disabled>Please choose</option>
                        {this.props.elements.map((element, index2) => {
                            return <option key={index + index2} value={element}>{element}</option>
                        })}
                    </select>
                </label>
            </li>
        );
    }

    render() {
        return (
            <div className="variable-assigner box">
                <label>Free variables</label>
                <ul>
                    {this.props.variables.map(this.renderVariable.bind(this))}
                </ul>
            </div>
        );
    }
}
