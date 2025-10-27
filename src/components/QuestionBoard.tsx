"use client";
import React, { useState } from "react";
import { categories, Question } from "@/data/game";
import QuestionCard from "./QuestionCard";
import QuestionModal from "./QuestionModal";
import { Card } from "@/components/ui/card";

export default function QuestionBoard() {
  const [active, setActive] = useState<Question | null>(null);

  return (
    <>
      <div className="h-full flex items-center justify-center">
        <div className="w-full max-w-7xl grid gap-1.5 lg:gap-2" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}>
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-1.5 lg:gap-2">
              {/* Category Header */}
              <Card className="bg-red-500 text-white shadow-lg shadow-red-500/30">
                <div className="p-2 lg:p-2.5 text-center">
                  <h3 className="text-[10px] lg:text-xs font-bold uppercase tracking-wide line-clamp-2 leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </Card>
              
              {/* Questions */}
              <div className="flex flex-col gap-1.5 lg:gap-2">
                {cat.questions.map((q) => (
                  <QuestionCard key={q.id} question={q} onSelect={setActive} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {active && <QuestionModal question={active} onClose={() => setActive(null)} />}
    </>
  );
}
