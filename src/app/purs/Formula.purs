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
import Data.Show
import Data.String (joinWith)
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

instance showConnective :: Show Connective where
    show Wand = "\8743"
    show Sand = "\0038"
    show Or   = "\8744"
    show Imp  = "\8594"

instance showQuantor :: Show Quantor where
    show Forall = "\8704"
    show Exists = "\8707"


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

-- | Returns the string representation of a formula. This is not realized with the Show
-- | class because its easier accessible from JS with an own function
toString :: Formula -> String
toString Top = "\8868"
toString Bot = "\8869"
toString (Pred name arguments) = name <> "(" <> (joinWith "," arguments) <> ")"
toString (Not formula) = "\0172" <> (toString formula)
toString (Bin con f1 f2) = "(" <> (toString f1) <> (show con) <> (toString f2) <> ")"
toString (Quant q v f) = (show q) <> v <> (toString f)
