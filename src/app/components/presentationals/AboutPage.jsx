/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/AboutPage.scss';

/**
 * The page which provides an explanation of the game
 */
export default class AboutPage extends React.Component {
    render() {
        return (
            <div className="about-page">
                <h1>About Giles's Game</h1>
                <p>
                    Giles's Game is a logical game between two players.
                    Let's call them David and Kurt.
                    David and Kurt both own multiset of formulas, called the player's <em>tenet</em>.
                    A single state in the game consists of the two tenets of the players.
                    In literature a game state is denoted as
                    <em> [&kappa;<sub>1</sub>, ..., &kappa;<sub>n</sub> | &delta;<sub>1</sub>, ..., &delta;<sub>m</sub>]</em>,
                    where <em>[&kappa;<sub>1</sub>, ..., &kappa;<sub>n</sub>]</em> is the tenet of Kurt and
                    <em> [&delta;<sub>1</sub>, ..., &delta;<sub>m</sub>]</em> is the tenet of David.
                    Although a general game state is allowed to contain multiple formulas, a Giles's game
                    always starts with the state <em>[ | &phi;]</em>.
                    Before the game starts, an interpretation for &phi; has to be given.
                    Obeying the rules described shortly, such a game is called <em>Giles's game for a formula &phi;</em>.
                    The game ends if a state is reached where all formulas in both tenets are atomic.
                </p>
                <h2>Rules</h2>
                <p>
                    As mentioned, the game starts in a state [ | &phi;], for a formula &phi;.
                    A general state, however, looks like [&kappa;<sub>1</sub>, ..., &kappa;<sub>n</sub> | &delta;<sub>1</sub>, ..., &delta;<sub>m</sub>].
                    The description of the rules will be given for the general case, which also applies in the beginning of a game.
                </p>
                <p>
                    So let's assume that the game is in a state [&kappa;<sub>1</sub>, ..., &kappa;<sub>n</sub> | &delta;<sub>1</sub>, ..., &delta;<sub>m</sub>].
                    If all formulas &kappa;<sub>1</sub>, ..., &kappa;<sub>n</sub> and &delta;<sub>1</sub>, ..., &delta;<sub>m</sub> are atomic, the game ends.
                    The payoffs for David and Kurt are then determined as described in the next section.
                </p>
                <p>
                    If the game is not in a final state, a non atomic formula is picked from either the tenet of David or the tenet of Kurt.
                    The player from who's tenet the current formula was picked, gets the role of the <em>proponent</em>, the other player acts as the <em>opponent</em>.
                    Based on the outer connective of the current formula, one of the following rules applies and the game continues in the resulting state:
                </p>
                <ul>
                    <li>
                        If the current formula is <em>&alpha;&and;&beta;</em>, then the opponent chooses either <em>&alpha;</em> or <em>&beta; </em>
                        to replace <em>&alpha;&and;&beta;</em> in the proponent's tenet with.
                    </li>
                    <li>
                        If the current formula is <em>&alpha;&or;&beta;</em>, then the proponent chooses either <em>&alpha;</em> or <em>&beta; </em>
                        to replace <em>&alpha;&or;&beta;</em> in the proponent's tenet with.
                    </li>
                    <li>
                        If the current formula is <em>&alpha;&rarr;&beta;</em>, the opponent gets to choose whether to continue the game in
                        a state where the current formula is removed from the proponent's tenet or in a state where
                        the current formula is replaced by <em>&beta;</em> in the proponent's tenet and <em>&alpha;</em> is added to the opponent's tenet.
                    </li>
                    <li>
                        If the current formula is <em>&forall;x&alpha;(x)</em>, then it gets replaced by <em>&alpha;(c)</em>, where the domain
                        element <em>c</em> is chosen by the opponent.
                    </li>
                    <li>
                        If the current formula is <em>&exist;x&alpha;(x)</em>, then it gets replaced by <em>&alpha;(c)</em>, where the domain
                        element <em>c</em> is chosen by the proponent.
                    </li>
                    <li>
                        If the current formula is <em>&alpha;&amp;&beta;</em>, then by the choice of the proponent, <em>&alpha;&amp;&beta;</em> gets either replaced
                        by both <em>&alpha;</em> and <em>&beta;</em> or by <em>&perp;</em>.
                    </li>
                </ul>
                <p>
                    An explicit rule for the negation can be omitted as <em>&not;&alpha;</em> gets translated to <em>&alpha;&rarr;&perp;</em>.
                </p>
                <h2>Final state</h2>
                <p>
                    If a state is reached were all formulae in both tenets are atomic, the game ends and the
                    two players have to pay money to each other. The amount of money Kurt has to give
                    to David, depends on the atomic formulae in Kurt’s tenet. For every atomic formula &kappa;
                    in Kurt’s final tenet, a binary experiment is executed which succeeds with probability
                    <em> e<sub>M</sub>(&kappa;)</em> and fails with probability <em>1 − e<sub>M</sub>(&kappa;)</em>,
                    for an interpretation <em>M</em>. This is the reason why an interpretation has to be given before the game starts.
                    A failed experiment results in Kurt owing David 1 &euro;. By analogy, the same procedure applies to David.
                    The risk associated with a single atomic formula &alpha; can be denoted as <em>&lt;&alpha;&gt; </em>
                    and is equal to  <em>1 − e<sub>M</sub>(&alpha;)</em> (the probability that the experiment corresponding to &alpha; fails).
                </p>
                <h2>Syntax of formulas</h2>
                <p>
                    The set F of allowed formulas is defined as follows:
                    <ul>
                        <li>&#8868;&isin;F and &perp;&isin;F</li>
                        <li>P&isin;F. P can be any uppercase character.</li>
                        <li>P(v<sub>1</sub>,...,v<sub>n</sub>)&isin;F. P can be any uppercase character,
                            v<sub>1</sub> to v<sub>n</sub> have to variable or constant symbols (see conventions).</li>
                        <li>&not;&alpha;&isin;F if &alpha;&isin;F</li>
                        <li>(&alpha;&loz;&beta;) if &alpha;,&beta;&isin;F and &loz; is one of: &amp;, &and;, &or;, &rarr;</li>
                        <li>&forall;x&alpha;&isin;F and &exist;x&alpha;&isin;F if &alpha;&isin;F and x is a variable symbol (see conventions).</li>
                    </ul>
                </p>
                <h2>Conventions</h2>
                <ul>
                    <li>The characters A...Z represent predicate or a proposition symbols. The symbols can be primed.</li>
                    <li>The characters u...z represent variable symbols. The symbols can be primed.</li>
                    <li>Constant symbols have to begin with a...t or 0...9. The symbols can be primed.</li>
                </ul>
                <h2>Thesis</h2>
                <p>
                    This web implementation of Giles's game was constructed together with my bachelor's thesis at
                    the technical university of vienna under the supervision of Univ.-Prof. Dr. Christian Fermüller.
                    The whole thesis, which provides additional information about fuzzy logic and this implementation
                    can be found <a href="thesis.pdf">here</a>.
                </p>
            </div>
        );
    }
}
