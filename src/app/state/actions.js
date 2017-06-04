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

/** Actions **/

export const setFormula = (formula) => {
    return { type: SET_FORMULA, formula }
};

export const emptyData = () => {
    return { type: EMPTY_DATA };
};
