// Type definitions for the Riot Game's API
// Project: https://developer.riotgames.com/api/methods
// Definitions by: Kewin Dousse (Protectator) <https://github.com/Protectator>
// Definitions: https://github.com/Protectator/riotgamesapi-typedef

declare module riotGamesApi {
	
	/* champion-v1.2 */
	
	/**
	 * Contains a collection of champion information
	 */
	export class ChampionListDto {
		champions: ChampionDto[];
	}
	
	/**
	 * Contains champion information
	 */
	export class ChampionDto {
		/**
		 * Indicates if the champion is active
		 */
		active: boolean;
		/**
		 * Bot enabled flag (for custom games)
		 */
		botEnabled: boolean;
		/**
		 * Bot Match Made enabled flag (for Co-op vs. AI games).
		 */
		botMmEnabled: boolean;
		/**
		 * Indicates if the champion is free to play.
		 * Free to play champions are rotated periodically.
		 */
		freeToPlay: boolean;
		/**
		 * Champion ID.
		 * For static information correlating champion IDs, refer to the LoL Static Data API.
		 */
		id: number;
		/**
		 * Ranked play enabled flag
		 */
		rankedPlayEnabled: boolean;
	}
	
	/* current-game-v1.0 */
	
	/**
	 * 
	 */
	export class CurrentGameInfo {
		/**
		 * Banned champion information
		 */
		bannedChampions: BannedChampion[];
		/**
		 * The ID of the game
		 */
		gameId: number;
		/**
		 * The amount of time in seconds that has passed since the game started
		 */
		gameLength: number;
		/**
		 * The game mode (Legal values: CLASSIC, ODIN, ARAM, TUTORIAL, ONEFORALL, ASCENSION, FIRSTBLOOD, KINGPORO)
		 */
		gameMode: string;
		/**
		 * The queue type (queue types are documented on the Game Constants page)
		 */
		gameQueueConfigId: number;
		/**
		 * The game start time represented in epoch milliseconds
		 */
		gameStartTime: number;
		/**
		 * The game type (Legal values: CUSTOM_GAME, MATCHED_GAME, TUTORIAL_GAME)
		 */
		gameType: string;
		/**
		 * The ID of the map
		 */
		mapId: number;
		/**
		 * The observer information
		 */
		observers: Observer;
		/**
		 * The participant information
		 */
		participants: CurrentGameParticipant[];
		/**
		 * The ID of the platform on which the game is being played
		 */
		platformId: string;
	}
	
	/**
	 * 
	 */
	export class BannedChampion {
		/**
		 * The ID of the banned champion
		 */
		championId: number;

		/**
		 * The turn during which the champion was banned
		 */
		pickTurn: number;

		/**
		 * The ID of the team that banned the champion
		 */
		teamId: number;
	}
	
	/**
	 * 
	 */
	export class CurrentGameParticipant {
		/**
		 * Flag indicating whether or not this participant is a bot
		 */
		bot: boolean;
		/**
		 * The ID of the champion played by this participant
		 */
		championId: long;
		/**
		 * The masteries used by this participant
		 */
		masteries: List[Mastery];
		/**
		 * The ID of the profile icon used by this participant
		 */
		profileIconId: long;
		/**
		 * The runes used by this participant
		 */
		runes: List[Rune];
		/**
		 * The ID of the first summoner spell used by this participant
		 */
		spell1Id: long;
		/**
		 * The ID of the second summoner spell used by this participant
		 */
		spell2Id: long;
		/**
		 * The summoner ID of this participant
		 */
		summonerId: long;
		/**
		 * The summoner name of this participant
		 */
		summonerName: string;
		/**
		 * The team ID of this participant, indicating the participant's team
		 */
		teamId: long;
	}
	
	/**
	 * 
	 */
	export class Observer {
		/**
		 * Key used to decrypt the spectator grid game data for playback
		 */
		encryptionKey: string;
	}
	 
	/**
	 * 
	 */
	export class Mastery {

	}

}