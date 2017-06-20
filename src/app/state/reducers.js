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
         EMPTY_GAME, NEW_GAME, APPLY_GAME_STEP, SET_ACTIVE_FORMULA, EMPTY_ACTIVE_FORMULA,
         SET_PLAYER } from 'Actions';
import Model from 'Purs/Model.purs';
import GilesGame from 'Purs/GilesGame.purs';

const getEmptyData = () => { return { formula: '', model: Model.emptyModel } };
const getEmptyActiveFormula = () => { return { proponent: '', formula: '' } };
const getEmptyGame = () => { return { gameState: GilesGame.emptyGameState, activeFormula: getEmptyActiveFormula() } };

const initialData = getEmptyData();
const initialGame = getEmptyGame();
const initialPlayers = { player1: 'HUMAN', player2: 'HUMAN' };

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
            newState = getEmptyData();
            break;
    }

    return Object.assign({}, state, newState);
};

/**
 * Reducer for the "game" sub state.
 *
 * @param state The sub state to modify with the action.
 * @param action The action which describes how to modify the state
 * @returns {Object} The new state
 */
const game = (state = initialGame, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case NEW_GAME:
            newState.gameState = GilesGame.getInitialGameState(action.formula);
            newState.activeFormula = getEmptyActiveFormula();
            break;
        case APPLY_GAME_STEP:
            newState.gameState = GilesGame.applyGameStep(action.proponent)(action.gameStep)(newState.gameState);
            newState.activeFormula = getEmptyActiveFormula();
            break;
        case SET_ACTIVE_FORMULA:
            newState.gameState = GilesGame.removeFromTenet(action.proponent)(action.formula)(newState.gameState);
            newState.activeFormula.proponent = action.proponent;
            newState.activeFormula.formula = action.formula;
            break;
        case EMPTY_GAME:
            newState = getEmptyGame();
            break;
    }

    return Object.assign({}, state, newState);
};

/**
 * Reducer for the "players" sub state
 *
 * @param state The sub state to modify with the action.
 * @param action The action which describes how to modify the state
 * @returns {Object} The new state
 */
const players = (state = initialPlayers, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case SET_PLAYER:
            newState['player' + action.player] = action.value;
            break;
    }

    return Object.assign({}, state, newState);
};

/**
 * Combines the sub reducers.
 *
 * @type {Reducer}
 */
const reducer = combineReducers({ data, game, players });

export default reducer;
