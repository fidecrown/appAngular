import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'
import { Prueba, Sujeto } from 'src/app/models/sujeto';
import { DataBibliotecaService } from 'src/app/services/data-biblioteca.service';
import { SujetoService } from 'src/app/services/sujeto.service';
import { ListComponent } from './list/list.component';


@Component({
  selector: 'app-sujeto',
  templateUrl: './sujeto.component.html',
  styleUrls: ['./sujeto.component.css']
})
export class SujetoComponent implements OnDestroy, OnInit {

  @ViewChild(ListComponent) list: ListComponent = new ListComponent();

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  sujeto!: Sujeto;
  formSujeto!: FormGroup;

  lstSujetos: Sujeto[] = [];
  encabezados: string[] = ['#', 'Nombre Completo', 'rfc', 'curp', 'fechaNacimiento', 'Acciones'];

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

  emitDescriptionModule(): void {
    this.dataBiblioteca.descripModulo$.emit('Sujetos');
  }

  cargarSettingsTable(): void {
    this.dtOptions = {
      //pagingType: 'full_numbers',
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

  loadForm(): void {
    this.formSujeto = this.fb.group({
      sujetoid: [0],
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]],
      fechaNacimiento: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      sexo: ['', Validators.required],
    });
  }

  getSujetos(): void {
    this.sujetoService.getSujetos().subscribe(sujetos => {
      this.lstSujetos = sujetos
      //console.log(sujetos);
      this.change.detectChanges();
      this.dtTrigger.next(0);
    });
  }

  addRow(): void {
    this.sujeto = this.formSujeto.value;
    this.sujetoService.saveSujeto(this.sujeto).subscribe(msj => {
      this.list.onRenderTable();
      this.getSujetos();
      //this.cleanForm();
      document.getElementById("cerrar")?.click();
      this.getMessageAlert('success', msj.mensaje);
    });
  }

  editRow(sujetoid: number) {
    this.sujetoService.getSujetoById(sujetoid).subscribe(sujeto => {
      this.formSujeto.patchValue(sujeto);
    });
  }

  updateRow(): void {
    const sujetoid: number = this.formSujeto.value.sujetoid;
    this.sujetoService.updateSujeto(sujetoid, this.formSujeto.value).subscribe(msj => {
      this.list.onRenderTable();
      this.getSujetos();
      document.getElementById("cerrar")?.click();
      this.getMessageAlert('info', msj.mensaje);
      //console.log(msj);
    });
  }

  deleteRow(sujetoId: number): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.sujetoService.deleteSujeto(sujetoId).subscribe(msj => {
          this.list.onRenderTable();
          this.getSujetos();
          this.getMessageAlert('info', msj.mensaje);
        });

      }
    })
  }

  fieldNotValid(field: string): boolean | undefined {
    //console.log(JSON.stringify(this.formSujeto.get(campo)?.errors))
    const control = this.formSujeto.controls;
    //console.log(control['rfc'].errors);
    return this.formSujeto.get(field)?.invalid &&
      this.formSujeto.get(field)?.touched
  }

  get f() { return this.formSujeto.controls; }

  get existRowById() {
    return this.formSujeto.value.sujetoid > 0
  }

  cleanForm(): void {
    this.formSujeto.reset();
  }

  getMessageAlert(alerta: any, title: string): void {
    Swal.fire({
      position: 'center',
      icon: alerta,
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
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
