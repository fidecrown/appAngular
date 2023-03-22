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
import { TipoVivienda } from 'src/app/interfaces/clientes/catalogos/tipo-vivienda.interface';
import { PerioricidadIngresos } from 'src/app/interfaces/clientes/catalogos/perioricidad-ingresos.interface';
import { Finalidad } from 'src/app/interfaces/clientes/catalogos/finalidad.interface';

import { ClienteService } from 'src/app/services/moduloClientes/catalogos/cliente.service';
import { EstadoService } from 'src/app/services/moduloClientes/catalogos/estado.service';
import { CiudadService } from 'src/app/services/moduloClientes/catalogos/ciudad.service';
import { NacionalidadService } from '../../services/moduloClientes/catalogos/nacionalidad.service';
import { EstadoCivilService } from 'src/app/services/moduloClientes/catalogos/estado-civil.service';
import { TipoViviendaService } from 'src/app/services/moduloClientes/catalogos/tipo-vivienda.service';
import { PerioricidadIngresoService } from 'src/app/services/moduloClientes/catalogos/perioricidad-ingreso.service';
import { FinalidadService } from 'src/app/services/moduloClientes/catalogos/finalidad.service';
import { MedioEnteroService } from '../../services/moduloClientes/catalogos/medio-entero.service';
import { MedioEntero } from 'src/app/interfaces/clientes/catalogos/medio-entero.interface';
import { RegimenService } from '../../services/moduloClientes/catalogos/regimen.service';
import { Regimen } from 'src/app/interfaces/clientes/catalogos/regimen.interface';
import { NivelEstudiosService } from '../../services/moduloClientes/catalogos/nivel-estudios.service';
import { Estudios } from 'src/app/interfaces/clientes/catalogos/estudios.interface';
import { PeriodoMovimientos } from 'src/app/interfaces/clientes/catalogos/periodo-movimientos.interface';
import { PeriodoMovimientosService } from '../../services/moduloClientes/catalogos/periodo-movimientos.service';
import { ReferenciaService } from '../../services/moduloClientes/catalogos/referencia.service';
import { Referencia } from '../../interfaces/clientes/catalogos/referencia.interface';

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
    private catFinalidadService: FinalidadService,
    private catMedioService: MedioEnteroService,
    private catRegimenService: RegimenService,
    private catEstudiosService: NivelEstudiosService,
    private catMovimientosService: PeriodoMovimientosService,
    private catReferenciaService: ReferenciaService,
    private datePipe: DatePipe
  ) { }

  //#DECLARACION DE VARIABES LOCALES PARA CARGAR LOS FORMULARIOS
  altaSolClienteForm!: FormGroup;
  solIngresoForm!: FormGroup;
  perfil_clienteForm!: FormGroup;
  datosLaboralesForm!: FormGroup;
  trabajaenForm!: FormGroup;
  relacionesForm!: FormGroup;
  sinClienteForm!: FormGroup;
  relacionForm!: FormGroup;

  //#VARIABLES PARA LLENAR LOS SELECTORES DEL HTML
  lstCatClientes: Cliente[] = [];
  lstCatEstados: Estado[] = [];
  lstCiudadesxPais: Ciudad[] = [];
  lstCatNacionalidades: Nacionalidad[] = [];
  lstCatPaises: Nacionalidad[] = [];
  lstCatEdoCivil: EstadoCivil[] = [];
  lstCatVivienda: TipoVivienda[] = [];
  lstCatPerioricidadIngresos: PerioricidadIngresos[] = [];
  lstCatFinalidad: Finalidad[] = [];
  lstCatMedio: MedioEntero[] = [];
  lstCatRegimen: Regimen[] = [];
  lstCatEstudios: Estudios[] = [];
  lstCatMovimientos: PeriodoMovimientos[] = [];
  lstReferencias: Referencia[] = [];

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
      correoelectronico: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      periorisidadmovimientos: [0],
      finalidad_cuenta: 1,
      medioentero: [0],
      comprobaciondeingresos: [0],
      montoaproximadoahorro: [],
      //tienecuentas: [''],
      dondetienecuentas: [''],
      lastserie: "US",
      montoaproximadoretiro: [],
      nacionalidadid: [0],
      catalogoclienteid: ['',Validators.required]
    });

    this.altaSolClienteForm.addControl('solicitud_ingreso', this.solIngresoForm);
  }

  loadPcForm() {
    this.perfil_clienteForm = this.fb.group({
      nivelestudios: [0],
      regimen: [0],
      estadocivil: [0],
      telefonocelular: [''],
      tipovivienda: [0],
      tiempoarraigo: "2 ANOS",
      perioricidadingresos: [''],
      ingresos: [],
      otrosingresos: 500,
      gastos: [],
      medioentero: 1,
      finalidadcuenta: [0],
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
      esconyuge: [0],
      ciudadid: [0],
      nacionalidadid: [0],
      regimen: [0],
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
    this.lstCatVivienda = this.catTViviendaService.CatTipoVivienda;
    this.lstCatPerioricidadIngresos = this.catPerioIngresosService.CatPeriodoIngresos;
    this.lstCatFinalidad = this.catFinalidadService.CatFinalidad;
    this.lstCatMedio = this.catMedioService.CatMedioEntero;
    this.lstCatRegimen = this.catRegimenService.CatRegimen;
    this.lstCatEstudios = this.catEstudiosService.CatEstudios;
    this.lstCatMovimientos = this.catMovimientosService.CatPeriodoMovimientos;
    this.lstReferencias = this.catReferenciaService.CatReferencia;

  }

  chageOnSelecteds(): void {

    this.perfil_clienteForm.get('ciudadid')?.disable();
    this.altaSolClienteForm.get('paisNac')?.disable();

    //#CUANDO CAMBIA LA SELECCION DEL ESTADO
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
      .subscribe((nacionalidadid: number) => {
        this.altaSolClienteForm.get('paisNac')?.setValue(nacionalidadid);
      })
  }

  fieldNotValid(form : FormGroup ,field: string): boolean | undefined {
    return form.get(field)?.invalid &&
      form.get(field)?.touched
  }

  getCtrl(form : FormGroup) { 
    return form.controls; 
  }

}

/*

[class.is-invalid]="fieldNotValid(solIngresoForm,'catalogoclienteid')"

<div *ngIf="fieldNotValid(solIngresoForm, 'catalogoclienteid')">
                            <small *ngIf="getCtrl(solIngresoForm)['catalogoclienteid'].errors?.['required']" class="text-danger"
                              >Campo requerido</small
                            >
                          </div>

*/