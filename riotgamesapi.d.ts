// Type definitions for the Riot Game's API
// Project: https://developer.riotgames.com/api/methods
// Definitions by: Kewin Dousse (Protectator) <https://github.com/Protectator>
// Definitions: https://github.com/Protectator/riotgamesapi-typedef

declare module riotGamesApi {

    /**
     * champion-v1.2
     */
    export module champion {
        export interface Operations {
            /**
             * Retrieve all champions. (REST)
             * Sould call GET /api/lol/{region}/v1.2/champion
             * @param region     Region where to retrieve the data.
             * @param freeToPlay Optional filter param to retrieve only free to play champions.
             */
            getChampions(
                region: string,
                freeToPlay?: boolean,
                callback?: (data: ChampionListDto) => void
            ): void;

            /**
             * Retrieve champion by ID. (REST)
             * Should call GET /api/lol/{region}/v1.2/champion/{id}
             * @param region Region where to retrieve the data.
             * @param id     ID of the champion to retrieve.
             */
            getChampionById(
                region: string,
                id: number,
                callback?: (data: ChampionDto) => void
            ): void
        }

        /**
         * Contains a collection of champion information
         */
        export interface ChampionListDto {
            /**
             * The collection of champion information.
             */
            champions: ChampionDto[];
        }

        /**
         * Contains champion information
         */
        export interface ChampionDto {
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
    }

    // Interfaces to both current-game and featured-games
    /**
     *
     */
    export interface GenericBannedChampion {
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
    export interface GenericObserver {
        /**
         * Key used to decrypt the spectator grid game data for playback
         */
        encryptionKey: string;
    }

    /**
     * championmastery
     */
    export module championmastery {
        export interface Operations {
            /**
             * Get a champion mastery by summoner ID and champion ID, returns null if given player has no mastery for given champion. (REST)
             * Sould call GET /championmastery/location/{platformId}/player/{summonerId}/champion/{championId}
             * @param platformId Region where to retrieve the data.
             * @param summonerId Summoner ID associated with the player
             * @param championId Champion ID to retrieve Champion Mastery for
             */
            getChampionMastery(
                platformId: string,
                summonerId: number,
                championId: number,
                callback?: (data:ChampionMasteryDto) => void
            ): void;
            
            /**
             * Get all champion mastery entries sorted by number of champion points descending. (REST)
             * Sould call GET /championmastery/location/{platformId}/player/{summonerId}/champions
             * @param platformId Region where to retrieve the data.
             * @param summonerId Summoner ID associated with the player
             */
            getChampionsMastery(
                platformId: string,
                summonerId: number,
                callback?: (data:ChampionMasteryDto[]) => void
            ): void;

            /**
             * Get a player's total champion mastery score, which is sum of individual champion mastery levels. (REST)
             * Sould call GET /championmastery/location/{platformId}/player/{summonerId}/score
             * @param platformId Region where to retrieve the data.
             * @param summonerId Summoner ID associated with the player
             */
            getScore(
                platformId: string,
                summonerId: number,
                callback?: (data:number) => void
            ): void;
            
            /**
             * Get specified number of top champion mastery entries sorted by number of champion points descending. (REST)
             * Should call GET /championmastery/location/{platformId}/player/{summonerId}/topchampions
             * @param platformId Region where to retrieve the data.
             * @param summonerId Summoner ID associated with the player
             * @param count      Number of entries to retrieve, defaults to 3
             */
            getTopChampions(
                platformId: string,
                summonerId: number,
                count: number,
                callback?: (data: ChampionMasteryDto[]) => void
            ): void;
        }

        /**
         * This object contains single Champion Mastery information for player and champion combination.
         */
        export interface ChampionMasteryDto {
            /**
             * Champion ID for this entry.
             */
            championId: number,
            /**
             * Champion level for specified player and champion combination.
             */
            championLevel: number,
            /**
             * Total number of champion points for this player and champion combination - they are used to determine championLevel.
             */
            championPoints: number,
            /**
             * Number of points earned since current level has been achieved. Zero if player reached maximum champion level for this champion.
             */
            championPointsSinceLastLevel: number,
            /**
             * Number of points needed to achieve next level. Zero if player reached maximum champion level for this champion.
             */
            championPointsUntilNextLevel: number,
            /**
             * Is chest granted for this champion or not in current season.
             */
            chestGranted: boolean,
            /**
             * The highest grade of this champion of current season.
             */
            highestGrade: string,
            /**
             * Last time this champion was played by this player - in Unix milliseconds time format.
             */
            lastPlayTime: number,
            /**
             * Player ID for this entry.
             */
            playerId: number
        }
    }
    
    /**
     * current-game-v1.0
     */
    export module currentGame {
        export interface Operations {
            /**
             * Get current game information for the given summoner ID. (REST)
             * Should call GET /observer-mode/rest/consumer/getSpectatorGameInfo/{platformId}/{summonerId}
             * @param platformId The platform ID for which to fetch data.
             * @param summonerId The ID of the summoner.
             */
            getSpectatorGameInfoBySummonerId(
                platformId: string,
                summonerId: number,
                callback?: (data: CurrentGameInfo) => void
            ): void;
        }

        /**
         *
         */
        export interface CurrentGameInfo {
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
        export interface BannedChampion extends GenericBannedChampion {
        }

        /**
         *
         */
        export interface CurrentGameParticipant {
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
        export interface Observer extends GenericObserver {
        }

        /**
         *
         */
        export interface Mastery {
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
        export interface Rune {
            /**
             * The count of this rune used by the participant
             */
            count: number;
            /**
             * The ID of the rune
             */
            runeId: number;
        }
    }

    /**
     * featured-game-v1.0
     */
    export module featuredGames {
        export interface Operations {
            /**
             * Get list of featured games. (REST)
             * Should call GET /observer-mode/rest/featured
             * @param region Region where to retrieve the data.
             */
            getGeaturedGames(
                region: string,
                callback?: (data: FeaturedGames) => void
            ): FeaturedGames;
        }

        /**
         *
         */
        export interface FeaturedGames {
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
        export interface FeaturedGameInfo {
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

        /**
         *
         */
        export interface BannedChampion extends GenericBannedChampion {
        }

        /**
         *
         */
        export interface CurrentGameParticipant {
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
        export interface Observer extends GenericObserver {
        }

        /**
         *
         */
        export interface Mastery {
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
        export interface Rune {
            /**
             * The count of this rune used by the participant
             */
            count: number;
            /**
             * The ID of the rune
             */
            runeId: number;
        }

        /**
         *
         */
        export interface Participant {
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

    /**
     * game-v1.3
     */
    export module game {
        export interface Operations {
            /**
             * Get recent games by summoner ID. (REST)
             * Should call GET /api/lol/{region}/v1.3/game/by-summoner/{summonerId}/recent
             * @param region     Region where to retrieve the data.
             * @param summonerId ID of the summoner for which to retrieve recent games.
             */
            getRecentGamesBySummonerId(
                region: string,
                summonerId: number,
                callback?: (data: RecentGamesDto) => void
            ): void;   
        }

        /**
         * Contains recent games information
         */
        export interface RecentGamesDto {
            /**
             * Collection of recent games played (max 10).
             */
            games: GameDto[];
            /**
             * Summoner ID.
             */
            summonerId: number;
        }

        /**
         * Contains game information
         */
        export interface GameDto {
            /**
             * Champion ID associated with game.
             */
            championId: number;
            /**
             * Date that end game data was recorded, specified as epoch milliseconds.
             */
            createDate: number;
            /**
             * Other players associated with the game.
             */
            fellowPlayers: PlayerDto[];
            /**
             * Game ID.
             */
            gameId: number;
            /**
             * Game mode. (Legal values: CLASSIC, ODIN, ARAM, TUTORIAL, ONEFORALL, ASCENSION, FIRSTBLOOD, KINGPORO)
             */
            gameMode: string;
            /**
             * Game type. (Legal values: CUSTOM_GAME, MATCHED_GAME, TUTORIAL_GAME)
             */
            gameType: string;
            /**
             * Invalid flag.
             */
            invalid: boolean;
            /**
             * IP Earned.
             */
            ipEarned: number;
            /**
             * Level.
             */
            level: number;
            /**
             * Map ID.
             */
            mapId: number;
            /**
             * ID of first summoner spell.
             */
            spell1: number;
            /**
             * ID of second summoner spell.
             */
            spell2: number;
            /**
             * Statistics associated with the game for this summoner.
             */
            stats: RawStatsDto;
            /**
             * Game sub-type. (Legal values: NONE, NORMAL, BOT, RANKED_SOLO_5x5, RANKED_PREMADE_3x3, RANKED_PREMADE_5x5, ODIN_UNRANKED, RANKED_TEAM_3x3, RANKED_TEAM_5x5, NORMAL_3x3, BOT_3x3, CAP_5x5, ARAM_UNRANKED_5x5, ONEFORALL_5x5, FIRSTBLOOD_1x1, FIRSTBLOOD_2x2, SR_6x6, URF, URF_BOT, NIGHTMARE_BOT, ASCENSION, HEXAKILL, KING_PORO, COUNTER_PICK)
             */
            subType: string;
            /**
             * Team ID associated with game. Team ID 100 is blue team. Team ID 200 is purple team.
             */
            teamId: number;
        }

        /**
         * Contains player information
         */
        export interface PlayerDto {
            /**
             * Champion id associated with player.
             */
            championId: number;
            /**
             * Summoner id associated with player.
             */
            summonerId: number;
            /**
             * Team id associated with player.
             */
            teamId: number;
        }

