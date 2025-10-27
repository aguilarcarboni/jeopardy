"use client";
import React, { useState } from "react";
import { Question } from "@/data/game";
import { useTeams } from "@/context/TeamsContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Eye } from "lucide-react";

interface Props {
  question: Question;
  onClose: () => void;
}

export default function QuestionModal({ question, onClose }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);
  const { teams, currentTeamId, updateScore, nextTurn } = useTeams();
  const currentTeam = teams.find((t) => t.id === currentTeamId);

  const handleCorrect = () => {
    question.answered = true;
    if (currentTeamId) updateScore(currentTeamId, question.value);
    onClose();
  };

  const handleIncorrect = () => {
    question.answered = true;
    if (currentTeamId) updateScore(currentTeamId, -question.value);
    nextTurn();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-lg px-3 py-1 bg-blue-500 text-white hover:bg-blue-600">
              ${question.value}
            </Badge>
            {currentTeam && (
              <Badge variant="outline" className="text-sm border-blue-500 text-blue-700">
                {currentTeam.name}'s Turn
              </Badge>
            )}
          </div>
          
          <DialogTitle className="text-2xl lg:text-3xl font-bold leading-tight">
            {question.question}
          </DialogTitle>
        </DialogHeader>

        {showAnswer && (
          <>
            <Separator className="my-4" />
            <DialogDescription className="text-lg lg:text-xl font-medium text-foreground space-y-2">
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                Answer
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                {question.answer}
              </div>
            </DialogDescription>
          </>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-6">
          {!showAnswer ? (
            <Button
              onClick={() => setShowAnswer(true)}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
              size="lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              Reveal Answer
            </Button>
          ) : (
            <>
              <Button
                onClick={handleCorrect}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Correct
              </Button>
              <Button
                onClick={handleIncorrect}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600"
                size="lg"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Incorrect
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
