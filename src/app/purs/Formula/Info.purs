{-|
This file is part of Giles's Webgame.
(c) Marcel Moosbrugger, 2017
License: MIT

This source file is subject to the MIT license that is bundled
with this source code in the file LICENSE.
-}

module Formula.Info where

import Prelude
import Data.Array
import Data.Tuple
import Formula
import Formula.Parser (is, variable, constant)
import Data.Foldable (length)

type PredicateInfo = { name :: Name, arity :: Arity }

-- | Returns an array of free variables in a given formula
freeVariables :: Formula -> Array Variable
freeVariables f =
    case f of
        Top         -> []
        Bot         -> []
        Pred _ _    -> variables f
        Not g       -> freeVariables g
        Bin _ g h   -> (freeVariables g) `union` (freeVariables h)
        Quant _ v g -> delete v (freeVariables g)
    where variables (Pred _ args) = filter (\a -> a `is` variable) args
          variables _             = []

-- | Returns an array of free variables in a given formula
constants :: Formula -> Array Constant
constants f =
    case f of
        Top         -> []
        Bot         -> []
        Pred _ _    -> constantsInPred f
        Not g       -> constants g
        Bin _ g h   -> (constants g) `union` (constants h)
        Quant _ _ g -> constants g
    where constantsInPred (Pred _ args) = filter (\a -> a `is` constant) args
          constantsInPred _             = []

-- | Returns an array of predicate infos for all predicates contained in a formula
predicates :: Formula -> Array PredicateInfo
predicates f =
    case f of
        Top            -> []
        Bot            -> []
        Pred name args -> [{ name: name,  arity: (length args) }]
        Not g          -> predicates g
        Bin _ g h      -> (predicates g) `u` (predicates h)
        Quant _ _ g    -> predicates g
    where u = unionBy (\pi1 pi2 -> pi1.name == pi2.name)
