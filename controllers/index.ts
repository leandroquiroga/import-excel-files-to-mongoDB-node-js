import path from 'path';
import { Request, Response } from 'express';
import NodeCache from 'node-cache';

import zoneSchema from '../schemas/zone.schema';
import { environment } from '../configuration/environment';
import { invalidRequest, readFileXlsx, responseBadRequest, responseErrorServer } from '../utilities/index';
import { ResponseOk, RequestResponse } from '../interfaces/index';

const cache = new NodeCache({ stdTTL: environment.STDTLL });

export const getFileDB = async (req: Request, res: Response)
  : Promise<Response<ResponseOk[], Record<number, RequestResponse>> | undefined> => {
  try {
    // Chequea si los datos entan en cache
    if (cache.has('zone')) {
      const response = cache.get('zone')
      res.status(200).json(response);      
      return
    };
    const fileData: ResponseOk[] | null = await zoneSchema.find();
    if (!fileData) return res.status(400).json(responseBadRequest);

    // Seteamos cache con los datos de la base de datosgetFileByZoneDB
    cache.set('zone', fileData);
    res.status(200).json(fileData);      
  } catch (err: any) {
    res.status(500).json(responseErrorServer);
  }
};

export const getFileByIdDB = async (req: Request, res: Response)
  : Promise<Response<ResponseOk, Record<number, RequestResponse>>> => {
  try {
    const { code } = req.params;
    const zoneByCode: ResponseOk | null = await zoneSchema.findOne({ code });

    if (!zoneByCode) return res.status(400).json(responseBadRequest);
    return res.status(200).json(zoneByCode);
  } catch (err: any) {
    res.status(500).json(responseErrorServer);
    throw new Error(err);
  }
};

// Solo devuelve con dos patametros (Revisar)
export const getFileByZoneDB = async (req: Request, res: Response) => {
  try {
    const { zone, province } = req.params;
    
    if ([zone, province].includes('')) return res.status(400).json(invalidRequest);

    // Retorna el codigo y la central segun la coincidencia que hay con los valores pasados por parametros
    const zones: ResponseOk[] | ResponseOk | null = await zoneSchema.find(
                                                                { zone, province },
                                                                { code: 1, _id: 0, central: 1 }
                                                              ); 
    
    if (!zones) return res.status(400).json(responseBadRequest);
    return res.status(200).json(zones); 
  } catch (err: any) {
    res.status(500).json(responseErrorServer);
    throw new Error(err);
  }
};

export const postUpLoadFileDB = (req: Request, res: Response): void => {
  // Nos quedamos con la ruta en donde se encuentra el archivo
  const pathFile = path.join(__dirname, `${environment.PATH_FILE}`);
  try {
    const arrData: any[] = readFileXlsx(pathFile);
    arrData.forEach(async data => {
      const zone = new zoneSchema(data);
      await zone.save();
    })
    res.status(200).json(arrData);
  } catch (err: any) {
    res.status(500).json(responseErrorServer);
  };
}