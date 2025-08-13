'use client';

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

type Character = {
  name: string;
  description: string;
  isEvil: boolean;
  id: string;
};

type GameState = {
  numPlayers: number;
  selectedCharacters: Character[];
  players: Character[];
  currentPlayer: number;
  currentQuest: number;
  questResults: boolean[];
  currentVoter: number;
  questVotes: string[];
  questMembers: (Character | null)[];
};

type Screen = 'setup' | 'characterReveal' | 'gameBoard' | 'questVoting' | 'questReveal' | 'questResult' | 'winner';

const characters = {
  good: [
    { name: 'Merlin', description: 'Knows all evil players except Mordred' },
    { name: 'Percival', description: 'Knows who Merlin and Morgana are' },
    { name: 'Loyal Servant', description: 'No special knowledge' }
  ],
  evil: [
    { name: 'Mordred', description: 'Unknown to Merlin' },
    { name: 'Morgana', description: 'Appears as Merlin to Percival' },
    { name: 'Assassin', description: 'Can assassinate Merlin at the end' },
    { name: 'Oberon', description: 'Unknown to other evil players' },
    { name: 'Minion', description: 'Regular evil player' }
  ]
};

const questRequirements: { [key: number]: number[] } = {
  5: [2, 3, 2, 3, 3],
  6: [2, 3, 4, 3, 4],
  7: [2, 3, 3, 4, 4],
  8: [3, 4, 4, 5, 5],
  9: [3, 4, 4, 5, 5],
  10: [3, 4, 4, 5, 5]
};

const evilTeamSize: { [key: number]: number } = {
  5: 2, 6: 2, 7: 3, 8: 3, 9: 3, 10: 4
};

