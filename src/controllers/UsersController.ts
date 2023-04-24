import { Request, Response, NextFunction } from "express";
import mysql from "mysql2";
import * as dotenv from 'dotenv'

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: process.env.HOST, // nome do container Docker do MySQL
    user: dotenv.config().parsed?.USER,
    password: dotenv.config().parsed?.PASSWORD,
    database: dotenv.config().parsed?.DATABASE,
    port: 30306, // porta do MySQL no container
});


export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const query = 'SELECT * FROM Usuario';
  connection.query(query, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM Usuario WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }
    res.json(results[0]);
  });
}

export const createUser = (req: Request, res: Response, next: NextFunction) => { 
  const { Nome, Email, Usuario, Senha } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!Nome || !Email || !Usuario || !Senha) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'INSERT INTO Usuario (Nome, Email, Usuario, Senha) VALUES (?, ?, ?, ?)';
  const values = [Nome, Email, Usuario, Senha];
  connection.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result, ...req.body });
  });
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const { Nome, Email, Usuario, Senha } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!Nome || !Email || !Usuario || !Senha) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'UPDATE Usuario SET Nome = ?, Email = ?, Usuario = ?, Senha = ? WHERE id = ?';
  const values = [Nome, Email, Usuario, Senha, id];
  connection.query(query, values, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  const query = 'DELETE FROM Usuario WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
}

