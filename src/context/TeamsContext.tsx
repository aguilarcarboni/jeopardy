"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

export interface Team {
  id: string;
  name: string;
  score: number;
}

interface TeamsState {
  teams: Team[];
  currentTeamId: string | null;
  nextTurn: () => void;
  addTeam: (name: string) => void;
  updateScore: (id: string, delta: number) => void;
  resetGame: () => void;
  restartGame: () => void;
}

const TeamsContext = createContext<TeamsState | undefined>(undefined);

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function TeamsProvider({ children }: { children: React.ReactNode }) {
  const { data: teams = [], mutate } = useSWR<Team[]>("/api/teams", fetcher);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);

  const addTeam = async (name: string) => {
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const team = await res.json();
    mutate([...teams, team]);
    if (!currentTeamId) setCurrentTeamId(team.id);
  };

  const updateScore = async (id: string, delta: number) => {
    const res = await fetch("/api/teams", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, delta }),
    });
    const updated = await res.json();
    mutate(teams.map((t) => (t.id === id ? updated : t)));
  };

  const nextTurn = () => {
    if (teams.length === 0) return;
    const idx = teams.findIndex((t) => t.id === currentTeamId);
    const next = teams[(idx + 1) % teams.length];
    setCurrentTeamId(next.id);
  };

  const resetGame = async () => {
    await fetch("/api/teams", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reset: true }),
    });
    mutate(
      teams.map((t) => ({ ...t, score: 0 })),
      { revalidate: false }
    );
    setCurrentTeamId(teams[0]?.id ?? null);
  };

  const restartGame = async () => {
    await fetch("/api/teams", {
      method: "DELETE",
    });
    mutate([], { revalidate: false });
    setCurrentTeamId(null);
  };

  useEffect(() => {
    if (!currentTeamId && teams.length) setCurrentTeamId(teams[0].id);
  }, [teams, currentTeamId]);

  return (
    <TeamsContext.Provider value={{ teams, currentTeamId, nextTurn, addTeam, updateScore, resetGame, restartGame }}>
      {children}
    </TeamsContext.Provider>
  );
}

export function useTeams() {
  const ctx = useContext(TeamsContext);
  if (!ctx) throw new Error("useTeams must be used within TeamsProvider");
  return ctx;
}