        /**
         * Contains raw stat information
         */
        export interface RawStatsDto {
            /**
             *
             */
            assists: number;
            /**
             * Number of enemy inhibitors killed.
             */
            barracksKilled: number;
            /**
             *
             */
            championsKilled: number;
            /**
             *
             */
            combatPlayerScore: number;
            /**
             *
             */
            consumablesPurchased: number;
            /**
             *
             */
            damageDealtPlayer: number;
            /**
             *
             */
            doubleKills: number;
            /**
             *
             */
            firstBlood: number;
            /**
             *
             */
            gold: number;
            /**
             *
             */
            goldEarned: number;
            /**
             *
             */
            goldSpent: number;
            /**
             *
             */
            item0: number;
            /**
             *
             */
            item1: number;
            /**
             *
             */
            item2: number;
            /**
             *
             */
            item3: number;
            /**
             *
             */
            item4: number;
            /**
             *
             */
            item5: number;
            /**
             *
             */
            item6: number;
            /**
             *
             */
            itemsPurchased: number;
            /**
             *
             */
            killingSprees: number;
            /**
             *
             */
            largestCriticalStrike: number;
            /**
             *
             */
            largestKillingSpree: number;
            /**
             *
             */
            largestMultiKill: number;
            /**
             * Number of tier 3 items built.
             */
            legendaryItemsCreated: number;
            /**
             *
             */
            level: number;
            /**
             *
             */
            magicDamageDealtPlayer: number;
            /**
             *
             */
            magicDamageDealtToChampions: number;
            /**
             *
             */
            magicDamageTaken: number;
            /**
             *
             */
            minionsDenied: number;
            /**
             *
             */
            minionsKilled: number;
            /**
             *
             */
            neutralMinionsKilled: number;
            /**
             *
             */
            neutralMinionsKilledEnemyJungle: number;
            /**
             *
             */
            neutralMinionsKilledYourJungle: number;
            /**
             * Flag specifying if the summoner got the killing blow on the nexus.
             */
            nexusKilled: boolean;
            /**
             *
             */
            nodeCapture: number;
            /**
             *
             */
            nodeCaptureAssist: number;
            /**
             *
             */
            nodeNeutralize: number;
            /**
             *
             */
            nodeNeutralizeAssist: number;
            /**
             *
             */
            numDeaths: number;
            /**
             *
             */
            numItemsBought: number;
            /**
             *
             */
            objectivePlayerScore: number;
            /**
             *
             */
            pentaKills: number;
            /**
             *
             */
            physicalDamageDealtPlayer: number;
            /**
             *
             */
            physicalDamageDealtToChampions: number;
            /**
             *
             */
            physicalDamageTaken: number;
            /**
             *
             */
            playerPosition: number;
            /**
             *
             */
            playerRole: number;
            /**
             *
             */
            quadraKills: number;
            /**
             *
             */
            sightWardsBought: number;
            /**
             * Number of times first champion spell was cast.
             */
            spell1Cast: number;
            /**
             * Number of times second champion spell was cast.
             */
            spell2Cast: number;
            /**
             * Number of times third champion spell was cast.
             */
            spell3Cast: number;
            /**
             * Number of times fourth champion spell was cast.
             */
            spell4Cast: number;
            /**
             *
             */
            summonSpell1Cast: number;
            /**
             *
             */
            summonSpell2Cast: number;
            /**
             *
             */
            superMonsterKilled: number;
            /**
             *
             */
            team: number;
            /**
             *
             */
            teamObjective: number;
            /**
             *
             */
            timePlayed: number;
            /**
             *
             */
            totalDamageDealt: number;
            /**
             *
             */
            totalDamageDealtToChampions: number;
            /**
             *
             */
            totalDamageTaken: number;
            /**
             *
             */
            totalHeal: number;
            /**
             *
             */
            totalPlayerScore: number;
            /**
             *
             */
            totalScoreRank: number;
            /**
             *
             */
            totalTimeCrowdControlDealt: number;
            /**
             *
             */
            totalUnitsHealed: number;
            /**
             *
             */
            tripleKills: number;
            /**
             *
             */
            trueDamageDealtPlayer: number;
            /**
             *
             */
            trueDamageDealtToChampions: number;
            /**
             *
             */
            trueDamageTaken: number;
            /**
             *
             */
            turretsKilled: number;
            /**
             *
             */
            unrealKills: number;
            /**
             *
             */
            victoryPointTotal: number;
            /**
             *
             */
            visionWardsBought: number;
            /**
             *
             */
            wardKilled: number;
            /**
             *
             */
            wardPlaced: number;
            /**
             * Flag specifying whether or not this game was won.
             */
            win: boolean;
        }
    }

    /**
     * league-v2.5
     */
    export module league {
        export interface Operations {
            /**
             * Get leagues mapped by summoner ID for a given list of summoner IDs. (REST)
             * Should call GET /api/lol/{region}/v2.5/league/by-summoner/{summonerIds}
             * @param region       The region of the leagues.
             * @param summonerIds Comma-separated list of summoner IDs. Maximum allowed at once is 10.
             */
            getLeagueBySummonerIds(
                region: string,
                summonerIds: string,
                callback?: (data: {[s: string]: LeagueDto[]}) => void
            ): void;

            /**
             * Get league entries mapped by summoner ID for a given list of summoner IDs. (REST)
             * Should call GET /api/lol/{region}/v2.5/league/by-summoner/{summonerIds}/entry
             * @param region       The region of the leagues.
             * @param summonerIds Comma-separated list of summoner IDs. Maximum allowed at once is 10.
             */
            getLeagueEntryBySummonerIds(
                region: string,
                summonerIds: string,
                callback?: (data: {[s: string]: LeagueDto[]}) => void
            ): void;

            /**
             * Get leagues mapped by team ID for a given list of team IDs. (REST)
             * Should call GET /api/lol/{region}/v2.5/league/by-team/{teamIds}
             * @param region  The region of the leagues.
             * @param teamIds Comma-separated list of team IDs. Maximum allowed at once is 10.
             */
            getLeagueByTeamIds(
                region: string,
                summonerIds: string,
                callback?: (data: {[s: string]: LeagueDto[]}) => void
            ): void;

            /**
             * Get league entries mapped by team ID for a given list of team IDs. (REST)
             * Should call GET /api/lol/{region}/v2.5/league/by-team/{teamIds}/entry
             * @param region  The region of the leagues.
             * @param teamIds Comma-separated list of team IDs. Maximum allowed at once is 10.
             */
            getLeagueEntryByTeamIds(
                region: string,
                summonerIds: string,
                callback?: (data: {[s: string]: LeagueDto[]}) => void
            ): void;

            /**
             * Get challenger tier leagues. (REST)
             * Should call GET /api/lol/{region}/v2.5/league/challenger
             * @param region Region where to retrieve the data.
             * @param type   Game queue type.
             */
            getLeagueChallenger(
                region: string,
                type: string,
                callback?: (data: LeagueDto) => void
            ): void;

            /**
             * Get master tier leagues. (REST)
             * Should call GET /api/lol/{region}/v2.5/league/master
             * @param region Region where to retrieve the data.
             * @param type   Game queue type.
             */
            getLeagueMaster(
                region: string,
                type: string,
                callback?: (data: LeagueDto) => void
            ): void;
        }

        /**
         * Contains league information
         */
        export interface LeagueDto {
            /**
             * The requested league entries.
             */
            entries: LeagueEntryDto[];
            /**
             * This name is an internal place-holder name only. Display and localization of names in the game client are handled client-side.
             */
            name: string;
            /**
             * Specifies the relevant participant that is a member of this league (i.e., a requested summoner ID, a
             * requested team ID, or the ID of a team to which one of the requested summoners belongs). Only present when
             * full league is requested so that participant's entry can be identified. Not present when individual
             * entry is requested.
             */
            participantId: string;
            /**
             * The league's queue type. (Legal values: RANKED_SOLO_5x5, RANKED_TEAM_3x3, RANKED_TEAM_5x5)
             */
            queue: string;
            /**
             * The league's tier. (Legal values: CHALLENGER, MASTER, DIAMOND, PLATINUM, GOLD, SILVER, BRONZE)
             */
            tier: string;
        }

        /**
         * Contains league participant information representing a summoner or team.
         */
        export interface LeagueEntryDto {
            /**
             * The league division of the participant.
             */
            division: string;
            /**
             * Specifies if the participant is fresh blood.
             */
            isFreshBlood: boolean;
            /**
             * Specifies if the participant is on a hot streak.
             */
            isHotStreak: boolean;
            /**
             * Specifies if the participant is inactive.
             */
            isInactive: boolean;
            /**
             * Specifies if the participant is a veteran.
             */
            isVeteran: boolean;
            /**
             * The league points of the participant.
             */
            leaguePoints: number;
            /**
             * The number of losses for the participant.
             */
            losses: number;
            /**
             * Mini series data for the participant. Only present if the participant is currently in a mini series.
             */
            miniSeries: MiniSeriesDto;
            /**
             * The ID of the participant (i.e., summoner or team) represented by this entry.
             */
            playerOrTeamId: string;
            /**
             * The name of the the participant (i.e., summoner or team) represented by this entry.
             */
            playerOrTeamName: string;
            /**
             * The number of wins for the participant.
             */
            wins: number;
        }

        /**
         * Contains mini series information.
         */
        export interface MiniSeriesDto {
            /**
             * Number of current losses in the mini series.
             */
            losses: number;
            /**
             * String showing the current, sequential mini series progress where 'W' represents a win, 'L' represents a loss, and 'N' represents a game that hasn't been played yet.
             */
            progress: string;
            /**
             * Number of wins required for promotion.
             */
            target: number;
            /**
             * Number of current wins in the mini series.
             */
            wins: number;
        }
    }

    /**
     * lol-static-data-v1.2
     */
    export module lolStaticData {
        /**
         * Retrieves champion list. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/champion
         * @param region    Region from which to retrieve data.
         * @param locale    Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version   Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param dataById  If specified as true, the returned data map will use the champions' IDs as the keys. If not specified or specified as false, the returned data map will use the champions' keys instead.
         * @param champData Tags to return additional data. Only type, version, data, id, key, name, and title are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getChampions(region:string,
                                     locale:string,
                                     version:string,
                                     dataById:boolean,
                                     champData:string):ChampionListDto;

        /**
         * Retrieves a champion by its id. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/champion/{id}
         * @param region    Region from which to retrieve data.
         * @param id        Champion ID
         * @param locale    Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version   Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param champData Tags to return additional data. Only id, key, name, and title are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getChampionById(region:string,
                                        id:number,
                                        locale:string,
                                        version:string,
                                        champData:string):ChampionDto;

        /**
         * Retrieves item list. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/item
         * @param region       Region from which to retrieve data.
         * @param locale       Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version      Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param itemListData Tags to return additional data. Only type, version, basic, data, id, name, plaintext, group, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getItems(region:string,
                                 locale:string,
                                 version:string,
                                 itemListData:string):ItemListDto;

        /**
         * Retrieves item by its unique id. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/item/{id}
         * @param region   Region from which to retrieve data.
         * @param id       Item ID
         * @param locale   Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version  Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param itemData Tags to return additional data. Only id, name, plaintext, group, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getItemById(region:string,
                                    id:number,
                                    locale:string,
                                    version:string,
                                    itemData:string):ItemDto;

        /**
         * Retrieve language strings data. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/language-strings
         * @param region  Region from which to retrieve data.
         * @param locale  Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         */
        export function getLanguageStrings(region:string,
                                           locale:string,
                                           version:string):LanguageStringsDto;

        /**
         * Retrieve supported languages data. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/languages
         * @param region Region from which to retrieve data.
         */
        export function getLanguages(region:string):string[];

        /**
         * Retrieve map data. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/map
         * @param region  Region from which to retrieve data.
         * @param locale  Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         */
        export function getMaps(region:string,
                                locale:string,
                                version:string):MapDataDto;

        /**
         * Retrieves mastery list. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/mastery
         * @param region          Region from which to retrieve data.
         * @param locale          Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version         Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param masteryListData Tags to return additional data. Only type, version, data, id, name, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getMasteries(region:string,
                                     locale:string,
                                     version:string,
                                     masteryListData:string):MasteryListDto;

        /**
         * Retrieves mastery item by its unique id. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/mastery/{id}
         * @param region      Region from which to retrieve data.
         * @param id          Mastery ID
         * @param locale      Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version     Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param masteryData Tags to return additional data. Only id, name, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getMasteryById(region:string,
                                       id:number,
                                       locale:string,
                                       version:string,
                                       masteryData:string):MasteryDto;

        /**
         * Retrieve realm data. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/realm
         * @param region Region corresponding to data to retrieve.
         */
        export function getRealm(region:string):RealmDto;

