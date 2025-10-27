import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "scores.db");
const dbExists = fs.existsSync(dbPath);
const db = new Database(dbPath);

if (!dbExists) {
  db.prepare(
    `CREATE TABLE teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      score INTEGER NOT NULL DEFAULT 0
    );`
  ).run();
}

export default db;
