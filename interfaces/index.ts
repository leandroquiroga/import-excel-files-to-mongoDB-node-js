export interface HandleError {
  message: string;
  code: number;
}
export interface Environment {
  PORT: string;
  HOST: string;
  URI_DB: string;
};

export interface Zone {
  code: number;
  central: string;
  zone: string;
  locality: string;
  province: string
}

export interface BadRequestResponse {
  code: number;
  status: boolean;
  message: string;
}