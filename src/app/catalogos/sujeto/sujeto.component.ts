import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Prueba, Sujeto } from 'src/app/models/sujeto';
import { DataBibliotecaService } from 'src/app/services/data-biblioteca.service';
import { SujetoService } from 'src/app/services/sujeto.service';

@Component({
  selector: 'app-sujeto',
  templateUrl: './sujeto.component.html',
  styleUrls: ['./sujeto.component.css']
})
export class SujetoComponent implements OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement: any = DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  lstSujetos: Sujeto[] = [];
  sujeto!: Sujeto;
  lstPruebas: Prueba[] = [];
  encabezados: string[] = ['#', 'nombre', 'paterno', 'materno', 'rfc', 'curp', 'fechaNacimiento', 'Acciones'];
  encaPrueba: string[] = ['id', 'userId', 'title', 'body'];
  formSujeto!: FormGroup;
  newOrUpdate: string = '';
  btnSaveorUpdate: string = '';

  constructor(public sujetoService: SujetoService,
    private dataBiblioteca: DataBibliotecaService,
    private change: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    //this.resetFlat('Nuevo', 'Guardar');

    /*NOTE - EMITIMOS EL NOMBRE DEL ENCABEZADO DEL MODULO EN TURNO
          PARA IMPRIMIRLO EN LA PANTALLA
  */
    this.emitDescriptionModule();

    /*NOTE - CARGAMOS LAS CONFIGURACIONES DEL DATATABLE
  */
    this.cargarSettingsTable();

    /*NOTE - HACEMOS UNA PATECION AL BACK-END PARA EXTRAER
          LOS DATOS Y POSTERIORMENTE LLENAR EL LISTADO DE LA TABLA
  */
    this.getSujetos();

    /*NOTE - CARGAMOS LOS DATOS DEL FORMULARIO
          Y LOS ENLAZAMOS DENTRO DE LA PLANTILLA HTML
  */
    this.loadForm();

  }

  cargarSettingsTable(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      //info: false,
      //searching: false,
      //paging: false,
      scrollY: '200px',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/es-MX.json'
      },
      order: []
    };
  }

  emitDescriptionModule(): void {
    this.dataBiblioteca.descripModulo$.emit('Sujetos');
  }

  getSujetos(): void {
    this.sujetoService.getSujetos().subscribe(sujetos => {
      this.lstSujetos = sujetos
      console.log(sujetos);
      this.change.detectChanges();
      this.dtTrigger.next(0);
    });
  }

  loadForm(): void {
    this.formSujeto = this.fb.group({
      sujetoid: [0],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]]
    });
  }

  addRow(): void {
    this.sujeto = this.formSujeto.value;
    this.sujetoService.saveSujeto(this.sujeto).subscribe(response => {
      this.renderTable();
      this.cleanForm();
      document.getElementById("miModal")?.click();
    });
  }

  editRow(sujetoid: number) {
    this.sujetoService.getSujetoById(sujetoid).subscribe(sujeto => {
      this.formSujeto.patchValue(sujeto);
    });
  }

  fieldNotValid(field: string): boolean | undefined {
    //console.log(JSON.stringify(this.formSujeto.get(campo)?.errors))
    const control = this.formSujeto.controls;
    //console.log(control['rfc'].errors);
    return this.formSujeto.get(field)?.invalid &&
      this.formSujeto.get(field)?.touched
  }

  get f() { return this.formSujeto.controls; }

  get existSujetoId() {
    return this.formSujeto.value.sujetoid > 0
  }

  cleanForm(): void {
    this.formSujeto.reset();
  }

  renderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // PRIMERO DESTRUIMOS LA TABLA
      dtInstance.destroy();
      // HACEMOS PETICION AL SERVIDOR PARA TRAER EL LISTADO
      this.getSujetos();

    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }



  //SECTION - PRUEBAS UNITARIAS

  /* getPruebas(): void {
    this.sujetoService.getPrueba().subscribe(p => {
      this.lstPruebas = p
      console.log(p);
      this.change.detectChanges();
      this.dtTrigger.next(0);
    });
  } */

}
