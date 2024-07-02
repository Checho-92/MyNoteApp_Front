import { NoteRepository } from "../../domain/models/NoteServices";
import { Note } from "../../domain/models/Note";
import mysql from "mysql2/promise";

export class MySQLNoteRepository implements NoteRepository {
  private readonly dbConnection: mysql.Pool;

  constructor() {
    this.dbConnection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tu_base_de_datos',
    });
  }

  async save(note: Note): Promise<void> {
    await this.dbConnection.query(
      "REPLACE INTO notes (id, title, content) VALUES (?, ?, ?)",
      [note.id, note.title, note.content]
    );
  }

  async getById(id: string): Promise<Note | null> {
    const [rows] = await this.dbConnection.query("SELECT * FROM notes WHERE id = ?", [id]);
    const result = rows[0] as any;
    return result ? { id: result.id, title: result.title, content: result.content } : null;
  }

  async getAll(): Promise<Note[]> {
    const [rows] = await this.dbConnection.query("SELECT * FROM notes");
    return rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      content: row.content,
    }));
  }

  async deleteById(id: string): Promise<void> {
    await this.dbConnection.query("DELETE FROM notes WHERE id = ?", [id]);
  }

  async update(note: Note): Promise<void> {
    await this.dbConnection.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?",
      [note.title, note.content, note.id]
    );
  }
}
