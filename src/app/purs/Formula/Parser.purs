{-|
This file is part of Giles's Webgame.
(c) Marcel Moosbrugger, 2017
License: MIT

This source file is subject to the MIT license that is bundled
with this source code in the file LICENSE.
-}

module Formula.Parser where

import Prelude
import Formula
import Control.Alt ((<|>))
import Data.Either (Either, isRight, fromRight)
import Data.Array (fromFoldable, many)
import Data.String (singleton)
import Data.Foldable (fold)
import Partial.Unsafe (unsafePartial)
import Text.Parsing.Parser (Parser, ParseError, runParser, fail)
import Text.Parsing.Parser.String (string, char, oneOf, eof)
import Text.Parsing.Parser.Combinators (sepBy1, option)

-- | Definiton of allowed symbols
uppercase   = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
lowercaseAT = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t']
lowercaseUZ = ['u','v','w','x','y','z']
allChars    = uppercase <> lowercaseAT <> lowercaseUZ

predicateSymbols = uppercase
constantSymbols  = lowercaseAT
variables        = lowercaseUZ
connectives      = ['\8743', '\0038', '\8744', '\8594']

-- | Parsing functions
parse :: String -> Either ParseError Formula
parse f = runParser f inputFormula

-- | Parses a formula unsafely
unsafeParse :: String -> Formula
unsafeParse f = unsafePartial $ fromRight $ parse f

-- | Parses a formula and performs additional checks
inputFormula :: Parser String Formula
inputFormula = do f <- formula unit
                  eof
                  if hasDuplicatedPredicates f
                    then fail "The formula contains different predicates with the same name"
                    else pure f

-- | Parser for a complete formula
formula :: Unit -> Parser String Formula
formula _ = top
            <|> bottom
            <|> predicate
            <|> negated
            <|> quantified
            <|> brackets binary

-- | Parser for a negated formula
negated = do _ <- char '\0172'
             f <- formula unit
             pure $ Not f

-- | Parser for a quantified formula
quantified = do q <- exists <|> forAll
                v <- variable
                f <- formula unit
                pure $ Quant q v f

-- | Parser for a predicate or a propositional variable
predicate = do p    <- predicateName
               args <- option [] arguments
               pure $ Pred p args

-- | Parser for arguments of a predicate
arguments = brackets \_ -> do
               args <- argument `sepBy1` string ","
               pure $ fromFoldable args

-- | Parser for a predicate with a binary outermost connective
binary _ = do f1  <- (formula unit)
              con <- imp <|> or <|> sand <|> wand
              f2  <- (formula unit)
              pure $ Bin con f1 f2

-- | Parses the string of a given parsers wrapped in brackets
brackets parser = do _      <- string "("
                     result <- parser unit
                     _      <- string ")"
                     pure result

-- | Parses the string f a given parser followed by an arbitrary amount of primes
primed parser = do result <- parser unit
                   primes <- many (string "'")
                   pure $ result <> (fold primes)

constant = primed \_ -> do
                head <- oneOf constantSymbols
                tail <- many (oneOf allChars)
                pure $ (singleton head) <> (fold $ map singleton tail)

-- | Parser for predicate argument
argument = variable <|> constant

-- | Parsers for different logical symbols
exists = char '\8707' >>= \_ -> pure Exists
forAll = char '\8704' >>= \_ -> pure Forall
wand =   char '\8743' >>= \_ -> pure Wand
sand =   char '\0038' >>= \_ -> pure Sand
or =     char '\8744' >>= \_ -> pure Or
imp =    char '\8594' >>= \_ -> pure Imp
top =    char '\8868' >>= \_ -> pure Top
bottom = char '\8869' >>= \_ -> pure Bot

-- | Parsers for different symbols
variable =      primed \_ -> singleton <$> oneOf variables
predicateName = primed \_ -> singleton <$> oneOf predicateSymbols

-- | Test a given string if it can be parsed by a given parser
is :: forall a . String -> Parser String a -> Boolean
is string parser = isRight (runParser string parser)
