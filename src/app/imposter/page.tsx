'use client';

import Link from "next/link";
import { useState } from "react";

type GameState = {
  totalPlayers: number;
  currentPlayer: number;
  item: string;
  category: string;
  imposterIndex: number;
  startingPlayer: number;
};

type Screen = 'setup' | 'pass' | 'player' | 'gameActive' | 'reveal';

const categories = {
  locations: [
    "Beach", "Restaurant", "School", "Hospital", "Airport", "Movie Theater",
    "Gym", "Library", "Park", "Mall", "Office", "Hotel", "Gas Station",
    "Grocery Store", "Bank", "Police Station", "Fire Station", "Dentist",
    "Hair Salon", "Coffee Shop", "Zoo", "Museum", "Church", "Subway",
    "Taxi", "Cruise Ship", "Space Station", "Casino", "Circus", "Farm"
  ],
  animals: [
    "Lion", "Elephant", "Penguin", "Dolphin", "Tiger", "Giraffe", "Monkey", 
    "Kangaroo", "Panda", "Koala", "Zebra", "Hippo", "Rhino", "Cheetah",
    "Polar Bear", "Wolf", "Fox", "Rabbit", "Squirrel", "Owl", "Eagle",
    "Shark", "Whale", "Octopus", "Turtle", "Frog", "Snake", "Lizard"
  ],
  food: [
    "Pizza", "Burger", "Sushi", "Tacos", "Ice Cream", "Chocolate", "Pasta",
    "Sandwich", "Salad", "Soup", "Cookies", "Cake", "Pancakes", "Waffles",
    "Coffee", "Tea", "Smoothie", "Hot Dog", "Popcorn", "Cheese", "Bread",
    "Apple", "Banana", "Orange", "Strawberry", "Avocado", "Broccoli"
  ],
  movies: [
    "The Lion King", "Titanic", "Avatar", "Star Wars", "Harry Potter", 
    "The Avengers", "Frozen", "Toy Story", "Finding Nemo", "Shrek",
    "The Dark Knight", "Jurassic Park", "E.T.", "The Matrix", "Forrest Gump",
    "The Godfather", "Jaws", "Rocky", "Home Alone", "Back to the Future"
  ],
  jobs: [
    "Doctor", "Teacher", "Chef", "Police Officer", "Firefighter", "Pilot",
    "Nurse", "Engineer", "Lawyer", "Artist", "Musician", "Actor", "Writer",
    "Photographer", "Dentist", "Veterinarian", "Mechanic", "Farmer",
    "Librarian", "Scientist", "Astronaut", "Judge", "Barber", "Baker"
  ],
  sports: [
    "Soccer", "Basketball", "Tennis", "Swimming", "Baseball", "Football",
    "Golf", "Volleyball", "Hockey", "Boxing", "Wrestling", "Skiing",
    "Snowboarding", "Surfing", "Skateboarding", "Cycling", "Running",
    "Gymnastics", "Dance", "Yoga", "Rock Climbing", "Bowling", "Fishing"
  ],
  countries: [
    "United States", "Canada", "Mexico", "Brazil", "United Kingdom", "France",
    "Germany", "Italy", "Spain", "Russia", "China", "Japan", "India",
    "Australia", "South Africa", "Egypt", "Morocco", "Kenya", "Nigeria",
    "Argentina", "Chile", "Peru", "Thailand", "South Korea", "Indonesia"
  ],
  superheroes: [
    "Superman", "Batman", "Spider-Man", "Wonder Woman", "Iron Man", "Captain America",
    "Thor", "Hulk", "Flash", "Green Lantern", "Aquaman", "Black Widow",
    "Hawkeye", "Black Panther", "Captain Marvel", "Ant-Man", "Deadpool",
    "Wolverine", "Storm", "Cyclops", "Jean Grey", "Professor X", "Magneto"
  ],
  disney: [
    "Mickey Mouse", "Minnie Mouse", "Donald Duck", "Goofy", "Pluto", "Elsa",
    "Anna", "Olaf", "Simba", "Mufasa", "Ariel", "Belle", "Cinderella",
    "Snow White", "Jasmine", "Aladdin", "Mulan", "Pocahontas", "Moana",
    "Rapunzel", "Tiana", "Merida", "Buzz Lightyear", "Woody", "Nemo"
  ],
  tricky: [
    "Rubber Duck", "Paper Clip", "Shoelace", "Doorknob", "Light Switch", 
    "Belly Button", "Shadow", "Hiccup", "Yawn", "Sneeze", "Brain Freeze",
    "Déjà Vu", "Goosebumps", "Static Electricity", "Awkward Silence",
    "Inside Joke", "White Lie", "Gut Feeling", "Split Second", "Lost Thought",
    "Muscle Memory", "Habit", "Reflex", "Instinct", "Intuition", "Nostalgia",
    "Procrastination", "Stage Fright", "Writer's Block", "Butterflies in Stomach",
    "Cold Feet", "Green Thumb", "Sweet Tooth", "Heavy Heart", "Bright Idea",
    "Sharp Tongue", "Thick Skin", "Open Mind", "Sixth Sense", "Common Sense",
    "Tunnel Vision", "Silver Lining", "Mixed Feelings", "Second Wind",
    "Breaking Point", "Comfort Zone", "Gray Area", "Turning Point"
  ]
};