        /**
         * Retrieves rune list. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/rune
         * @param region       Region from which to retrieve data.
         * @param locale       Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version      Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param runeListData Tags to return additional data. Only type, version, data, id, name, rune, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getRunes(region:string,
                                 locale:string,
                                 version:string,
                                 runeListData:string):RuneListDto;

        /**
         * Retrieves rune by its unique id. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/rune/{id}
         * @param region   Region from which to retrieve data.
         * @param id       Rune ID
         * @param locale   Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version  Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param runeData Tags to return additional data. Only id, name, rune, and description are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getRuneById(region:string,
                                    id:number,
                                    locale:string,
                                    version:string,
                                    runeData:string):RuneDto;

        /**
         * Retrieves summoner spell list. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/summoner-spell
         * @param region    Region from which to retrieve data.
         * @param locale    Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version   Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param dataById  If specified as true, the returned data map will use the spells' IDs as the keys. If not specified or specified as false, the returned data map will use the spells' keys instead.
         * @param spellData Tags to return additional data. Only type, version, data, id, key, name, description, and summonerLevel are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getSummonerSpells(region:string,
                                          locale:string,
                                          version:string,
                                          dataById:boolean,
                                          spellData:string):SummonerSpellListDto;

        /**
         * Retrieves summoner spell by its unique id. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/summoner-spell/{id}
         * @param region    Region from which to retrieve data.
         * @param id        Summoner spell ID
         * @param locale    Locale code for returned data (e.g., en_US, es_ES). If not specified, the default locale for the region is used.
         * @param version   Data dragon version for returned data. If not specified, the latest version for the region is used. List of valid versions can be obtained from the /versions endpoint.
         * @param spellData Tags to return additional data. Only id, key, name, description, and summonerLevel are returned by default if this parameter isn't specified. To return all additional data, use the tag 'all'.
         */
        export function getSummonerSpellById(region:string,
                                             id:number,
                                             locale:string,
                                             version:string,
                                             spellData:string):SummonerSpellDto;

        /**
         * Retrieve version data. (REST)
         * Should call GET /api/lol/static-data/{region}/v1.2/versions
         * @param region Region from which to retrieve data.
         */
        export function getVersions(region:string):string[];

        /**
         * Contains champion list data.
         */
        export interface ChampionListDto {
            /**
             *
             */
            data: { [s: string]: ChampionDto; };
            /**
             *
             */
            format: string;
            /**
             *
             */
            keys: { [s: string]: string; };
            /**
             *
             */
                type: string;
            /**
             *
             */
            version: string;
        }

        /**
         * Contains champion data.
         */
        export interface ChampionDto {
            /**
             *
             */
            allytips: string[];
            /**
             *
             */
            blurb: string;
            /**
             *
             */
            enemytips: string[];
            /**
             *
             */
            id: number;
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            info: InfoDto;
            /**
             *
             */
            key: string;
            /**
             *
             */
            lore: string;
            /**
             *
             */
            name: string;
            /**
             *
             */
            partype: string;
            /**
             *
             */
            passive: PassiveDto;
            /**
             *
             */
            recommended: RecommendedDto[];
            /**
             *
             */
            skins: SkinDto[];
            /**
             *
             */
            spells: ChampionSpellDto[];
            /**
             *
             */
            stats: StatsDto;
            /**
             *
             */
            tags: string[];
            /**
             *
             */
            title: string;
        }

        /**
         * Contains champion spell data
         */
        export interface ChampionSpellDto {
            /**
             *
             */
            altimages: ImageDto[];
            /**
             *
             */
            cooldown: number[];
            /**
             *
             */
            cooldownBurn: string;
            /**
             *
             */
            cost: number[];
            /**
             *
             */
            costBurn: string;
            /**
             *
             */
            costType: string;
            /**
             *
             */
            description: string;
            /**
             * This field is a List of List of Double.
             */
            effect: number[][];
            /**
             *
             */
            effectBurn: string[];
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            key: string;
            /**
             *
             */
            leveltip: LevelTipDto;
            /**
             *
             */
            maxrank: number;
            /**
             *
             */
            name: string;
            /**
             * This field is either a List of Integer or the String 'self' for spells that target one's own champion.
             */
            range: string | number[];
            /**
             *
             */
            rangeBurn: string;
            /**
             *
             */
            resource: string;
            /**
             *
             */
            sanitizedDescription: string;
            /**
             *
             */
            sanitizedTooltip: string;
            /**
             *
             */
            tooltip: string;
            /**
             *
             */
            vars: SpellVarsDto[];
        }

        /**
         * Contains image data.
         */
        export interface ImageDto {
            /**
             *
             */
            full: string;
            /**
             *
             */
            group: string;
            /**
             *
             */
            h: number;
            /**
             *
             */
            sprite: string;
            /**
             *
             */
            w: number;
            /**
             *
             */
            x: number;
            /**
             *
             */
            y: number;
        }

        /**
         * Contains champion information
         */
        export interface InfoDto {
            /**
             *
             */
            attack: number;
            /**
             *
             */
            defense: number;
            /**
             *
             */
            difficulty: number;
            /**
             *
             */
            magic: number;
        }

        /**
         * Contains champion passive data.
         */
        export interface PassiveDto {
            /**
             *
             */
            description: string;
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            name: string;
            /**
             *
             */
            sanitizedDescription: string;
        }

        /**
         * Contains champion recommended data.
         */
        export interface RecommendedDto {
            /**
             *
             */
            blocks: BlockDto[];
            /**
             *
             */
            champion: string;
            /**
             *
             */
            map: string;
            /**
             *
             */
            mode: string;
            /**
             *
             */
            priority: boolean;
            /**
             *
             */
            title: string;
            /**
             *
             */
                type: string;
        }

        /**
         * Contains champion skin data.
         */
        export interface SkinDto {
            /**
             *
             */
            id: number;
            /**
             *
             */
            name: string;
            /**
             *
             */
            num: number;
        }

        /**
         * Contains champion stats data.
         */
        export interface StatsDto {
            /**
             *
             */
            armor: number;
            /**
             *
             */
            armorperlevel: number;
            /**
             *
             */
            attackdamage: number;
            /**
             *
             */
            attackdamageperlevel: number;
            /**
             *
             */
            attackrange: number;
            /**
             *
             */
            attackspeedoffset: number;
            /**
             *
             */
            attackspeedperlevel: number;
            /**
             *
             */
            crit: number;
            /**
             *
             */
            critperlevel: number;
            /**
             *
             */
            hp: number;
            /**
             *
             */
            hpperlevel: number;
            /**
             *
             */
            hpregen: number;
            /**
             *
             */
            hpregenperlevel: number;
            /**
             *
             */
            movespeed: number;
            /**
             *
             */
            mp: number;
            /**
             *
             */
            mpperlevel: number;
            /**
             *
             */
            mpregen: number;
            /**
             *
             */
            mpregenperlevel: number;
            /**
             *
             */
            spellblock: number;
            /**
             *
             */
            spellblockperlevel: number;
        }

        /**
         * Contains champion level tip data.
         */
        export interface LevelTipDto {
            /**
             *
             */
            effect: string[];
            /**
             *
             */
            label: string[];
        }

        /**
         * Contains spell vars data.
         */
        export interface SpellVarsDto {
            /**
             *
             */
            coeff: number[];
            /**
             *
             */
            dyn: string;
            /**
             *
             */
            key: string;
            /**
             *
             */
            link: string;
            /**
             *
             */
            ranksWith: string;
        }

        /**
         * Contains champion recommended block data
         */
        export interface BlockDto {
            /**
             *
             */
            items: BlockItemDto[];
            /**
             *
             */
            recMath: boolean;
            /**
             *
             */
                type: string;
        }

        /**
         * Contains champion recommended block item data.
         */
        export interface BlockItemDto {
            /**
             *
             */
            count: number;
            /**
             *
             */
            id: number;
        }

        /**
         * Contains item list data.
         */
        export interface ItemListDto {
            /**
             *
             */
            basic: BasicDataDto;
            /**
             *
             */
            data: { [s: string]: ItemDto; };
            /**
             *
             */
            groups: GroupDto[];
            /**
             *
             */
            tree: ItemTreeDto[];
            /**
             *
             */
                type: string;
            /**
             *
             */
            version: string;
        }

        /**
         * Contains basic data.
         */
        export interface BasicDataDto {
            /**
             *
             */
            colloq: string;
            /**
             *
             */
            consumeOnFull: boolean;
            /**
             *
             */
            consumed: boolean;
            /**
             *
             */
            depth: number;
            /**
             *
             */
            description: string;
            /**
             *
             */
                from: string[];
            /**
             * Data Dragon includes the gold field for basic data, which is shared by both rune and item.
             * However, only items have a gold field on them, representing their gold cost in the store.
             * Since runes are not sold in the store, they have no gold cost.
             */
            gold: GoldDto;
            /**
             *
             */
            group: string;
            /**
             *
             */
            hideFromAll: boolean;
            /**
             *
             */
            id: number;
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            inStore: boolean;
            /**
             *
             */
            into: string[];
            /**
             *
             */
            maps: { [s: string]: boolean; };
            /**
             *
             */
            name: string;
            /**
             *
             */
            plaintext: string;
            /**
             *
             */
            requiredChampion: string;
            /**
             *
             */
            rune: MetaDataDto;
            /**
             *
             */
            sanitizedDescription: string;
            /**
             *
             */
            specialRecipe: number;
            /**
             *
             */
            stacks: number;
            /**
             *
             */
            stats: BasicDataStatsDto;
            /**
             *
             */
            tags: string[];
        }

        /**
         * Contains item group data.
         */
        export interface GroupDto {
            /**
             *
             */
            MaxGroupOwnable: string;
            /**
             *
             */
            key: string;
        }

        /**
         * Contains item data.
         */
        export interface ItemDto {
            /**
             *
             */
            colloq: string;
            /**
             *
             */
            consumeOnFull: boolean;
            /**
             *
             */
            consumed: boolean;
            /**
             *
             */
            depth: number;
            /**
             *
             */
            description: string;
            /**
             *
             */
            effect: { [s: string]: string; };
            /**
             *
             */
                from: string[];
            /**
             * Data Dragon includes the gold field for basic data, which is shared by both rune and item.
             * However, only items have a gold field on them, representing their gold cost in the store.
             * Since runes are not sold in the store, they have no gold cost.
             */
            gold: GoldDto;
            /**
             *
             */
            group: string;
            /**
             *
             */
            hideFromAll: boolean;
            /**
             *
             */
            id: number;
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            inStore: boolean;
            /**
             *
             */
            into: string[];
            /**
             *
             */
            maps: { [s: string]: boolean; };
            /**
             *
             */
            name: string;
            /**
             *
             */
            plaintext: string;
            /**
             *
             */
            requiredChampion: string;
            /**
             *
             */
            rune: MetaDataDto;
            /**
             *
             */
            sanitizedDescription: string;
            /**
             *
             */
            specialRecipe: number;
            /**
             *
             */
            stacks: number;
            /**
             *
             */
            stats: BasicDataStatsDto;
            /**
             *
             */
            tags: string[];
        }

        /**
         * Contains item tree data.
         */
        export interface ItemTreeDto {
            /**
             *
             */
            header: string;
            /**
             *
             */
            tags: string[];
        }

