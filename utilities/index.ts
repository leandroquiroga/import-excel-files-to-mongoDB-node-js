import { RequestResponse } from '../interfaces/index';
import XLSX, { SheetJSONOpts, WorkBook } from 'xlsx';

export const readFileXlsx = (path: string): any[] => {
  // Arreglo con las cadenas que contiene el nombre de las hojas
  const workbook: WorkBook = XLSX.readFile(path);
  const workbookSheets: string[] = workbook.SheetNames;

  // Numero de hoja seleccionada
  const sheet: string = workbookSheets[0];

  // Convierte de xlsx a JSON
  const convetSheetToJSON: SheetJSONOpts[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  return JSON.parse(JSON.stringify(convetSheetToJSON));
  
};
export const responseBadRequest: RequestResponse = {
  code: 400,
  status: false,
  message: 'No existen datos'
};

export const invalidRequest: RequestResponse = {
  code: 400,
  status: false,
  message: 'Todos los campos son obligatorios'
}

export const responseErrorServer: RequestResponse = {
  code: 500,
  status: false,
  message: 'Error en el servidor'
}