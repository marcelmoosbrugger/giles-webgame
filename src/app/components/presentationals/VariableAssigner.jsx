/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/VariableAssigner.scss';

/**
 * A class which allows the user to assign given elements to given variables
 */
export default class VariableAssigner extends React.Component {

    /**
     * Returns for a variable, the currently assigned element
     * @param variable
     * @returns {string} The empty string if nothing is assigned to the variable
     */
    getAssignedElement(variable) {
        let assignment = this.props.assignments.filter((a) => a.variable === variable);
        assignment = assignment[0] || {element: ''};
        return assignment.element;
    }

    handleSelectChange(variable, event) {
        this.props.onChange(variable, event.target.value);
    }

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
