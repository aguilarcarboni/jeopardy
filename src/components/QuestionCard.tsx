"use client";
import React from "react";
import { Question } from "@/data/game";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  question: Question;
  onSelect: (q: Question) => void;
}

export default function QuestionCard({ question, onSelect }: Props) {
  const disabled = question.answered;
  
  return (
    <Card
      onClick={() => !disabled && onSelect(question)}
      className={`
        group relative overflow-hidden transition-all duration-300
        ${disabled 
          ? 'bg-muted/40 border-muted cursor-not-allowed opacity-40' 
          : 'bg-blue-500 hover:bg-blue-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer border-blue-500'
        }
      `}
    >
      <div className="h-16 lg:h-20 flex items-center justify-center p-2">
        {!disabled && (
          <Badge 
            variant="outline" 
            className="text-sm lg:text-xl font-bold px-2 py-1 lg:px-3 lg:py-1.5 bg-white/90 text-blue-900 backdrop-blur-sm group-hover:bg-white group-hover:text-blue-950 transition-colors border-white/50"
          >
            ${question.value}
          </Badge>
        )}
      </div>
      
      {/* Blue gradient overlay on hover */}
      {!disabled && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}
    </Card>
  );
}
