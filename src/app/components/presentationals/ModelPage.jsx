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
import DomainCreator from 'Presentationals/DomainCreator.jsx';
import VariableAssigner from 'Presentationals/VariableAssigner.jsx';
import PredicateAssigner from 'Presentationals/PredicateAssigner.jsx';
import Parser from 'Purs/Formula/Parser.purs';
import Formula from 'Purs/Formula/Info.purs';
import Model from 'Purs/Model.purs';


/**
 * Allows the user to define a logical model for a formula
 */
export default class ModelPage extends React.Component {

    constructor(props) {
        super(props);
        this.formula = Parser.parse(this.props.formula).value0;
    }

    render() {
        return (
            <div className="model-page">
                <div className="domain">
                    <DomainCreator
                        unremovables={Formula.constants(this.formula)}
                        domain={this.props.model.domain}
                        addElement={this.props.addDomainElement}
                        removeElement={this.props.removeDomainElement}
                    />
                    <VariableAssigner
                        variables={Formula.freeVariables(this.formula)}
                        elements={this.props.model.domain}
                        assignments={this.props.model.variables}
                        onChange={this.props.setVariableAssignment}
                    />
                    {Formula.predicates(this.formula).map((predicate, i) => {
                        return (
                            <PredicateAssigner
                                predicate={predicate}
                                values={Model.getPredicateAssignment(predicate.name)(this.props.model).values}
                                elements={this.props.model.domain}
                                onChange={this.props.setPredicateAssignment.bind(this, predicate.name)}
                            />
                        )
                    })}

                </div>
                <div className="background"/>
            </div>
        );
    }
}
