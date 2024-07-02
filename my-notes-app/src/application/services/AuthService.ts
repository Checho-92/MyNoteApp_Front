import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../../adapters/repositories/UserRepository';

class AuthService {
  async login(nombre: string, password: string): Promise<any> {
    const user = await UserRepository.getUserByName(nombre);
    if (!user || !user.password) {  // Verificamos si el usuario existe y si tiene contraseña
      throw new Error('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales incorrectas');
    }

    const token = jwt.sign({ userId: user.id_usuario }, 'your_secret_key', { expiresIn: '1h' });
    return { token, user: { id: user.id_usuario, nombre: user.nombre } };
  }

  async register({ firstName, lastName, password }: { firstName: string, lastName: string, password: string }): Promise<any> {
    const existingUser = await UserRepository.getUserByName(firstName);
    if (existingUser) {
      throw new Error('Usuario ya registrado');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.addUser({ nombre: firstName, apellido: lastName, password: hashedPassword });
    return { user, message: 'Usuario registrado correctamente' };
  }
}

export default new AuthService();
