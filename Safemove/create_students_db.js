const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve('./students.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.all("PRAGMA table_info(students);", (err, columns) => {
    if (err) {
      console.error('Error fetching table info:', err);
      db.close();
      return;
    }
    const hasStatus = columns.some(col => col.name === 'status');
    if (!hasStatus) {
      db.run("ALTER TABLE students ADD COLUMN status TEXT NOT NULL DEFAULT 'inside hostel';", (err) => {
        if (err) {
          console.error('Error adding status column:', err);
        } else {
          console.log('Added status column to students table.');
        }
        db.close();
      });
    } else {
      console.log('Status column already exists.');
      db.close();
    }
  });
});
