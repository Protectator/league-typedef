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
| [champion](https://developer.riotgames.com/api-methods/#champion-v1.2)        	| leagueApi.champion | v1.2 | |
| [championmastery](https://developer.riotgames.com/api-methods/#championmastery)        	| leagueApi.championmastery |  | |
| [current-game](https://developer.riotgames.com/api-methods/#current-game-v1.0)    	| leagueApi.currentGame | v1.0 | |
| [featured-games](https://developer.riotgames.com/api-methods/#featured-games-v1.0)  	| leagueApi.featuredGames | v1.0 | |
| ~~[game](https://developer.riotgames.com/api-methods/#game-v1.3)~~             	| ~~leagueApi.game~~ | ~~v1.3~~ | deprecated |
| [league](https://developer.riotgames.com/api-methods/#league-v2.5)          	| leagueApi.league | v2.5 | |
| [lol-static-data](https://developer.riotgames.com/api-methods/#lol-static-data-v1.2) 	| leagueApi.lolStaticData | v1.2 | |
| [lol-status](https://developer.riotgames.com/api-methods/#lol-status-v1.0)      	| leagueApi.lolStatus | v1.0 | |
| [match](https://developer.riotgames.com/api-methods/#match-v2.2)           	| leagueApi.match | v2.2 | |
| [matchlist](https://developer.riotgames.com/api-methods/#matchlist-v2.2)         | leagueApi.matchlist | v2.2 | |
| [runes-masteries](https://developer.riotgames.com/api-methods/#runes-masteries-v1.4)     | leagueApi.runesMasteries | v1.4 | |
| [stats](https://developer.riotgames.com/api-methods/#stats-v1.3)           	| leagueApi.stats | v1.3 | |
| [summoner](https://developer.riotgames.com/api-methods/#summoner-v1.4)        	| leagueApi.summoner	| v1.4 | |
| [tournament-provider](https://developer.riotgames.com/api/methods#!/1057) | leagueApi.tournamentProvider | v1 | Uses a [different api key](https://developer.riotgames.com/tournament-api.html) |

## License
league-typedef is distributed under [The MIT License](http://opensource.org/licenses/MIT).
