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

type DomainElement = String
type Domain = Array DomainElement
type ConstantAssignment = { constant :: Constant, element :: DomainElement }
type VariableAssignment = { variable :: Variable, element :: DomainElement }
type PredicateAssignment = { predicate :: Name, values :: (Array { arguments :: Arguments, value :: Number }) }
data Model = Model {
      domain     :: Domain
    , constants  :: (Array ConstantAssignment)
    , variables  :: (Array VariableAssignment)
    , predicates :: (Array PredicateAssignment)
    }

emptyModel :: Model
emptyModel = Model { domain: [], constants: [], variables: [], predicates: [] }

setDomain :: Domain -> Model -> Model
setDomain d (Model m) = Model $ m { domain = d }
