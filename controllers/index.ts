import { Request, Response } from 'express';


export const getController = (req: Request, res: Response) => {
  res.send('Hola Mundo')
};