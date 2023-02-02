import { Component, OnInit } from '@angular/core';
import { DataBibliotecaService } from '../../services/data-biblioteca.service';

@Component({
  selector: 'app-solicitud-ingreso',
  templateUrl: './solicitud-ingreso.component.html',
  styleUrls: ['./solicitud-ingreso.component.css']
})
export class SolicitudIngresoComponent implements OnInit {

  constructor(private datbService: DataBibliotecaService) { }

  ngOnInit(): void {
    this.emitDescriptionModule();
  }

  emitDescriptionModule(): void {
    this.datbService.descripModulo$.emit('Solicitud de Ingreso');
  }

}
