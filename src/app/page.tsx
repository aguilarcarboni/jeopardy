import QuestionBoard from "@/components/QuestionBoard";
import Scoreboard from "@/components/Scoreboard";
import { US } from "country-flag-icons/react/3x2";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-linear-to-br from-background via-background to-muted/20 flex flex-col p-20">
      {/* Header */}
      <header className="px-4 pt-3 pb-2 lg:px-6 lg:pt-4 lg:pb-2">
        <div className="text-center font-bold flex items-center justify-center gap-2 text-7xl">
          <span className="text-blue-500">Texas </span>
          <span className="text-red-500">Politics </span>
          <span className="text-black">Jeopardy!</span>
          <US className="rounded-md w-20" />
        </div>
      </header>

      {/* Game Layout */}
      <main className="flex-1 overflow-hidden px-4 pb-3 lg:px-6 lg:pb-4">
        <div className="h-full grid lg:grid-cols-[1fr_280px] gap-3 lg:gap-4">
          <QuestionBoard />
          <Scoreboard />
        </div>
      </main>
    </div>
  );
}
