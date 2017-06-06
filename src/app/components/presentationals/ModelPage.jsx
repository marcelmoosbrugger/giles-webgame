/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/ModelPage.scss';
import DomainModifier from 'Containers/DomainModifier.jsx';

/**
 * Allows the user to define a logical model for a formula
 */
export default class ModelPage extends React.Component {

    render() {
        return (
            <div className="model-page">
                <div className="domain">
                    <DomainModifier/>
                </div>
                <div className="background"/>
            </div>
        );
    }
}
