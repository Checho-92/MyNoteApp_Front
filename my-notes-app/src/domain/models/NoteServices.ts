import { Note } from "../models/Note";

export interface NoteRepository {
  save(note: Note): Promise<void>;
  getById(id: string): Promise<Note | null>;
  getAll(): Promise<Note[]>;
  deleteById(id: string): Promise<void>;
  update(note: Note): Promise<void>; // Nueva función
}

export class NoteService {
  constructor(private readonly repository: NoteRepository) {}

  async createOrUpdateNote(note: Note): Promise<void> {
    await this.repository.save(note);
  }

  async getNoteById(id: string): Promise<Note | null> {
    return await this.repository.getById(id);
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.repository.getAll();
  }

  async deleteNoteById(id: string): Promise<void> {
    await this.repository.deleteById(id);
  }

  async updateNote(note: Note): Promise<void> {
    await this.repository.update(note);
  }
}
