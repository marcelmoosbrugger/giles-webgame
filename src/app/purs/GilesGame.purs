{-|
This file is part of Giles's Webgame.
(c) Marcel Moosbrugger, 2017
License: MIT

This source file is subject to the MIT license that is bundled
with this source code in the file LICENSE.
-}

module GilesGame where

import Prelude
import Formula
import Formula.Info (isAtomic)
import Formula.Parser (unsafeParse)
import Model
import Data.Array (delete)
import Data.Foldable (and)
import Data.String (joinWith, length)

-- | To be able to store the tenets in redux, Formulas are represented as strings here
type FormulaString = String
-- | A tenet of the giles game
type Tenet = Array FormulaString
-- | A player is represented as "1" or "2"
type Player = String

type GameState = { tenet1 :: Tenet, tenet2 :: Tenet }
data Role = Proponent | Opponent
-- the first array of formulae gets added to the proponent's tenet and vice versa
data GameStep = GameStep (Array FormulaString) (Array FormulaString)
-- An array of game-steps to choose from. The role marks the player who has the choice
data Choice = Choice (Array GameStep) Role

-- | Represents the empty choice
noChoice :: Choice
noChoice = Choice [] Proponent

-- | Represents the empty game state
emptyGameState :: GameState
emptyGameState = { tenet1: [], tenet2: [] }

-- | Initializes the game state with a given formula
getInitialGameState :: FormulaString -> GameState
getInitialGameState f = { tenet1: [f], tenet2: [] }

-- | Removes a given formula from the tenet of a given player
removeFromTenet :: Player -> FormulaString -> GameState -> GameState
removeFromTenet p f s = { tenet1: tenet1, tenet2: tenet2 }
    where tenet1 = if p == "1" then delete f s.tenet1 else s.tenet1
          tenet2 = if p == "2" then delete f s.tenet2 else s.tenet2

-- | Applies a game step to a given game state. It needs to be passed which player acts as the proponent
applyGameStep :: Player -> GameStep -> GameState -> GameState
applyGameStep proponent (GameStep fs1 fs2) s = { tenet1: tenet1, tenet2: tenet2 }
    where tenet1 = if proponent == "1" then s.tenet1 <> fs1 else s.tenet1 <> fs2
          tenet2 = if proponent == "2" then s.tenet2 <> fs1 else s.tenet2 <> fs2

-- Returns true iff a tenet contains only atomic formulae
tenetIsAtomic :: Tenet -> Boolean
tenetIsAtomic = and <<< map isAtomic <<< map unsafeParse

-- | ----------------------------------------------------
-- | The functions which construct the choice structures
-- | depending on a given formula.
-- | ----------------------------------------------------

-- | A smart constructor which allows to create a game step from actual formulae and not from strings.
gameStep :: (Array Formula) -> (Array Formula) -> GameStep
gameStep fs1 fs2 = GameStep (map toString fs1) (map toString fs2)

-- | For a domain and a formula it returns the choice for the next game step depending on the outermost connective.
getChoice :: Domain -> Formula -> Choice
getChoice domain formula =
    case formula of
        Top           -> noChoice
        Bot           -> noChoice
        (Pred _ _)    -> noChoice
        (Not f)       -> getChoiceForBin (Bin Imp f Bot)
        (Bin _ _ _)   -> getChoiceForBin formula
        (Quant _ _ _) -> getChoiceForQuant domain formula

-- | Returns the choice for a formula which as a binary connective as its outermost connective.
getChoiceForBin :: Formula -> Choice
getChoiceForBin (Bin connective f1 f2) =
    case connective of
        Wand -> Choice [(gameStep [f1] []),    (gameStep [f2] [])]   Opponent
        Sand -> Choice [(gameStep [f1,f2] []), (gameStep [Bot] [])]  Proponent
        Or   -> Choice [(gameStep [f1] []),    (gameStep [f2] [])]   Proponent
        Imp  -> Choice [(gameStep [] []),      (gameStep [f2] [f1])] Opponent
getChoiceForBin f = noChoice

-- | Returns the choice for a quantified formula.
getChoiceForQuant :: Domain -> Formula -> Choice
getChoiceForQuant domain (Quant quantor v f) =
    case quantor of
        Exists -> Choice steps Proponent
        Forall -> Choice steps Opponent
    where substitues = map (\element -> substitute v element f) domain
          steps      = map (\f -> gameStep [f] []) substitues
getChoiceForQuant _ _ = noChoice

-- | Converts a single game step to a human readable form
stepToString :: GameStep -> String
stepToString (GameStep [] [])   = "Do nothing."
stepToString (GameStep fs1 fs2) = proponentString <> opponentString <> "."
    where string1 = joinWith "," fs1
          string2 = joinWith "," fs2
          proponentString = "Add " <> string1 <> " to proponent's tenet"
          opponentString = if length string2 > 0
                            then ", and " <> string2 <> " to opponent's tenet"
                            else ""
