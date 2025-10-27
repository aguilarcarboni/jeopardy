import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const rows = db.prepare("SELECT * FROM teams").all();
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
  const id = crypto.randomUUID();
  db.prepare("INSERT INTO teams (id, name, score) VALUES (?,?,0)").run(id, name);
  return NextResponse.json({ id, name, score: 0 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  if (body.reset) {
    db.prepare("UPDATE teams SET score = 0").run();
    const teams = db.prepare("SELECT * FROM teams").all();
    return NextResponse.json(teams);
  }

  const { id, delta } = body;
  if (!id || typeof delta !== "number")
    return NextResponse.json({ error: "id and delta required" }, { status: 400 });
  db.prepare("UPDATE teams SET score = score + ? WHERE id = ?").run(delta, id);
  const team = db.prepare("SELECT * FROM teams WHERE id = ?").get(id);
  return NextResponse.json(team);
}

export async function DELETE() {
  db.prepare("DELETE FROM teams").run();
  return NextResponse.json({ success: true });
}