        /**
         * Contains basic data stats.
         */
        export interface BasicDataStatsDto {
            /**
             *
             */
            FlatArmorMod: number;
            /**
             *
             */
            FlatAttackSpeedMod: number;
            /**
             *
             */
            FlatBlockMod: number;
            /**
             *
             */
            FlatCritChanceMod: number;
            /**
             *
             */
            FlatCritDamageMod: number;
            /**
             *
             */
            FlatEXPBonus: number;
            /**
             *
             */
            FlatEnergyPoolMod: number;
            /**
             *
             */
            FlatEnergyRegenMod: number;
            /**
             *
             */
            FlatHPPoolMod: number;
            /**
             *
             */
            FlatHPRegenMod: number;
            /**
             *
             */
            FlatMPPoolMod: number;
            /**
             *
             */
            FlatMPRegenMod: number;
            /**
             *
             */
            FlatMagicDamageMod: number;
            /**
             *
             */
            FlatMovementSpeedMod: number;
            /**
             *
             */
            FlatPhysicalDamageMod: number;
            /**
             *
             */
            FlatSpellBlockMod: number;
            /**
             *
             */
            PercentArmorMod: number;
            /**
             *
             */
            PercentAttackSpeedMod: number;
            /**
             *
             */
            PercentBlockMod: number;
            /**
             *
             */
            PercentCritChanceMod: number;
            /**
             *
             */
            PercentCritDamageMod: number;
            /**
             *
             */
            PercentDodgeMod: number;
            /**
             *
             */
            PercentEXPBonus: number;
            /**
             *
             */
            PercentHPPoolMod: number;
            /**
             *
             */
            PercentHPRegenMod: number;
            /**
             *
             */
            PercentLifeStealMod: number;
            /**
             *
             */
            PercentMPPoolMod: number;
            /**
             *
             */
            PercentMPRegenMod: number;
            /**
             *
             */
            PercentMagicDamageMod: number;
            /**
             *
             */
            PercentMovementSpeedMod: number;
            /**
             *
             */
            PercentPhysicalDamageMod: number;
            /**
             *
             */
            PercentSpellBlockMod: number;
            /**
             *
             */
            PercentSpellVampMod: number;
            /**
             *
             */
            rFlatArmorModPerLevel: number;
            /**
             *
             */
            rFlatArmorPenetrationMod: number;
            /**
             *
             */
            rFlatArmorPenetrationModPerLevel: number;
            /**
             *
             */
            rFlatCritChanceModPerLevel: number;
            /**
             *
             */
            rFlatCritDamageModPerLevel: number;
            /**
             *
             */
            rFlatDodgeMod: number;
            /**
             *
             */
            rFlatDodgeModPerLevel: number;
            /**
             *
             */
            rFlatEnergyModPerLevel: number;
            /**
             *
             */
            rFlatEnergyRegenModPerLevel: number;
            /**
             *
             */
            rFlatGoldPer10Mod: number;
            /**
             *
             */
            rFlatHPModPerLevel: number;
            /**
             *
             */
            rFlatHPRegenModPerLevel: number;
            /**
             *
             */
            rFlatMPModPerLevel: number;
            /**
             *
             */
            rFlatMPRegenModPerLevel: number;
            /**
             *
             */
            rFlatMagicDamageModPerLevel: number;
            /**
             *
             */
            rFlatMagicPenetrationMod: number;
            /**
             *
             */
            rFlatMagicPenetrationModPerLevel: number;
            /**
             *
             */
            rFlatMovementSpeedModPerLevel: number;
            /**
             *
             */
            rFlatPhysicalDamageModPerLevel: number;
            /**
             *
             */
            rFlatSpellBlockModPerLevel: number;
            /**
             *
             */
            rFlatTimeDeadMod: number;
            /**
             *
             */
            rFlatTimeDeadModPerLevel: number;
            /**
             *
             */
            rPercentArmorPenetrationMod: number;
            /**
             *
             */
            rPercentArmorPenetrationModPerLevel: number;
            /**
             *
             */
            rPercentAttackSpeedModPerLevel: number;
            /**
             *
             */
            rPercentCooldownMod: number;
            /**
             *
             */
            rPercentCooldownModPerLevel: number;
            /**
             *
             */
            rPercentMagicPenetrationMod: number;
            /**
             *
             */
            rPercentMagicPenetrationModPerLevel: number;
            /**
             *
             */
            rPercentMovementSpeedModPerLevel: number;
            /**
             *
             */
            rPercentTimeDeadMod: number;
            /**
             *
             */
            rPercentTimeDeadModPerLevel: number;
        }

        /**
         * Contains item gold data.
         */
        export interface GoldDto {
            /**
             *
             */
            base: number;
            /**
             *
             */
            purchasable: boolean;
            /**
             *
             */
            sell: number;
            /**
             *
             */
            total: number;
        }

        /**
         * Contains image meta data.
         */
        export interface MetaDataDto {
            /**
             *
             */
            isRune: boolean;
            /**
             *
             */
            tier: string;
            /**
             *
             */
                type: string;
        }

        /**
         * Contains language strings data
         */
        export interface LanguageStringsDto {
            /**
             *
             */
            data: { [s: string]: string; };
            /**
             *
             */
                type: string;
            /**
             *
             */
            version: string;
        }

        /**
         * Contains map data.
         */
        export interface MapDataDto {
            /**
             *
             */
            data: { [s: string]: MapDetailsDto; }
            /**
             *
             */
                type: string;
            /**
             *
             */
            version: string;
        }

        /**
         * Contains map details data.
         */
        export interface MapDetailsDto {
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            mapId: number;
            /**
             *
             */
            mapName: string;
            /**
             *
             */
            unpurchasableItemList: number[];
        }

        /**
         * Contains mastery list data.
         */
        export interface MasteryListDto {
            /**
             *
             */
            data: { [s: string]: MasteryDto; };
            /**
             *
             */
            tree: MasteryTreeDto;
            /**
             *
             */
                type: string;
            /**
             *
             */
            version: string;
        }

        /**
         * Contains mastery data.
         */
        export interface MasteryDto {
            /**
             *
             */
            description: string[];
            /**
             *
             */
            id: number;
            /**
             *
             */
            image: ImageDto;
            /**
             * Legal values: Defense, Offense, Utility
             */
            masteryTree: string;
            /**
             *
             */
            name: string;
            /**
             *
             */
            prereq: string;
            /**
             *
             */
            ranks: number;
            /**
             *
             */
            sanitizedDescription: string[];
        }

        /**
         * Contains mastery tree data.
         */
        export interface MasteryTreeDto {
            /**
             *
             */
            Defense: MasteryTreeListDto[];
            /**
             *
             */
            Offense: MasteryTreeListDto[];
            /**
             *
             */
            Utility: MasteryTreeListDto[];
        }

        /**
         * Contains mastery tree list data.
         */
        export interface MasteryTreeListDto {
            /**
             *
             */
            masteryTreeItems: MasteryTreeItemDto[];
        }

        /**
         * Contains mastery tree item data.
         */
        export interface MasteryTreeItemDto {
            /**
             *
             */
            masteryId: number;
            /**
             *
             */
            prereq: string;
        }

        /**
         * Contains realm data.
         */
        export interface RealmDto {
            /**
             * The base CDN url.
             */
            cdn: string;
            /**
             * Latest changed version of Dragon Magic's css file.
             */
            css: string;
            /**
             * Latest changed version of Dragon Magic.
             */
            dd: string;
            /**
             * Default language for this realm.
             */
            l: string;
            /**
             * Legacy script mode for IE6 or older.
             */
            lg: string;
            /**
             * Latest changed version for each data type listed.
             */
            n: { [s: string]: string; };
            /**
             * Special behavior number identifying the largest profileicon id that can be used under 500. Any profileicon that is requested between this number and 500 should be mapped to 0.
             */
            profileiconmax: number;
            /**
             * Additional api data drawn from other sources that may be related to data dragon functionality.
             */
            store: string;
            /**
             * Current version of this file for this realm.
             */
            v: string;
        }

        /**
         * Contains rune list data
         */
        export interface RuneListDto {
            /**
             *
             */
            basic: BasicDataDto;
            /**
             *
             */
            data: { [s: string]: RuneDto; };
            /**
             *
             */
                type: string;
            /**
             *
             */
            version: string;
        }

        /**
         * Contains rune data.
         */
        export interface RuneDto {
            /**
             *
             */
            colloq: string;
            /**
             *
             */
            consumeOnFull: boolean;
            /**
             *
             */
            consumed: boolean;
            /**
             *
             */
            depth: number;
            /**
             *
             */
            description: string;
            /**
             *
             */
                from: string[];
            /**
             *
             */
            group: string;
            /**
             *
             */
            hideFromAll: boolean;
            /**
             *
             */
            id: number;
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            inStore: boolean;
            /**
             *
             */
            into: string[];
            /**
             *
             */
            maps: { [s: string]: boolean; };
            /**
             *
             */
            name: string;
            /**
             *
             */
            plaintext: string;
            /**
             *
             */
            requiredChampion: string;
            /**
             *
             */
            rune: MetaDataDto;
            /**
             *
             */
            sanitizedDescription: string;
            /**
             *
             */
            specialRecipe: number;
            /**
             *
             */
            stacks: number;
            /**
             *
             */
            stats: BasicDataStatsDto;
            /**
             *
             */
            tags: string[];
        }

        /**
         * Contains summoner spell list data.
         */
        export interface SummonerSpellListDto {
            /**
             *
             */
            data: { [s: string]: SummonerSpellDto; };
            /**
             *
             */
                type: string;
            /**
             *
             */
            version: string;
        }

        /**
         * Contains summoner spell data.
         */
        export interface SummonerSpellDto {
            /**
             *
             */
            cooldown: number[];
            /**
             *
             */
            cooldownBurn: string;
            /**
             *
             */
            cost: number[];
            /**
             *
             */
            costBurn: string;
            /**
             *
             */
            costType: string;
            /**
             *
             */
            description: string;
            /**
             * This field is a List of List of Double.
             */
            effect: number[][];
            /**
             *
             */
            effectBurn: string[];
            /**
             *
             */
            id: number;
            /**
             *
             */
            image: ImageDto;
            /**
             *
             */
            key: string;
            /**
             *
             */
            leveltip: LevelTipDto;
            /**
             *
             */
            maxrank: number;
            /**
             *
             */
            modes: string[];
            /**
             *
             */
            name: string;
            /**
             * This field is either a List of Integer or the String 'self' for spells that target one's own champion.
             */
            range: number[] | string;
            /**
             *
             */
            rangeBurn: string;
            /**
             *
             */
            resource: string;
            /**
             *
             */
            sanitizedDescription: string;
            /**
             *
             */
            sanitizedTooltip: string;
            /**
             *
             */
            summonerLevel: number;
            /**
             *
             */
            tooltip: string;
            /**
             *
             */
            vars: SpellVarsDto[];
        }
    }

    /**
     * lol-status-v1.0
     */
    export module lolStatus {
        /**
         * Get shard list. (REST)
         * Should call GET /shards
         */
        export function getShards():Shard[];

        /**
         * Get shard status. Returns the data available on the status.leagueoflegends.com website for the given region. (REST)
         * Should call GET /shards/{region}
         * @param region The region for which to fetch data.
         */
        export function getShard(region:string):ShardStatus;

        /**
         *
         */
        export interface Shard {
            /**
             *
             */
            hostname: string;
            /**
             *
             */
            locales: string[];
            /**
             *
             */
            name: string;
            /**
             *
             */
            region_tag: string;
            /**
             *
             */
            slug: string;
        }

        /**
         *
         */
        export interface ShardStatus {
            /**
             *
             */
            hostname: string;
            /**
             *
             */
            locales: string[];
            /**
             *
             */
            name: string;
            /**
             *
             */
            region_tag: string;
            /**
             *
             */
            services: Service[];
            /**
             *
             */
            slug: string;
        }

        /**
         *
         */
        export interface Service {
            /**
             *
             */
            incidents: Incident[];
            /**
             *
             */
            name: string;
            /**
             *
             */
            slug: string;
            /**
             * Legal values: Online, Alert, Offline, Deploying
             */
            status: string;
        }

        /**
         *
         */
        export interface Incident {
            /**
             *
             */
            active: boolean;
            /**
             *
             */
            created_at: string;
            /**
             *
             */
            id: number;
            /**
             *
             */
            updates: Message[];
        }

