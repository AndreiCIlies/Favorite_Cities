import Database from 'better-sqlite3';

const db = new Database('./favorites.db', {
    verbose: console.log
});

db.prepare(
    `CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_name TEXT NOT NULL,
    country TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL
    );
`).run();

export default db;