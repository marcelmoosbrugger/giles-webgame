# [WIP] Webgame for Giles's Game

## Prerequisites
Install node and npm and assign the following aliases:
- alias npm-exec="PATH=$(npm bin):$PATH"
- alias webpack="npm-exec webpack"
- alias webpack-dev-server="npm-exec webpack-dev-server"

## Installation
1. Clone repository
2. npm i --no-optional
3. PureScript dependencies need to be installed via bower. Therefore bower has to be installed: `npm install -g bower`

## Usage
- npm run server - To start the server at `localhost:8080` with enabled hot reloading
- npm run build:dev - To build the dist files for the dev environment
- npm run build:prod - To build the dist files for the prod environment
- npm run compile:purs - To compile the purescript modules
- npm run watch:purs - To watch and the purescript modules and automatically compile them on change
