/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import { combineReducers } from 'redux';
import { SET_FORMULA, EMPTY_DATA, SET_DOMAIN, ADD_DOMAIN_ELEMENT,
         REMOVE_DOMAIN_ELEMENT, SET_VARIABLE_ASSIGNMENT, SET_PREDICATE_ASSIGNMENT,
         EMPTY_GAME, ADD_TO_TENET, REMOVE_FROM_TENET, SET_ACTIVE_FORMULA, EMPTY_ACTIVE_FORMULA } from 'Actions';
import Model from 'Purs/Model.purs';

const initialData = { formula: '', model: Model.emptyModel };
const initialActiveFormula = { fromPlayer: '', formula: '' };
const initialGame = { tenet1: [], tenet2: [], activeFormula: initialActiveFormula };

/**
 * Reducer for the "data" sub state.
 *
 * @param state The sub state to modify with the action.
 * @param action The action which describes how to modify the state
 * @returns {Object} The new state
 */
const data = (state = initialData, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case SET_FORMULA:
            newState.formula = action.formula;
            break;
        case SET_DOMAIN:
            newState.model = Model.setDomain(action.domain)(state.model);
            break;
        case ADD_DOMAIN_ELEMENT:
            newState.model = Model.addElement(action.element)(state.model);
            break;
        case REMOVE_DOMAIN_ELEMENT:
            newState.model = Model.removeElement(action.element)(state.model);
            break;
        case SET_VARIABLE_ASSIGNMENT:
            newState.model = Model.setVariableAssignment(action.assignment)(state.model);
            break;
        case SET_PREDICATE_ASSIGNMENT:
            newState.model = Model.setPredicateAssignment(action.predicate)(action.assignment)(state.model);
            break;
        case EMPTY_DATA:
            newState = initialData;
            break;
    }

    return Object.assign({}, state, newState);
};

/**
 * Reducer for the "game sub state.
 *
 * @param state The sub state to modify with the action.
 * @param action The action which describes how to modify the state
 * @returns {Object} The new state
 */
const game = (state = initialGame, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case ADD_TO_TENET:
            newState['tenet' + action.player].push(action.formula);
            break;
        case REMOVE_FROM_TENET:
            const index = newState['tenet' + action.player].indexOf(action.formula);
            newState['tenet' + action.player].splice(index, 1);
            break;
        case SET_ACTIVE_FORMULA:
            newState.activeFormula.fromPlayer = action.fromPlayer;
            newState.activeFormula.formula = action.formula;
            break;
        case EMPTY_ACTIVE_FORMULA:
            newState.activeFormula = initialActiveFormula;
            break;
        case EMPTY_GAME:
            newState = initialGame;
            break;
    }

    return Object.assign({}, state, newState);
};

/**
 * Combines the sub reducers.
 *
 * @type {Reducer}
 */
const reducer = combineReducers({ data, game });

export default reducer;
