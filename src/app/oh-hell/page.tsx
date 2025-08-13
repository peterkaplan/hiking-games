'use client';

import Link from "next/link";
import { useState } from "react";

type Player = {
  id: number;
  name: string;
  totalScore: number;
  roundScores: number[];
  bids: number[];
  tricks: number[];
};

type GameState = {
  players: Player[];
  currentRound: number;
  maxRounds: number;
  tricksThisRound: number;
  currentPhase: 'setup' | 'bidding' | 'scoring' | 'results';
  currentPlayer: number;
};

type ScoringMethod = 'buttons' | 'typing' | 'bidtrick';

export default function OhHellPage() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentRound: 1,
    maxRounds: 10,
    tricksThisRound: 1,
    currentPhase: 'setup',
    currentPlayer: 0
  });

  const [numPlayers, setNumPlayers] = useState(4);
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '', '']);
  const [scoringMethod, setScoringMethod] = useState<ScoringMethod>('bidtrick');
  const [showScoring, setShowScoring] = useState(false);
  const [basePoints, setBasePoints] = useState(10);
  const [pointsPerTrick, setPointsPerTrick] = useState(2);

  // Oh Hell scoring: base points + points per trick if you make exactly your bid
  const calculateScore = (bid: number, tricks: number): number => {
    if (bid === tricks) {
      return basePoints + (pointsPerTrick * tricks);
    }
    return 0;
  };

  const getPointsForTricks = (tricks: number): number => {
    return basePoints + (pointsPerTrick * tricks);
  };

  const startGame = () => {
    const names = playerNames.slice(0, numPlayers).map((name, i) => name.trim() || `Player ${i + 1}`);
    const players: Player[] = names.map((name, i) => ({
      id: i,
      name,
      totalScore: 0,
      roundScores: [],
      bids: [],
      tricks: []
    }));

    setGameState({
      players,
      currentRound: 1,
      maxRounds: Math.max(10, Math.floor(52 / numPlayers)),
      tricksThisRound: 1,
      currentPhase: scoringMethod === 'bidtrick' ? 'bidding' : 'scoring',
      currentPlayer: 0
    });
  };

  const recordBid = (playerId: number, bid: number) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.map(p => 
        p.id === playerId 
          ? { ...p, bids: [...p.bids.slice(0, prev.currentRound - 1), bid] }
          : p
      )
    }));
  };

  const recordTricks = (playerId: number, tricks: number) => {
    setGameState(prev => {
      const updatedPlayers = prev.players.map(p => {
        if (p.id === playerId) {
          const newTricks = [...p.tricks.slice(0, prev.currentRound - 1), tricks];
          const bid = p.bids[prev.currentRound - 1] || 0;
          const roundScore = calculateScore(bid, tricks);
          const newRoundScores = [...p.roundScores.slice(0, prev.currentRound - 1), roundScore];
          
          return {
            ...p,
            tricks: newTricks,
            roundScores: newRoundScores,
            totalScore: newRoundScores.reduce((sum, score) => sum + score, 0)
          };
        }
        return p;
      });

      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  const recordScore = (playerId: number, score: number) => {
    setGameState(prev => {
      const updatedPlayers = prev.players.map(p => {
        if (p.id === playerId) {
          const newRoundScores = [...p.roundScores.slice(0, prev.currentRound - 1), score];
          
          return {
            ...p,
            roundScores: newRoundScores,
            totalScore: newRoundScores.reduce((sum, score) => sum + score, 0)
          };
        }
        return p;
      });

      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  const getCurrentScore = (playerId: number): number => {
    return gameState.players[playerId]?.roundScores[gameState.currentRound - 1] || 0;
  };

  const nextRound = () => {
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      tricksThisRound: prev.currentRound + 1 <= Math.floor(prev.maxRounds / 2) 
        ? prev.currentRound + 1 
        : prev.maxRounds - prev.currentRound,
      currentPhase: scoringMethod === 'bidtrick' ? 'bidding' : 'scoring'
    }));
  };

  const getCurrentBid = (playerId: number): number => {
    return gameState.players[playerId]?.bids[gameState.currentRound - 1] || 0;
  };

  const getCurrentTricks = (playerId: number): number => {
    return gameState.players[playerId]?.tricks[gameState.currentRound - 1] || 0;
  };

  const getTotalBids = (): number => {
    return gameState.players.reduce((total, player) => {
      return total + (player.bids[gameState.currentRound - 1] || 0);
    }, 0);
  };

  const getPlayersWithBids = (): number => {
    return gameState.players.filter(player => 
      player.bids[gameState.currentRound - 1] !== undefined
    ).length;
  };

  const isLastBidder = (playerId: number): boolean => {
    return getPlayersWithBids() === gameState.players.length - 1 && 
           gameState.players[playerId].bids[gameState.currentRound - 1] === undefined;
  };

  const getForbiddenBid = (playerId: number): number | null => {
    if (!isLastBidder(playerId)) return null;
    
    const currentTotal = getTotalBids();
    const forbiddenBid = gameState.tricksThisRound - currentTotal;
    
    return forbiddenBid >= 0 && forbiddenBid <= gameState.tricksThisRound ? forbiddenBid : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-emerald-800 text-white">
      
      {/* Setup Screen */}
      {gameState.currentPhase === 'setup' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <h1 className="text-4xl font-bold mb-8 text-center">🃏 Oh Hell!</h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">Number of Players:</label>
                <select 
                  value={numPlayers}
                  onChange={(e) => {
                    const count = parseInt(e.target.value);
                    setNumPlayers(count);
                    setPlayerNames(Array(count).fill(''));
                  }}
                  className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                >
                  {[3, 4, 5, 6, 7].map(n => (
                    <option key={n} value={n}>{n} Players</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Player Names:</label>
                <div className="space-y-2">
                  {Array(numPlayers).fill(0).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      value={playerNames[i] || ''}
                      onChange={(e) => {
                        const newNames = [...playerNames];
                        newNames[i] = e.target.value;
                        setPlayerNames(newNames);
                      }}
                      placeholder={`Player ${i + 1}`}
                      className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Scoring Method:</label>
                <select 
                  value={scoringMethod}
                  onChange={(e) => setScoringMethod(e.target.value as ScoringMethod)}
                  className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                >
                  <option value="bidtrick">Bid & Tricks Buttons</option>
                  <option value="buttons">Score Buttons (+/-)</option>
                  <option value="typing">Type Scores</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-lg font-semibold mb-3">Base Points:</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={basePoints}
                    onChange={(e) => setBasePoints(parseInt(e.target.value) || 10)}
                    className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3">Points per Trick:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={pointsPerTrick}
                    onChange={(e) => setPointsPerTrick(parseInt(e.target.value) || 2)}
                    className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/20 rounded-lg p-4 my-6 text-sm leading-relaxed">
              <button 
                onClick={() => setShowScoring(!showScoring)}
                className="font-bold text-yellow-300 hover:text-yellow-100 transition-colors"
              >
                📊 Scoring Rules {showScoring ? '▼' : '▶'}
              </button>
              {showScoring && (
                <div className="mt-3 space-y-2">
                  <div><strong>Make your bid exactly:</strong> {basePoints} + ({pointsPerTrick} × tricks) points</div>
                  <div><strong>Miss your bid:</strong> 0 points</div>
                  <div className="text-yellow-200 mt-3">
                    <strong>Examples with current settings:</strong><br/>
                    • Bid 0, take 0: {basePoints} points<br/>
                    • Bid 3, take 3: {basePoints + (pointsPerTrick * 3)} points<br/>
                    • Bid 5, take 4: 0 points
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Start Game
            </button>
          </div>

          <Link 
            href="/"
            className="mt-8 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            ← Back to Games
          </Link>
        </div>
      )}

      {/* Bidding Phase */}
      {gameState.currentPhase === 'bidding' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Round {gameState.currentRound}</h2>
              <p className="text-xl text-green-200">{gameState.tricksThisRound} tricks this round</p>
            </div>

            <div className="space-y-4 mb-8">
              {gameState.players.map(player => {
                const forbiddenBid = getForbiddenBid(player.id);
                const isLast = isLastBidder(player.id);
                const hasBid = player.bids[gameState.currentRound - 1] !== undefined;
                
                return (
                  <div key={player.id} className="bg-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">{player.name}</span>
                        <span className="text-green-300">Score: {player.totalScore}</span>
                        {isLast && (
                          <span className="text-yellow-300 text-sm font-semibold">
                            (Last bidder)
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Bid:</span>
                        <div className="flex gap-1">
                          {Array(gameState.tricksThisRound + 1).fill(0).map((_, i) => {
                            const isForbidden = forbiddenBid === i;
                            const isSelected = getCurrentBid(player.id) === i;
                            
                            return (
                              <button
                                key={i}
                                onClick={() => !isForbidden && recordBid(player.id, i)}
                                disabled={isForbidden}
                                className={`w-10 h-10 rounded-full font-bold transition-all duration-200 ${
                                  isForbidden
                                    ? 'bg-red-500/50 text-red-200 cursor-not-allowed line-through'
                                    : isSelected
                                    ? 'bg-yellow-500 text-black scale-110'
                                    : 'bg-white/30 hover:bg-white/50'
                                }`}
                              >
                                {i}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {isLast && forbiddenBid !== null && (
                      <div className="text-sm text-red-300 text-center mt-2">
                        ⚠️ Cannot bid {forbiddenBid} (would equal {gameState.tricksThisRound} total tricks)
                      </div>
                    )}
                    
                    {hasBid && (
                      <div className="text-sm text-green-300 text-center mt-2">
                        ✓ Bid: {getCurrentBid(player.id)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-white/30 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-6">
                <div>
                  <span className="text-sm text-gray-200">Total Bids:</span>
                  <span className="ml-2 text-xl font-bold text-yellow-300">{getTotalBids()}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-200">Available Tricks:</span>
                  <span className="ml-2 text-xl font-bold text-green-300">{gameState.tricksThisRound}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-200">Difference:</span>
                  <span className={`ml-2 text-xl font-bold ${
                    getTotalBids() === gameState.tricksThisRound 
                      ? 'text-red-400' 
                      : 'text-blue-300'
                  }`}>
                    {getTotalBids() - gameState.tricksThisRound > 0 ? '+' : ''}{getTotalBids() - gameState.tricksThisRound}
                  </span>
                </div>
              </div>
              {getTotalBids() === gameState.tricksThisRound && (
                <div className="text-red-300 text-sm mt-2">
                  ⚠️ Total bids equal available tricks - someone must fail!
                </div>
              )}
            </div>

            <button 
              onClick={() => setGameState(prev => ({ ...prev, currentPhase: 'scoring' }))}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Start Playing Round
            </button>
          </div>
        </div>
      )}

      {/* Scoring Phase */}
      {gameState.currentPhase === 'scoring' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Round {gameState.currentRound} - Scoring</h2>
              {scoringMethod === 'bidtrick' ? (
                <p className="text-xl text-green-200">{gameState.tricksThisRound} tricks available</p>
              ) : (
                <p className="text-xl text-green-200">Enter scores for this round</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              {gameState.players.map(player => {
                const bid = getCurrentBid(player.id);
                const tricks = getCurrentTricks(player.id);
                const points = getPointsForTricks(bid);
                
                return (
                  <div key={player.id} className="bg-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg">{player.name}</span>
                        {scoringMethod === 'bidtrick' && (
                          <>
                            <span className="text-yellow-300">Bid: {bid}</span>
                            <span className="text-sm text-green-300">({points} pts if exact)</span>
                          </>
                        )}
                      </div>
                      <span className="text-green-300">Total: {player.totalScore}</span>
                    </div>

                    {scoringMethod === 'bidtrick' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tricks taken:</span>
                        <div className="flex gap-1">
                          {Array(gameState.tricksThisRound + 1).fill(0).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => recordTricks(player.id, i)}
                              className={`w-10 h-10 rounded-full font-bold transition-all duration-200 ${
                                tricks === i
                                  ? bid === i
                                    ? 'bg-green-500 text-white scale-110'
                                    : 'bg-red-500 text-white scale-110'
                                  : 'bg-white/30 hover:bg-white/50'
                              }`}
                            >
                              {i}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {scoringMethod === 'buttons' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Score this round:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => recordScore(player.id, Math.max(0, getCurrentScore(player.id) - basePoints))}
                            className="px-3 h-10 bg-red-500 hover:bg-red-600 rounded-lg font-bold transition-colors text-sm"
                          >
                            -{basePoints}
                          </button>
                          <button
                            onClick={() => recordScore(player.id, Math.max(0, getCurrentScore(player.id) - pointsPerTrick))}
                            className="px-2 h-10 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-colors text-sm"
                          >
                            -{pointsPerTrick}
                          </button>
                          <span className="w-16 text-center font-bold bg-white/20 rounded py-2">{getCurrentScore(player.id)}</span>
                          <button
                            onClick={() => recordScore(player.id, getCurrentScore(player.id) + pointsPerTrick)}
                            className="px-2 h-10 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-colors text-sm"
                          >
                            +{pointsPerTrick}
                          </button>
                          <button
                            onClick={() => recordScore(player.id, getCurrentScore(player.id) + basePoints)}
                            className="px-3 h-10 bg-green-500 hover:bg-green-600 rounded-lg font-bold transition-colors text-sm"
                          >
                            +{basePoints}
                          </button>
                        </div>
                      </div>
                    )}

                    {scoringMethod === 'typing' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Score this round:</span>
                        <input
                          type="number"
                          min="0"
                          value={getCurrentScore(player.id) || ''}
                          onChange={(e) => recordScore(player.id, parseInt(e.target.value) || 0)}
                          className="w-20 p-2 rounded bg-white/90 text-gray-800 text-center font-bold"
                          placeholder="0"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setGameState(prev => ({ ...prev, currentPhase: 'bidding' }))}
                className="flex-1 py-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Back to Bidding
              </button>
              
              {gameState.currentRound < gameState.maxRounds ? (
                <button 
                  onClick={nextRound}
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  Next Round
                </button>
              ) : (
                <button 
                  onClick={() => setGameState(prev => ({ ...prev, currentPhase: 'results' }))}
                  className="flex-1 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  Final Results
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Screen */}
      {gameState.currentPhase === 'results' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl">
            <h2 className="text-4xl font-bold mb-8 text-center">🏆 Final Results</h2>
            
            <div className="space-y-4 mb-8">
              {gameState.players
                .sort((a, b) => b.totalScore - a.totalScore)
                .map((player, index) => (
                  <div 
                    key={player.id} 
                    className={`rounded-lg p-6 flex items-center justify-between ${
                      index === 0 
                        ? 'bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-2 border-yellow-400' 
                        : 'bg-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">#{index + 1}</span>
                      <span className="text-xl font-bold">{player.name}</span>
                      {index === 0 && <span className="text-2xl">👑</span>}
                    </div>
                    <span className="text-2xl font-bold text-green-300">{player.totalScore}</span>
                  </div>
                ))}
            </div>

            <button 
              onClick={() => {
                setGameState({
                  players: [],
                  currentRound: 1,
                  maxRounds: 10,
                  tricksThisRound: 1,
                  currentPhase: 'setup',
                  currentPlayer: 0
                });
                setPlayerNames(Array(numPlayers).fill(''));
              }}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}