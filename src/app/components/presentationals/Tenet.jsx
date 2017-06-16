/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/Tenet.scss';

/**
 * Represents a tenet containing formulae
 */
export default class Tenet extends React.Component {

    /**
     * Handles the click on a formula and passes the clicked
     * formula to the callback from the properties.
     *
     * @param formula
     * @returns {boolean}
     */
    handleFormulaClick(formula) {
        if (!this.props.selectable) return false;

        this.props.onSelect(formula);
    }

    /**
     * Renders an indicator that there are no formulae in the tenet.
     *
     * @returns A react dom object
     */
    static renderEmptyInfo() {
        return <span className="no-formulae">The tenet is empty</span>
    }

    /**
     * Renders the list of formulae.
     *
     * @returns A react dom object
     */
    renderFormulae() {
        return (
            <ul>
                {this.props.formulae.map((formula, i) => {
                    return (
                        <li key={i} onClick={this.handleFormulaClick.bind(this, formula)}>
                            <span className="fa-star-o icon"/>
                            <span>{formula}</span>
                        </li>
                    )
                })}
            </ul>
        );
    }

    render() {
        return (
            <div className={'box tenet' + (this.props.selectable ? ' selectable' : '')}>
                <label>Tenet Player {this.props.player}</label>
                {this.props.formulae.length > 0 ? this.renderFormulae() : Tenet.renderEmptyInfo()}
            </div>
        );
    }
}
