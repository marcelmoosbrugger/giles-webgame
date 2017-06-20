{-|
This file is part of Giles's Webgame.
(c) Marcel Moosbrugger, 2017
License: MIT

This source file is subject to the MIT license that is bundled
with this source code in the file LICENSE.
-}

module Model where

import Prelude
import Formula
import Data.Array hiding (deleteBy)
import Data.Foldable (and, elem)
import Data.Maybe

type DomainElement = String
type Domain = Array DomainElement
type VariableAssignment = { variable :: Variable, element :: DomainElement }
type PredicateAssignment = { predicate :: Name, values :: (Array { args :: Arguments, value :: Number }) }
type Model = { domain     :: Domain
             , variables  :: (Array VariableAssignment)
             , predicates :: (Array PredicateAssignment)
             }

-- | The model of no elements, no variable- and predicate assignments
emptyModel :: Model
emptyModel = { domain: [], variables: [], predicates: [] }

-- | Replaces the domain in a given model
setDomain :: Domain -> Model -> Model
setDomain d m = m { domain = d }

-- | Adds an element to the domain of a given model
addElement :: DomainElement -> Model -> Model
addElement e m = m { domain =  m.domain <> [e] }

-- | Removes an element from the domain of a given model
-- | and also removes all variable- and predicate assignments referencing this element
removeElement :: DomainElement -> Model -> Model
removeElement e m = m { domain = newDomain, variables = newVariables, predicates = newPredicates }
    where newDomain    = delete e m.domain
          newVariables = deleteBy containsElement m.variables
          newPredicates = removeFromPredicateAssignments e m.predicates
          containsElement ass = ass.element == e

-- | Sets a variable assignment in a given model
setVariableAssignment :: VariableAssignment -> Model -> Model
setVariableAssignment va m = m { variables = newVariables }
    where newVariables = replaceBy compareVarAss va m.variables
          compareVarAss va1 va2 = va1.variable == va2.variable

-- | Sets a predicate assignment in a given model
setPredicateAssignment :: Name -> { args :: Arguments, value :: Number } -> Model -> Model
setPredicateAssignment n ass m = m { predicates = replaceBy comparePredAss newAssignment m.predicates }
    where currentAssignment = getPredicateAssignment n m
          newAssignment     = currentAssignment { values = newValues }
          newValues         = replaceBy compareArgs ass currentAssignment.values

-- | Returns the predicate assignment in a given model for a given predicate name
getPredicateAssignment :: Name -> Model -> PredicateAssignment
getPredicateAssignment n m =
    case head $ filter (\p -> p.predicate == n) m.predicates of
        Nothing    -> { predicate: n, values: [] }
        Just (ass) -> ass

-- | Removes from an array of predicate assignments all assignments which reference a given domain element
removeFromPredicateAssignments :: DomainElement -> (Array PredicateAssignment) -> (Array PredicateAssignment)
removeFromPredicateAssignments d pas = map (rfpa d) pas
    where rfpa element assignment = assignment { values = deleteBy (\v -> element `elem` v.args) assignment.values }

-- | Returns an array which contains all possible combinations of domain
-- | elements for a given arity and given elements.
getAllArgsCombinations :: Domain -> Arity -> Array (Array DomainElement)
getAllArgsCombinations _ 0 = [[]]
getAllArgsCombinations d n = fold $ map (\el -> map (cons el) previous) d
    where previous = getAllArgsCombinations d (n - 1)

-- | Helper function which replaces an element in an array by another element.
-- | Moreover comparison function can be provided
replaceBy :: forall a . (a -> a -> Boolean) -> a -> Array a -> Array a
replaceBy f el array =
    case uncons array of
        Nothing                  -> [el]
        Just {head: x, tail: xs} -> if f el x
                                    then el:xs
                                    else x : (replaceBy f el xs)

-- | Helper function which deletes every occurences of an element in an array.
-- | Moreover predicate function can be provided
deleteBy :: forall a . (a -> Boolean) -> Array a -> Array a
deleteBy f array =
    case uncons array of
        Nothing                  -> []
        Just {head: x, tail: xs} -> if f x
                                    then deleteBy f xs
                                    else x : (deleteBy f xs)

-- | Helper function which determines if two given values of a predicate assignment assign its value
-- | To the same combination of arguments
compareArgs :: { args :: Arguments, value :: Number } -> { args :: Arguments, value :: Number } -> Boolean
compareArgs a1 a2 = (length a1.args == length a2.args) && (and $ zipWith (==) a1.args a2.args)

-- | Helper function which determines if two predicate assignments belong to the same predicate
comparePredAss :: PredicateAssignment -> PredicateAssignment -> Boolean
comparePredAss p1 p2 = p1.predicate == p2.predicate

-- | Applies an array of variable assignemnts to a formula by substituting all variables
-- | by their corresponding element.
applyVariableAssignments :: (Array VariableAssignment) -> Formula -> Formula
applyVariableAssignments assignments f =
    case uncons assignments of
        Nothing -> f
        Just { head: va, tail: vas } -> applyVariableAssignments vas (substitute va.variable va.element f)
