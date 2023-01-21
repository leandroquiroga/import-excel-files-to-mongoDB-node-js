import mongoose from "mongoose";
import { environment } from "../configuration/environment";

export const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(environment.URI_DB, {
      dbName: 'Localidades_Competitivas',
    });
    console.log('Database Conect', mongoose.connection.name)
  } catch (error) {
    throw new Error('Error! Plesea contact with administrator')
  }
};