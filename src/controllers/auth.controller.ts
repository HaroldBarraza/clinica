import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function register(req: Request, res: Response) {
  /*
#swagger.tags = ['Authenticacion']
#swagger.summary = 'Registrar un nuevo empleado'
#swagger.requestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'example@example.com' },
          password: { type: 'string', example: '123456' },
          role: { type: 'string', example: 'GERENCIA' },
          name_empleado: { type: 'string', example: 'Carlos' },
          appaterno: { type: 'string', example: 'Garcia' },
          appmaterno: { type: 'string', example: 'Perez' },
          telefono: { type: 'string', example: '987654321' },
          id_especialidad: { type: 'integer', example: 1 }
        },
        required: ['email', 'password', 'role', 'name_empleado']
      }
    }
  }
}
*/
  try {
    const {
      email,
      password,
      role,
      name_empleado,
      appaterno,
      appmaterno,
      telefono,
      id_especialidad,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);
    const emailunique = await prisma.users.findUnique({where: {email}})
    if(emailunique){
      return res.status(400).json({error: "el email ya existe"})
    }
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        role,
        name_empleado,
        appaterno,
        appmaterno,
        telefono,
        id_especialidad,
      },
      select: { id_empleado: true, email: true, role: true },
      
    });
    console.log(user);

    res.status(201).json(user);
  } catch(error:any) {
    res.status(500).json({ message: "Error al registrar el usuario" });
    console.log(error);
  }
}

export async function login(req: Request, res: Response) {
  /* 
#swagger.tags = ['Authenticacion']
#swagger.summary = 'para loguear un nuevo empleado'
#swagger.requestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'example1@example.com' },
          password: { type: 'string', example: '123456' },
        },
        required: ['email', 'password']
      }
    }
  }
}

*/
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id_empleado, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}
