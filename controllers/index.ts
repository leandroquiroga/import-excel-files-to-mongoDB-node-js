import { Request, Response } from 'express';
import zoneSchema from '../schemas/zone.schema';
import { readFileXlsx, responeBadRequest } from '../utilities/index';
import path from 'path';
import { Zone } from '../interfaces/index';



export const getFileDB = (req: Request, res: Response) => {
  try {
    const fileData = zoneSchema.find();
    if (!fileData)
      return res.status(400).json(responeBadRequest);

    res.status(200).json({
      fileData
    });
  } catch (err: any) {
    throw new Error(err)
  }
};

export const postUpLoadFileDB = async (req: Request, res: Response) => {
  const pathFile = path.join(__dirname, '../uploads/Localidades Competitivas.xlsx');

  try {
    const arrData: any[] = readFileXlsx(pathFile)
    res.status(200).json(arrData)
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  };
}