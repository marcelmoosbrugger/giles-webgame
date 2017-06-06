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
import Data.Maybe

type DomainElement = String
type Domain = Array DomainElement
type VariableAssignment = { variable :: Variable, element :: DomainElement }
type PredicateAssignment = { predicate :: Name, values :: (Array { arguments :: Arguments, value :: Number }) }
type Model = { domain     :: Domain
             , variables  :: (Array VariableAssignment)
             , predicates :: (Array PredicateAssignment)
             }

emptyModel :: Model
emptyModel = { domain: [], variables: [], predicates: [] }

setDomain :: Domain -> Model -> Model
setDomain d m = m { domain = d }

addElement :: DomainElement -> Model -> Model
addElement e m = m { domain =  m.domain <> [e] }

removeElement :: DomainElement -> Model -> Model
removeElement e m = m { domain = newDomain, variables = newVariables }
    where newDomain    = delete e m.domain
          newVariables = deleteBy containsElement m.variables
          containsElement ass = ass.element == e

setVariableAssignment :: VariableAssignment -> Model -> Model
setVariableAssignment va m = m { variables = newVariables }
    where newVariables = replaceBy compareVarAss va m.variables
          compareVarAss va1 va2 = va1.variable == va2.variable

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
                                    then xs
                                    else x : (deleteBy f xs)
