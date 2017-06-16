/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/** Action types **/

export const SET_FORMULA = 'SET_FORMULA';
export const EMPTY_DATA = 'EMPTY_DATA';
export const SET_DOMAIN = 'SET_DOMAIN';
export const ADD_DOMAIN_ELEMENT = 'ADD_DOMAIN_ELEMENT';
export const REMOVE_DOMAIN_ELEMENT = 'REMOVE_DOMAIN_ELEMENT';
export const SET_VARIABLE_ASSIGNMENT = 'SET_VARIABLE_ASSIGNMENT';
export const SET_PREDICATE_ASSIGNMENT = 'SET_PREDICATE_ASSIGNMENT';

export const EMPTY_GAME = 'EMPTY_GAME';
export const ADD_TO_TENET = 'ADD_TO_TENET';
export const REMOVE_FROM_TENET = 'REMOVE_FROM_TENET';
export const EMPTY_ACTIVE_FORMULA = 'EMPTY_ACTIVE_FORMULA';
export const SET_ACTIVE_FORMULA = 'SET_ACTIVE_FORMULA';

/** Actions **/

export const setFormula = (formula) => {
    return { type: SET_FORMULA, formula }
};

export const emptyData = () => {
    return { type: EMPTY_DATA };
};

export const setDomain = (domain) => {
    return { type: SET_DOMAIN, domain };
};

export const addDomainElement = (element) => {
    return { type: ADD_DOMAIN_ELEMENT, element }
};

export const removeDomainElement = (element) => {
    return { type: REMOVE_DOMAIN_ELEMENT, element }
};

export const setVariableAssignment = (assignment) => {
    return { type: SET_VARIABLE_ASSIGNMENT, assignment }
};

export const setPredicateAssignment = (predicate, assignment) => {
    return { type: SET_PREDICATE_ASSIGNMENT, predicate, assignment }
};

export const emptyGame = () => {
    return { type: EMPTY_GAME };
};

export const addToTenet = (player, formula) => {
    return { type: ADD_TO_TENET, player, formula }
};

export const removeFromTenet = (player, formula) => {
    return { type: REMOVE_FROM_TENET, player, formula }
};

export const emptyActiveFormula = () => {
    return { type: EMPTY_ACTIVE_FORMULA };
};

export const setActiveFormula = (fromPlayer, formula) => {
    return { type: SET_ACTIVE_FORMULA, fromPlayer, formula };
};
