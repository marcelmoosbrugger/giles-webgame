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
        this.state = { inputValid: false }
    }

    addElementFromInput() {
        if (!this.state.inputValid) return;

        this.props.addElement(this.refs.input.value.trim());
        this.refs.input.value = '';
        this.setState({ inputValid: false });
    }

    handleInputChange() {
        const input = this.refs.input.value.trim();
        this.setState({ inputValid: input.length > 0 && this.props.domain.indexOf(input) === -1 });
    }

    handleInputKeyDown(event) {
        if (event.keyCode === 13) {
            this.addElementFromInput();
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
                                onClick={ deletable ? this.props.removeElement.bind(this, element) : null}
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
