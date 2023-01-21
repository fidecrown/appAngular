export interface Sujeto {
  sujetoid: number;
  nombre: string;
  paterno: string;
  materno: string;
  rfc: string;
  curp: string;
  fechaNacimiento: string;
  sexo: number;
  created_at?: string;
  update_at?: string;
}

export interface Prueba {
  userId: number,
  id: number,
  title: string,
  body: string
}
