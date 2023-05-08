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


export const getCartProduct = (req: Request, res: Response, next: NextFunction) => {
  const query = 'SELECT * FROM Carrinho_Produto';
  connection.query(query, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
}

export const getCartProductById = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const query = 'SELECT * FROM Carrinho_Produto WHERE id = ?';
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

export const createCartProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { Carrinho_id, Produto_id, Qntd, Dta_Integracao, ValorTotal, Valor_Unitario } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!Carrinho_id || !Produto_id || !Qntd || !Dta_Integracao || !ValorTotal || !Valor_Unitario) {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'INSERT INTO Carrinho_Produto (Carrinho_id, Produto_id, Qntd, Dta_Integracao, ValorTotal, Valor_Unitario) VALUES (?, ?, ?)';
  const values = [Carrinho_id, Produto_id, Qntd, Dta_Integracao, ValorTotal, Valor_Unitario];
  connection.query(query, values, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result, ...req.body });
  });
}

export const updateCartProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;
  const { Carrinho_id, Produto_id, Qntd, Dta_Integracao, ValorTotal, Valor_Unitario } = req.body; // Supondo que os campos são enviados no corpo da requisição

  // Validação dos campos
  if (!Carrinho_id || !Produto_id || !Qntd || !Dta_Integracao || !ValorTotal || !Valor_Unitario)  {
    return res.status(400).json({ error: 'Campos obrigatórios não informados' });
  }

  const query = 'UPDATE Carrinho_Produto SET Carrinho_id = ?, Produto_id = ?, Qntd = ?, Dta_Integracao, ValorTotal = ?, Valor_Unitario = ?, id = ?';
  const values = [Carrinho_id, Produto_id, Qntd, Dta_Integracao, ValorTotal, Valor_Unitario];
  connection.query(query, values, (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro atualizado com sucesso' });
  });
}

export const deleteCartProduct = (req: Request, res: Response, next: NextFunction) => { 
  const { id } = req.params;

  const query = 'DELETE FROM Carrinho_Produto WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Registro excluído com sucesso' });
  });
}

