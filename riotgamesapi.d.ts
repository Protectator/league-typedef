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
		championId: number;
		/**
		 * The masteries used by this participant
		 */
		masteries: Mastery[];
		/**
		 * The ID of the profile icon used by this participant
		 */
		profileIconId: number;
		/**
		 * The runes used by this participant
		 */
		runes: Rune[];
		/**
		 * The ID of the first summoner spell used by this participant
		 */
		spell1Id: number;
		/**
		 * The ID of the second summoner spell used by this participant
		 */
		spell2Id: number;
		/**
		 * The summoner ID of this participant
		 */
		summonerId: number;
		/**
		 * The summoner name of this participant
		 */
		summonerName: string;
		/**
		 * The team ID of this participant, indicating the participant's team
		 */
		teamId: number;
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
		/**
		 * The ID of the mastery
		 */
		masteryId: number;
		/**
		 * The number of points put into this mastery by the user
		 */
		rank: number;
	}
	
	/**
	 * 
	 */
	export class Rune {
		/**
		 * The count of this rune used by the participant
		 */
		count: number;
		/**
		 * The ID of the rune
		 */
		runeId: number;
	}
	
	/* features-games-v1.0 */
	
	/**
	 * 
	 */
	export class FeaturesGames {
		/**
		 * The suggested interval to wait before requesting FeaturedGames again
		 */
		clientRefreshInterval: number;
		/**
		 * The list of featured games
		 */
		gameList: FeaturedGameInfo[];
	}
	
	/**
	 * 
	 */
	export class FeaturedGameInfo {
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
		participants: Participant[];
		/**
		 * The ID of the platform on which the game is being played
		 */
		platformId: string;
	}
	
	// BannedChampion is already defined
	
	// Observer is already defined
	
	/**
	 * 
	 */
	export class Participant {
		/**
		 * Flag indicating whether or not this participant is a bot
		 */
		bot: boolean;
		/**
		 * The ID of the champion played by this participant
		 */
		championId: number;
		/**
		 * The ID of the profile icon used by this participant
		 */
		profileIconId: number;
		/**
		 * The ID of the first summoner spell used by this participant
		 */
		spell1Id: number;
		/**
		 * The ID of the second summoner spell used by this participant
		 */
		spell2Id: number;
		/**
		 * The summoner name of this participant
		 */
		summonerName: string;
		/**
		 * The team ID of this participant, indicating the participant's team
		 */
		teamId: number;
	}
}