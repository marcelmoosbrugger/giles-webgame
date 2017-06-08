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
import 'Styles/DomainCreator.scss';

/**
 * Allows the user create a domain (set of elements) for a logical model
 */
export default class DomainCreator extends QuorumValidateable {

    /**
     * @param props.addElement - The callback to add an element
     * @param props.removeElement - The callback to remove an element
     * @param props.unremovables - An array of elements which cannot be removed
     * @param props.domain - The already existing domain (set of elements)
     */
    constructor(props) {
        super(props);
        this.state = { inputValid: false }
    }

    /**
     * Adds the current value of the input as a new element
     */
    addElementFromInput() {
        if (!this.state.inputValid) return;

        this.props.addElement(this.refs.input.value.trim());
        this.refs.input.value = '';
        this.setState({ inputValid: false });
    }

    /**
     * Checks if the value of the input is valid
     */
    handleInputChange() {
        const input = this.refs.input.value.trim();
        this.setState({ inputValid: input.length > 0 && this.props.domain.indexOf(input) === -1 });
    }

    /**
     * Adds the value of the input to the domain if the enter key has been pressed
     *
     * @param event
     */
    handleInputKeyDown(event) {
        if (event.keyCode === 13) {
            this.addElementFromInput();
        }
    }

    /**
     * Removes a given element from the domain
     *
     * @param element
     */
    removeElement(element) {
        this.props.removeElement(element);
    }

    /**
     * Overrides the method from QuorumValidateable. It checks
     * whether or not the current domain is suitable for a logical model
     * and votes for validity or withdraws the vote.
     *
     * @param props
     */
    validate(props = this.props) {
        const isValid = props.domain.length > 0;
        if (isValid) {
            this.voteValidity(true)
        } else {
            this.voteValidity(false, 'the domain is empty');
        }
    }

    render() {
        return (
            <div className="domain-creator box">
                <label htmlFor="domain-input">Domain</label>
                <ul>
                    {this.props.domain.map((element, i) => {
                        let deletable = this.props.unremovables.indexOf(element) < 0;
                        return (
                            <li key={i}
                                className={ deletable ? 'deletable' : ''}
                                onClick={ deletable ? this.removeElement.bind(this, element) : null}
                            >
                                <span className="fa-trash-o"/>{element}
                            </li>
                        );
                    })}
                </ul>
                <div className="new">
                    <input onChange={this.handleInputChange.bind(this)}
                           onKeyDown={this.handleInputKeyDown.bind(this)}
                           ref="input"
                           id="domain-input"
                           type="text"/>
                    <button className={'small' + (!this.state.inputValid ? ' disabled' : '')}
                            onClick={this.addElementFromInput.bind(this)}>Add</button>
                </div>
            </div>
        );
    }
}
