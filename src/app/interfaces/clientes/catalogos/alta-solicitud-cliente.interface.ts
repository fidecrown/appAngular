import { SolicitudIngreso } from '../solicitud-ingreso.interface';
import { PerfilCliente } from '../perfil-cliente.interface';
import { ClienteP } from '../clientep.interface';
import { Sujeto } from '../../../catalogos/sujeto/interface/sujeto';
import { Domicilio } from '../domicilio.interface';
import { DatosLaborales } from '../datos-laborales.interface';
import { Relaciones } from '../relaciones.interface';

export interface AltaSolicitudCliente {

  solicitud_ingreso: SolicitudIngreso,
  perfil_cliente: PerfilCliente,
  cliente: ClienteP,
  sujeto: Sujeto,
  domicilio: Domicilio,
  datosLaborales: DatosLaborales,
  relaciones: Relaciones

}
