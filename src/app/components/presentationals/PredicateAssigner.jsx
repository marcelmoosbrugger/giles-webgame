/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/PredicateAssigner.scss';
import Model from 'Purs/Model.purs';

/**
 * A class which allows the user to assign given elements to given variables
 */
export default class PredicateAssigner extends React.Component {

    onChange(args, event) {
        this.props.onChange(args, event.target.value);
    }

    getValueForArgs(args) {
        const a = this.props.values.filter((v) => {
            return JSON.stringify(v.args) === JSON.stringify(args);
        });

        return (a.length > 0) ? a[0].value : undefined;
    }

    renderForArguments(args, index) {
        return (
            <li key={index}>
                <span>|{this.props.predicate.name}({args.join(',')})|</span>
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

    render() {
        const combinations = Model.getAllArgsCombinations(this.props.elements)(this.props.predicate.arity);
        return (
            <div className="predicate-assigner box">
                <label>Predicate {this.props.predicate.name}</label>
                <ul>
                    {combinations.map((args, i) => this.renderForArguments(args, i))}
                </ul>
            </div>
        );
    }
}
