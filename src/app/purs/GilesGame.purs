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
import Model
import Data.String (joinWith, length)

type Tenet = Array Formula
data Role = Proponent | Opponent
-- the first array of formulae is to be added to the proponent's tenet and vice versa
data GameStep = GameStep (Array Formula) (Array Formula)
-- An array of game-steps to choose from. The role marks the player who has the choice
data Choice = Choice (Array GameStep) Role

noChoice :: Choice
noChoice = Choice [] Proponent

-- | For a domain and a formula it returns the choice for the next game-step
-- | depending on the outermost connective.
getChoice :: Domain -> Formula -> Choice
getChoice domain formula =
    case formula of
        Top           -> noChoice
        Bot           -> noChoice
        (Pred _ _)    -> noChoice
        (Not f)       -> getChoiceForBin (Bin Imp f Bot)
        (Bin _ _ _)   -> getChoiceForBin formula
        (Quant _ _ _) -> getChoiceForQuant domain formula

-- | Returns the choice for a formula which as a binary connective
-- | as its outermost connective.
getChoiceForBin :: Formula -> Choice
getChoiceForBin (Bin connective f1 f2) =
    case connective of
        Wand -> Choice [(GameStep [f1] []),    (GameStep [f2] [])]   Opponent
        Sand -> Choice [(GameStep [f1,f2] []), (GameStep [Bot] [])]  Proponent
        Or   -> Choice [(GameStep [f1] []),    (GameStep [f2] [])]   Proponent
        Imp  -> Choice [(GameStep [] []),      (GameStep [f2] [f1])] Opponent
getChoiceForBin f = noChoice

-- | Returns the choice for a quantified formula.
getChoiceForQuant :: Domain -> Formula -> Choice
getChoiceForQuant domain (Quant quantor v f) =
    case quantor of
        Exists -> Choice steps Proponent
        Forall -> Choice steps Opponent
    where substitues = map (\element -> substitute v element f) domain
          steps      = map (\f -> GameStep [f] []) substitues
getChoiceForQuant _ _ = noChoice

-- | Converts a single game step to a human readable form
stepToString :: GameStep -> String
stepToString (GameStep [] [])   = "Do nothing."
stepToString (GameStep fs1 fs2) = proponentString <> opponentString <> "."
    where string1 = joinWith "," $ map toString fs1
          string2 = joinWith "," $ map toString fs2
          proponentString = "Add " <> string1 <> " to proponent's tenet"
          opponentString = if length string2 > 0
                            then ", and " <> string2 <> " to opponent's tenet"
                            else ""
