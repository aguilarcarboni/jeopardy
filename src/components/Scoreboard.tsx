"use client";
import React, { useState } from "react";
import { useTeams } from "@/context/TeamsContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Plus, RotateCcw, Trash2 } from "lucide-react";
import { resetQuestions } from "@/data/game";

export default function Scoreboard() {
  const { teams, currentTeamId, addTeam, resetGame, restartGame } = useTeams();
  const [newName, setNewName] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    addTeam(newName.trim());
    setNewName("");
  };

  const handleReset = async () => {
    setIsResetting(true);
    resetQuestions();
    await resetGame();
    setIsResetting(false);
    window.location.reload();
  };

  const handleRestart = async () => {
    setIsRestarting(true);
    resetQuestions();
    await restartGame();
    setIsRestarting(false);
    window.location.reload();
  };

  // Sort teams by score for ranking
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <Card className="h-full shadow-xl flex flex-col">
      <CardHeader className="space-y-2 text-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="w-4 h-4" />
            Teams
          </CardTitle>
          {teams.length > 0 && (
            <Badge variant="secondary" className="text-xs bg-red-600 text-white hover:bg-red-700">
              {teams.length} {teams.length === 1 ? 'Team' : 'Teams'}
            </Badge>
          )}
        </div>
        
        {currentTeamId && teams.length > 0 && (
          <CardDescription className="flex items-center gap-2">
            <span className="text-xs text-foreground/90">Current Turn:</span>
            <Badge className="text-xs font-semibold bg-foreground/10 text-foreground hover:bg-foreground/20">
              {teams.find((t) => t.id === currentTeamId)?.name}
            </Badge>
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-3 flex-1 overflow-y-auto pb-3">
        {/* Teams List */}
        {teams.length > 0 ? (
          <div className="space-y-2">
            {sortedTeams.map((team, index) => {
              const isCurrentTurn = team.id === currentTeamId;
              const isLeading = index === 0 && teams.length > 1;
              
              return (
                <div
                  key={team.id}
                  className={`
                    p-2.5 rounded-lg border transition-all duration-200
                    ${isCurrentTurn 
                      ? 'bg-blue-500 border-blue-500 shadow-sm shadow-blue-200 text-white' 
                      : 'bg-muted/30 border-border'
                    }
                  `}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {isLeading && (
                        <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                      )}
                      <span className={`text-sm font-medium truncate ${isCurrentTurn ? 'text-white font-semibold' : ''}`}>
                        {team.name}
                      </span>
                    </div>
                    <Badge 
                      variant={team.score >= 0 ? "default" : "destructive"}
                      className={`font-mono text-xs ${
                        team.score >= 0 && isCurrentTurn
                          ? 'bg-white text-blue-700 hover:bg-white/90'
                          : team.score >= 0
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : ''
                      }`}
                    >
                      ${team.score}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground text-sm">
            <Trophy className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No teams yet.</p>
            <p className="text-xs mt-1">Add a team to get started!</p>
          </div>
        )}

        <Separator />

        {/* Add Team Form */}
        <form onSubmit={handleAddTeam} className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Team name"
              className="flex-1 h-9 text-sm"
            />
            <Button type="submit" size="icon" className="h-9 w-9" disabled={!newName.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>

      {teams.length > 0 && (
        <CardFooter className="pt-3 flex flex-col gap-2">
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="flex-1 p-2"
            disabled={isResetting || isRestarting}
          >
            <RotateCcw className={`w-3.5 h-3.5 mr-2 ${isResetting ? 'animate-spin' : ''}`} />
            {isResetting ? 'Resetting...' : 'Reset Game'}
          </Button>
          <Button
            onClick={handleRestart}
            variant="destructive"
            size="sm"
            className="flex-1 p-2"
            disabled={isResetting || isRestarting}
          >
            <Trash2 className={`w-3.5 h-3.5 mr-2 ${isRestarting ? 'animate-spin' : ''}`} />
            {isRestarting ? 'Restarting...' : 'Restart Game'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
