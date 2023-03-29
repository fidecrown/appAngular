import { Component, OnInit } from '@angular/core';
import { DataBibliotecaService } from '../../services/data-biblioteca.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { switchMap, tap } from 'rxjs';


//#SECCION DE INTERFACES
import { Cliente } from '../../interfaces/clientes/catalogos/cliente.interface';
import { Estado } from 'src/app/interfaces/clientes/catalogos/estado.interface';
import { Nacionalidad } from '../../interfaces/clientes/catalogos/nacionalidad.interface';
import { Ciudad } from '../../interfaces/clientes/catalogos/ciudad.interface';
import { EstadoCivil } from '../../interfaces/clientes/catalogos/estado-civil.interface';
import { TipoVivienda } from 'src/app/interfaces/clientes/catalogos/tipo-vivienda.interface';
import { PerioricidadIngresos } from 'src/app/interfaces/clientes/catalogos/perioricidad-ingresos.interface';
import { Finalidad } from 'src/app/interfaces/clientes/catalogos/finalidad.interface';
import { MedioEntero } from 'src/app/interfaces/clientes/catalogos/medio-entero.interface';
import { Regimen } from 'src/app/interfaces/clientes/catalogos/regimen.interface';
import { Estudios } from 'src/app/interfaces/clientes/catalogos/estudios.interface';
import { Referencia } from '../../interfaces/clientes/catalogos/referencia.interface';
import { PeriodoMovimientos } from 'src/app/interfaces/clientes/catalogos/periodo-movimientos.interface';