        export interface Message {
            /**
             *
             */
            author: string;
            /**
             *
             */
            content: string;
            /**
             *
             */
            created_at: string;
            /**
             *
             */
            id: number;
            /**
             * Legal values: Info, Alert, Error
             */
            severity: string;
            /**
             *
             */
            translations: Translation[];
            /**
             *
             */
            updated_at: string;
        }

        /**
         *
         */
        export interface Translation {
            /**
             *
             */
            content: string;
            /**
             *
             */
            locale: string;
            /**
             *
             */
            updated_at: string;
        }
    }

    /**
     * match-v2.2
     */
    export module match {
        /**
         * Retrieve match IDs by tournament code. (REST)
         * Should call GET /api/lol/{region}/v2.2/match/by-tournament/{tournamentCode}/ids
         * @param region         The region of the match.
         * @param tournamentCode The tournament code of the match
         */
        export function getMatchIdsByTournamentCode(region:string,
                                                    tournamentCode:string):number[];

        /**
         * Retrieve match by match ID and tournament code. (REST)
         * Should call GET /api/lol/{region}/v2.2/match/for-tournament/{matchId}
         * @param region          The region of the match.
         * @param matchId         The ID of the match.
         * @param tournamentCode  The tournament code of the match
         * @param includeTimeline Flag indicating whether or not to include match timeline data
         */
        export function getMatchByIdAndTournamentCode(region:string,
                                                      matchId:number,
                                                      tournamentCode:string,
                                                      includeTimeline:boolean):MatchDetail;

        /**
         * Retrieve match by match ID. (REST)
         * Should call GET /api/lol/{region}/v2.2/match/{matchId}
         * @param region          The region of the summoner.
         * @param matchId         The ID of the match.
         * @param includeTimeline Flag indicating whether or not to include match timeline data
         */
        export function getMatchById(region:string,
                                     matchId:number,
                                     includeTimeline:boolean):MatchDetail;

        /**
         * Contains match detail information.
         */
        export interface MatchDetail {
            /**
             * Match map ID
             */
            mapId: number;
            /**
             * Match creation time. Designates when the team select lobby is created and/or the match is made through match making, not when the game actually starts.
             */
            matchCreation: number;
            /**
             * Match duration
             */
            matchDuration: number;
            /**
             * ID of the match
             */
            matchId: number;
            /**
             * Match mode (Legal values: CLASSIC, ODIN, ARAM, TUTORIAL, ONEFORALL, ASCENSION, FIRSTBLOOD, KINGPORO)
             */
            matchMode: string;
            /**
             * Match type (Legal values: CUSTOM_GAME, MATCHED_GAME, TUTORIAL_GAME)
             */
            matchType: string;
            /**
             * Match version
             */
            matchVersion: string;
            /**
             * Participant identity information
             */
            participantIdentities: ParticipantIdentity[];
            /**
             * Participant information
             */
            participants: Participant[];
            /**
             * Platform ID of the match
             */
            platformId: string;
            /**
             * Match queue type (Legal values: CUSTOM, NORMAL_5x5_BLIND, RANKED_SOLO_5x5, RANKED_PREMADE_5x5, BOT_5x5, NORMAL_3x3, RANKED_PREMADE_3x3, NORMAL_5x5_DRAFT, ODIN_5x5_BLIND, ODIN_5x5_DRAFT, BOT_ODIN_5x5, BOT_5x5_INTRO, BOT_5x5_BEGINNER, BOT_5x5_INTERMEDIATE, RANKED_TEAM_3x3, RANKED_TEAM_5x5, BOT_TT_3x3, GROUP_FINDER_5x5, ARAM_5x5, ONEFORALL_5x5, FIRSTBLOOD_1x1, FIRSTBLOOD_2x2, SR_6x6, URF_5x5, ONEFORALL_MIRRORMODE_5x5, BOT_URF_5x5, NIGHTMARE_BOT_5x5_RANK1, NIGHTMARE_BOT_5x5_RANK2, NIGHTMARE_BOT_5x5_RANK5, ASCENSION_5x5, HEXAKILL, KING_PORO_5x5, COUNTER_PICK)
             */
            queueType: string;
            /**
             * Region where the match was played
             */
            region: string;
            /**
             * Season match was played (Legal values: PRESEASON3, SEASON3, PRESEASON2014, SEASON2014, PRESEASON2015, SEASON2015, PRESEASON2016, SEASON2016)
             */
            season: string;
            /**
             * Team information
             */
            teams: Team[];
            /**
             * Match timeline data (not included by default)
             */
            timeline: Timeline;
        }

        /**
         * Contains match participant information
         */
        export interface Participant {
            /**
             * Champion ID
             */
            championId: number;
            /**
             * Highest ranked tier achieved for the previous season, if any, otherwise null. Used to display border in game loading screen. (Legal values: CHALLENGER, MASTER, DIAMOND, PLATINUM, GOLD, SILVER, BRONZE, UNRANKED)
             */
            highestAchievedSeasonTier: string;
            /**
             * List of mastery information
             */
            masteries: Mastery[];
            /**
             * Participant ID
             */
            participantId: number;
            /**
             * List of rune information
             */
            runes: Rune[];
            /**
             * First summoner spell ID
             */
            spell1Id: number;
            /**
             * Second summoner spell ID
             */
            spell2Id: number;
            /**
             * Participant statistics
             */
            stats: ParticipantStats;
            /**
             * Team ID
             */
            teamId: number;
            /**
             * Timeline data. Delta fields refer to values for the specified period (e.g., the gold per minute over the first 10 minutes of the game versus the second 20 minutes of the game. Diffs fields refer to the deltas versus the calculated lane opponent(s).
             */
            timeline: ParticipantTimeline;
        }

        /**
         * Contains participant identity information
         */
        export interface ParticipantIdentity {
            /**
             * Participant ID
             */
            participantId: number;
            /**
             * Player information
             */
            player: Player;
        }

        /**
         * Containts team information
         */
        export interface Team {
            /**
             * If game was draft mode, contains banned champion data, otherwise null
             */
            bans: BannedChampion[];
            /**
             * Number of times the team killed baron
             */
            baronKills: number;
            /**
             * If game was a dominion game, specifies the points the team had at game end, otherwise null
             */
            dominionVictoryScore: number;
            /**
             * Number of times the team killed dragon
             */
            dragonKills: number;
            /**
             * Flag indicating whether or not the team got the first baron kill
             */
            firstBaron: boolean;
            /**
             * Flag indicating whether or not the team got first blood
             */
            firstBlood: boolean;
            /**
             * Flag indicating whether or not the team got the first dragon kill
             */
            firstDragon: boolean;
            /**
             * Flag indicating whether or not the team destroyed the first inhibitor
             */
            firstInhibitor: boolean;
            /**
             * Flag indicating whether or not the team got the first rift herald kill
             */
            firstRiftHerald: boolean;
            /**
             * Flag indicating whether or not the team destroyed the first tower
             */
            firstTower: boolean;
            /**
             * Number of inhibitors the team destroyed
             */
            inhibitorKills: number;
            /**
             * Team ID
             */
            teamId: number;
            /**
             * Number of towers the team destroyed
             */
            towerKills: number;
            /**
             * Number of times the team killed vilemaw
             */
            vilemawKills: number;
            /**
             * Flag indicating whether or not the team won
             */
            winner: boolean;
        }

        /**
         * Contains game timeline information.
         */
        export interface Timeline {
            /**
             * Time between each returned frame in milliseconds.
             */
            frameInterval: number;
            /**
             * List of timeline frames for the game.
             */
            frames: Frame[];
        }

        /**
         * Contains mastery information.
         */
        export interface Mastery {
            /**
             * Mastery ID
             */
            masteryId: number;
            /**
             * Mastery rank
             */
            rank: number;
        }

        /**
         * Contains participant statistics information.
         */
        export interface ParticipantStats {
            /**
             * Number of assists
             */
            assists: number;
            /**
             * Champion level achieved
             */
            champLevel: number;
            /**
             * If game was a dominion game, player's combat score, otherwise 0
             */
            combatPlayerScore: number;
            /**
             * Number of deaths
             */
            deaths: number;
            /**
             * Number of double kills
             */
            doubleKills: number;
            /**
             * Flag indicating if participant got an assist on first blood
             */
            firstBloodAssist: boolean;
            /**
             * Flag indicating if participant got first blood
             */
            firstBloodKill: boolean;
            /**
             * Flag indicating if participant got an assist on the first inhibitor
             */
            firstInhibitorAssist: boolean;
            /**
             * Flag indicating if participant destroyed the first inhibitor
             */
            firstInhibitorKill: boolean;
            /**
             * Flag indicating if participant got an assist on the first tower
             */
            firstTowerAssist: boolean;
            /**
             * Flag indicating if participant destroyed the first tower
             */
            firstTowerKill: boolean;
            /**
             * Gold earned
             */
            goldEarned: number;
            /**
             * Gold spent
             */
            goldSpent: number;
            /**
             * Number of inhibitor kills
             */
            inhibitorKills: number;
            /**
             * First item ID
             */
            item0: number;
            /**
             * Second item ID
             */
            item1: number;
            /**
             * Third item ID
             */
            item2: number;
            /**
             * Fourth item ID
             */
            item3: number;
            /**
             * Fifth item ID
             */
            item4: number;
            /**
             * Sixth item ID
             */
            item5: number;
            /**
             * Seventh item ID
             */
            item6: number;
            /**
             * Number of killing sprees
             */
            killingSprees: number;
            /**
             * Number of kills
             */
            kills: number;
            /**
             * Largest critical strike
             */
            largestCriticalStrike: number;
            /**
             * Largest killing spree
             */
            largestKillingSpree: number;
            /**
             * Largest multi kill
             */
            largestMultiKill: number;
            /**
             * Magical damage dealt
             */
            magicDamageDealt: number;
            /**
             * Magical damage dealt to champions
             */
            magicDamageDealtToChampions: number;
            /**
             * Magic damage taken
             */
            magicDamageTaken: number;
            /**
             * Minions killed
             */
            minionsKilled: number;
            /**
             * Neutral minions killed
             */
            neutralMinionsKilled: number;
            /**
             * Neutral jungle minions killed in the enemy team's jungle
             */
            neutralMinionsKilledEnemyJungle: number;
            /**
             * Neutral jungle minions killed in your team's jungle
             */
            neutralMinionsKilledTeamJungle: number;
            /**
             * If game was a dominion game, number of node captures
             */
            nodeCapture: number;
            /**
             * If game was a dominion game, number of node capture assists
             */
            nodeCaptureAssist: number;
            /**
             * If game was a dominion game, number of node neutralizations
             */
            nodeNeutralize: number;
            /**
             * If game was a dominion game, number of node neutralization assists
             */
            nodeNeutralizeAssist: number;
            /**
             * If game was a dominion game, player's objectives score, otherwise 0
             */
            objectivePlayerScore: number;
            /**
             * Number of penta kills
             */
            pentaKills: number;
            /**
             * Physical damage dealt
             */
            physicalDamageDealt: number;
            /**
             * Physical damage dealt to champions
             */
            physicalDamageDealtToChampions: number;
            /**
             * Physical damage taken
             */
            physicalDamageTaken: number;
            /**
             * Number of quadra kills
             */
            quadraKills: number;
            /**
             * Sight wards purchased
             */
            sightWardsBoughtInGame: number;
            /**
             * If game was a dominion game, number of completed team objectives (i.e., quests)
             */
            teamObjective: number;
            /**
             * Total damage dealt
             */
            totalDamageDealt: number;
            /**
             * Total damage dealt to champions
             */
            totalDamageDealtToChampions: number;
            /**
             * Total damage taken
             */
            totalDamageTaken: number;
            /**
             * Total heal amount
             */
            totalHeal: number;
            /**
             * If game was a dominion game, player's total score, otherwise 0
             */
            totalPlayerScore: number;
            /**
             * If game was a dominion game, team rank of the player's total score (e.g., 1-5)
             */
            totalScoreRank: number;
            /**
             * Total dealt crowd control time
             */
            totalTimeCrowdControlDealt: number;
            /**
             * Total units healed
             */
            totalUnitsHealed: number;
            /**
             * Number of tower kills
             */
            towerKills: number;
            /**
             * Number of triple kills
             */
            tripleKills: number;
            /**
             * True damage dealt
             */
            trueDamageDealt: number;
            /**
             * True damage dealt to champions
             */
            trueDamageDealtToChampions: number;
            /**
             * True damage taken
             */
            trueDamageTaken: number;
            /**
             * Number of unreal kills
             */
            unrealKills: number;
            /**
             * Vision wards purchased
             */
            visionWardsBoughtInGame: number;
            /**
             * Number of wards killed
             */
            wardsKilled: number;
            /**
             * Number of wards placed
             */
            wardsPlaced: number;
            /**
             * Flag indicating whether or not the participant won
             */
            winner: boolean;
        }

