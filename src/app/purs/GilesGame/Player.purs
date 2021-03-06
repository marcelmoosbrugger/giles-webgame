{-|
This file is part of Giles's Webgame.
(c) Marcel Moosbrugger, 2017
License: MIT

This source file is subject to the MIT license that is bundled
with this source code in the file LICENSE.
-}

module GilesGame.Player where

import Prelude
import GilesGame
import Model
import Data.Foldable (minimumBy)
import Data.Ord (compare)
import Data.Array (elemIndex)
import Partial.Unsafe (unsafePartial)
import Data.Maybe (fromJust)

data ActionType = Choose | DoNothing
type CurrentGameState = GameState
type RoleOfPlayer = Role
type ProponentPlayer = Player
type Action = { actionType :: ActionType, gameStep :: GameStep, gameStepIndex :: Int }

-- | Represents the action where the player does nothing
noAction :: Action
noAction = { actionType: DoNothing, gameStep: emptyGameStep, gameStepIndex: (-1) }

-- | Takes information about the current game and the choice which can be made by the player.
-- | From that information it returns the best possible action for the player
decideOnAction :: Model -> CurrentGameState -> ProponentPlayer -> Player -> RoleOfPlayer -> Choice -> Action
decideOnAction model state proponent player role (Choice steps r) =
    if r /= role
        then noAction
        else { actionType: Choose, gameStep: bestGameStep, gameStepIndex: (unsafePartial $ fromJust $ elemIndex bestGameStep steps) }
    where bestGameStep = unsafePartial $ fromJust $ minimumBy compareRisk steps
          compareRisk step1 step2 = compare (getRiskForStep step1) (getRiskForStep step2)
          getRiskForStep step = riskFactor * (riskForStep model state proponent step)
          riskFactor = if player == "1" then 1.0 else (-1.0)