//#SECCION INYECCION DE SERVICIOS
import { ClienteService } from 'src/app/services/moduloClientes/catalogos/cliente.service';
import { EstadoService } from 'src/app/services/moduloClientes/catalogos/estado.service';
import { CiudadService } from 'src/app/services/moduloClientes/catalogos/ciudad.service';
import { NacionalidadService } from '../../services/moduloClientes/catalogos/nacionalidad.service';
import { EstadoCivilService } from 'src/app/services/moduloClientes/catalogos/estado-civil.service';
import { TipoViviendaService } from 'src/app/services/moduloClientes/catalogos/tipo-vivienda.service';
import { FinalidadService } from 'src/app/services/moduloClientes/catalogos/finalidad.service';
import { MedioEnteroService } from '../../services/moduloClientes/catalogos/medio-entero.service';
import { RegimenService } from '../../services/moduloClientes/catalogos/regimen.service';
import { NivelEstudiosService } from '../../services/moduloClientes/catalogos/nivel-estudios.service';
import { ReferenciaService } from '../../services/moduloClientes/catalogos/referencia.service';
import { PeriodoMovimientosService } from '../../services/moduloClientes/catalogos/periodo-movimientos.service';
import { PerioricidadIngresoService } from 'src/app/services/moduloClientes/catalogos/perioricidad-ingreso.service';
import { AltaSolicitudClienteService } from '../../services/moduloClientes/alta-solicitud-cliente.service';
import Swal from 'sweetalert2';

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
    private altaSolClienteService: AltaSolicitudClienteService,
    private datePipe: DatePipe
  ) { }

  //#DECLARACION DE VARIABES LOCALES PARA CARGAR LOS FORMULARIOS
  altaSolClienteForm!:  FormGroup;
  solIngresoForm!:      FormGroup;
  perfil_clienteForm!:  FormGroup;
  datosLaboralesForm!:  FormGroup;
  trabajaenForm!:       FormGroup;
  relacionesForm!:      FormGroup;
  sinClienteForm!:      FormGroup;
  relacionForm!:        FormGroup;
  clienteForm!:         FormGroup;

  //#VARIABLES PARA LLENAR LOS SELECTORES DEL HTML
  lstCatClientes:               Cliente[] = [];
  lstCatEstados:                Estado[] = [];
  lstCiudadesxPais:             Ciudad[] = [];
  lstCatNacionalidades:         Nacionalidad[] = [];
  lstCatPaises:                 Nacionalidad[] = [];
  lstCatEdoCivil:               EstadoCivil[] = [];
  lstCatVivienda:               TipoVivienda[] = [];
  lstCatPerioricidadIngresos:   PerioricidadIngresos[] = [];
  lstCatFinalidad:              Finalidad[] = [];
  lstCatMedio:                  MedioEntero[] = [];
  lstCatRegimen:                Regimen[] = [];
  lstCatEstudios:               Estudios[] = [];
  lstCatMovimientos:            PeriodoMovimientos[] = [];
  lstReferencias:               Referencia[] = [];

  ngOnInit(): void {
    this.loadFormmAll();
    this.loadSelectedCatalogos();
    this.chageOnSelecteds();
  }

  private loadFormmAll(): void {
    this.emitDescriptionModule();
    this.loadAltaClienteForm();
    this.loadSolIngresoForm();
    this.loadPcForm();
    this.loadClienteForm();
    this.loadDatosLaboralesForm();
    this.loadRelacionesForm();
    this.loadRelacionForm();
  }

  private loadAltaClienteForm(): void {
    this.altaSolClienteForm = this.fb.group({
      estadoid: ['', Validators.required],
      paisNac: [0]
    });
  }

  private loadSolIngresoForm(): void {
    this.solIngresoForm = this.fb.group({
      fechasolicitud: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
      correoelectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      periorisidadmovimientos: ['', Validators.required],
      finalidad_cuenta: 1,
      medioentero: ['', Validators.required],
      comprobaciondeingresos: ['', Validators.required],
      montoaproximadoahorro: ['', [Validators.required, Validators.maxLength(10)]],
      //tienecuentas: [''],
      dondetienecuentas: [''],
      lastserie: "US",
      montoaproximadoretiro: ['', [Validators.required, Validators.maxLength(3)]],
      nacionalidadid: ['', Validators.required],
      catalogoclienteid: ['', Validators.required]
    });

    this.altaSolClienteForm.addControl('solicitud_ingreso', this.solIngresoForm);
  }

  private loadPcForm() {
    this.perfil_clienteForm = this.fb.group({
      nivelestudios: ['', Validators.required],
      regimen: ['', Validators.required],
      estadocivil: ['', Validators.required],
      telefonocelular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.onlyNumbersValidator]],
      tipovivienda: ['', Validators.required],
      tiempoarraigo: "2 ANOS",
      perioricidadingresos: ['', Validators.required],
      ingresos: ['', [Validators.required, Validators.maxLength(10)]],
      otrosingresos: 500,
      gastos: ['', [Validators.required, Validators.maxLength(10)]],
      medioentero: 1,
      finalidadcuenta: ['', Validators.required],
      nodependienteseconomicos: ['', [Validators.required, Validators.maxLength(2)]],
      ingresosconyuge: 4000,
      otrosgastos: 2540,
      otrosabonos: 0,
      nomovimientos: ['', [Validators.required, Validators.maxLength(3)]],
      nomovimientosreales: 0,
      ingresosreales: 0,
      egresosreales: 0,
      estado: false,
      actividadeconomicapreponderante: "NINGUNA",
      ciudadid: ['', Validators.required],
      ocupacionid: 1
    });

    this.altaSolClienteForm.addControl('perfil_cliente', this.perfil_clienteForm);
  }

  private loadClienteForm(): void {
    this.clienteForm = this.fb.group({
      fechaingreso: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')],
      estatus: 1
    });
    this.altaSolClienteForm.addControl('cliente', this.clienteForm);
  }

  private loadRelacionForm() {
    this.relacionForm = this.fb.group({
      parentesco: ['', Validators.required],
      porcentaje: ['', [Validators.required, Validators.maxLength(3)]],
      estadocivilid: ['', Validators.required],
      sexo: ['', Validators.required],
      correoelectronico: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')]],
      telefonocelular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.onlyNumbersValidator]],
      esconyuge: ['', Validators.required],
      ciudadid: ['', Validators.required],
      nacionalidadid: ['', Validators.required],
      regimen: ['', Validators.required],
      ocupacionid: 1,
      estadoid: ['', Validators.required],
      paisNac: [0]
    });

    this.relacionesForm.addControl('relacion', this.relacionForm);
  }

  private loadDatosLaboralesForm(): void {
    this.datosLaboralesForm = this.fb.group({});

    this.loadTrabajaEnForm();

    this.altaSolClienteForm.addControl('datosLaborales', this.datosLaboralesForm);

  }

  private loadTrabajaEnForm(): void {
    this.trabajaenForm = this.fb.group({
      fechainicio: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]]
    });

    this.datosLaboralesForm.addControl('trabajaen', this.trabajaenForm);

  }

  private loadRelacionesForm(): void {
    this.relacionesForm = this.fb.group({
    });

    this.loadSinClienteForm();

    this.altaSolClienteForm.addControl('relaciones', this.relacionesForm);

  }

  private loadSinClienteForm(): void {
    this.sinClienteForm = this.fb.group({

    });

    this.relacionesForm.addControl('sin_cliente', this.sinClienteForm);

  }

  saveSolicitud(): void {
    const data = this.altaSolClienteForm.value;
    this.altaSolClienteService.createAltaSolCliente(data)
      .subscribe(msj => {
        this.getMessageAlert('success', msj.mensaje);
        this.altaSolClienteForm.reset();
      });
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

          this.perfil_clienteForm.get('ciudadid')?.reset('');
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

  fieldNotValid(form: FormGroup, field: string): boolean | undefined {
    return form.get(field)?.invalid &&
      form.get(field)?.touched
  }

  getCtrl(form: FormGroup) {
    return form.controls;
  }

  onlyNumbersValidator(control: FormControl): { [key: string]: any } | null {
    const valid = /^\d+$/.test(control.value);
    return valid ? null : { onlyNumbers: true };
  }

  private getMessageAlert(alerta: any, title: string): void {
    Swal.fire({
      position: 'center',
      icon: alerta,
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

}