        /**
         * Contains all timeline information.
         */
        export interface ParticipantTimeline {
            /**
             * Ancient golem assists per minute timeline counts
             */
            ancientGolemAssistsPerMinCounts: ParticipantTimelineData;
            /**
             * Ancient golem kills per minute timeline counts
             */
            ancientGolemKillsPerMinCounts: ParticipantTimelineData;
            /**
             * Assisted lane deaths per minute timeline data
             */
            assistedLaneDeathsPerMinDeltas: ParticipantTimelineData;
            /**
             * Assisted lane kills per minute timeline data
             */
            assistedLaneKillsPerMinDeltas: ParticipantTimelineData;
            /**
             * Baron assists per minute timeline counts
             */
            baronAssistsPerMinCounts: ParticipantTimelineData;
            /**
             * Baron kills per minute timeline counts
             */
            baronKillsPerMinCounts: ParticipantTimelineData;
            /**
             * Creeps per minute timeline data
             */
            creepsPerMinDeltas: ParticipantTimelineData;
            /**
             * Creep score difference per minute timeline data
             */
            csDiffPerMinDeltas: ParticipantTimelineData;
            /**
             * Damage taken difference per minute timeline data
             */
            damageTakenDiffPerMinDeltas: ParticipantTimelineData;
            /**
             * Damage taken per minute timeline data
             */
            damageTakenPerMinDeltas: ParticipantTimelineData;
            /**
             * Dragon assists per minute timeline counts
             */
            dragonAssistsPerMinCounts: ParticipantTimelineData;
            /**
             * Dragon kills per minute timeline counts
             */
            dragonKillsPerMinCounts: ParticipantTimelineData;
            /**
             * Elder lizard assists per minute timeline counts
             */
            elderLizardAssistsPerMinCounts: ParticipantTimelineData;
            /**
             * Elder lizard kills per minute timeline counts
             */
            elderLizardKillsPerMinCounts: ParticipantTimelineData;
            /**
             * Gold per minute timeline data
             */
            goldPerMinDeltas: ParticipantTimelineData;
            /**
             * Inhibitor assists per minute timeline counts
             */
            inhibitorAssistsPerMinCounts: ParticipantTimelineData;
            /**
             * Inhibitor kills per minute timeline counts
             */
            inhibitorKillsPerMinCounts: ParticipantTimelineData;
            /**
             * Participant's lane (Legal values: MID, MIDDLE, TOP, JUNGLE, BOT, BOTTOM)
             */
            lane: string;
            /**
             * Participant's role (Legal values: DUO, NONE, SOLO, DUO_CARRY, DUO_SUPPORT)
             */
            role: string;
            /**
             * Tower assists per minute timeline counts
             */
            towerAssistsPerMinCounts: ParticipantTimelineData;
            /**
             * Tower kills per minute timeline counts
             */
            towerKillsPerMinCounts: ParticipantTimelineData;
            /**
             * Tower kills per minute timeline data
             */
            towerKillsPerMinDeltas: ParticipantTimelineData;
            /**
             * Vilemaw assists per minute timeline counts
             */
            vilemawAssistsPerMinCounts: ParticipantTimelineData;
            /**
             * Vilemaw kills per minute timeline counts
             */
            vilemawKillsPerMinCounts: ParticipantTimelineData;
            /**
             * Wards placed per minute timeline data
             */
            wardsPerMinDeltas: ParticipantTimelineData;
            /**
             * Experience difference per minute timeline data
             */
            xpDiffPerMinDeltas: ParticipantTimelineData;
            /**
             * Experience per minute timeline data
             */
            xpPerMinDeltas: ParticipantTimelineData;
        }

        /**
         * Contains rune information.
         */
        export interface Rune {
            /**
             * Rune rank
             */
            rank: number;
            /**
             * Rune ID
             */
            runeId: number;
        }

        /**
         * Contains match player information.
         */
        export interface Player {
            /**
             * Match history URI
             */
            matchHistoryUri: string;
            /**
             * Profile icon ID
             */
            profileIcon: number;
            /**
             * Summoner ID
             */
            summonerId: number;
            /**
             * Summoner name
             */
            summonerName: string;
        }

        /**
         * Contains information about banned champions.
         */
        export interface BannedChampion {
            /**
             * Banned champion ID
             */
            championId: number;
            /**
             * Turn during which the champion was banned
             */
            pickTurn: number;
        }

        /**
         * Contains contains game frame information.
         */
        export interface Frame {
            /**
             * List of events for this frame.
             */
            events: Event[];
            /**
             * Map of each participant ID to the participant's information for the frame.
             */
            participantFrames: { [s: string]: ParticipantFrame; };
            /**
             * Represents how many milliseconds into the game the frame occurred.
             */
            timestamp: number;
        }

        /**
         * Contains timeline data.
         */
        export interface ParticipantTimelineData {
            /**
             * Value per minute from 10 min to 20 min
             */
            tenToTwenty: number;
            /**
             * Value per minute from 30 min to the end of the game
             */
            thirtyToEnd: number;
            /**
             * Value per minute from 20 min to 30 min
             */
            twentyToThirty: number;
            /**
             * Value per minute from the beginning of the game to 10 min
             */
            zeroToTen: number;
        }

        /**
         * Contains game event information. Note that not all legal type values documented below are valid for all games. Event data evolves over time and certain values may be relevant only for older or newer games.
         */
        export interface Event {
            /**
             * The ascended type of the event. Only present if relevant. Note that CLEAR_ASCENDED refers to when a participants kills the ascended player. (Legal values: CHAMPION_ASCENDED, CLEAR_ASCENDED, MINION_ASCENDED)
             */
            ascendedType: string;
            /**
             * The assisting participant IDs of the event. Only present if relevant.
             */
            assistingParticipantIds: number[];
            /**
             * The building type of the event. Only present if relevant. (Legal values: INHIBITOR_BUILDING, TOWER_BUILDING)
             */
            buildingType: string;
            /**
             * The creator ID of the event. Only present if relevant.
             */
            creatorId: number;
            /**
             * Event type. (Legal values: ASCENDED_EVENT, BUILDING_KILL, CAPTURE_POINT, CHAMPION_KILL, ELITE_MONSTER_KILL, ITEM_DESTROYED, ITEM_PURCHASED, ITEM_SOLD, ITEM_UNDO, PORO_KING_SUMMON, SKILL_LEVEL_UP, WARD_KILL, WARD_PLACED)
             */
            eventType: string;
            /**
             * The ending item ID of the event. Only present if relevant.
             */
            itemAfter: number;
            /**
             * The starting item ID of the event. Only present if relevant.
             */
            itemBefore: number;
            /**
             * The item ID of the event. Only present if relevant.
             */
            itemId: number;
            /**
             * The killer ID of the event. Only present if relevant. Killer ID 0 indicates a minion.
             */
            killerId: number;
            /**
             * The lane type of the event. Only present if relevant. (Legal values: BOT_LANE, MID_LANE, TOP_LANE)
             */
            laneType: string;
            /**
             * The level up type of the event. Only present if relevant. (Legal values: EVOLVE, NORMAL)
             */
            levelUpType: string;
            /**
             * The monster type of the event. Only present if relevant. (Legal values: BARON_NASHOR, BLUE_GOLEM, DRAGON, RED_LIZARD, VILEMAW, RIFTHERALD)
             */
            monsterType: string;
            /**
             * The participant ID of the event. Only present if relevant.
             */
            participantId: number;
            /**
             * The point captured in the event. Only present if relevant. (Legal values: POINT_A, POINT_B, POINT_C, POINT_D, POINT_E)
             */
            pointCaptured: string;
            /**
             * The position of the event. Only present if relevant.
             */
            position: Position;
            /**
             * The skill slot of the event. Only present if relevant.
             */
            skillSlot: number;
            /**
             * The team ID of the event. Only present if relevant.
             */
            teamId: number;
            /**
             * Represents how many milliseconds into the game the event occurred.
             */
            timestamp: number;
            /**
             * The tower type of the event. Only present if relevant. (Legal values: BASE_TURRET, FOUNTAIN_TURRET, INNER_TURRET, NEXUS_TURRET, OUTER_TURRET, UNDEFINED_TURRET)
             */
            towerType: string;
            /**
             * The victim ID of the event. Only present if relevant.
             */
            victimId: number;
            /**
             * The ward type of the event. Only present if relevant. (Legal values: SIGHT_WARD, TEEMO_MUSHROOM, UNDEFINED, VISION_WARD, YELLOW_TRINKET, YELLOW_TRINKET_UPGRADE)
             */
            wardType: string;
        }

        /**
         * Contains participant frame information.
         */
        export interface ParticipantFrame {
            /**
             * Participant's current gold
             */
            currentGold: number;
            /**
             * Dominion score of the participant
             */
            dominionScore: number;
            /**
             * Number of jungle minions killed by participant
             */
            jungleMinionsKilled: number;
            /**
             * Participant's current level
             */
            level: number;
            /**
             * Number of minions killed by participant
             */
            minionsKilled: number;
            /**
             * Participant ID
             */
            participantId: number;
            /**
             * Participant's position
             */
            position: Position;
            /**
             * Team score of the participant
             */
            teamScore: number;
            /**
             * Participant's total gold
             */
            totalGold: number;
            /**
             * Experience earned by participant
             */
            xp: number;
        }

        /**
         * Contains participant frame position information.
         */
        export interface Position {
            /**
             *
             */
            x: number;
            /**
             *
             */
            y: number;
        }
    }

    /**
     * matchlist-v2.2
     */
    export module matchlist {
        /**
         * Retrieve match list by summoner ID. (REST)
         * Should call GET /api/lol/{region}/v2.2/matchlist/by-summoner/{summonerId}
         * @param region       The region of the summoner.
         * @param summonerId   The ID of the summoner.
         * @param championIds  Comma-separated list of champion IDs to use for fetching games.
         * @param rankedQueues Comma-separated list of ranked queue types to use for fetching games. Non-ranked queue types will be ignored.
         * @param seasons      Comma-separated list of seasons to use for fetching games.
         * @param beginTime    The begin time to use for fetching games specified as epoch milliseconds.
         * @param endTime      The end time to use for fetching games specified as epoch milliseconds.
         * @param beginIndex   The begin index to use for fetching games.
         * @param endIndex     The end index to use for fetching games.
         */
        export function getMatchesBySummonerId(region:string,
                                               summonerId:number,
                                               championIds:string,
                                               rankedQueues:string,
                                               seasons:string,
                                               beginTime:number,
                                               endTime:number,
                                               beginIndex:number,
                                               endIndex:number):MatchList;

