{-|
This file is part of Giles's Webgame.
(c) Marcel Moosbrugger, 2017
License: MIT

This source file is subject to the MIT license that is bundled
with this source code in the file LICENSE.
-}

module Formula where

import Prelude
import Data.Tuple
import Data.Maybe
import Data.Array
import Data.Foldable (length)

-- | Type aliases for better readability
type Name = String
type Variable = String
type Constant = String
type Arguments = Array String
type Arity = Int

-- | Data types for formulae
data Connective = Wand | Sand | Or | Imp
data Quantor = Forall | Exists

data Formula = Top | Bot
             | Pred Name Arguments
             | Not Formula
             | Bin Connective Formula Formula
             | Quant Quantor Variable Formula

-- | Returns true iff a formula contains the same predicate symbol with different arities
hasDuplicatedPredicates :: Formula -> Boolean
hasDuplicatedPredicates f = fst (hdp (Tuple false []) f)
    where
        hdp :: Tuple Boolean (Array (Tuple Name Arity)) -> Formula -> Tuple Boolean (Array (Tuple Name Arity))
        hdp (Tuple b ds) formula =
            if b then Tuple b ds else
                case formula of
                    Top            -> Tuple b ds
                    Bot            -> Tuple b ds
                    Not g          -> hdp (Tuple b ds) g
                    Quant _ _ g    -> hdp (Tuple b ds) g
                    Bin _ g h      -> let (Tuple b1 ds1) = hdp (Tuple b ds) g in
                                      if b1 then Tuple b1 ds1 else hdp (Tuple b1 ds1) h
                    Pred name args -> case lookup name ds of
                                        Nothing    -> Tuple b ((Tuple name (length args)) : ds)
                                        Just arity -> Tuple (arity /= length args) ds
