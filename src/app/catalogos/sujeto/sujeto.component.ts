import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  sujetos: Sujeto[] = [];
  sujeto: Sujeto = { nombre: '', paterno: '', materno: '', rfc: '', curp: '', };
  lstPruebas: Prueba[] = [];
  encabezados: string[] = ['#', 'nombre', 'paterno', 'materno', 'rfc', 'curp', 'fechaNacimiento'];
  encaPrueba: string[] = ['id', 'userId', 'title', 'body'];
  formSujeto!: FormGroup;

  constructor(public sujetoService: SujetoService,
    private dataBiblioteca: DataBibliotecaService,
    private change: ChangeDetectorRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
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
    this.getPruebas();

    this.loadFormulario();
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

  getPruebas(): void {
    this.sujetoService.getPrueba().subscribe(p => {
      this.lstPruebas = p
      console.log(p);
      this.change.detectChanges();
      this.dtTrigger.next(0);
    });
  }

  guardar(): void {
    console.log(this.formSujeto.value.nombre);
  }

  loadFormulario(): void {
    this.formSujeto = this.fb.group({
      nombre: ['', [Validators.required]],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18)]]
    });
  }

  campoNoValido(campo: string): boolean | undefined {
    //console.log(JSON.stringify(this.formSujeto.get(campo)?.errors))
    const control = this.formSujeto.controls;
    console.log(control['rfc'].errors);
    return this.formSujeto.get(campo)?.invalid &&
      this.formSujeto.get(campo)?.touched 
  }

  get f() { return this.formSujeto.controls; }

  /*NOTE - UNA VEZ DE ACTUALIZAR LOS DATOS SE LLAMA A LA SIGUIENTE FUNCION 
         CON LA FINALIDAD DE RECARGAR LA TABLA.
*/
  renderizarTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(0);
    });
  }

  /*  public getSujetos(): void {
     this.sujetoService.getSujetos().subscribe(s => {
       this.sujetos = s
       console.log(s);

     });
   } */

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  /*
  cargarDataTables(): void {

    this.dtOptions = {

      ajax: (dataTablesParameters: any, callback) => {
        this.sujetoService.getPrueba().subscribe(datos => {
          console.log('ENTRADA DE DATOS' + JSON.stringify(datos))
          callback({
            data: datos
          });
        });
      },
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'User Id',
        data: 'userId'
      }, {
        title: 'Titulo',
        data: 'title'
      },
      {
        title: 'Contenido',
        data: 'body'
      }
      ]
    };

    /* this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      stateSave: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.sujetoService.getSujetos().subscribe(s => {
          this.sujetos = s;
          callback({
            data: s
          });
        });
      },
    }; 
  }
  */

  /*   ngAfterViewInit(): void {
      this.dtTrigger.next(0);
    } */

}
