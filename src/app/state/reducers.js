/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { combineReducers } from 'redux';
import { SET_FORMULA, EMPTY_DATA, ADD_DOMAIN_ELEMENT, REMOVE_DOMAIN_ELEMENT } from 'Actions';
import Model from 'Purs/Model.purs';

const initialData = { formula: {}, model: Model.emptyModel };

/**
 * Reducer for the "data" sub state
 * @param state The sub state to modify with the action.
 * @param action The action which describes how to modify the state
 * @returns {Object} The new state
 */
const data = (state = initialData, action) => {
    let domain;

    switch (action.type) {

        case SET_FORMULA:
            return Object.assign({}, state, {
                formula: action.formula
            });
        case ADD_DOMAIN_ELEMENT:
            domain = state.model.value0.domain.concat([action.element]);
            return Object.assign({}, state, {
                model: Model.setDomain(domain)(state.model)
            });
        case REMOVE_DOMAIN_ELEMENT:
            domain = state.model.value0.domain.slice(0);
            domain.splice(domain.indexOf(action.element), 1);
            return Object.assign({}, state, {
                model: Model.setDomain(domain)(state.model)
            });
        case EMPTY_DATA:
            return initialData;
        default:
            return state;
    }
};

/**
 * Combines the sub reducers
 * @type {Reducer}
 */
const reducer = combineReducers({
    data
});

export default reducer;
