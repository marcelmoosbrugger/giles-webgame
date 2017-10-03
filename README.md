# Webgame for Giles's Game

## Prerequisites
1. Install node and npm and assign the following aliases:
    - alias npm-exec="PATH=$(npm bin):$PATH"
    - alias webpack="npm-exec webpack"
    - alias webpack-dev-server="npm-exec webpack-dev-server"
2. Install purescript `npm install -g purescript`
3. Install purescript-psa `npm install -g purescript-psa` (enhanced purescript compiler)
4. Install bower `npm install -g bower` (for purescript dependencies)

## Installation
1. Clone repository
2. `npm run install:dependencies` (installs node and bower dependencies)

## Usage
- npm start - To start the server at `localhost:8080` with enabled hot reloading
- npm run build:dev - To build the dist files for the dev environment
- npm run build:prod - To build the dist files for the prod environment
- npm run repl:purs - Start the purse files in interactive mode
