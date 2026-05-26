// About.jsx - About Game Page
import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const About = () => {
  const gameFeatures = [
    {
      icon: "🎲",
      title: "3 Minute Rounds",
      description: "Each round lasts 3 minutes with 2:30 minutes for betting and 30 seconds for result display"
    },
    {
      icon: "🎯",
      title: "Multiple Betting Options",
      description: "Bet on Green, Red, Violet, or specific numbers 0-9 with different payout multipliers"
    },
    {
      icon: "💰",
      title: "High Winning Multipliers",
      description: "Win up to 9x your bet amount on number predictions and 4.5x on Violet"
    },
    {
      icon: "📊",
      title: "480 Daily Rounds",
      description: "Game runs 24/7 with 480 rounds every day for non-stop entertainment"
    },
    {
      icon: "🔒",
      title: "Secure & Fair",
      description: "Fully transparent system with random result generation based on betting patterns"
    },
    {
      icon: "📱",
      title: "Mobile Optimized",
      description: "Play seamlessly on any device with our responsive design"
    }
  ];

  const gameRules = [
    {
      color: "green",
      numbers: "1, 3, 7, 9",
      multiplier: "2x",
      special: "5 → 1.5x"
    },
    {
      color: "red",
      numbers: "2, 4, 6, 8",
      multiplier: "2x",
      special: "0 → 1.5x"
    },
    {
      color: "violet",
      numbers: "0 or 5",
      multiplier: "4.5x",
      special: "Special numbers"
    },
    {
      color: "number",
      numbers: "0-9",
      multiplier: "9x",
      special: "Exact match"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-[420px] mx-auto px-4 py-4 pb-24">
        
        {/* Header */}
        <div className="period-card p-5 mb-4">
          <div className="period-header mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="period-label">ABOUT</p>
                <p className="period-value text-lg">Win Go Color Game</p>
              </div>
            </div>
          </div>
          
          <p className="text-white/80 text-sm leading-relaxed">
            Win Go Color Game is an exciting prediction-based game where players bet on colors or numbers 
            to win exciting multipliers. With rounds every 3 minutes, the action never stops!
          </p>
        </div>

        {/* Game Features */}
        <div className="record-container mb-4">
          <div className="p-4">
            <h2 className="record-title text-center mb-4">✨ GAME FEATURES</h2>
            <hr className="mb-4 border-t-2 border-purple-500/50" />
            
            <div className="grid grid-cols-1 gap-3">
              {gameFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Game Rules Table */}
        <div className="record-container mb-4">
          <div className="p-4">
            <h2 className="record-title text-center mb-4">📋 BETTING RULES</h2>
            <hr className="mb-4 border-t-2 border-purple-500/50" />
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                    <th className="px-3 py-2 text-left text-purple-300 text-xs">Color</th>
                    <th className="px-3 py-2 text-left text-purple-300 text-xs">Numbers</th>
                    <th className="px-3 py-2 text-left text-purple-300 text-xs">Multiplier</th>
                    <th className="px-3 py-2 text-left text-purple-300 text-xs">Special</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {gameRules.map((rule, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors">
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          rule.color === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          rule.color === 'red' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          rule.color === 'violet' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {rule.color.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-white/80 font-mono text-xs">{rule.numbers}</td>
                      <td className="px-3 py-2 text-green-400 font-bold">{rule.multiplier}</td>
                      <td className="px-3 py-2 text-yellow-400 text-xs">{rule.special}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* How to Play */}
        <div className="record-container mb-4">
          <div className="p-4">
            <h2 className="record-title text-center mb-4">🎮 HOW TO PLAY</h2>
            <hr className="mb-4 border-t-2 border-purple-500/50" />
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Choose Your Bet</h3>
                  <p className="text-white/60 text-xs">Select from Green, Red, Violet, or any number from 0 to 9</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Set Your Amount</h3>
                  <p className="text-white/60 text-xs">Enter your bet amount (minimum ₹10) and confirm your prediction</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Wait for Result</h3>
                  <p className="text-white/60 text-xs">The winning number is announced after 30 seconds of betting closure</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Collect Your Winnings</h3>
                  <p className="text-white/60 text-xs">If your prediction matches, winnings are automatically credited to your wallet</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payout Information */}
        <div className="record-container">
          <div className="p-4">
            <h2 className="record-title text-center mb-4">💵 PAYOUT EXAMPLES</h2>
            <hr className="mb-4 border-t-2 border-purple-500/50" />
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
                <p className="text-green-400 font-semibold text-sm mb-1">🟢 Bet on Green (₹100)</p>
                <p className="text-white/70 text-xs">Win ₹196 if result is 1,3,7,9 | Win ₹147 if result is 5</p>
              </div>
              
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <p className="text-red-400 font-semibold text-sm mb-1">🔴 Bet on Red (₹100)</p>
                <p className="text-white/70 text-xs">Win ₹196 if result is 2,4,6,8 | Win ₹147 if result is 0</p>
              </div>
              
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <p className="text-purple-400 font-semibold text-sm mb-1">🟣 Bet on Violet (₹100)</p>
                <p className="text-white/70 text-xs">Win ₹441 if result is 0 or 5</p>
              </div>
              
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <p className="text-blue-400 font-semibold text-sm mb-1">🔢 Bet on Specific Number (₹100)</p>
                <p className="text-white/70 text-xs">Win ₹882 if your selected number matches the result</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-center">
              <p className="text-yellow-400 text-xs">
                ⚡ Service Fee: 2% deducted from each bet before payout calculation
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-4">
          <Link to="/main">
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Game
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;