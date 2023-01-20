import { Environment } from '../interfaces/index';

export const environment: Environment = {
  PORT: process.env.PORT || '',
  HOST: process.env.HOST || '',
  URI_DB: process.env.URI_DB || '',
}