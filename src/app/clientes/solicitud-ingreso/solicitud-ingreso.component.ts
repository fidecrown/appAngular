import { Component, OnInit } from '@angular/core';
import { DataBibliotecaService } from '../../services/data-biblioteca.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitud-ingreso',
  templateUrl: './solicitud-ingreso.component.html',
  styleUrls: ['./solicitud-ingreso.component.css']
})
export class SolicitudIngresoComponent implements OnInit {

  constructor(
    private datbService: DataBibliotecaService,
    private fb: FormBuilder) { }

  //DECLARACION DE VARIABES LOCALES
  altaSolClienteForm!: FormGroup;
  solIngresoForm!: FormGroup;
  perfil_clienteForm!: FormGroup;

  ngOnInit(): void {
    this.emitDescriptionModule();
    this.loadAltaClienteForm();
    this.loadSolIngresoForm();
    this.loadPcForm();
  }

  loadAltaClienteForm(): void {
    this.altaSolClienteForm = this.fb.group({
      //telefono: []
    });
  }

  loadSolIngresoForm():void{
    this.solIngresoForm = this.fb.group({
      fechasolicitud: "2023/02/18",
      correoelectronico: [''],
      periorisidadmovimientos: "SIEMPRE",
      finalidad_cuenta: 1,
      medioentero: 1,
      comprobaciondeingresos: 1,
      montoaproximadoahorro: 1000,
      tienecuentas: 1,
      dondetienecuentas: "CAJA POPULAR MEXICANA",
      lastserie: "US",
      montoaproximadoretiro: 580,
      nacionalidadid: [''],
      catalogoclienteid: ['']
    });

    this.altaSolClienteForm.addControl('solicitud_ingreso', this.solIngresoForm);
  }

  loadPcForm() {
    this.perfil_clienteForm = this.fb.group({
      nivelestudios: 1,
      regimen: 1,
      estadocivil: 1,
      telefonocelular: [''],
      tipovivienda: 1,
      tiempoarraigo: "2 ANOS",
      perioricidadingresos: 2,
      ingresos: 10250,
      otrosingresos: 500,
      gastos: 3860,
      medioentero: 1,
      finalidadcuenta: 1,
      nodependienteseconomicos: 2,
      ingresosconyuge: 4000,
      otrosgastos: 2540,
      otrosabonos: 0,
      nomovimientos: 4,
      nomovimientosreales: 0,
      ingresosreales: 0,
      egresosreales: 0,
      estado: false,
      actividadeconomicapreponderante: "NINGUNA",
      ciudadid: [''],
      ocupacionid: 1
    });

    this.altaSolClienteForm.addControl('perfil_cliente', this.perfil_clienteForm);
  }

  onSubmit(): void {
    console.log(this.altaSolClienteForm.value);
  }

  emitDescriptionModule(): void {
    this.datbService.descripModulo$.emit('Solicitud de Ingreso');
  }

}
