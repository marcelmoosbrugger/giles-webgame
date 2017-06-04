/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/DomainCreator.scss';

/**
 * Allows the user create a domain for a logical model
 */
export default class DomainCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValid: false,
            elements: []
        }
    }

    addElement(element) {
        this.setState({ elements: this.state.elements.concat([element]) });
    }

    removeElement(element) {
        let elements = this.state.elements.slice(0);
        elements.splice(elements.indexOf(element), 1);

        this.setState({ elements });
    }

    addElementFromInput() {
        if (!this.state.inputValid) return;

        this.addElement(this.refs.input.value.trim());
        this.refs.input.value = '';
        this.setState({ inputValid: false });
    }

    handleInputChange() {
        const input = this.refs.input.value.trim();
        this.setState({
            inputValid: input.length > 0 && this.state.elements.indexOf(input) === -1
        });
    }

    handleInputKeyDown(event) {
        if (event.keyCode === 13) {
            this.addElementFromInput();
        }
    }

    render() {
        return (
            <div className="domain-creator">
                <label htmlFor="domain-input">Domain</label>
                <div className="wrapper">
                    <ul>
                        {this.state.elements.map((element, i) => {
                            return (
                                <li key={i}
                                    onClick={this.removeElement.bind(this, element)}>
                                    <span className="fa-trash-o" />{element}
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
            </div>
        );
    }
}
