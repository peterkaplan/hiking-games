import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-800/60 to-blue-900/50 z-10" />
      
      <div className="relative z-20 min-h-screen flex flex-col">
        <header className="pt-12 pb-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-200 to-blue-200 bg-clip-text text-transparent">
              Hiking Games
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 font-light">
            Fun games we played on our hiking trip
          </p>
          <p className="text-sm text-slate-300 mt-2 opacity-80">
            Liechtenstein • 2024
          </p>
        </header>

        <main className="flex-1 flex items-center justify-center px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
            
            <Link href="/imposter" className="group">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 h-64 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-red-500/30 hover:to-orange-600/30">
                <div className="text-6xl mb-4">🎭</div>
                <h2 className="text-2xl font-bold text-white mb-2">Imposter</h2>
                <p className="text-slate-200 text-sm">Find the hidden imposter among your friends</p>
              </div>
            </Link>

            <Link href="/avalon" className="group">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 h-64 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-blue-500/30 hover:to-purple-600/30">
                <div className="text-6xl mb-4">⚔️</div>
                <h2 className="text-2xl font-bold text-white mb-2">Avalon</h2>
                <p className="text-slate-200 text-sm">Knights on a quest for the Holy Grail</p>
              </div>
            </Link>

            <Link href="/oh-hell" className="group">
              <div className="bg-gradient-to-br from-green-500/20 to-teal-600/20 backdrop-blur-sm border border-white/20 rounded-3xl p-8 h-64 flex flex-col justify-center items-center text-center transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-green-500/30 hover:to-teal-600/30">
                <div className="text-6xl mb-4">🃏</div>
                <h2 className="text-2xl font-bold text-white mb-2">Oh Hell!</h2>
                <p className="text-slate-200 text-sm">Bid exactly what you can take</p>
              </div>
            </Link>

          </div>
        </main>

        <footer className="pb-8 text-center">
          <p className="text-slate-300 text-sm">
            made with <span className="text-red-400">♥</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