        /**
         * This object contains match list information
         */
        export interface MatchList {
            /**
             *
             */
            endIndex: number;
            /**
             *
             */
            matches: MatchReference[];
            /**
             *
             */
            startIndex: number;
            /**
             *
             */
            totalGames: number;
        }

        /**
         * This object contains match reference information
         */
        export interface MatchReference {
            /**
             *
             */
            champion: number;
            /**
             * Legal values: MID, MIDDLE, TOP, JUNGLE, BOT, BOTTOM
             */
            lane: string;
            /**
             *
             */
            matchId: number;
            /**
             *
             */
            platformId: string;
            /**
             * Legal values: RANKED_SOLO_5x5, RANKED_TEAM_3x3, RANKED_TEAM_5x5
             */
            queue: string;
            /**
             * Legal values: DUO, NONE, SOLO, DUO_CARRY, DUO_SUPPORT
             */
            role: string;
            /**
             * Legal values: PRESEASON3, SEASON3, PRESEASON2014, SEASON2014, PRESEASON2015, SEASON2015, PRESEASON2016, SEASON2016
             */
            season: string;
            /**
             *
             */
            timestamp: number;
        }
    }

    /**
     * stats-v1.3
     */
    export module stats {
        /**
         * Get ranked stats by summoner ID. (REST)
         * Should call GET /api/lol/{region}/v1.3/stats/by-summoner/{summonerId}/ranked
         * @param region     Region where to retrieve the data.
         * @param summonerId ID of the summoner for which to retrieve ranked stats.
         * @param season     If specified, stats for the given season are returned. Otherwise, stats for the current season are returned.
         */
        export function getRankedBySummonerId(region:string,
                                              summonerId:number,
                                              season:string):RankedStatsDto;

        /**
         * Get player stats summaries by summoner ID. (REST)
         * Should call GET /api/lol/{region}/v1.3/stats/by-summoner/{summonerId}/summary
         * @param region     Region where to retrieve the data.
         * @param summonerId ID of the summoner for which to retrieve player stats.
         * @param season     If specified, stats for the given season are returned. Otherwise, stats for the current season are returned.
         */
        export function getSummaryBySummonerId(region:string,
                                               summonerId:number,
                                               season:string):PlayerStatsSummaryListDto;

        /**
         * Contains ranked stats information
         */
        export interface RankedStatsDto {
            /**
             * Collection of aggregated stats summarized by champion.
             */
            champions: ChampionStatsDto[];
            /**
             * Date stats were last modified specified as epoch milliseconds.
             */
            modifyDate: number;
            /**
             * Summoner ID.
             */
            summonerId: number;
        }

        /**
         * Contains a collection of champion stats information
         */
        export interface ChampionStatsDto {
            /**
             * Champion ID. Note that champion ID 0 represents the combined stats for all champions. For static information correlating to champion IDs, please refer to the LoL Static Data API.
             */
            id: number;
            /**
             * Aggregated stats associated with the champion.
             */
            stats: AggregatedStatsDto;
        }

        /**
         * Contains aggregated stat information
         */
        export interface AggregatedStatsDto {
            /**
             * Dominion only.
             */
            averageAssists: number;
            /**
             * Dominion only.
             */
            averageChampionsKilled: number;
            /**
             * Dominion only.
             */
            averageCombatPlayerScore: number;
            /**
             * Dominion only.
             */
            averageNodeCapture: number;
            /**
             * Dominion only.
             */
            averageNodeCaptureAssist: number;
            /**
             * Dominion only.
             */
            averageNodeNeutralize: number;
            /**
             * Dominion only.
             */
            averageNodeNeutralizeAssist: number;
            /**
             * Dominion only.
             */
            averageNumDeaths: number;
            /**
             * Dominion only.
             */
            averageObjectivePlayerScore: number;
            /**
             * Dominion only.
             */
            averageTeamObjective: number;
            /**
             * Dominion only.
             */
            averageTotalPlayerScore: number;
            /**
             *
             */
            botGamesPlayed: number;
            /**
             *
             */
            killingSpree: number;
            /**
             * Dominion only.
             */
            maxAssists: number;
            /**
             *
             */
            maxChampionsKilled: number;
            /**
             * Dominion only.
             */
            maxCombatPlayerScore: number;
            /**
             *
             */
            maxLargestCriticalStrike: number;
            /**
             *
             */
            maxLargestKillingSpree: number;
            /**
             * Dominion only.
             */
            maxNodeCapture: number;
            /**
             * Dominion only.
             */
            maxNodeCaptureAssist: number;
            /**
             * Dominion only.
             */
            maxNodeNeutralize: number;
            /**
             * Dominion only.
             */
            maxNodeNeutralizeAssist: number;
            /**
             * Only returned for ranked statistics.
             */
            maxNumDeaths: number;
            /**
             * Dominion only.
             */
            maxObjectivePlayerScore: number;
            /**
             * Dominion only.
             */
            maxTeamObjective: number;
            /**
             *
             */
            maxTimePlayed: number;
            /**
             *
             */
            maxTimeSpentLiving: number;
            /**
             * Dominion only.
             */
            maxTotalPlayerScore: number;
            /**
             *
             */
            mostChampionKillsPerSession: number;
            /**
             *
             */
            mostSpellsCast: number;
            /**
             *
             */
            normalGamesPlayed: number;
            /**
             *
             */
            rankedPremadeGamesPlayed: number;
            /**
             *
             */
            rankedSoloGamesPlayed: number;
            /**
             *
             */
            totalAssists: number;
            /**
             *
             */
            totalChampionKills: number;
            /**
             *
             */
            totalDamageDealt: number;
            /**
             *
             */
            totalDamageTaken: number;
            /**
             * Only returned for ranked statistics.
             */
            totalDeathsPerSession: number;
            /**
             *
             */
            totalDoubleKills: number;
            /**
             *
             */
            totalFirstBlood: number;
            /**
             *
             */
            totalGoldEarned: number;
            /**
             *
             */
            totalHeal: number;
            /**
             *
             */
            totalMagicDamageDealt: number;
            /**
             *
             */
            totalMinionKills: number;
            /**
             *
             */
            totalNeutralMinionsKilled: number;
            /**
             * Dominion only.
             */
            totalNodeCapture: number;
            /**
             * Dominion only.
             */
            totalNodeNeutralize: number;
            /**
             *
             */
            totalPentaKills: number;
            /**
             *
             */
            totalPhysicalDamageDealt: number;
            /**
             *
             */
            totalQuadraKills: number;
            /**
             *
             */
            totalSessionsLost: number;
            /**
             *
             */
            totalSessionsPlayed: number;
            /**
             *
             */
            totalSessionsWon: number;
            /**
             *
             */
            totalTripleKills: number;
            /**
             *
             */
            totalTurretsKilled: number;
            /**
             *
             */
            totalUnrealKills: number;
        }

        /**
         * Contains a collection of player stats summary information.
         */
        export interface PlayerStatsSummaryListDto {
            /**
             * Collection of player stats summaries associated with the summoner.
             */
            playerStatSummaries: PlayerStatsSummaryDto[];
            /**
             * Summoner ID.
             */
            summonerId: number;
        }

        /**
         * Contains player stats summary information.
         */
        export interface PlayerStatsSummaryDto {
            /**
             * Aggregated stats.
             */
            aggregatedStats: AggregatedStatsDto;
            /**
             * Number of losses for this queue type. Returned for ranked queue types only.
             */
            losses: number;
            /**
             * Date stats were last modified specified as epoch milliseconds.
             */
            modifyDate: number;
            /**
             * Player stats summary type. (Legal values: AramUnranked5x5, Ascension, CAP5x5, CoopVsAI, CoopVsAI3x3, CounterPick, FirstBlood1x1, FirstBlood2x2, Hexakill, KingPoro, NightmareBot, OdinUnranked, OneForAll5x5, RankedPremade3x3, RankedPremade5x5, RankedSolo5x5, RankedTeam3x3, RankedTeam5x5, SummonersRift6x6, Unranked, Unranked3x3, URF, URFBots, Bilgewater)
             */
            playerStatSummaryType: string;
            /**
             * Number of wins for this queue type.
             */
            wins: number;
        }
    }

    /**
     * summoner-v1.4
     */
    export module summoner {
        /**
         * Get summoner objects mapped by standardized summoner name for a given list of summoner names. (REST)
         * Should call GET /api/lol/{region}/v1.4/summoner/by-name/{summonerNames}
         * @param region        Region where to retrieve the data.
         * @param summonerNames Comma-separated list of summoner names or standardized summoner names associated with summoners to retrieve. Maximum allowed at once is 40.
         */
        export function getSummonerByNames(region:string,
                                           summonerNames:string):{ [s: string]: SummonerDto; };

        /**
         * Get summoner objects mapped by summoner ID for a given list of summoner IDs. (REST)
         * Should call GET /api/lol/{region}/v1.4/summoner/{summonerIds}
         * @param region      Region where to retrieve the data.
         * @param summonerIds Comma-separated list of summoner IDs associated with summoners to retrieve. Maximum allowed at once is 40.
         */
        export function getSummonerByIds(region:string,
                                         summonerIds:string):{ [s: string]: SummonerDto; };

        /**
         * Get mastery pages mapped by summoner ID for a given list of summoner IDs (REST)
         * Should call GET /api/lol/{region}/v1.4/summoner/{summonerIds}/masteries
         * @param region      Region where to retrieve the data.
         * @param summonerIds Comma-separated list of summoner IDs associated with masteries to retrieve. Maximum allowed at once is 40.
         */
        export function getMasteryPagesBySummonerIds(region:string,
                                                     summonerIds:string):{ [s: string]: MasteryPagesDto; };

        /**
         * Get summoner names mapped by summoner ID for a given list of summoner IDs. (REST)
         * Should call GET /api/lol/{region}/v1.4/summoner/{summonerIds}/name
         * @param region      Region where to retrieve the data.
         * @param summonerIds Comma-separated list of summoner IDs associated with summoner names to retrieve. Maximum allowed at once is 40.
         */
        export function getNameBySummonerIds(region:string,
                                             summonerIds:string):{ [s: string]: string; };

        /**
         * Get rune pages mapped by summoner ID for a given list of summoner IDs. (REST)
         * Should call GET /api/lol/{region}/v1.4/summoner/{summonerIds}/runes
         * @param region      Region where to retrieve the data.
         * @param summonerIds Comma-separated list of summoner IDs associated with runes to retrieve. Maximum allowed at once is 40.
         */
        export function getRunePagesBySummonerIds(region:string,
                                                  summonerIds:string):{ [s: string]: RunePagesDto; };

        /**
         * Contains summoner information
         */
        export interface SummonerDto {
            /**
             * Summoner ID.
             */
            id: number;
            /**
             * Summoner name.
             */
            name: string;
            /**
             * ID of the summoner icon associated with the summoner.
             */
            profileIconId: number;
            /**
             * Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change
             */
            revisionDate: number;
            /**
             * Summoner level associated with the summoner.
             */
            summonerLevel: number;
        }

