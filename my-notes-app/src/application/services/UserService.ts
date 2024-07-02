import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../domain/models/User';
import UserRepository from '../../adapters/repositories/UserRepository';

class UserService {
  async register(firstName: string, lastName: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.addUser({ nombre: firstName, apellido: lastName, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
    return { ...user, token };
  }
}

export default new UserService();
