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


export const getCart = (req: Request, res: Response, next: NextFunction) => {
  const query = 'SELECT * FROM Carrinho';
  connection.query(query, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
}

export const getCartById = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM Carrinho WHERE id = ?';
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

export const createCart = (req: Request, res: Response, next: NextFunction) => { 
  const { Valor_Total, Usuario_id, Status } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!Valor_Total || !Usuario_id || !Status ) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'INSERT INTO Carrinho (Valor_Total, Usuario_id, Status) VALUES (?, ?, ?)';
  const values = [Valor_Total, Usuario_id, Status];
  connection.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result, ...req.body });
  });
}

export const updateCart = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const { Valor_Total, Usuario_id, Status } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!Valor_Total || !Usuario_id || !Status )  {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'UPDATE Carrinho SET Valor_Total = ?, Usuario_id = ?, Status = ? WHERE id = ?';
  const values = [Valor_Total, Usuario_id, Status, id];
  connection.query(query, values, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
}

export const deleteCart = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  const query = 'DELETE FROM Carrinho WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
}

