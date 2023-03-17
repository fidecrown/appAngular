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
  datosLaboralesForm!: FormGroup;
  trabajaenForm!: FormGroup;
  relacionesForm!: FormGroup;
  sinClienteForm!: FormGroup;
  relacionForm!: FormGroup;

  ngOnInit(): void {
    this.emitDescriptionModule();
    this.loadAltaClienteForm();
    this.loadSolIngresoForm();
    this.loadPcForm();
    this.loadDatosLaboralesForm();
    this.loadRelacionesForm();
    this.loadRelacionForm();
  }

  loadAltaClienteForm(): void {
    this.altaSolClienteForm = this.fb.group({
      //telefono: []
    });
  }

  loadSolIngresoForm(): void {
    this.solIngresoForm = this.fb.group({
      fechasolicitud: "2023/02/18",
      correoelectronico: [''],
      periorisidadmovimientos: [''],
      finalidad_cuenta: 1,
      medioentero: [''],
      comprobaciondeingresos: [''],
      montoaproximadoahorro: [],
      //tienecuentas: [''],
      dondetienecuentas: [''],
      lastserie: "US",
      montoaproximadoretiro: [],
      nacionalidadid: [''],
      catalogoclienteid: ['']
    });

    this.altaSolClienteForm.addControl('solicitud_ingreso', this.solIngresoForm);
  }

  loadPcForm() {
    this.perfil_clienteForm = this.fb.group({
      nivelestudios: [''],
      regimen: [''],
      estadocivil: [''],
      telefonocelular: [''],
      tipovivienda: [''],
      tiempoarraigo: "2 ANOS",
      perioricidadingresos: [''],
      ingresos: [],
      otrosingresos: 500,
      gastos: [],
      medioentero: 1,
      finalidadcuenta: [''],
      nodependienteseconomicos: [],
      ingresosconyuge: 4000,
      otrosgastos: 2540,
      otrosabonos: 0,
      nomovimientos: [],
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

  loadRelacionForm() {
    this.relacionForm = this.fb.group({
      parentesco: [''],
      porcentaje: [],
      estadocivilid: [''],
      sexo: [''],
      correoelectronico: [''],
      telefonocelular: [''],
      esconyuge: [''],
      ciudadid: [''],
      nacionalidadid: [''],
      regimen: [''],
      ocupacionid: 1
    });

    this.relacionesForm.addControl('relacion', this.relacionForm);
  }

  loadDatosLaboralesForm(): void {
    this.datosLaboralesForm = this.fb.group({});

    this.loadTrabajaEnForm();

    this.altaSolClienteForm.addControl('datosLaborales', this.datosLaboralesForm);

  }

  loadTrabajaEnForm(): void {
    this.trabajaenForm = this.fb.group({
      fechainicio: []
    });

    this.datosLaboralesForm.addControl('trabajaen', this.trabajaenForm);

  }

  loadRelacionesForm(): void {
    this.relacionesForm = this.fb.group({
    });

    this.loadSinClienteForm();

    this.altaSolClienteForm.addControl('relaciones', this.relacionesForm);

  }

  loadSinClienteForm(): void {
    this.sinClienteForm = this.fb.group({

    });

    this.relacionesForm.addControl('sin_cliente', this.sinClienteForm);

  }

  onSubmit(): void {
    console.log(this.altaSolClienteForm.value);
  }

  emitDescriptionModule(): void {
    this.datbService.descripModulo$.emit('Solicitud de Ingreso');
  }

}
