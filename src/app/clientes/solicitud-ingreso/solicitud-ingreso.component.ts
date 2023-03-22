import { Component, OnInit } from '@angular/core';
import { DataBibliotecaService } from '../../services/data-biblioteca.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { switchMap, tap } from 'rxjs';

import { Cliente } from '../../interfaces/clientes/catalogos/cliente.interface';
import { Estado } from 'src/app/interfaces/clientes/catalogos/estado.interface';
import { Nacionalidad } from '../../interfaces/clientes/catalogos/nacionalidad.interface';
import { Ciudad } from '../../interfaces/clientes/catalogos/ciudad.interface';
import { EstadoCivil } from '../../interfaces/clientes/catalogos/estado-civil.interface';

import { ClienteService } from 'src/app/services/moduloClientes/catalogos/cliente.service';
import { EstadoService } from 'src/app/services/moduloClientes/catalogos/estado.service';
import { CiudadService } from 'src/app/services/moduloClientes/catalogos/ciudad.service';
import { NacionalidadService } from '../../services/moduloClientes/catalogos/nacionalidad.service';
import { EstadoCivilService } from 'src/app/services/moduloClientes/catalogos/estado-civil.service';
import { TipoVivienda } from 'src/app/interfaces/clientes/catalogos/tipo-vivienda.interface';
import { TipoViviendaService } from 'src/app/services/moduloClientes/catalogos/tipo-vivienda.service';
import { PerioricidadIngresoService } from 'src/app/services/moduloClientes/catalogos/perioricidad-ingreso.service';
import { PerioricidadIngresos } from 'src/app/interfaces/clientes/catalogos/perioricidad-ingresos.interface';

@Component({
  selector: 'app-solicitud-ingreso',
  templateUrl: './solicitud-ingreso.component.html',
  styleUrls: ['./solicitud-ingreso.component.css']
})
export class SolicitudIngresoComponent implements OnInit {

  constructor(
    private datbService: DataBibliotecaService,
    private fb: FormBuilder,
    private catClienteService: ClienteService,
    private catEstadoService: EstadoService,
    private catCiudadService: CiudadService,
    private catNacionalidadService: NacionalidadService,
    private catEdoCivilService: EstadoCivilService,
    private catTViviendaService: TipoViviendaService,
    private catPerioIngresosService: PerioricidadIngresoService,
    private datePipe: DatePipe
  ) { }

  //DECLARACION DE VARIABES LOCALES FORMULARIOS
  altaSolClienteForm!: FormGroup;
  solIngresoForm!: FormGroup;
  perfil_clienteForm!: FormGroup;
  datosLaboralesForm!: FormGroup;
  trabajaenForm!: FormGroup;
  relacionesForm!: FormGroup;
  sinClienteForm!: FormGroup;
  relacionForm!: FormGroup;

  selectedEstado: number = 0;

  lstCatClientes: Cliente[] = [];
  lstCatEstados: Estado[] = [];
  lstCiudadesxPais: Ciudad[] = [];
  lstCatNacionalidades: Nacionalidad[] = [];
  lstCatPaises: Nacionalidad[] = [];
  lstCatEdoCivil: EstadoCivil[] = [];
  lstVivienda: TipoVivienda[] = [];
  lstPerioricidadIngresos: PerioricidadIngresos[] = [];

  ngOnInit(): void {
    this.loadFormmAll();

    this.loadSelectedCatalogos();

    this.chageOnSelecteds();
  }

  loadFormmAll(): void {
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
      estadoid: [0],
      fechaingreso: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
      paisNac: [0]
    });
  }

  loadSolIngresoForm(): void {
    this.solIngresoForm = this.fb.group({
      fechasolicitud: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
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
      nacionalidadid: [0],
      catalogoclienteid: [0]
    });

    this.altaSolClienteForm.addControl('solicitud_ingreso', this.solIngresoForm);
  }

  loadPcForm() {
    this.perfil_clienteForm = this.fb.group({
      nivelestudios: [''],
      regimen: [''],
      estadocivil: [0],
      telefonocelular: [''],
      tipovivienda: [0],
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
      ciudadid: [0],
      ocupacionid: 1
    });

    this.altaSolClienteForm.addControl('perfil_cliente', this.perfil_clienteForm);
  }

  loadRelacionForm() {
    this.relacionForm = this.fb.group({
      parentesco: [''],
      porcentaje: [],
      estadocivilid: [0],
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

  loadSelectedCatalogos(): void {

    this.catClienteService.getCatalogoClientes().subscribe((datos: Cliente[]) => {
      this.lstCatClientes = datos;
    });

    this.catEstadoService.getCatalogoEstados().subscribe((datos: Estado[]) => {
      this.lstCatEstados = datos;
    });

    this.catNacionalidadService.getCatalogoNacionalidades().subscribe((datos: Nacionalidad[]) => {
      this.lstCatNacionalidades = datos;
      this.lstCatPaises = datos;
    });

    this.lstCatEdoCivil = this.catEdoCivilService.CatEdoCivil;
    this.lstVivienda = this.catTViviendaService.CatTipoVivienda;
    this.lstPerioricidadIngresos = this.catPerioIngresosService.CatPeriodoIngresos;


  }

  chageOnSelecteds(): void {

    this.perfil_clienteForm.get('ciudadid')?.disable();
    this.altaSolClienteForm.get('paisNac')?.disable();

    this.altaSolClienteForm.get('estadoid')?.valueChanges
      .pipe(
        tap((estadoid: number) => {

          if (estadoid != 0) {
            this.perfil_clienteForm.get('ciudadid')?.enable();
          } else {
            this.perfil_clienteForm.get('ciudadid')?.disable();
          }

          this.perfil_clienteForm.get('ciudadid')?.reset(0);
        }),
        switchMap(estadoid => this.catCiudadService.getCatCiudadesxEstadoId(estadoid))
      )
      .subscribe(ciudades => {
        this.lstCiudadesxPais = ciudades
      });

      this.solIngresoForm.get('nacionalidadid')?.valueChanges
      .subscribe((nacionalidadid:number) => {
        this.altaSolClienteForm.get('paisNac')?.setValue(nacionalidadid);
      })
  }

}
