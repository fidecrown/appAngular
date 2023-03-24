import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

//#SECCION DE INTERFACES
import { Estado } from 'src/app/interfaces/clientes/catalogos/estado.interface';
import { Ciudad } from '../../../interfaces/clientes/catalogos/ciudad.interface';
import { Colonia } from 'src/app/interfaces/clientes/catalogos/colonia.interface';
import { TiempoArraigo } from 'src/app/interfaces/clientes/catalogos/tiempo-arraigo.interface';

//#SECCION INYECCION DE SERVICIOS
import { EstadoService } from '../../../services/moduloClientes/catalogos/estado.service';
import { CiudadService } from '../../../services/moduloClientes/catalogos/ciudad.service';
import { ColoniaService } from 'src/app/services/moduloClientes/catalogos/colonia.service';
import { TiempoArraigoService } from '../../../services/moduloClientes/catalogos/tiempo-arraigo.service';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private catEstadoService: EstadoService,
    private catCiudadService: CiudadService,
    private catColoniaService: ColoniaService,
    private catTArraigoService: TiempoArraigoService
    ) { }

  //DECLARACION DE VARIABLES LOCALES
  @Input() altaSolClienteForm!: FormGroup;
  domicilioForm!: FormGroup;
  temporalForm!:  FormGroup;

  //#DECLARACION DE VARIABLES PARA LOS CAMPOS SELECT
  lstCatEstados:      Estado[] = [];
  lstCiudadesxPais:   Ciudad[] = [];
  lstColoniasxCiudad: Colonia[] = [];
  lstTiempoArraigo:   TiempoArraigo[] = [];

  ngOnInit(): void {
    this.loadTemporalForm();
    this.loadDomicilioForm();
    this.loadSelectedEstados();
    this.chageOnSelecteds();
  }

  private loadTemporalForm(): void{
    this.temporalForm = this.fb.group({
      estadoid : ['', Validators.required],
      ciudadid : [0, Validators.required]
    });
  }

  private loadDomicilioForm(): void {
    this.domicilioForm = this.fb.group({
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      interior: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), this.onlyNumbersValidator]],
      entre_calle_1: ['', [Validators.required]],
      entre_calle_2: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      coloniaid: [parseInt('0', 10), Validators.required],
      tiempoarraigo: ['', Validators.required],
      nacionalidadid: ['', [Validators.required]]
    });

    this.altaSolClienteForm.addControl('domicilio', this.domicilioForm);
  }

  private loadSelectedEstados(): void {

    this.catEstadoService.getCatalogoEstados().subscribe((datos: Estado[]) => {
      this.lstCatEstados = datos;
    });

    this.lstTiempoArraigo = this.catTArraigoService.CatTiempoArraigo;

  }

  private chageOnSelecteds(): void {

    this.temporalForm.get('ciudadid')?.disable();
    this.domicilioForm.get('coloniaid')?.disable();

    this.temporalForm.get('estadoid')?.valueChanges
      .pipe(
        tap((estadoid: number) => {

          if (estadoid != 0) {
            this.temporalForm.get('ciudadid')?.enable();
          } else {
            this.temporalForm.get('ciudadid')?.disable();
          }

          this.temporalForm.get('ciudadid')?.reset(0);
        }),
        switchMap(estadoid => this.catCiudadService.getCatCiudadesxEstadoId(estadoid))
      )
      .subscribe(ciudades => {
        this.lstCiudadesxPais = ciudades
      },error => {
        // Manejar el error obtenido
        console.error(error);
      }
      );


      this.temporalForm.get('ciudadid')?.valueChanges
      .pipe(
        tap((ciudadid: number) => {

          if (ciudadid != 0) {
            this.domicilioForm.get('coloniaid')?.enable();
          } else {
            this.domicilioForm.get('coloniaid')?.disable();
          }

          this.domicilioForm.get('coloniaid')?.reset(0);
        }),
        switchMap(ciudadid => this.catColoniaService.getCatColoniasxCiudadId(ciudadid))
      )
      .subscribe(colonias => {
        this.lstColoniasxCiudad = colonias
      });


  }

  fieldNotValid(form: FormGroup, field: string): boolean | undefined {
    return form.get(field)?.invalid &&
      form.get(field)?.touched
  }

  getCtrl(form: FormGroup) {
    return form.controls;
  }

  private onlyNumbersValidator(control: FormControl): { [key: string]: any } | null {
    const valid = /^\d+$/.test(control.value);
    return valid ? null : { onlyNumbers: true };
  }


}
