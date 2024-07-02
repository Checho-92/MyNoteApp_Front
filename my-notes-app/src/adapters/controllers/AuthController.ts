//Authcontroller.ts
import { Request, Response } from 'express';
import AuthService from '../../application/services/AuthService';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { nombre, password } = req.body;
      const user = await AuthService.login(nombre, password);
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ message: `Error al iniciar sesión: ${error.message}` });
      } else {
        res.status(401).json({ message: 'Error desconocido al iniciar sesión' });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, password, confirmPassword } = req.body;
      if (password !== confirmPassword) {
        res.status(400).json({ message: 'La contraseña y la confirmación de la contraseña no coinciden' });
        return;
      }
      const { user, message } = await AuthService.register({ firstName, lastName, password });
      res.status(201).json({ message, user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: `Error al registrar el usuario: ${error.message}` });
      } else {
        res.status(500).json({ message: 'Error desconocido al registrar el usuario' });
      }
    }
  }
}

export default new AuthController();
