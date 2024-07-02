import { pool } from '../../database';
import { User } from '../../domain/models/User';

class UserRepository {
  async addUser(user: Partial<User>): Promise<User> {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, password) VALUES (?, ?, ?)',
      [user.nombre, user.apellido, user.password]
    );
    return { id: result.insertId, ...user };
  }

  async getUserByName(nombre: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }
}

export default new UserRepository();
