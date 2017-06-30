/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/InfoLink.scss';

/**
 * Wraps the children content in an info link, which allows
 * the user to display the info sidebar.
 */
export default class InfoLink extends React.Component {

    showInfo() {
        this.props.showInfoSidebar(this.props.infoKey);
    }

    render () {
        return (
            <div
                onClick={this.showInfo.bind(this)}
                className={'info-link' + (!!this.props.className ? ' ' + this.props.className : '')}
            >
                {this.props.children}
            </div>
        );
    }
}
