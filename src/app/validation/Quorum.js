/*
 * This file is part of Giles's Webgame.
 *
 * (c) Marcel Moosbrugger
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * Class represents a quorum in which participants can register
 * and reach an agreement by voting. The creating component listen
 * to changes in the agreement via a listener.
 */
 export default class Quorum {

    /**
     * @param totalParticipants The total number of participants in the quorum
     * @param onChange The onChange listener which called when the agreement turns from positive to negative
     *                 or from negative to positive. It gets whether or not the participants agreed or not
     *                 passed as the first parameter.
     */
     constructor(totalParticipants, onChange) {
         this.countVotes = 0;
         this.totalParticipants = totalParticipants;
         this.participants = {};
         this.onChange = onChange;
     }

    /**
     * Registers a new participants at the quorum.
     *
     * @returns {string} The key with which the participant is identified at the quorum
     */
     register() {
        const key = 'quorum.' + (Object.keys(this.participants).length + 1);
        this.participants[key] = {
            vote: false,
            negativeMessage: '',
        };

        return key;
     }

    /**
     * Votes for the agreement for a participant with a given key
     *
     * @param key The key of the participant
     */
     vote(key) {
         const participant = this.participants[key];
         // nobody can vote two times
         if (participant.vote === true) return;

         participant.vote = true;
         participant.negativeMessage = '';
         this.countVotes += 1;
         if (this.countVotes === this.totalParticipants) {
             this.onChange(true);
         }
     }

    /**
     * Withdraws the vote for the agreement for a participant with a given key
     *
     * @param key The key of the participant
     * @param negativeMessage A message to explain why the vote has been withdrawn
     */
     unvote(key, negativeMessage = '') {
         const participant = this.participants[key];
         participant.negativeMessage = negativeMessage;

         // Only participants who voted can unvote
         if (participant.vote !== true) return;

         this.countVotes -= 1;
         participant.vote = false;

         if (this.countVotes + 1 === this.totalParticipants) {
             this.onChange(false);
         }
     }

    /**
     * @returns {Array.<String>} The messages of all participants explaining why the withdrew their vote
     */
     getNegativeMessages() {
         return Object.values(this.participants).map(p => p.negativeMessage).filter(m => m.length > 0);
     }
 }
