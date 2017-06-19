{-|
This file is part of Giles's Webgame.
(c) Marcel Moosbrugger, 2017
License: MIT

This source file is subject to the MIT license that is bundled
with this source code in the file LICENSE.
-}

module Lukasiewicz where

import Prelude
import Formula
import Model
import Data.Array (head, filter)
import Data.Ord (min, max)
import Data.Foldable (minimum, maximum)
import Data.Maybe (fromJust)
import Partial.Unsafe (unsafePartial)
import Math (round)

-- | Evaluates a formula in a given model and rounds the result
evaluate :: Model -> Formula -> Number
evaluate m f = (round $ result * 100000.0) / 100000.0
    where result = evaluate' m f

-- | Evaluates a formula in a given model without rounding
evaluate' :: Model -> Formula -> Number
evaluate' _ Top              = 1.0
evaluate' _ Bot              = 0.0
evaluate' m (Pred name args) = evaluatePred m (Pred name args)
evaluate' m (Not f)          = 1.0 - (evaluate' m f)
evaluate' m (Bin c f1 f2)    = evaluateBin m (Bin c f1 f2)
evaluate' m (Quant q v f)    = evaluateQuant m (Quant q v f)

-- | Evaluates a formula which has a binary connective as its outermost connective
evaluateBin :: Model -> Formula -> Number
evaluateBin m (Bin connective f1 f2) =
    case connective of
        Wand -> min v1 v2
        Sand -> max 0.0 (v1 + v2 - 1.0)
        Or   -> max v1 v2
        Imp  -> min 1.0 (1.0 - v1 + v2)
    where v1 = evaluate' m f1
          v2 = evaluate' m f2
evaluateBin _ _ = 0.0

-- | Evaluates a quantified formula in a given model
evaluateQuant :: Model -> Formula -> Number
evaluateQuant m (Quant quantor v f) =
    case quantor of
        Forall -> unsafePartial $ fromJust $ minimum allEvaluations
        Exists -> unsafePartial $ fromJust $ maximum allEvaluations
    where substitues = map (\element -> substitute v element f) m.domain
          allEvaluations = map (evaluate' m) substitues
evaluateQuant _ _ = 0.0

-- | Evaluatesa predicate in a given model
evaluatePred :: Model -> Formula -> Number
evaluatePred m (Pred name args) = assignment.value
    where assignments = getPredicateAssignment name m
          assignment  = unsafePartial $ fromJust $ head $ filter (compareArgs {args: args, value: 0.0}) assignments.values
evaluatePred _ _ = 0.0
