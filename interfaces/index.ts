export interface HandleError {
  message: string;
  code: number;
}
export interface Environment {
  PORT: string;
  HOST: string;
  URI_DB: string;
  STDTLL: number
  PATH_FILE: string;
};

export interface Zone {
  code: number;
  central: string;
  zone: string;
  locality: string;
  province: string
}

export interface RequestResponse {
  code: number;
  status: boolean;
  message: string;
}

export interface ResponseOk {
  code: number,
  central: string,
  zone: string,
  locality: string,
  province: string,
  id: string,
}