module Test where

data Tree a = Leaf a | Node a (Tree a) (Tree a)

myTree :: Tree Int
myTree = (Node 1 (Node 2 (Leaf 3) (Leaf 4)) (Leaf 5))