export default function AvalonPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('setup');
  const [gameState, setGameState] = useState<GameState>({
    numPlayers: 0,
    selectedCharacters: [],
    players: [],
    currentPlayer: 0,
    currentQuest: 1,
    questResults: [],
    currentVoter: 0,
    questVotes: [],
    questMembers: []
  });
  const [cardFlipped, setCardFlipped] = useState(false);
  const [voteCardFlipped, setVoteCardFlipped] = useState(false);
  const [currentVote, setCurrentVote] = useState<string | null>(null);
  const [revealedVotes, setRevealedVotes] = useState<number>(0);
  const [isRevealing, setIsRevealing] = useState(false);

  const selectPlayers = (num: number) => {
    setGameState(prev => ({ ...prev, numPlayers: num }));
    selectDefaultCharacters();
  };

  const selectDefaultCharacters = () => {
    // Reset to empty selection when changing player count
    setGameState(prev => ({ ...prev, selectedCharacters: [] }));
  };

  const toggleCharacter = (characterName: string, isEvil: boolean, characterId: string) => {
    const evilCount = evilTeamSize[gameState.numPlayers];
    const goodCount = gameState.numPlayers - evilCount;
    
    const currentSelectedGood = gameState.selectedCharacters.filter(c => !c.isEvil).length;
    const currentSelectedEvil = gameState.selectedCharacters.filter(c => c.isEvil).length;
    
    const isSelected = gameState.selectedCharacters.some(c => c.id === characterId);
    
    if (isSelected) {
      // Remove character
      setGameState(prev => ({
        ...prev,
        selectedCharacters: prev.selectedCharacters.filter(c => c.id !== characterId)
      }));
    } else {
      // Add character if there's room
      if (isEvil && currentSelectedEvil < evilCount) {
        const character = characters.evil.find(c => c.name === characterName);
        if (character) {
          setGameState(prev => ({
            ...prev,
            selectedCharacters: [...prev.selectedCharacters, { ...character, isEvil: true, id: characterId }]
          }));
        }
      } else if (!isEvil && currentSelectedGood < goodCount) {
        const character = characters.good.find(c => c.name === characterName);
        if (character) {
          setGameState(prev => ({
            ...prev,
            selectedCharacters: [...prev.selectedCharacters, { ...character, isEvil: false, id: characterId }]
          }));
        }
      }
    }
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = () => {
    if (gameState.selectedCharacters.length !== gameState.numPlayers) {
      alert('Please select exactly ' + gameState.numPlayers + ' characters');
      return;
    }
    
    const shuffledPlayers = shuffleArray([...gameState.selectedCharacters]);
    setGameState(prev => ({ ...prev, players: shuffledPlayers, currentPlayer: 0 }));
    setCurrentScreen('characterReveal');
    setCardFlipped(false);
  };

  const nextPlayer = () => {
    if (gameState.currentPlayer + 1 < gameState.numPlayers) {
      // First flip the card back
      setCardFlipped(false);
      // Then after a delay, update to the next player
      setTimeout(() => {
        setGameState(prev => ({ ...prev, currentPlayer: prev.currentPlayer + 1 }));
      }, 300); // Wait for the flip animation to complete
    } else {
      setCurrentScreen('gameBoard');
    }
  };

  const startQuest = () => {
    const requirements = questRequirements[gameState.numPlayers];
    const numMembers = requirements[gameState.currentQuest - 1];
    
    setGameState(prev => ({
      ...prev,
      questMembers: Array(numMembers).fill(null),
      currentVoter: 0,
      questVotes: []
    }));
    
    setCurrentScreen('questVoting');
    setVoteCardFlipped(false);
    setCurrentVote(null);
  };

  const castVote = (vote: string) => {
    setCurrentVote(vote);
    setGameState(prev => ({
      ...prev,
      questVotes: [...prev.questVotes, vote]
    }));
  };

  const nextVoter = () => {
    if (gameState.currentVoter + 1 < gameState.questMembers.length) {
      setGameState(prev => ({ ...prev, currentVoter: prev.currentVoter + 1 }));
      setVoteCardFlipped(false);
      setCurrentVote(null);
    } else {
      // All votes are cast, go to reveal screen
      setCurrentScreen('questReveal');
      setRevealedVotes(0);
      setIsRevealing(false);
    }
  };

  const startReveal = () => {
    setIsRevealing(true);
    setRevealedVotes(0);
    
    // Reveal votes one by one with delays
    const revealInterval = setInterval(() => {
      setRevealedVotes(prev => {
        if (prev + 1 >= gameState.questVotes.length) {
          clearInterval(revealInterval);
          // After all votes are revealed, wait a moment then show results
          setTimeout(() => {
            setCurrentScreen('questResult');
          }, 2000);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 1500); // Reveal each vote with 1.5s delay
  };

  const continueGame = () => {
    const goodWins = gameState.questResults.filter(r => r).length;
    const evilWins = gameState.questResults.filter(r => !r).length;
    
    if (goodWins === 3 || evilWins === 3) {
      setCurrentScreen('winner');
    } else {
      setGameState(prev => ({ ...prev, currentQuest: prev.currentQuest + 1 }));
      setCurrentScreen('gameBoard');
    }
  };

  const newGame = () => {
    setGameState({
      numPlayers: 0,
      selectedCharacters: [],
      players: [],
      currentPlayer: 0,
      currentQuest: 1,
      questResults: [],
      currentVoter: 0,
      questVotes: [],
      questMembers: []
    });
    setCurrentScreen('setup');
    setCardFlipped(false);
    setVoteCardFlipped(false);
  };

  const questPassed = useCallback(() => {
    const failVotes = gameState.questVotes.filter(v => v === 'fail').length;
    return failVotes === 0 || (gameState.currentQuest === 4 && gameState.numPlayers >= 7 && failVotes < 2);
  }, [gameState.questVotes, gameState.currentQuest, gameState.numPlayers]);

  useEffect(() => {
    if (currentScreen === 'questResult') {
      const passed = questPassed();
      setGameState(prev => ({
        ...prev,
        questResults: [...prev.questResults, passed]
      }));
    }
  }, [currentScreen, gameState.questVotes, questPassed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 text-white overflow-hidden">
      
      {/* Setup Screen */}
      {currentScreen === 'setup' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Avalon
          </h1>
          
          <div className="mb-8 text-center">
            <h2 className="text-2xl mb-6">Select Number of Players</h2>
            <div className="flex gap-4 justify-center flex-wrap">
              {[5, 6, 7, 8, 9, 10].map(num => (
                <button
                  key={num}
                  onClick={() => selectPlayers(num)}
                  className={`w-16 h-16 rounded-full border-2 font-bold text-xl transition-all duration-300 hover:scale-110 ${
                    gameState.numPlayers === num
                      ? 'bg-yellow-400 text-blue-900 border-yellow-400'
                      : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {gameState.numPlayers > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl w-full">
              <h3 className="text-xl mb-6 text-center">Select Characters</h3>
              
              {/* Good Characters */}
              <div className="mb-6">
                <h4 className="text-lg text-green-300 mb-3">
                  Good Team ({gameState.selectedCharacters.filter(c => !c.isEvil).length}/{gameState.numPlayers > 0 ? gameState.numPlayers - evilTeamSize[gameState.numPlayers] : 0})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {/* Show main good characters first */}
                  {characters.good.slice(0, 2).map((char) => {
                    const characterId = char.name.toLowerCase();
                    const isSelected = gameState.selectedCharacters.some(c => c.id === characterId);
                    return (
                      <button
                        key={characterId}
                        onClick={() => toggleCharacter(char.name, false, characterId)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 text-sm ${
                          isSelected
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-green-400 text-green-400 hover:bg-green-400/20'
                        }`}
                      >
                        {char.name}
                      </button>
                    );
                  })}
                  
                  {/* Show loyal servants */}
                  {Array.from({ length: 6 }, (_, i) => {
                    const characterId = `loyal${i}`;
                    const isSelected = gameState.selectedCharacters.some(c => c.id === characterId);
                    return (
                      <button
                        key={characterId}
                        onClick={() => toggleCharacter('Loyal Servant', false, characterId)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 text-sm ${
                          isSelected
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-green-400 text-green-400 hover:bg-green-400/20'
                        }`}
                      >
                        Loyal Servant {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Evil Characters */}
              <div className="mb-6">
                <h4 className="text-lg text-red-300 mb-3">
                  Evil Team ({gameState.selectedCharacters.filter(c => c.isEvil).length}/{gameState.numPlayers > 0 ? evilTeamSize[gameState.numPlayers] : 0})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {/* Show main evil characters first */}
                  {characters.evil.slice(0, 4).map((char) => {
                    const characterId = char.name.toLowerCase();
                    const isSelected = gameState.selectedCharacters.some(c => c.id === characterId);
                    return (
                      <button
                        key={characterId}
                        onClick={() => toggleCharacter(char.name, true, characterId)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 text-sm ${
                          isSelected
                            ? 'bg-red-500 border-red-500 text-white'
                            : 'border-red-400 text-red-400 hover:bg-red-400/20'
                        }`}
                      >
                        {char.name}
                      </button>
                    );
                  })}
                  
                  {/* Show minions */}
                  {Array.from({ length: 4 }, (_, i) => {
                    const characterId = `minion${i}`;
                    const isSelected = gameState.selectedCharacters.some(c => c.id === characterId);
                    return (
                      <button
                        key={characterId}
                        onClick={() => toggleCharacter('Minion', true, characterId)}
                        className={`px-4 py-2 rounded-full border-2 transition-all duration-300 text-sm ${
                          isSelected
                            ? 'bg-red-500 border-red-500 text-white'
                            : 'border-red-400 text-red-400 hover:bg-red-400/20'
                        }`}
                      >
                        Minion {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={startGame}
                disabled={gameState.selectedCharacters.length !== gameState.numPlayers}
                className={`w-full mt-4 py-3 rounded-full font-bold transition-all duration-300 ${
                  gameState.selectedCharacters.length === gameState.numPlayers
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:scale-105'
                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                }`}
              >
                Start Game ({gameState.selectedCharacters.length}/{gameState.numPlayers})
              </button>
            </div>
          )}

          <Link 
            href="/"
            className="mt-8 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            ← Back to Games
          </Link>
        </div>
      )}

      {/* Character Reveal Screen */}
      {currentScreen === 'characterReveal' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="text-2xl mb-8 text-yellow-300">
            Player {gameState.currentPlayer + 1}
          </div>
          
          <div className="w-80 h-96 mb-8 perspective-1000">
            <div
              className={`w-full h-full transition-transform duration-600 transform-style-preserve-3d cursor-pointer ${
                cardFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setCardFlipped(true)}
            >
              {/* Card Front */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl border-4 border-yellow-400 flex flex-col items-center justify-center shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">Tap to Reveal</h2>
                <p className="text-xl">Your Character</p>
              </div>
              
              {/* Card Back */}
              <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-4 border-yellow-400 flex flex-col items-center justify-center shadow-2xl ${
                gameState.players[gameState.currentPlayer]?.isEvil
                  ? 'bg-gradient-to-br from-red-600 to-orange-700'
                  : 'bg-gradient-to-br from-green-600 to-emerald-700'
              }`}>
                <div className="text-3xl font-bold mb-4">
                  {gameState.players[gameState.currentPlayer]?.name}
                </div>
                <div className="text-sm px-6 text-center opacity-90">
                  {gameState.players[gameState.currentPlayer]?.description}
                </div>
              </div>
            </div>
          </div>

          {cardFlipped && (
            <button
              onClick={nextPlayer}
              className="py-3 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              {gameState.currentPlayer + 1 < gameState.numPlayers ? 'Pass to Next Player' : 'Start Quests'}
            </button>
          )}
        </div>
      )}

      {/* Game Board Screen */}
      {currentScreen === 'gameBoard' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <h1 className="text-4xl font-bold mb-8 text-yellow-300">Quest Progress</h1>
          
          <div className="flex gap-4 mb-12">
            {[1, 2, 3, 4, 5].map(questNum => {
              const teamSize = questRequirements[gameState.numPlayers][questNum - 1];
              const failsNeeded = (questNum === 4 && gameState.numPlayers >= 7) ? 2 : 1;
              
              return (
                <div
                  key={questNum}
                  className={`w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center text-sm font-bold transition-all duration-300 ${
                    gameState.questResults[questNum - 1] === true
                      ? 'bg-green-500 border-green-500 text-white'
                      : gameState.questResults[questNum - 1] === false
                      ? 'bg-red-500 border-red-500 text-white'
                      : questNum === gameState.currentQuest
                      ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
                      : 'border-white/50 text-white'
                  }`}
                >
                  <div className="text-lg">{teamSize}</div>
                  <div className="text-xs opacity-80">{failsNeeded} fail</div>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-8">
            <div className="text-2xl mb-4 text-yellow-300">
              Quest {gameState.currentQuest}: {questRequirements[gameState.numPlayers][gameState.currentQuest - 1]} players needed
            </div>
            <button
              onClick={startQuest}
              className="py-3 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              Start Quest
            </button>
          </div>
        </div>
      )}

      {/* Quest Voting Screen */}
      {currentScreen === 'questVoting' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <h2 className="text-2xl mb-8 text-yellow-300">
            Quest Member {gameState.currentVoter + 1} of {gameState.questMembers.length}
          </h2>
          
          <div className="w-80 h-96 mb-8 perspective-1000">
            <div
              className={`w-full h-full transition-transform duration-600 transform-style-preserve-3d cursor-pointer ${
                voteCardFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setVoteCardFlipped(true)}
            >
              {/* Card Front */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl border-4 border-yellow-400 flex flex-col items-center justify-center shadow-2xl">
                <h2 className="text-3xl font-bold mb-4">Tap to Vote</h2>
                <p className="text-xl">Keep it secret!</p>
              </div>
              
              {/* Card Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white/10 rounded-2xl border-4 border-yellow-400 flex flex-col items-center justify-center shadow-2xl">
                <div className="flex gap-8">
                  <button
                    onClick={() => castVote('pass')}
                    className={`w-24 h-24 rounded-full font-bold text-lg transition-all duration-300 ${
                      currentVote === 'pass'
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-110 ring-4 ring-green-300'
                        : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:scale-110'
                    }`}
                  >
                    PASS
                  </button>
                  <button
                    onClick={() => castVote('fail')}
                    className={`w-24 h-24 rounded-full font-bold text-lg transition-all duration-300 ${
                      currentVote === 'fail'
                        ? 'bg-gradient-to-br from-red-400 to-orange-500 text-white scale-110 ring-4 ring-red-300'
                        : 'bg-gradient-to-br from-red-500 to-orange-600 text-white hover:scale-110'
                    }`}
                  >
                    FAIL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {gameState.questVotes.length > gameState.currentVoter && (
            <button
              onClick={nextVoter}
              className="py-3 px-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              {gameState.currentVoter + 1 < gameState.questMembers.length ? 'Pass to Next Member' : 'Continue'}
            </button>
          )}
        </div>
      )}

      {/* Quest Reveal Screen */}
      {currentScreen === 'questReveal' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <h1 className="text-4xl font-bold mb-12 text-yellow-300">Quest Votes</h1>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-md">
            {gameState.questVotes.map((vote, index) => (
              <div
                key={index}
                className={`w-20 h-20 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all duration-1000 ${
                  index < revealedVotes
                    ? vote === 'pass'
                      ? 'bg-green-500 border-green-500 text-white scale-110 animate-bounce'
                      : 'bg-red-500 border-red-500 text-white scale-110 animate-bounce'
                    : 'border-white/30 bg-white/10 text-white/50'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '0.5s'
                }}
              >
                {index < revealedVotes ? (vote === 'pass' ? '✓' : '✗') : '?'}
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            {!isRevealing ? (
              <div>
                <div className="text-xl mb-6 text-slate-200">
                  All votes have been cast. Ready to reveal the results?
                </div>
                <button
                  onClick={startReveal}
                  className="py-4 px-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-full font-bold text-xl hover:scale-105 transition-transform duration-300 animate-pulse"
                >
                  Reveal Votes
                </button>
              </div>
            ) : (
              <div className="text-xl text-slate-200">
                {revealedVotes < gameState.questVotes.length 
                  ? `Revealing vote ${revealedVotes + 1} of ${gameState.questVotes.length}...`
                  : 'All votes revealed!'
                }
              </div>
            )}
          </div>

          {isRevealing && revealedVotes > 0 && (
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {gameState.questVotes.slice(0, revealedVotes).filter(v => v === 'pass').length}
                </div>
                <div className="text-sm text-green-300">Pass</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {gameState.questVotes.slice(0, revealedVotes).filter(v => v === 'fail').length}
                </div>
                <div className="text-sm text-red-300">Fail</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quest Result Screen */}
      {currentScreen === 'questResult' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
            <h1 className={`text-4xl font-bold mb-6 ${questPassed() ? 'text-green-400' : 'text-red-400'}`}>
              Quest {questPassed() ? 'Succeeded!' : 'Failed!'}
            </h1>
            
            <div className="text-lg mb-6">
              {gameState.questVotes.filter(v => v === 'fail').length === 0
                ? 'The quest succeeded with no fail votes!'
                : `The quest ${questPassed() ? 'succeeded' : 'failed'} with ${gameState.questVotes.filter(v => v === 'fail').length} fail vote${gameState.questVotes.filter(v => v === 'fail').length > 1 ? 's' : ''}!`
              }
            </div>
            
            <div className="flex justify-center gap-4 mb-8">
              <div className="bg-green-500/30 border-2 border-green-500 rounded-full px-4 py-2 font-bold">
                Pass: {gameState.questVotes.filter(v => v === 'pass').length}
              </div>
              <div className="bg-red-500/30 border-2 border-red-500 rounded-full px-4 py-2 font-bold">
                Fail: {gameState.questVotes.filter(v => v === 'fail').length}
              </div>
            </div>
            
            <button
              onClick={continueGame}
              className="py-3 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Winner Screen */}
      {currentScreen === 'winner' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="text-center max-w-md w-full">
            <h1 className={`text-6xl font-bold mb-8 animate-pulse ${
              gameState.questResults.filter(r => r).length === 3 ? 'text-green-400' : 'text-red-400'
            }`}>
              {gameState.questResults.filter(r => r).length === 3 ? 'Good Wins!' : 'Evil Wins!'}
            </h1>
            
            <div className="text-2xl mb-8">
              Final Score: {gameState.questResults.filter(r => r).length}-{gameState.questResults.filter(r => !r).length}
            </div>
            
            <button
              onClick={newGame}
              className="py-3 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-full font-bold hover:scale-105 transition-transform duration-300"
            >
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}