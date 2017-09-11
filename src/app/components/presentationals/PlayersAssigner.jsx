/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import React from 'react';
import 'Styles/PlayersAssigner.scss';
import InfoLink from "Containers/InfoLink.jsx";

/**
 * Represents the the component which allows the user to assign the type of the players
 */
export default class PlayersAssigner extends React.Component {

    handleSelectChange(player, event) {
        this.props.onChange(player, event.target.value);
    }

    renderPlayer(player, value) {
        const selectId = 'select-player-' + player;

        return (
            <div className="player">
                <InfoLink infoKey="player">
                    <label htmlFor={selectId}>Player {player}:</label>
                </InfoLink>
                <div className="select">
                    <select onChange={this.handleSelectChange.bind(this, player)} id={selectId} value={value}>
                        <option value="HUMAN">Human</option>
                        <option value="COMPUTER">Computer</option>
                    </select>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="players-assigner">
                {this.renderPlayer('1', this.props.players.player1)}
                {this.renderPlayer('2', this.props.players.player2)}
            </div>
        );
    }
}
