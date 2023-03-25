import { TrabajaEn } from './trabajaen.interface';
import { EmpresaTrabaja } from './empresa-trabaja.interface';
import { Domicilio } from './domicilio.interface';

export interface DatosLaborales {
  trabajaen: TrabajaEn,
  empresa_trabaja: EmpresaTrabaja,
  domicilio: Domicilio
}
