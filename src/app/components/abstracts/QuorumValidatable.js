/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';

/**
 * An abstract class which takes a validation quorum through its properties
 * and registers itself at the quorum. Moreover it provides a function
 * to vote at the quorum.
 */
export default class QuorumValidatable extends React.Component {

    /**
     * @param props.validationQuorum The quorum to register the component at
     */
    constructor(props) {
        super(props);
        this.key = this.props.validationQuorum.register();
    }

    /**
     * Depending on the the 'valid' parameter, the method votes for the component
     * at the quorum or withdraws the vote and leaves a message indicated why
     * the vote was withdrawn.
     *
     * @param valid If true it gets voted at the quorum. If false a previous vote gets withdrawn
     * @param negativeMessage The message which indicates why the vote has been withdrawn.
     */
    voteValidity(valid, negativeMessage = '') {
        if (valid) {
            this.props.validationQuorum.vote(this.key);
        } else {
            this.props.validationQuorum.unvote(this.key, negativeMessage);
        }
    }

    /**
     * This method needs to be overridden. It should only dependent on
     * the passed props determine if the component is valid or not and
     * call 'voteValidity'
     * @param props
     */
    validate(props) {
        throw new Error('Not implemented');
    }

    componentDidMount() {this.validate(this.props)};
    componentWillReceiveProps(newProps) {this.validate(newProps)};
}
