/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { combineReducers } from 'redux';
import { SET_FORMULA } from 'Actions';

/**
 * Reducer for the "data" sub state
 * @param state The sub state to modify with the action.
 * @param action The action which describes how to modify the state
 * @returns The new state
 */
const data = (state = {}, action) => {
    switch (action.type) {

        case SET_FORMULA:
            return Object.assign({}, state, {
                formula: action.formula
            });
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
