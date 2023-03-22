import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estado } from 'src/app/interfaces/clientes/catalogos/estado.interface';
import { Ciudad } from '../../../interfaces/clientes/catalogos/ciudad.interface';
import { EstadoService } from '../../../services/moduloClientes/catalogos/estado.service';
import { switchMap, tap } from 'rxjs';
import { CiudadService } from '../../../services/moduloClientes/catalogos/ciudad.service';
import { Colonia } from 'src/app/interfaces/clientes/catalogos/colonia.interface';
import { ColoniaService } from 'src/app/services/moduloClientes/catalogos/colonia.service';
import { TiempoArraigoService } from '../../../services/moduloClientes/catalogos/tiempo-arraigo.service';
import { TiempoArraigo } from 'src/app/interfaces/clientes/catalogos/tiempo-arraigo.interface';

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
  temporalForm!: FormGroup;

  lstCatEstados: Estado[] = [];
  lstCiudadesxPais: Ciudad[] = [];
  lstColoniasxCiudad: Colonia[] = [];
  lstTiempoArraigo: TiempoArraigo[] = [];

  ngOnInit(): void {
    this.loadTemporalForm();
    this.loadDomicilioForm();
    this.loadSelectedEstados();
    this.chageOnSelecteds();
  }

  loadTemporalForm(): void{
    this.temporalForm = this.fb.group({
      estadoid : [0],
      ciudadid : [0]
    });
  }

  loadDomicilioForm(): void {
    this.domicilioForm = this.fb.group({
      calle: [''],
      numero: [''],
      interior: [''],
      telefono: [''],
      entre_calle_1: [''],
      entre_calle_2: [''],
      referencia: [''],
      coloniaid: [0],
      tiempoarraigo: [0],
      nacionalidadid: ['']
    });

    this.altaSolClienteForm.addControl('domicilio', this.domicilioForm);
  }

  loadSelectedEstados(): void {

    this.catEstadoService.getCatalogoEstados().subscribe((datos: Estado[]) => {
      this.lstCatEstados = datos;
    });

    this.lstTiempoArraigo = this.catTArraigoService.CatTiempoArraigo;

  }

  chageOnSelecteds(): void {

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
      });


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

}