export default function ImposterPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('setup');
  const [gameState, setGameState] = useState<GameState>({
    totalPlayers: 4,
    currentPlayer: 0,
    item: "",
    category: "locations",
    imposterIndex: 0,
    startingPlayer: 0
  });
  const [playerCount, setPlayerCount] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState('locations');
  const [customItem, setCustomItem] = useState('');

  const startGame = () => {
    let item = '';
    
    if (selectedCategory === 'custom' && customItem.trim()) {
      item = customItem.trim();
    } else if (selectedCategory !== 'custom') {
      const items = categories[selectedCategory as keyof typeof categories];
      item = items[Math.floor(Math.random() * items.length)];
    } else {
      alert('Please enter a custom item or select a different category!');
      return;
    }
    
    const imposterIndex = Math.floor(Math.random() * playerCount) + 1;
    const startingPlayer = Math.floor(Math.random() * playerCount) + 1;
    
    setGameState({
      totalPlayers: playerCount,
      currentPlayer: 1,
      item,
      category: selectedCategory,
      imposterIndex,
      startingPlayer
    });
    
    setCurrentScreen('pass');
  };

  const showPlayerRole = () => {
    setCurrentScreen('player');
  };

  const nextPlayer = () => {
    if (gameState.currentPlayer < gameState.totalPlayers) {
      setGameState(prev => ({ ...prev, currentPlayer: prev.currentPlayer + 1 }));
      setCurrentScreen('pass');
    } else {
      setCurrentScreen('gameActive');
    }
  };

  const revealItem = () => {
    setCurrentScreen('reveal');
  };

  const newGame = () => {
    setCurrentScreen('setup');
    setGameState({
      totalPlayers: 4,
      currentPlayer: 0,
      item: "",
      category: "locations",
      imposterIndex: 0,
      startingPlayer: 0
    });
    setPlayerCount(4);
    setSelectedCategory('locations');
    setCustomItem('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 text-white">
      
      {/* Setup Screen */}
      {currentScreen === 'setup' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <h1 className="text-4xl font-bold mb-8 text-center">🕵️ Imposter Game</h1>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">Number of Players:</label>
                <select 
                  value={playerCount}
                  onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                  className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                >
                  <option value={3}>3 Players</option>
                  <option value={4}>4 Players</option>
                  <option value={5}>5 Players</option>
                  <option value={6}>6 Players</option>
                  <option value={7}>7 Players</option>
                  <option value={8}>8 Players</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Category:</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                >
                  <option value="locations">🏢 Locations</option>
                  <option value="animals">🐾 Animals</option>
                  <option value="food">🍕 Food & Drinks</option>
                  <option value="movies">🎬 Movies</option>
                  <option value="jobs">💼 Jobs/Professions</option>
                  <option value="sports">⚽ Sports & Activities</option>
                  <option value="countries">🌍 Countries</option>
                  <option value="superheroes">🦸 Superheroes</option>
                  <option value="disney">🏰 Disney Characters</option>
                  <option value="tricky">🧠 Abstract Concepts (Hard)</option>
                  <option value="custom">✏️ Custom Item</option>
                </select>
              </div>

              {selectedCategory === 'custom' && (
                <div>
                  <label className="block text-lg font-semibold mb-3">Custom Item:</label>
                  <input 
                    type="text"
                    value={customItem}
                    onChange={(e) => setCustomItem(e.target.value)}
                    placeholder="Enter your custom item"
                    className="w-full p-3 rounded-lg bg-white/90 text-gray-800 font-medium"
                  />
                </div>
              )}
            </div>

            <div className="bg-white/20 rounded-lg p-4 my-6 text-sm leading-relaxed">
              <strong>How to Play:</strong><br />
              1. Pass the phone to each player<br />
              2. Everyone gets the item except the imposter<br />
              3. Take turns giving clues about the item<br />
              4. Vote to find the imposter!
            </div>

            <button 
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
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

      {/* Pass Phone Screen */}
      {currentScreen === 'pass' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-6">📱 Pass the Phone</h2>
            
            <div className="text-xl mb-8 opacity-90">
              Pass to Player {gameState.currentPlayer}
            </div>
            
            <div className="bg-white/20 rounded-xl p-8 mb-8 border-2 border-white/30">
              <div className="text-2xl font-bold mb-4">Ready?</div>
              <div className="text-lg">Tap when you have the phone</div>
            </div>

            <button 
              onClick={showPlayerRole}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              I Have the Phone
            </button>
          </div>
        </div>
      )}

      {/* Player Screen */}
      {currentScreen === 'player' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl text-center">
            <div className="text-xl mb-6 opacity-90">
              Player {gameState.currentPlayer} of {gameState.totalPlayers}
            </div>
            
            <div className="bg-white/20 rounded-xl p-8 mb-8 border-2 border-white/30">
              {gameState.currentPlayer === gameState.imposterIndex ? (
                <>
                  <div className="text-2xl font-bold mb-4">YOU ARE THE</div>
                  <div className="text-3xl font-bold text-red-400 mb-6 animate-pulse">IMPOSTER</div>
                  <div className="text-base leading-relaxed">
                    You don&apos;t know the item!<br />
                    Listen to others&apos; clues and try to blend in.
                  </div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold mb-6">{gameState.item}</div>
                  <div className="text-base leading-relaxed">
                    This is the item.<br />
                    Give clues that show you know it,<br />
                    but don&apos;t make it too obvious!
                  </div>
                </>
              )}
              
              {gameState.currentPlayer === gameState.startingPlayer && (
                <div className="bg-yellow-500/30 border-2 border-yellow-400 rounded-lg p-4 mt-6">
                  <div className="text-yellow-300 font-bold text-lg mb-2">⭐ YOU START THE GAME! ⭐</div>
                  <div className="text-sm text-yellow-200">Give the first clue when everyone is ready</div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="text-lg font-semibold">
                Remember your role, then pass the phone
              </div>
              <button 
                onClick={nextPlayer}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Done - Next Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Active Screen */}
      {currentScreen === 'gameActive' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-8">🎮 Game in Progress</h2>
            
            <div className="bg-white/20 rounded-lg p-6 mb-8 text-left leading-relaxed">
              <strong>Now Playing:</strong><br />
              • Player {gameState.startingPlayer} starts by giving the first clue<br />
              • Go around in order giving clues about the item<br />
              • Imposter: try to blend in!<br />
              • Everyone else: give specific but not obvious clues<br />
              • After everyone gives clues, vote for who you think is the imposter
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={revealItem}
                className="py-4 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Reveal Answer
              </button>
              <button 
                onClick={newGame}
                className="py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                New Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reveal Screen */}
      {currentScreen === 'reveal' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 animate-in fade-in duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl text-center">
            <h2 className="text-3xl font-bold mb-8">🎭 Game Over</h2>
            
            <div className="bg-white/20 rounded-xl p-8 mb-8 border-2 border-white/30">
              <div className="text-3xl font-bold mb-6">{gameState.item}</div>
              <div className="text-xl">
                Player {gameState.imposterIndex} was the imposter!
              </div>
            </div>

            <button 
              onClick={newGame}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}