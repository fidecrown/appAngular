import { Sujeto } from '../../catalogos/sujeto/interface/sujeto';
import { Domicilio } from './domicilio.interface';

export interface SinCliente {
  sujeto: Sujeto,
  domicilio: Domicilio
}
