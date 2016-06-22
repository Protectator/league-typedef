# league-typedef
[![NPM version](https://badge.fury.io/js/league-typedef.svg?branch=master)](https://www.npmjs.com/package/league-typedef)

TypeScript Type Definitions for League of Legends' API at https://developer.riotgames.com/api/methods

## Installation
`npm install --save-dev league-typedef`

## Usage
Use these type definitions when building a TypeScript library around League of Legends' official API.
NB : This package consists of **only** TypeScript Type Definitions (`.d.ts`). Its intended use is to ease the writing of *League of Legends* Typescript programs by providing types for all the API endpoints.

### In your Typescript file
```typescript
import * as api from 'league-typedef';
```

### Example
[league-typenode](https://github.com/Protectator/league-typenode) is a Node.js wrapper that uses these definitions.

## Types version
| Method        	| Module name | Version 	| Remarks
|-----------------	|-----------  |------	    |--------
| [champion](https://developer.riotgames.com/api/methods#!/1015)        	| leagueApi.champion | v1.2 | |
| [championmastery](https://developer.riotgames.com/api/methods#!/1071)        	| leagueApi.championmastery |  | |
| [current-game](https://developer.riotgames.com/api/methods#!/976)    	| leagueApi.currentGame | v1.0 | |
| [featured-games](https://developer.riotgames.com/api/methods#!/977)  	| leagueApi.featuredGames | v1.0 | |
| ~~[game](https://developer.riotgames.com/api/methods#!/1060)~~             	| ~~leagueApi.game~~ | ~~v1.3~~ | deprecated |
| [league](https://developer.riotgames.com/api/methods#!/985)          	| leagueApi.league | v2.5 | |
| [lol-static-data](https://developer.riotgames.com/api/methods#!/1055) 	| leagueApi.lolStaticData | v1.2 | |
| [lol-status](https://developer.riotgames.com/api/methods#!/908)      	| leagueApi.lolStatus | v1.0 | |
| [match](https://developer.riotgames.com/api/methods#!/1064)           	| leagueApi.match | v2.2 | |
| [matchlist](https://developer.riotgames.com/api/methods#!/1069)         | leagueApi.matchlist | v2.2 | |
| [stats](https://developer.riotgames.com/api/methods#!/1062)           	| leagueApi.stats | v1.3 | |
| [summoner](https://developer.riotgames.com/api/methods#!/1061)        	| leagueApi.summoner	| v1.4 | |
| [team](https://developer.riotgames.com/api/methods#!/986)            	| leagueApi.team | v2.4 | |
| [tournament-provider](https://developer.riotgames.com/api/methods#!/1057) | leagueApi.tournamentProvider | v1 | Uses a [different api key](https://developer.riotgames.com/docs/tournaments-api) |

## License
league-typedef is distributed under [The MIT License](http://opensource.org/licenses/MIT).