        /**
         * Contains masteries information
         */
        export interface MasteryPagesDto {
            /**
             * Collection of mastery pages associated with the summoner.
             */
            pages: MasteryPageDto[];
            /**
             * Summoner ID.
             */
            summonerId: number;
        }

        /**
         * Contains mastery page information
         */
        export interface MasteryPageDto {
            /**
             * Indicates if the mastery page is the current mastery page.
             */
            current: boolean;
            /**
             * Mastery page ID.
             */
            id: number;
            /**
             * Collection of masteries associated with the mastery page.
             */
            masteries: MasteryDto[];
            /**
             * Mastery page name.
             */
            name: string;
        }

        /**
         * Contains mastery information
         */
        export interface MasteryDto {
            /**
             * Mastery ID. For static information correlating to masteries, please refer to the LoL Static Data API.
             */
            id: number;
            /**
             * Mastery rank (i.e., the number of points put into this mastery).
             */
            rank: number;
        }

        /**
         * Contains rune pages information
         */
        export interface RunePagesDto {
            /**
             * Collection of rune pages associated with the summoner.
             */
            pages: RunePageDto[];
            /**
             * Summoner ID.
             */
            summonerId: number;
        }

        /**
         * Contains rune page information
         */
        export interface RunePageDto {
            /**
             * Indicates if the page is the current page.
             */
            current: boolean;
            /**
             * Rune page ID.
             */
            id: number;
            /**
             * Rune page name.
             */
            name: string;
            /**
             * Collection of rune slots associated with the rune page.
             */
            slots: RuneSlotDto[];
        }

        /**
         * Contains rune slot information
         */
        export interface RuneSlotDto {
            /**
             * Rune ID associated with the rune slot. For static information correlating to rune IDs, please refer to the LoL Static Data API.
             */
            runeId: number;
            /**
             * Rune slot ID.
             */
            runeSlotId: number;
        }
    }

    /**
     * team-v2.4
     */
    export module team {
        /**
         * Get teams mapped by summoner ID for a given list of summoner IDs. (REST)
         * Should call GET /api/lol/{region}/v2.4/team/by-summoner/{summonerIds}
         * @param region      The region of the summoner.
         * @param summonerIds Comma-separated list of summoner IDs. Maximum allowed at once is 10.
         */
        export function getTeamsBySummonerIds(region:string,
                                              summonerIds:string):{ [s: string]: TeamDto[]; };

        /**
         * Get teams mapped by team ID for a given list of team IDs. (REST)
         * Should call GET /api/lol/{region}/v2.4/team/{teamIds}
         * @param region  The region of the summoner.
         * @param teamIds Comma-separated list of team IDs. Maximum allowed at once is 10.
         */
        export function getTeamsByTeamIds(region:string,
                                          teamIds:string):{ [s: string]: TeamDto; };

        /**
         * Contains team information
         */
        export interface TeamDto {
            /**
             * Date that team was created specified as epoch milliseconds.
             */
            createDate: number;
            /**
             *
             */
            fullId: string;
            /**
             * Date that last game played by team ended specified as epoch milliseconds.
             */
            lastGameDate: number;
            /**
             * Date that last member joined specified as epoch milliseconds.
             */
            lastJoinDate: number;
            /**
             * Date that team last joined the ranked team queue specified as epoch milliseconds.
             */
            lastJoinedRankedTeamQueueDate: number;
            /**
             *
             */
            matchHistory: MatchHistorySummaryDto[];
            /**
             * Date that team was last modified specified as epoch milliseconds.
             */
            modifyDate: number;
            /**
             *
             */
            name: string;
            /**
             *
             */
            roster: RosterDto;
            /**
             * Date that second to last member joined specified as epoch milliseconds.
             */
            secondLastJoinDate: number;
            /**
             *
             */
            status: string;
            /**
             *
             */
            tag: string;
            /**
             *
             */
            teamStatDetails: TeamStatDetailDto[];
            /**
             * Date that third to last member joined specified as epoch milliseconds.
             */
            thirdLastJoinDate: number;
        }

        /**
         * Contains match history summary information
         */
        export interface MatchHistorySummaryDto {
            /**
             *
             */
            assists: number;
            /**
             * Date that match was completed specified as epoch milliseconds.
             */
            date: number;
            /**
             *
             */
            deaths: number;
            /**
             *
             */
            gameId: number;
            /**
             *
             */
            gameMode: string;
            /**
             *
             */
            invalid: boolean;
            /**
             *
             */
            kills: number;
            /**
             *
             */
            mapId: number;
            /**
             *
             */
            opposingTeamKills: number;
            /**
             *
             */
            opposingTeamName: string;
            /**
             *
             */
            win: boolean;
        }

        /**
         * Contains roster information
         */
        export interface RosterDto {
            /**
             *
             */
            memberList: TeamMemberInfoDto[];
            /**
             *
             */
            ownerId: number;
        }

        /**
         * Contains team statistics detail information
         */
        export interface TeamStatDetailDto {
            /**
             *
             */
            averageGamesPlayed: number;
            /**
             *
             */
            losses: number;
            /**
             *
             */
            teamStatType: string;
            /**
             *
             */
            wins: number;
        }

        /**
         * Contains team member information
         */
        export interface TeamMemberInfoDto {
            /**
             * Date that team member was invited to team specified as epoch milliseconds.
             */
            inviteDate: number;
            /**
             * Date that team member joined team specified as epoch milliseconds.
             */
            joinDate: number;
            /**
             *
             */
            playerId: number;
            /**
             *
             */
            status: string;
        }
    }

    /**
     * tournament-provider-v1
     */
    export module tournamentProvider {
        /**
         * Create a tournament code for the given tournament. (REST)
         * Should call POST /tournament/public/v1/code
         * @param tournamentId The tournament ID
         * @param count        The number of codes to create (max 1000)
         * @param body         Metadata for the generated code
         */
        export function createTournamentCodesById(tournamentId:number,
                                                  count:number,
                                                  body:TournamentCodeParameters):string[];

        /**
         * Returns the tournament code DTO associated with a tournament code string. (REST)
         * Should call GET /tournament/public/v1/code/{tournamentCode}
         * @param tournamentCode The tournament code string.
         */
        export function getTournamentByCode(tournamentCode:string):TournamentCodeDTO;

        /**
         * Update the pick type, map, spectator type, or allowed summoners for a code (REST)
         * Should call PUT /tournament/public/v1/code/{tournamentCode}
         * @param tournamentCode The tournament code to update
         * @param body           The fields to update
         */
        export function updateTournamentByCode(tournamentCode:string,
                                               body:TournamentCodeUpdateParameters):void;

        /**
         * Gets a list of lobby events by tournament code (REST)
         * Should call GET /tournament/public/v1/lobby/events/by-code/{tournamentCode}
         * @param tournamentCode The short code to look up lobby events for
         */
        export function getLobbyEventsByTournamentCode(tournamentCode:string):LobbyEventDTOWrapper;

        /**
         * Creates a tournament provider and returns its ID. (REST)
         * Should call POST /tournament/public/v1/provider
         * @param body The provider definition.
         */
        export function createTournamentProvider(body:ProviderRegistrationParameters):number;

        /**
         * Creates a tournament and returns its ID. (REST)
         * Should call POST /tournament/public/v1/tournament
         * @param body The tournament definition.
         */
        export function createTournament(body:TournamentRegistrationParameters):number;

        /**
         *
         */
        export interface TournamentCodeParameters {
            /**
             * Optional list of participants in order to validate the players eligible to join the lobby.
             * NOTE: We currently do not enforce participants at the team level, but rather the aggregate of teamOne and teamTwo.
             * We may add the ability to enforce at the team level in the future.
             */
            allowedSummonerIds?: SummonerIdParams;
            /**
             * The map type of the game. Valid values are SUMMONERS_RIFT, TWISTED_TREELINE, CRYSTAL_SCAR, and HOWLING_ABYSS.
             */
            mapType: string;
            /**
             * Optional string that may contain any data in any format, if specified at all. Used to denote any custom information about the game.
             */
            metadata?: string;
            /**
             * The pick type of the game. Valid values are BLIND_PICK, DRAFT_MODE, ALL_RANDOM, TOURNAMENT_DRAFT.
             */
            pickType: string;
            /**
             * The spectator type of the game. Valid values are NONE, LOBBYONLY, ALL.
             */
            spectatorType: string;
            /**
             * The team size of the game. Valid values are 1-5.
             */
            teamSize: number;
        }

        /**
         *
         */
        export interface SummonerIdParams {
            /**
             * the tournament participants
             */
            participants: number[];
        }

        /**
         *
         */
        export interface TournamentCodeDTO {
            /**
             * The tournament code.
             */
            code: string;
            /**
             * The tournament code's ID.
             */
            id: number;
            /**
             * The lobby name for the tournament code game.
             */
            lobbyName: string;
            /**
             * The game map for the tournament code game
             */
            map: string;
            /**
             * The metadata for tournament code.
             */
            metaData: string;
            /**
             *
             */
            participants: number[];
            /**
             * The password for the tournament code game.
             */
            password: string;
            /**
             * The pick mode for tournament code game.
             */
            pickType: string;
            /**
             * The provider's ID.
             */
            providerId: number;
            /**
             * The tournament code's region. (Legal values: BR, EUNE, EUW, JP, KR, LAN, LAS, NA, OCE, PBE, RU, TR)
             */
            region: string;
            /**
             * The spectator mode for the tournament code game.
             */
            spectators: string;
            /**
             * The team size for the tournament code game.
             */
            teamSize: number;
            /**
             * The tournament's ID.
             */
            tournamentId: number;
        }

        /**
         *
         */
        export interface TournamentCodeUpdateParameters {
            /**
             * Comma separated list of summoner Ids
             */
            allowedParticipants: string;
            /**
             * The map type (Legal values: SUMMONERS_RIFT, CRYSTAL_SCAR, TWISTED_TREELINE, HOWLING_ABYSS)
             */
            mapType: string;
            /**
             * The pick type (Legal values: BLIND_PICK, DRAFT_MODE, ALL_RANDOM, TOURNAMENT_DRAFT)
             */
            pickType: string;
            /**
             * The spectator type (Legal values: NONE, LOBBYONLY, ALL)
             */
            spectatorType: string;
        }

        /**
         *
         */
        export interface LobbyEventDTOWrapper {
            /**
             *
             */
            eventList: LobbyEventDTO[];
        }

        /**
         *
         */
        export interface LobbyEventDTO {
            /**
             * The type of event that was triggered
             */
            eventType: string;
            /**
             * The summoner that triggered the event
             */
            summonerId: string;
            /**
             * Timestamp from the event
             */
            timestamp: string;
        }

        /**
         *
         */
        export interface ProviderRegistrationParameters {
            /**
             * The region in which the provider will be running tournaments. (Legal values: BR, EUNE, EUW, JP, KR, LAN, LAS, NA, OCE, PBE, RU, TR)
             */
            region: string;
            /**
             * The provider's callback URL to which tournament game results in this region should be posted. The URL must be well-formed, use the http or https protocol, and use the default port for the protocol (http URLs must use port 80, https URLs must use port 443).
             */
            url: string;
        }

        /**
         *
         */
        export interface TournamentRegistrationParameters {
            /**
             * The optional name of the tournament.
             */
            name?: string;
            /**
             * The provider ID to specify the regional registered provider data to associate this tournament.
             */
            providerId: number;
        }
    }
}

declare module "riotGamesApi" {
    export = riotGamesApi;
}